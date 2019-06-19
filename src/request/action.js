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

            const siteId = req.query.id; // id w player.site[id]

            const player = authService.getPlayerByToken(db, req.query.token);
            if (player) {

                const buildingId = player.villages[player.activeVillage].sites[siteId].buildingId;
                let building = buildingService.getBuildingById(db, buildingId)[0];
                let level = player.villages[player.activeVillage].sites[siteId].level;

                
                const buildQueueSameBuilding = player.villages[player.activeVillage].buildQueue.filter( b => +b.siteId === +siteId );
                const alreadyInConstruction = buildQueueSameBuilding.length;
                
                // TODO: na sztywno nie można bardziej rozbudować
                if (level + alreadyInConstruction < 2) {

                    player.villages[player.activeVillage].buildQueue.push( {
                        buildingId: buildingId,
                        siteId: siteId,
                        level: level + 1 + alreadyInConstruction,
                        timeLeft: building.levels[level + alreadyInConstruction].time    
                    });
                  
                    player.villages[player.activeVillage].resources.wood -= building.levels[level].wood;
                    player.villages[player.activeVillage].resources.clay -= building.levels[level].clay;
                    player.villages[player.activeVillage].resources.iron -= building.levels[level].iron;
                    player.villages[player.activeVillage].resources.crop -= building.levels[level].crop;

                    playerService.updatePlayer(db, player);
                }

                res.redirect('/sites');
            }
        });
    }
}