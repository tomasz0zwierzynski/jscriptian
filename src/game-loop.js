const playerService = require('./database/player');
const villageService = require('./database/village');

module.exports = {
    
    process: function ( db ) {
        
// TODO: refactor and optymalize that

        // production

        const allPlayers = playerService.getAllPlayers(db);
               
        // culture points production
        allPlayers.forEach( player => {

            player.villages.forEach( (village, idx) => {
                const production = villageService.getCultureProductionByVillage(db, player, idx);
                village.culturePoints += 0.05 * production / 3600;
            });

            playerService.updatePlayer( db, player );
        });

        // buildQueue
        allPlayers.forEach( player => {
            player.villages.forEach( village => {
                if ( village.buildQueue.length > 0 ) {
                    village.buildQueue[0].timeLeft -= 0.05;
                    
                    if ( village.buildQueue[0].timeLeft <= 0 ) {
                        const completed = village.buildQueue.shift();
                        village.sites[completed.siteId].level++;
                    }
                }
            } );

            playerService.updatePlayer( db, player );
        });

        allPlayers.forEach( player => {
            player.villages.forEach( village => {
                if ( village.constructQueue.length > 0 ) {
                    village.constructQueue[0].timeLeft -= 0.05;

                    if ( village.constructQueue[0].timeLeft <= 0 ) {
                        const completed = village.constructQueue.shift();
                        village.buildings[completed.constructionId].level++;
                    }
                }
            })

            playerService.updatePlayer( db, player );
        });


    }
}

function production() {

}