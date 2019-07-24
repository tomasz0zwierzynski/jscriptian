const buildingService = require('./building');

module.exports = {

    getResourcesCapacityByVillage: function ( db, player, villageId ) {
        let warehouseCapacity = 0;
        let granaryCapacity = 0;

        const warehouseBuilding = buildingService.getBuildingById(db, 5)[0];
        const granaryBuilding = buildingService.getBuildingById(db, 6)[0];

        const warehouses = player.villages[villageId].buildings.filter( building => building.buildingId === 5 );
        if (warehouses.length > 0) {
            warehouses.forEach( warehouse => {
                warehouseCapacity += warehouseBuilding.levels[ warehouse.level ].attr.capacity;
            })
        } else {
            warehouseCapacity = 8000;
        }
        if (warehouseCapacity < 8000) {
            warehouseCapacity = 8000;
        }

        const granaries = player.villages[villageId].buildings.filter( building => building.buildingId === 6 );
        if (granaries.length > 0) {
            granaries.forEach( granary => {
                granaryCapacity += granaryBuilding.levels[ granary.level ].attr.capacity;
            })
        } else {
            granaryCapacity = 8000;
        }
        if (granaryCapacity < 8000) {
            granaryCapacity = 8000;
        }

        return {
            warehouseCapacity: warehouseCapacity,
            granaryCapacity: granaryCapacity
        }
    }, 

    getProductionByVillage: function ( db, player, villageId ) {
        let woodProd = 0;
        let clayProd = 0;
        let ironProd = 0;
        let cropProd = 0;

        const woodcutterBuilding = buildingService.getBuildingById(db, 0)[0];
        const clayPitBuilding = buildingService.getBuildingById(db, 1)[0];
        const ironMineBuilding = buildingService.getBuildingById(db, 2)[0];
        const cropFieldBuilding = buildingService.getBuildingById(db, 3)[0];

        player.villages[villageId].sites.forEach( site => {
            if (site.buildingId === 0) {
                woodProd += woodcutterBuilding.levels[site.level].attr.prod;
            } else if (site.buildingId === 1) {
                clayProd += clayPitBuilding.levels[site.level].attr.prod;
            } else if (site.buildingId === 2) {
                ironProd += ironMineBuilding.levels[site.level].attr.prod;
            } else if (site.buildingId === 3) {
                cropProd += cropFieldBuilding.levels[site.level].attr.prod;
            }
        });

        return {
            woodProd: woodProd,
            clayProd: clayProd,
            ironProd: ironProd,
            cropProd: cropProd
        };
    },

    getMainBuildingReductionByVillage: function ( db, player, villageId ) {
        let reduction = 0;

        const mainBuilding = buildingService.getBuildingById(db, 4)[0];

        const mainBuildings = player.villages[villageId].buildings.filter( building => building.buildingId === 4 );
        if (mainBuildings.length === 1 ) {
            reduction = mainBuilding.levels[mainBuildings[0].level].attr.reduction;
        }
        
        return {
            reduction: reduction
        }
    },

    getPopulationByVillage: function ( db, player, villageId ) {
        let loadedBuildings = new Map();
        let population = 0;

        const village = player.villages[villageId];

        village.sites.forEach( site => {
            if ( !loadedBuildings.has( site.buildingId ) ) {
                const current = buildingService.getBuildingById(db, site.buildingId)[0];
                loadedBuildings.set(site.buildingId, current);
            }
            const building = loadedBuildings.get(site.buildingId);
            population += building.levels[site.level].pop;
        });
        village.buildings.forEach( building => {
            if ( !loadedBuildings.has( building.buildingId ) ) {
                const current = buildingService.getBuildingById(db, building.buildingId)[0];
                loadedBuildings.set(building.buildingId, current);
            }
            const building0 = loadedBuildings.get(building.buildingId);
            population += building0.levels[building.level].pop;
        });

        return {
            population: population
        };
    },

    getCultureProductionByVillage: function ( db, player, villageId ) {
        const buildingMap = buildingService.getAllBuildingsMap(db);
        let production = 0;

        player.villages[villageId].sites.forEach( site => {
            production += buildingMap.get(site.buildingId).levels[site.level].cp;
        });
        player.villages[villageId].buildings.forEach( building => {
            production += buildingMap.get(building.buildingId).levels[building.level].cp;
        });

        return production;
    },

    getResourceCapacity: function ( db, player ) {
        return this.getResourcesCapacityByVillage( db, player, player.activeVillage );
    },

    getProduction: function ( db, player ) {
        return this.getProductionByVillage( db, player, player.activeVillage );
    },

    getMainBuildingReduction: function ( db, player ) {
        return this.getMainBuildingReductionByVillage( db, player, player.activeVillage );
    },

    getPopulation: function ( db, player ) {
        return this.getPopulationByVillage( db, player, player.activeVillage );
    },

    getCultureProduction( db, player ) {
        return this.getCultureProductionByVillage( db, player, player.activeVillage );
    }

}