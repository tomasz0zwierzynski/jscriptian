const playerService = require('./database/player');

module.exports = {
    
    process: function ( db,  player ) {
        
        const production = playerService.getPlayerProduction(db, player);

        player.resources.wood += 0.02 * production.woodProd / 3600;
        player.resources.clay += 0.02 * production.clayProd / 3600;
        player.resources.iron += 0.02 * production.ironProd / 3600;
        player.resources.crop += 0.02 * production.cropProd / 3600;

        playerService.updatePlayer( db, player );

    }
}