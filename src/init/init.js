const loader = require('./loader');
const loki = require('lokijs');
const lfsa = require('lokijs/src/loki-fs-sync-adapter');
const fs = require('fs');

module.exports = {
    createDatabase: function () {   
        
        const adapter = new lfsa();
        const db = new loki('db.json', {
            adapter: adapter,
            autoload: true,
            autosave: true,
            autosaveInterval: 10000
        });
        
        try {
            fs.openSync('db.json');
        
            db.loadDatabase();
        } catch (err) {
            // Nie ma pliku bazy danych, utworony zostanie nowy
            loader.prepareData(db);
        }
        
        return db;
    }
};