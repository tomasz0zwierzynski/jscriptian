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
                const buildingId = player.sites[siteId].buildingId;
                let building = buildingService.getBuildingById(db, buildingId)[0];
                let level = player.sites[siteId].level;

                if (level < 2) { // TODO: na sztywno nie można bardziej rozbudować
                    player.sites[siteId].level++;

                    player.resources.wood -= building.levels[level].wood;
                    player.resources.clay -= building.levels[level].clay;
                    player.resources.iron -= building.levels[level].iron;
                    player.resources.crop -= building.levels[level].crop;

                    playerService.updatePlayer(db, player);
                }

                res.redirect('/sites');
            }
        });
    }
}