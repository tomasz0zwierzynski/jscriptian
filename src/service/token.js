module.exports = {

    insertToken: function (db, token) {
        const tokens = db.getCollection('tokens');

        tokens.insert( token );

        db.saveDatabase();
    },

    getToken: function (db, playerToken) {
        const tokens = db.getCollection('tokens');

        return tokens.find({token: playerToken})[0];
    },

    removeToken: function (db, username) {
        const tokens = db.getCollection('tokens');

        tokens.findAndRemove( {name: username} );
    }

}