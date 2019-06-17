const playerService = require('./database/player');

module.exports = {
    
    process: function ( db ) {
        
        // production
        const allPlayers = playerService.getAllPlayers(db);
        allPlayers.forEach( player => {
            const production = playerService.getPlayerProduction(db, player);

            player.resources.wood += 0.02 * production.woodProd / 3600;
            player.resources.clay += 0.02 * production.clayProd / 3600;
            player.resources.iron += 0.02 * production.ironProd / 3600;
            player.resources.crop += 0.02 * production.cropProd / 3600;
    
            playerService.updatePlayer( db, player );
        });
        
        // buildQueue
        allPlayers.forEach( player => {
            if ( player.buildQueue.length > 0 ) {
                player.buildQueue[0].timeLeft -= 0.02;
                
                if ( player.buildQueue[0].timeLeft <= 0 ) {
                    const completed = player.buildQueue.shift();
                    player.sites[completed.siteId].level++;
                }
            }
        });


    }
}

function production() {

}