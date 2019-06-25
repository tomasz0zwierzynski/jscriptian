const authService = require('../auth');
const playerService = require('../database/player');
const buildingService = require('../database/building');

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
                let building = buildingService.getBuildingById(db, buildingId)[0];
                let level = player.villages[player.activeVillage].sites[siteId].level;
                
                const buildQueueSameBuilding = player.villages[player.activeVillage].buildQueue.filter( b => +b.siteId === +siteId );
                const alreadyInConstruction = buildQueueSameBuilding.length;
                
                // TODO: na sztywno nie można bardziej rozbudować
                if (level + alreadyInConstruction < 2) {

                    const woodLeft = player.villages[player.activeVillage].resources.wood - building.levels[level + alreadyInConstruction].wood;
                    const clayLeft = player.villages[player.activeVillage].resources.clay - building.levels[level + alreadyInConstruction].clay;
                    const ironLeft = player.villages[player.activeVillage].resources.iron - building.levels[level + alreadyInConstruction].iron;
                    const cropLeft = player.villages[player.activeVillage].resources.crop - building.levels[level + alreadyInConstruction].crop;

                    if (woodLeft < 0 || clayLeft < 0 || ironLeft < 0 || cropLeft < 0 ) {
                        // message ze nie mozna zbudować
                    } else {

                        const reduction = playerService.getPlayerMainBuildingReduction(db, player).reduction;
                        const timeLeft = Math.round( building.levels[level + alreadyInConstruction].time * ( ( 100 - reduction ) / 100 ) );

                        player.villages[player.activeVillage].buildQueue.push( {
                            buildingId: buildingId,
                            siteId: siteId,
                            level: level + 1 + alreadyInConstruction,
                            timeLeft: timeLeft   
                        });
                  
                        player.villages[player.activeVillage].resources.wood = woodLeft;
                        player.villages[player.activeVillage].resources.clay = clayLeft;
                        player.villages[player.activeVillage].resources.iron = ironLeft;
                        player.villages[player.activeVillage].resources.crop = cropLeft;

                        playerService.updatePlayer(db, player);
                    }
                }

                res.redirect('/sites');
            }
        });

        app.get('/village', (req, res) => {
            
            const villageId = req.query.id;

            const player = authService.getPlayerByToken(db, req.query.token);
            if (player) {
                player.activeVillage = villageId;

                res.redirect('/sites');
            }
        });
    }
}