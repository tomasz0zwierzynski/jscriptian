const playerService = require('./service/player');
const villageService = require('./service/village');

module.exports = {

    process: function ( db ) {

        const allPlayers = playerService.getAllPlayers(db);
               
        // culture points production
        allPlayers.forEach( player => {

            player.villages.forEach( (village, idx) => {
                const production = villageService.getCultureProductionByVillage(db, player, idx);
                village.culturePoints += 0.05 * production / 3600;
            });

            playerService.updatePlayer( db, player );
        });

    }
}

