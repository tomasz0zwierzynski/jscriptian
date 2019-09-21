const playerService = require('./service/player');
const villageService = require('./service/village');
const logService = require('./service/log');
const log = logService.getLogger('interval-services.js');

module.exports = {

    start: function (db) {
        log.info(`Starting cultureProcess service`);
        setInterval(() => {
            this.cultureProcess(db);
        }, 60000);
        log.info(`Starting queueQuickFixProcess service`);
        setInterval(() => {
            this.queueQuickFixProcess(db);
        }, 60000);

    },

    cultureProcess: function (db) {
        log.debug(`cultureProcess service called`);

        try {
            const allPlayers = playerService.getAllPlayers(db);

            // culture points production
            allPlayers.forEach(player => {

                player.villages.forEach((village, idx) => {
                    const production = villageService.getCultureProductionByVillage(db, player, idx);
                    village.culturePoints += 60 * production / 3600;
                });

                playerService.updatePlayer(db, player);
            });
        } catch (err) {
            log.error(JSON.stringify(err));
        }

    },

    queueQuickFixProcess: function (db) {
        log.debug(`queueQuickFixProcess service called`);

        try {
            const allPlayers = playerService.getAllPlayers(db);

            // QUICKFIX: check event locking
            // TODO: find actual problem causing this...
            allPlayers.forEach(player => {
                player.villages.forEach((village, idx) => {
                    village.buildQueue.forEach(event => {
                        const now = new Date();
                        const date = new Date(event.eventDate);
                        if (date < now) {
                            village.buildQueue = [];
                        }
                    });
                    village.constructQueue.forEach(event => {
                        const now = new Date();
                        const date = new Date(event.eventDate);
                        if (date < now) {
                            village.constructQueue = [];
                        }
                    });
                });

                playerService.updatePlayer(db, player);
            });
        } catch (err) {
            log.error( JSON.stringify( err ) );
        }
    }
}

