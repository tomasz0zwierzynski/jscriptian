const loader = require('./loader');
const loki = require('lokijs');

module.exports = {
    createDatabase: function () {
        const db = new loki('db.json');
        
        loader.prepareData(db);
        return db;
    }
};