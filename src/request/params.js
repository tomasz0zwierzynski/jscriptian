const authService = require('../auth');
const playerService = require('../service/player');
const buildingService = require('../service/building');
const villageService = require('../service/village');
const cultureService = require('../service/culture');
const worldService = require('../service/world');

module.exports = {

    build: function (app, db) {

        app.get('/user-info-params', (req, res) => {

            const player = authService.getPlayerByToken(db, req.query.token);
            if (player) {

                const json = {
                    name: player.name,
                    message: player.message
                }

                player.message = null;

                res.json(json);
            } else {
                res.status(401);
                res.send('Unauthenticated');
            }

        });

        app.get('/production-params', (req, res) => {
            
            const player = authService.getPlayerByToken(db, req.query.token);

            if (player) {
                const production = villageService.getProduction(db, player);
                const capacity = villageService.getResourceCapacity(db, player);
                const resources = villageService.getResources(db, player);

                const json = {
                    resources: resources,
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
                    villagePosition: player.villages[player.activeVillage].position,
                    villagesNames: player.villages.map( v => v.name ),
                    villagesPositions: player.villages.map( v => v.position )
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
                const building = buildingService.getBuildingById(db, buildingId)[0];
                const level = player.villages[player.activeVillage].sites[+req.params.id].level;

                const sameBuildingInQueue = player.villages[player.activeVillage].buildQueue.filter(b => +b.siteId === +req.params.id ).length;

                const json = {
                    name: building.name,

                    buildingId: buildingId,

                    cost: {
                        wood: building.levels[level + sameBuildingInQueue].wood,
                        clay: building.levels[level + sameBuildingInQueue].clay,
                        iron: building.levels[level + sameBuildingInQueue].iron,
                        crop: building.levels[level + sameBuildingInQueue].crop
                    },

                    buildingAttributes: building.levels[level].attr
                };
                // TODO: pokazać jeszcze czas
                res.json(json);
            } else {
                res.status(401);
                res.send('Unauthenticated');
            }
        });

        app.get('/center-params/:id', (req, res) => {

            const player = authService.getPlayerByToken(db, req.query.token);

            if (player) {

                const buildingId = player.villages[player.activeVillage].buildings[+req.params.id].buildingId;
                const building = buildingService.getBuildingById(db, buildingId)[0];
                const level = player.villages[player.activeVillage].buildings[+req.params.id].level;

                const sameBuildingInQueue = player.villages[player.activeVillage].constructQueue.filter(b => +b.constructionId === +req.params.id ).length;
                
                const json = {
                    name: building.name,

                    buildingId: building.id,

                    cost: {
                        wood: building.levels[level + sameBuildingInQueue].wood,
                        clay: building.levels[level + sameBuildingInQueue].clay,
                        iron: building.levels[level + sameBuildingInQueue].iron,
                        crop: building.levels[level + sameBuildingInQueue].crop
                    },

                    buildingAttributes: building.levels[level].attr
                };

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



        app.get('/player-params', (req, res) => {

            const player = authService.getPlayerByToken(db, req.query.token)

            if (player) {
            
                const population = cultureService.getTotalPopulation(db, player);
                const culturePoints = cultureService.getTotalCulturePoints(db, player);
                const cultureProduction = villageService.getCultureProduction(db, player)
            
                const json = {
                    population: population.population,
                    culturePoints: culturePoints.culturePoints,
                    cultureProduction: cultureProduction
                };

                res.json(json);
            } else {
                res.status(401);
                res.send('Unauthenticated');
            }
        });

        app.get('/new-site-params', (req, res) => {

            const player = authService.getPlayerByToken(db, req.query.token);

            if (player) {

                const availableSites = playerService.getPlayerAvailableSites(db, player);

                const json = {
                    availableSites: availableSites
                }

                res.json(json);
            } else {
                res.status(401);
                res.send('Unauthenticated');
            }
        });

        app.get('/new-construction-params', (req, res) => {

            const player = authService.getPlayerByToken(db, req.query.token);

            if (player) {
             
                const availableBuildings = playerService.getPlayerAvailableBuildings(db, player);
                
                const json = {
                    availableBuildings: availableBuildings
                }
                
                res.json(json);
            } else {
                res.status(401);
                res.send('Unauthenticated');
            }

        });

        app.get('/map-params', (req, res) => {
            
            const player = authService.getPlayerByToken(db, req.query.token);

            if ( player ) {
                const centerPosition = { x: req.query.x, y: req.query.y };

                const tiles = worldService.getWorldTilesSquare(db, centerPosition);

                const json = {
                    tiles: tiles
                }

                res.json(json);
            } else {
                res.status(401);
                res.send('Unauthenticated');
            }         

        });

        app.get('/leaderboard-params', (req, res) => {

            const player = authService.getPlayerByToken(db, req.query.token);

            if ( player ) {

                // TODO: posortowac po stronie serwisu
                const playersPop = playerService.getPlayersPopulations(db, player);

                const json = {
                    playersPop: playersPop
                }

                res.json(json);
            } else {
                res.status(401);
                res.send('Unauthenticated');
            }
        });

    }

}