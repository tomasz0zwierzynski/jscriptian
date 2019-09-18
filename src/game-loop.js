const playerService = require('./service/player');
const villageService = require('./service/village');

module.exports = {

    process: function ( db ) {

        const allPlayers = playerService.getAllPlayers(db);
               
        // culture points production
        allPlayers.forEach( player => {

            player.villages.forEach( (village, idx) => {
                const production = villageService.getCultureProductionByVillage(db, player, idx);
                village.culturePoints += 60 * production / 3600;
            });

            playerService.updatePlayer( db, player );
        });

        // QUICKFIX: check event locking
        // TODO: find actual problem causing this...
        allPlayers.forEach( player => {
            player.villages.forEach( (village, idx) => {
                village.buildQueue.forEach( event => {
                    const now = new Date();
                    const date = new Date(event.eventDate);
                    if (date < now) {
                        village.buildQueue = [];
                    }
                });
                village.constructQueue.forEach( event => {
                    const now = new Date();
                    const date = new Date(event.eventDate);
                    if (date < now) {
                        village.constructQueue = [];
                    }
                });
            });

            playerService.updatePlayer( db, player );
        });

    }
}

