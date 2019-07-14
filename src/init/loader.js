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
            { attr: { prod: 2000 }, wood: 40, clay: 100, iron: 50, crop: 60, pop: 0, cp: 0, time: 260 / 1000, requirements: [] },
            { attr: { prod: 5000 }, wood: 65, clay: 165, iron: 85, crop: 100, pop: 2, cp: 1000, time: 520 / 1000, requirements: [] },
            { attr: { prod: 9000 }, wood: 110, clay: 280, iron: 140, crop: 165, pop: 3, cp: 1000, time: 1040 / 1000, requirements: [] },
            { attr: { prod: 15000 }, wood: 185, clay: 465, iron: 235, crop: 280, pop: 4, cp: 2000, time: 2080 / 1000, requirements: [] },
            { attr: { prod: 22000 }, wood: 310, clay: 780, iron: 390, crop: 465, pop: 5, cp: 2000, time: 4160 / 1000, requirements: [] },
            { attr: { prod: 33000 }, wood: 520, clay: 1300, iron: 650, crop: 780, pop: 6, cp: 2000, time: 8320 / 1000, requirements: [] },
            { attr: { prod: 50000 }, wood: 870, clay: 2170, iron: 1085, crop: 1300, pop: 8, cp: 3000, time: 16640 / 1000, requirements: [] },
            { attr: { prod: 70000 }, wood: 1450, clay: 3625, iron: 1810, crop: 2175, pop: 10, cp: 4000, time: 33280 / 1000, requirements: [] },
            { attr: { prod: 100000 }, wood: 2420, clay: 6050, iron: 3025, crop: 3630, pop: 12, cp: 4000, time: 66560 / 1000, requirements: [] },
            { attr: { prod: 145000 }, wood: 4040, clay: 10105, iron: 5050, crop: 6060, pop: 14, cp: 5000, time: 133120 / 1000, requirements: [] },
            { attr: { prod: 200000 }, wood: 9999999999, clay: 9999999999, iron: 9999999999, crop: 9999999999, pop: 16, cp: 6000, time: 9999999999, requirements: [] } // 10 level
        ]
    });

    buildings.insert({
        id: 1, name: 'Clay Pit', levels: [
            { attr: { prod: 2000 }, wood: 80, clay: 40, iron: 80, crop: 50, pop: 0, cp: 0, time:  220 / 1000, requirements: [] },
            { attr: { prod: 5000 }, wood: 135, clay: 65, iron: 135, crop: 85, pop: 2, cp: 1000, time: 440 / 1000, requirements: [] },
            { attr: { prod: 9000 }, wood: 225, clay: 110, iron: 225, crop: 140, pop: 3, cp: 1000, time: 880 / 1000, requirements: [] },
            { attr: { prod: 15000 }, wood: 375, clay: 185, iron: 375, crop: 235, pop: 4, cp: 2000, time: 1760 / 1000, requirements: [] },
            { attr: { prod: 22000 }, wood: 620, clay: 310, iron: 620, crop: 390, pop: 5, cp: 2000, time: 3520 / 1000, requirements: [] },
            { attr: { prod: 33000 }, wood: 1040, clay: 520, iron: 1040, crop: 650, pop: 6, cp: 2000, time: 7040 / 1000, requirements: [] },
            { attr: { prod: 50000 }, wood: 1735, clay: 870, iron: 1735, crop: 1085, pop: 8, cp: 3000, time: 14080 / 1000, requirements: [] },
            { attr: { prod: 70000 }, wood: 2900, clay: 1450, iron: 2900, crop: 1810, pop: 10, cp: 4000, time: 28160 / 1000, requirements: [] },
            { attr: { prod: 100000 }, wood: 4840, clay: 2420, iron: 4840, crop: 3025, pop: 12, cp: 4000, time: 56320 / 1000, requirements: [] },
            { attr: { prod: 145000 }, wood: 8080, clay: 4040, iron: 8080, crop: 5050, pop: 14, cp: 5000, time: 112640 / 1000, requirements: [] },
            { attr: { prod: 200000 }, wood: 9999999999, clay: 9999999999, iron: 9999999999, crop: 9999999999, pop: 16, cp: 6000, time: 9999999999, requirements: [] } // 10 level
        ]
    });

    buildings.insert({
        id: 2, name: 'Iron Mine', levels: [
            { attr: { prod: 2000 }, wood: 230, clay: 100, iron: 60, crop: 50, pop: 5, cp: 2000, time: 90, requirements: [] },
            { attr: { prod: 5000 }, wood: 600, clay: 335, iron: 200, crop: 120, pop: 8, cp: 4000, time: 235, requirements: [] },
            { attr: { prod: 12000 }, wood: 1400, clay: 800, iron: 500, crop: 600, pop: 13, cp: 5000, time: 400, requirements: [] }
        ]
    });

    buildings.insert({
        id: 3, name: 'Crop Field', levels: [
            { attr: { prod: 2000 }, wood: 10, clay: 10, iron: 10, crop: 10, pop: 0, cp: 0, time: 10, requirements: [] },
            { attr: { prod: 5000 }, wood: 30, clay: 30, iron: 30, crop: 30, pop: 0, cp: 0, time: 30, requirements: [] },
            { attr: { prod: 12000 }, wood: 50, clay: 50, iron: 50, crop: 50, pop: 1, cp: 0, time: 60, requirements: [] }
        ]
    });

    buildings.insert({
        id: 4, name: 'Main Building', levels: [
            { attr: { reduction: 0 }, wood: 60, clay: 80, iron: 50, crop: 30, pop: 0, cp: 0, time: 300, requirements: [] },
            { attr: { reduction: 50 }, wood: 300, clay: 300, iron: 300, crop: 200, pop: 3, cp: 2000, time: 600, requirements: [] }, 
            { attr: { reduction: 75 }, wood: 900, clay: 900, iron: 900, crop: 700, pop: 7, cp: 5000, time: 1200, requirements: [] },
        ]
    });

    buildings.insert({
        id: 5, name: 'Warehouse', levels: [
            { attr: { capacity: 0 }, wood: 60, clay: 80, iron: 50, crop: 30, pop: 0, cp: 0, time: 300, requirements: [] },
            { attr: { capacity: 12000 }, wood: 300, clay: 300, iron: 300, crop: 200, pop: 3, cp: 2000, time: 600, requirements: [] }, 
            { attr: { capacity: 17000 }, wood: 900, clay: 900, iron: 900, crop: 700, pop: 7, cp: 5000, time: 1200, requirements: [] },
        ]
    });

    buildings.insert({
        id: 6, name: 'Granary', levels: [
            { attr: { capacity: 0 }, wood: 60, clay: 80, iron: 50, crop: 30, pop: 0, cp: 0, time: 300, requirements: [] },
            { attr: { capacity: 12000 }, wood: 300, clay: 300, iron: 300, crop: 200, pop: 3, cp: 2000, time: 600, requirements: [] }, 
            { attr: { capacity: 17000 }, wood: 900, clay: 900, iron: 900, crop: 700, pop: 7, cp: 5000, time: 1200, requirements: [] },
        ]
    });

    buildings.insert({
        id: 7, name: 'Sawmill', levels: [
            { attr: { bonus: 0 }, wood: 60, clay: 80, iron: 50, crop: 30, pop: 0, cp: 0, time: 300, requirements: [ { builgingId: 0, level: 10 }, { buildingId: 4, level: 5 } ] },
            { attr: { bonus: 5 }, wood: 600, clay: 800, iron: 500, crop: 300, pop: 2, cp: 2000, time: 400, requirements: [ { builgingId: 0, level: 10 }, { buildingId: 4, level: 5 } ] }
        ]
    });

    buildings.insert({
        id: 8, name: 'Brickyard', levels: [
            { attr: { bonus: 0 }, wood: 60, clay: 80, iron: 50, crop: 30, pop: 0, cp: 0, time: 300, requirements: [ { builgingId: 1, level: 10 }, { buildingId: 4, level: 5 } ] },
            { attr: { bonus: 5 }, wood: 600, clay: 800, iron: 500, crop: 300, pop: 2, cp: 2000, time: 400, requirements: [ { builgingId: 1, level: 10 }, { buildingId: 4, level: 5 } ] }
        ]
    });

    buildings.insert({
        id: 9, name: 'Iron Foundry', levels: [
            { attr: { bonus: 0 }, wood: 60, clay: 80, iron: 50, crop: 30, pop: 0, cp: 0, time: 300, requirements: [ { builgingId: 2, level: 10 }, { buildingId: 4, level: 5 } ] },
            { attr: { bonus: 5 }, wood: 600, clay: 800, iron: 500, crop: 300, pop: 2, cp: 2000, time: 400, requirements: [ { builgingId: 2, level: 10 }, { buildingId: 4, level: 5 } ] }
        ]
    });

    buildings.insert({
        id: 10, name: 'Grain Mill', levels: [
            { attr: { bonus: 0 }, wood: 60, clay: 80, iron: 50, crop: 30, pop: 0, cp: 0, time: 300, requirements: [ { builgingId: 3, level: 5 }, { buildingId: 4, level: 5 } ] },
            { attr: { bonus: 5 }, wood: 600, clay: 800, iron: 500, crop: 300, pop: 2, cp: 2000, time: 400, requirements: [ { builgingId: 3, level: 5 }, { buildingId: 4, level: 5 } ] }
        ]
    });

    buildings.insert({
        id: 11, name: 'Bakery', levels: [
            { attr: { bonus: 0 }, wood: 60, clay: 80, iron: 50, crop: 30, pop: 0, cp: 0, time: 300, requirements: [ { builgingId: 3, level: 10 }, { buildingId: 4, level: 5 } ] },
            { attr: { bonus: 5 }, wood: 600, clay: 800, iron: 500, crop: 300, pop: 2, cp: 2000, time: 400, requirements: [ { builgingId: 3, level: 10 }, { buildingId: 4, level: 5 } ] }
        ]
    });

}

function createPlayerData(db) {
    const players = db.addCollection('players');

    playerService.registerPlayer(db, 'test', 'test');
    playerService.registerPlayer(db, 'test2', 'test2');
    // for (var i = 0; i < 1000; i++) {
    //     playerService.registerPlayer(db, `player${i}`, `player${i}`);
    // }
}

function createTokenStore(db) {
    const tokens = db.addCollection('tokens');
}
