villageService = require('./village');
buildingService = require('./building');

module.exports = {
    getTotalPopulation: function ( db, player ) {
        let loadedBuildings = new Map();
        let totalPopulation = 0;

        player.villages.forEach( village => {
            village.sites.forEach( site => {
                if ( !loadedBuildings.has( site.buildingId ) ) {
                    const current = buildingService.getBuildingById(db, site.buildingId)[0];
                    loadedBuildings.set(site.buildingId, current);
                }
                const building = loadedBuildings.get(site.buildingId);
                totalPopulation += building.levels[site.level].pop;
            });
            village.buildings.forEach( building => {
                if ( !loadedBuildings.has( building.buildingId ) ) {
                    const current = buildingService.getBuildingById(db, building.buildingId)[0];
                    loadedBuildings.set(building.buildingId, current);
                }
                const building0 = loadedBuildings.get(building.buildingId);
                totalPopulation += building0.levels[building.level].pop;
            });
        });

        return {
            population: totalPopulation
        };
    },

    getTotalCulturePoints: function ( db, player ) {
        let cp = 0;
        player.villages.forEach( village => {
            cp += village.culturePoints;
        });

        return {
            culturePoints: cp
        };
    },

    getTotalCultureProduction: function ( db, player ) {
        let production = 0;
        player.villages.forEach( ( village, idx ) => {
            production += villageService.getCultureProductionByVillage( idx );
        });
    }
    
}