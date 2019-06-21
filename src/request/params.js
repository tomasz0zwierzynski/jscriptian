const authService = require('../auth');
const playerService = require('../database/player');
const buildingService = require('../database/building');

module.exports = {

    build: function (app, db) {
        app.get('/sites-params', (req, res) => {

            const player = authService.getPlayerByToken(db, req.query.token);

            if (player) {
                const production = playerService.getPlayerProduction(db, player);
                const capacity = playerService.getPlayerCapacity(db, player);

                const json = {
                    name: player.name,
                    villageName: player.villages[player.activeVillage].name,
                    villagesNames: player.villages.map( v => v.name ),
                    resources: {
                        wood: player.villages[player.activeVillage].resources.wood,
                        clay: player.villages[player.activeVillage].resources.clay,
                        iron: player.villages[player.activeVillage].resources.iron,
                        crop: player.villages[player.activeVillage].resources.crop,
                    },
                    capacity: capacity,
                    sites: player.villages[player.activeVillage].sites,
                    production: {
                        wood: production.woodProd,
                        clay: production.clayProd,
                        iron: production.ironProd,
                        crop: production.cropProd
                    },
                    buildQueue: player.villages[player.activeVillage].buildQueue
                };

                res.json(json);
            } else {
                res.status(401);
                res.send('Unauthenticated');
            }
        });

        app.get('/site-params/:id', (req, res) => {

            const player = authService.getPlayerByToken(db, req.query.token);

            if (player) {

                let building = buildingService.getBuildingById(db, +req.params.id)[0];
                let level = player.villages[player.activeVillage].sites[+req.params.id].level;

                const json = {
                    name: building.name,

                    cost: {
                        wood: building.levels[level].wood,
                        clay: building.levels[level].clay,
                        iron: building.levels[level].iron,
                        crop: building.levels[level].crop
                    },

                    production: building.levels[level].prod
                };

                res.json(json);
            } else {
                res.status(401);
                res.send('Unauthenticated');
            }
        });

    }

}