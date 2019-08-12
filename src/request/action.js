const authService = require('../auth');
const playerService = require('../service/player');
const buildingService = require('../service/building');
const villageService = require('../service/village');
const eventQueue = require('../queue');

const EventTypes = require('../model/event-type');

const moment = require('../../node_modules/moment');

module.exports = {

    build: function (app, db) {

        app.post('/auth', (req, res) => {
            // logika otrzymywania tokena
            const token = authService.getPlayerToken(db, req.body.user, req.body.password);
            if (token) {
                res.send(token);
            } else {
                res.send('fail');
            }
        });

        app.get('/logout', (req, res) => {
            const token = req.query.token;
            authService.removePlayerToken(db, token);
            res.json({ msg: 'logged out' });
        });

        app.get('/upgrade', (req, res) => {
            // Upgrade logic
            const siteId = +req.query.id; // id w player.site[id]

            const player = authService.getPlayerByToken(db, req.query.token);
            if (player) {

                const buildingId = player.villages[player.activeVillage].sites[siteId].buildingId;
                const building = buildingService.getBuildingById(db, buildingId)[0];
                const level = player.villages[player.activeVillage].sites[siteId].level;
                
                const buildQueueSameBuilding = player.villages[player.activeVillage].buildQueue.filter( b => +b.siteId === +siteId );
                const alreadyInConstruction = buildQueueSameBuilding.length;
                
                // TODO: na sztywno nie można bardziej rozbudować
                if (level + alreadyInConstruction < 20) {

                    const resources = villageService.getResources(db, player);

                    const woodLeft = resources.wood - building.levels[level + alreadyInConstruction].wood;
                    const clayLeft = resources.clay - building.levels[level + alreadyInConstruction].clay;
                    const ironLeft = resources.iron - building.levels[level + alreadyInConstruction].iron;
                    const cropLeft = resources.crop - building.levels[level + alreadyInConstruction].crop;

                    if (woodLeft < 0 || clayLeft < 0 || ironLeft < 0 || cropLeft < 0 ) {
                        // message ze nie mozna zbudować
                    } else {

                        const reduction = villageService.getMainBuildingReduction(db, player).reduction;
                        const timeLeft = Math.round( building.levels[level + alreadyInConstruction].time * ( ( 100 - reduction ) / 100 ) );

                        const lastFinishBuildingDate = player.villages[player.activeVillage].buildQueue.map(e => e.eventDate).sort().reverse()[0];
                        let timeAddBase = new Date();
                        if (lastFinishBuildingDate) {
                            timeAddBase = lastFinishBuildingDate;
                        }

                        const eventDate = moment(timeAddBase).add(timeLeft, 's').toDate();

                        const upgradeContext = {
                            villageId: player.activeVillage,
                            buildingId: buildingId,
                            siteId: siteId,
                            level: level + 1 + alreadyInConstruction,
                            eventDate: eventDate
                            // timeLeft: timeLeft   
                        };

                        player.villages[player.activeVillage].buildQueue.push( upgradeContext );

                        eventQueue.addEventToQueue(EventTypes.SITE_FINISH, player.id, eventDate, upgradeContext);                       
                  
                        player.villages[player.activeVillage].resources.wood = woodLeft;
                        player.villages[player.activeVillage].resources.clay = clayLeft;
                        player.villages[player.activeVillage].resources.iron = ironLeft;
                        player.villages[player.activeVillage].resources.crop = cropLeft;

                        player.villages[player.activeVillage].resourceSync = new Date();

                        playerService.updatePlayer(db, player);
                    }
                }

                res.redirect('/sites');
            } else {
                res.redirect('login');
            }
        });

        app.get('/construct', (req, res)=> {
          // TODO: refactor - to samo co wyzej i jeszcze sprawdzic requirenments
            const constructionId = +req.query.id;

            const player = authService.getPlayerByToken(db, req.query.token);
            if (player) {

                const buildingId = player.villages[player.activeVillage].buildings[constructionId].buildingId;
                const building = buildingService.getBuildingById(db, buildingId)[0];
                const level = player.villages[player.activeVillage].buildings[constructionId].level;

                const constructQueueSameBuilding = player.villages[player.activeVillage].constructQueue.filter( b => +b.constructionId === constructionId);
                const alreadyInConstruction = constructQueueSameBuilding.length;

                if (level + alreadyInConstruction < 20) {
                    
                    const resources = villageService.getResources(db, player);

                    const woodLeft = resources.wood - building.levels[level + alreadyInConstruction].wood;
                    const clayLeft = resources.clay - building.levels[level + alreadyInConstruction].clay;
                    const ironLeft = resources.iron - building.levels[level + alreadyInConstruction].iron;
                    const cropLeft = resources.crop - building.levels[level + alreadyInConstruction].crop;

                    if (woodLeft < 0 || clayLeft < 0 || ironLeft < 0 || cropLeft < 0 ) {
                        // message ze nie mozna zbudować
                    } else {

                        const reduction = villageService.getMainBuildingReduction(db, player).reduction;
                        const timeLeft = Math.round( building.levels[level + alreadyInConstruction].time * ( ( 100 - reduction ) / 100 ) );

                        const lastFinishBuildingDate = player.villages[player.activeVillage].constructQueue.map(e => e.eventDate).sort().reverse()[0];
                        let timeAddBase = new Date();
                        if (lastFinishBuildingDate) {
                            timeAddBase = lastFinishBuildingDate;
                        }

                        const eventDate = moment(timeAddBase).add(timeLeft, 's').toDate();

                        const upgradeContext = {
                            villageId: player.activeVillage,
                            buildingId: buildingId,
                            constructionId: constructionId,
                            level: level + 1 + alreadyInConstruction,
                            eventDate: eventDate 
                        };

                        player.villages[player.activeVillage].constructQueue.push( upgradeContext );
                  
                        eventQueue.addEventToQueue(EventTypes.CONSTRUCTION_FINISH, player.id, eventDate, upgradeContext)

                        player.villages[player.activeVillage].resources.wood = woodLeft;
                        player.villages[player.activeVillage].resources.clay = clayLeft;
                        player.villages[player.activeVillage].resources.iron = ironLeft;
                        player.villages[player.activeVillage].resources.crop = cropLeft;

                        player.villages[player.activeVillage].resourceSync = new Date();

                        playerService.updatePlayer(db, player);
                    }

                }

                res.redirect('/center');
            } else {
                res.redirect('login');
            }

        } );

        app.get('/upgrade-new', (req, res) => {
            const buildingId = +req.query.id;

            const player = authService.getPlayerByToken(db, req.query.token);
            if (player) {
                // TODO: dodac logikę, jesli mozna w ogole upgradnac

                // const building = buildingService.getBuildingById(db, buildingId);
                player.villages[player.activeVillage].sites.push({
                    id: player.villages[player.activeVillage].sites.length,
                    buildingId: buildingId,
                    level: 0
                });

                res.redirect('/sites');
            } else {
                res.redirect('login');
            }

        });

        app.get('/construct-new', (req, res) => {
            const buildingId = +req.query.id;

            const player = authService.getPlayerByToken(db, req.query.token);
            if (player) {

                //TODO: dodac logike, jesli mozna w ogole to postawic

                player.villages[player.activeVillage].buildings.push({
                    id: player.villages[player.activeVillage].buildings.length,
                    buildingId: buildingId,
                    level: 0
                });

                res.redirect('/center');
            } else {
                res.redirect('login');
            }
        });

        app.get('/village', (req, res) => {
            
            const villageId = +req.query.id;

            const player = authService.getPlayerByToken(db, req.query.token);
            if (player) {
                player.activeVillage = villageId;

                if ( req.query.place === 'sites' ) {
                    res.redirect('/sites');
                } else if ( req.query.place === 'center' ) {
                    res.redirect('/center');
                }
                
            } else {
                res.redirect('login');
            }
        });
    }
}