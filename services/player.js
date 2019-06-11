const loki = require('lokijs');
const buildingService = require('./building');

module.exports = {
    getPlayerByName: function (db, playerName) {

        const players = db.getCollection('players');
        const player = players.find({name: playerName})[0];

        return player;
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

        player.sites.forEach( site => {
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
    }

};