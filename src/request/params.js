const authService = require('../auth');
const playerService = require('../database/player');
const buildingService = require('../database/building');

module.exports = {

    build: function (app, db) {

        app.get('/user-info-params', (req, res) => {

            const player = authService.getPlayerByToken(db, req.query.token);
            if (player) {

                const json = {
                    name: player.name
                }

                res.json(json);
            } else {
                res.status(401);
                res.send('Unauthenticated');
            }

        });

        app.get('/production-params', (req, res) => {
            
            const player = authService.getPlayerByToken(db, req.query.token);

            if (player) {
                const production = playerService.getPlayerProduction(db, player);
                const capacity = playerService.getPlayerCapacity(db, player);

                const json = {
                    resources: {
                        wood: player.villages[player.activeVillage].resources.wood,
                        clay: player.villages[player.activeVillage].resources.clay,
                        iron: player.villages[player.activeVillage].resources.iron,
                        crop: player.villages[player.activeVillage].resources.crop,
                    },
                    capacity: capacity,
                    production: {
                        wood: production.woodProd,
                        clay: production.clayProd,
                        iron: production.ironProd,
                        crop: production.cropProd
                    }
                }

                res.json(json);
            } else {
                res.status(401);
                res.send('Unauthenticated');
            }
        } );

        app.get('/villages-params', (req, res) => {

            const player = authService.getPlayerByToken(db, req.query.token);

            if (player) {
                const json = {
                    villageName: player.villages[player.activeVillage].name,
                    villagesNames: player.villages.map( v => v.name )
                };

                res.json(json);
            } else {
                res.status(401);
                res.send('Unauthenticated');
            }

        } );

        app.get('/sites-params', (req, res) => {

            const player = authService.getPlayerByToken(db, req.query.token);

            if (player) {

                const json = {
                    sites: player.villages[player.activeVillage].sites,
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

                const buildingId = player.villages[player.activeVillage].sites[+req.params.id].buildingId;
                let building = buildingService.getBuildingById(db, buildingId)[0];
                let level = player.villages[player.activeVillage].sites[+req.params.id].level;

                const sameBuildingInQueue = player.villages[player.activeVillage].buildQueue.filter(b => +b.siteId === +req.params.id ).length;

                const json = {
                    name: building.name,

                    cost: {
                        wood: building.levels[level + sameBuildingInQueue].wood,
                        clay: building.levels[level + sameBuildingInQueue].clay,
                        iron: building.levels[level + sameBuildingInQueue].iron,
                        crop: building.levels[level + sameBuildingInQueue].crop
                    },

                    buildingProduction: building.levels[level].prod
                };
                // TODO: pokazać jeszcze czas
                res.json(json);
            } else {
                res.status(401);
                res.send('Unauthenticated');
            }
        });

        app.get('/center-params', (req, res) => {

            const player = authService.getPlayerByToken(db, req.query.token)

            if (player) {
                const json = {
                    buildings: player.villages[player.activeVillage].buildings,
                    constructQueue: player.villages[player.activeVillage].constructQueue
                };

                res.json(json);
            } else {
                res.status(401);
                res.send('Unauthenticated');
            }

        });

    }

}