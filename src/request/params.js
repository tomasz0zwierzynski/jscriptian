const authService = require('../auth');
const playerService = require('../database/player');
const buildingService = require('../database/building');

module.exports = {

    build: function (app, db) {
        app.get('/sites-params', (req, res) => {

            const player = authService.getPlayerByToken(db, req.query.token);

            if (player) {
                const production = playerService.getPlayerProduction(db, player);

                const json = {
                    resources: {
                        wood: player.resources.wood,
                        clay: player.resources.clay,
                        iron: player.resources.iron,
                        crop: player.resources.crop,
                    },
                    sites: player.sites,
                    production: {
                        wood: production.woodProd,
                        clay: production.clayProd,
                        iron: production.ironProd,
                        crop: production.cropProd
                    },
                    buildQueue: player.buildQueue
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
                let level = player.sites[+req.params.id].level;

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
                // TODO; something 
            }
        });



    }

}