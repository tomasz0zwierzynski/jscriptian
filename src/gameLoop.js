const playerService = require('./database/player');

module.exports = {
    
    process: function ( db ) {
        
        // production
        const allPlayers = playerService.getAllPlayers(db);
        allPlayers.forEach( player => {
            
            player.villages.forEach( (village, idx) => {
                const production = playerService.getPlayerProductionByVillage(db, player, idx);
            
                village.resources.wood += 0.02 * production.woodProd / 3600;
                village.resources.clay += 0.02 * production.clayProd / 3600;
                village.resources.iron += 0.02 * production.ironProd / 3600;
                village.resources.crop += 0.02 * production.cropProd / 3600;    
            });
            
            playerService.updatePlayer( db, player );
        });
        
        // buildQueue
        allPlayers.forEach( player => {
            player.villages.forEach( village => {
                if ( village.buildQueue.length > 0 ) {
                    village.buildQueue[0].timeLeft -= 0.02;
                    
                    if ( village.buildQueue[0].timeLeft <= 0 ) {
                        const completed = village.buildQueue.shift();
                        village.sites[completed.siteId].level++;
                    }
                }
            } );

        });


    }
}

function production() {

}