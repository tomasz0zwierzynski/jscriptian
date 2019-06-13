const playerService = require('./database/player');
const tokenService = require('./database/token');

module.exports = {
    getPlayerToken: function (db, username, password) {
        
        const player = playerService.getPlayerByName(db, username);
        if (player) {
            if (player.password === password) {
                const token = 't' + Math.floor(Math.random() * 10000)  + ':' + username;
                
                tokenService.insertToken(db, {name: username, token: token} );

                return token;
            }
        }

        return null;
    },

    getPlayerByToken: function (db, playerToken) {

        const token = tokenService.getToken(db, playerToken);
        if (token) {
            return playerService.getPlayerByName(db, token.name);
        } 
        return null;
    },

    removePlayerToken: function(db, username) {

        tokenService.removeToken(db, username);
    }

}