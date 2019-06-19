const playerService = require('../database/player');

module.exports = {
    prepareData: function (db) {

        createBuildingData(db)

        createPlayerData(db);

        createTokenStore(db);

        db.saveDatabase();
    }
};

function createBuildingData(db) {
    const buildings = db.addCollection('buildings');

    buildings.insert({
        id: 0, name: 'Woodcutter', levels: [
            { prod: 2000, wood: 30, clay: 50, iron: 25, crop: 15, pop: 2, cp: 0, time: 30 },
            { prod: 5000, wood: 75, clay: 110, iron: 60, crop: 45, pop: 3, cp: 1, time: 70 },
            { prod: 12000, wood: 125, clay: 165, iron: 130, crop: 80, pop: 4, cp: 1, time: 130 }
        ]
    });

    buildings.insert({
        id: 1, name: 'Clay Pit', levels: [
            { prod: 2000, wood: 80, clay: 40, iron: 80, crop: 20, pop: 2, cp: 0, time: 35 },
            { prod: 5000, wood: 125, clay: 80, iron: 125, crop: 45, pop: 3, cp: 1, time: 90 },
            { prod: 12000, wood: 180, clay: 135, iron: 180, crop: 90, pop: 4, cp: 1, time: 160 }
        ]
    });

    buildings.insert({
        id: 2, name: 'Iron Mine', levels: [
            { prod: 2000, wood: 230, clay: 100, iron: 60, crop: 50, pop: 5, cp: 2, time: 90 },
            { prod: 5000, wood: 600, clay: 335, iron: 200, crop: 120, pop: 8, cp: 4, time: 235 },
            { prod: 12000, wood: 1400, clay: 800, iron: 500, crop: 600, pop: 13, cp: 5, time: 400 }
        ]
    });

    buildings.insert({
        id: 3, name: 'Crop Field', levels: [
            { prod: 2000, wood: 10, clay: 10, iron: 10, crop: 10, pop: 0, cp: 0, time: 10 },
            { prod: 5000, wood: 30, clay: 30, iron: 30, crop: 30, pop: 0, cp: 0, time: 30 },
            { prod: 12000, wood: 50, clay: 50, iron: 50, crop: 50, pop: 1, cp: 0, time: 60 }
        ]
    });

}

function createPlayerData(db) {
    const players = db.addCollection('players');

    playerService.registerPlayer(db, 'test', 'test');
    playerService.registerPlayer(db, 'test2', 'test2');
}

function createTokenStore(db) {
    const tokens = db.addCollection('tokens');
}
