const loki = require('lokijs');
const buildingService = require('./building');

module.exports = {
    getPlayerByName: function (db, playerName) {

        const players = db.getCollection('players');
        const player = players.find({name: playerName})[0];

        return player;
    },

    getAllPlayers: function (db) {
        const players = db.getCollection('players');
        
        return players.data;
    },

    updatePlayer: function (db, player) {
        const players = db.getCollection('players');

        players.update(player);

        db.saveDatabase();
    },

    getPlayerCapacityByVillage: function ( db, player, village ) {
        let warehouseCapacity = 0;
        let granaryCapacity = 0;

        const warehouseBuilding = buildingService.getBuildingById(db, 5)[0];
        const granaryBuilding = buildingService.getBuildingById(db, 6)[0];

        const warehouses = player.villages[village].buildings.filter( building => building.buildingId === 5 );
        if (warehouses.length > 0) {
            warehouses.forEach( warehouse => {
                warehouseCapacity += warehouseBuilding.levels[ warehouse.level ].capacity;
            })
        } else {
            warehouseCapacity = 8000;
        }
        if (warehouseCapacity < 8000) {
            warehouseCapacity = 8000;
        }

        const granaries = player.villages[village].buildings.filter( building => building.buildingId === 6 );
        if (granaries.length > 0) {
            granaries.forEach( granary => {
                granaryCapacity += granaryBuilding.levels[ granary.level ].capacity;
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

    getPlayerCapacity: function ( db, player ) {
        return this.getPlayerCapacityByVillage( db, player, player.activeVillage );
    },

    getPlayerProductionByVillage: function ( db, player, village) {
        let woodProd = 0;
        let clayProd = 0;
        let ironProd = 0;
        let cropProd = 0;

        const woodcutterBuilding = buildingService.getBuildingById(db, 0)[0];
        const clayPitBuilding = buildingService.getBuildingById(db, 1)[0];
        const ironMineBuilding = buildingService.getBuildingById(db, 2)[0];
        const cropFieldBuilding = buildingService.getBuildingById(db, 3)[0];

        player.villages[village].sites.forEach( site => {
            if (site.buildingId === 0) {
                woodProd += woodcutterBuilding.levels[site.level].prod;
            } else if (site.buildingId === 1) {
                clayProd += clayPitBuilding.levels[site.level].prod;
            } else if (site.buildingId === 2) {
                ironProd += ironMineBuilding.levels[site.level].prod;
            } else if (site.buildingId === 3) {
                cropProd += cropFieldBuilding.levels[site.level].prod;
            }
        });

        return {
            woodProd: woodProd,
            clayProd: clayProd,
            ironProd: ironProd,
            cropProd: cropProd
        };
    },

    getPlayerProduction: function (db, player) {
        return this.getPlayerProductionByVillage(db, player, player.activeVillage);
    },

    registerPlayer: function(db, name, password) {
        const players = db.getCollection('players');

        // TODO: check player already in database
        const newPlayer = {
            name: name,
            password: password,
            activeVillage: 0,
            villages: [
                {
                    name: name + "'s village",
                    resources: { wood: 750, clay: 750, iron: 750, crop: 750 },
                    sites: [
                        { id: 0, buildingId: 0, level: 0 },
                        { id: 1, buildingId: 1, level: 0 },
                        { id: 2, buildingId: 2, level: 0 },
                        { id: 3, buildingId: 3, level: 0 }
                    ],
                    buildQueue: [ ],
                    buildings: [

                    ],
                    constructQueue: [ ]
                },
                {
                    name: name + "'s VILLAGE",
                    resources: { wood: 7500, clay: 7500, iron: 7500, crop: 7500 },
                    sites: [
                        { id: 0, buildingId: 3, level: 2 },
                        { id: 1, buildingId: 3, level: 2 },
                        { id: 2, buildingId: 3, level: 2 },
                        { id: 3, buildingId: 3, level: 2 }
                    ],
                    buildQueue: [ ],
                    buildings: [
                        { id: 0, buildingId: 5, level: 1 }
                    ],
                    constructQueue: [ ]
                }
            ],
        };

        players.insert(newPlayer);

        db.saveDatabase();
    }

};