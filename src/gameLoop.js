const playerService = require('./database/player');

module.exports = {
    
    process: function ( db ) {
        
        // production
        const allPlayers = playerService.getAllPlayers(db);
        allPlayers.forEach( player => {
            
            player.villages.forEach( (village, idx) => {
                const production = playerService.getPlayerProductionByVillage(db, player, idx);
                const capacity = playerService.getPlayerCapacityByVillage(db, player, idx);

                const wood = village.resources.wood + 0.02 * production.woodProd / 3600;
                const clay = village.resources.clay + 0.02 * production.clayProd / 3600;
                const iron = village.resources.iron + 0.02 * production.ironProd / 3600;
                const crop = village.resources.crop + 0.02 * production.cropProd / 3600;    

                if ( wood <= capacity.warehouseCapacity ) village.resources.wood = wood;    
                if ( clay <= capacity.warehouseCapacity ) village.resources.clay = clay;    
                if ( iron <= capacity.warehouseCapacity ) village.resources.iron = iron;    
                if ( crop <= capacity.granaryCapacity ) village.resources.crop = crop;    
            
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