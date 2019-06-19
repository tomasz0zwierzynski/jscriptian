const playerService = require('./database/player');

module.exports = {
    
    process: function ( db ) {
        
        // production
        const allPlayers = playerService.getAllPlayers(db);
        allPlayers.forEach( player => {
            const production = playerService.getPlayerProduction(db, player);

            player.villages[player.activeVillage].resources.wood += 0.02 * production.woodProd / 3600;
            player.villages[player.activeVillage].resources.clay += 0.02 * production.clayProd / 3600;
            player.villages[player.activeVillage].resources.iron += 0.02 * production.ironProd / 3600;
            player.villages[player.activeVillage].resources.crop += 0.02 * production.cropProd / 3600;
    
            playerService.updatePlayer( db, player );
        });
        
        // buildQueue
        allPlayers.forEach( player => {
            if ( player.villages[player.activeVillage].buildQueue.length > 0 ) {
                player.villages[player.activeVillage].buildQueue[0].timeLeft -= 0.02;
                
                if ( player.villages[player.activeVillage].buildQueue[0].timeLeft <= 0 ) {
                    const completed = player.villages[player.activeVillage].buildQueue.shift();
                    player.villages[player.activeVillage].sites[completed.siteId].level++;
                }
            }
        });


    }
}

function production() {

}