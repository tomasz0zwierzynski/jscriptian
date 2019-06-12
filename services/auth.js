const playerService = require('./player');

module.exports = {
    getPlayerToken: function (db, username, password) {
        
        const player = playerService.getPlayerByName(db, username);
        if (player) {
            if (player.password === password) {
                const token = 't' + Math.floor(Math.random() * 10000);  + ':' + username;
                const tokens = db.getCollection('tokens');

                tokens.insert( {name: username, token: token} );

                db.saveDatabase();

                return token;
            }
        }

        return null;
    },

    // TODO: dodać serwis do tokenów (akcja wykonywana co jakis czas usuwania starych tokenow)
    getPlayerByToken: function (db, playerToken) {

        const tokens = db.getCollection('tokens');

        const token = tokens.find({token: playerToken})[0];
        if (token) {
            return playerService.getPlayerByName(db, token.name);
        } 
        return null;
    },

    removePlayerToken: function(db, username) {
        const tokens = db.getCollection('tokens');

        tokens.findAndRemove( {name: username} );
    }

}