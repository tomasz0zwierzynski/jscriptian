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

    getPlayerProduction: function (db, player) {
        let woodProd = 0;
        let clayProd = 0;
        let ironProd = 0;
        let cropProd = 0;

        const woodcutterBuilding = buildingService.getBuildingById(db, 0)[0];
        const clayPitBuilding = buildingService.getBuildingById(db, 1)[0];
        const ironMineBuilding = buildingService.getBuildingById(db, 2)[0];
        const cropFieldBuilding = buildingService.getBuildingById(db, 3)[0];

        player.villages[player.activeVillage].sites.forEach( site => {
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
                    buildQueue: [ ]
                }
            ],
        };

        players.insert(newPlayer);

        db.saveDatabase();
    }

};