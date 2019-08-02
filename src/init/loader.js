const Buildings = require('../model/buildings');

const playerService = require('../service/player');

const worldService = require('../service/world');

module.exports = {
    prepareData: function (db) {

        createBuildingData(db)

        createGameWorld(db);

        createPlayerData(db);

        createTokenStore(db);       
        
        db.saveDatabase();
    }
};

function createBuildingData(db) {
    const buildings = db.addCollection('buildings', { indices: ['id']} );

    buildings.insert({
        id: Buildings.WOODCUTTER, name: 'Woodcutter', singleton: false, levels: [
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
        id: Buildings.CLAY_PIT, name: 'Clay Pit', singleton: false, levels: [
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
        id: Buildings.IRON_MINE, name: 'Iron Mine', singleton: false, levels: [
            { attr: { prod: 2000 }, wood: 230, clay: 100, iron: 60, crop: 50, pop: 5, cp: 2000, time: 90, requirements: [] },
            { attr: { prod: 5000 }, wood: 600, clay: 335, iron: 200, crop: 120, pop: 8, cp: 4000, time: 235, requirements: [] },
            { attr: { prod: 12000 }, wood: 1400, clay: 800, iron: 500, crop: 600, pop: 13, cp: 5000, time: 400, requirements: [] }
        ]
    });

    buildings.insert({
        id: Buildings.CROP_FIELD, name: 'Crop Field', singleton: false, levels: [
            { attr: { prod: 2000 }, wood: 10, clay: 10, iron: 10, crop: 10, pop: 0, cp: 0, time: 10, requirements: [] },
            { attr: { prod: 5000 }, wood: 30, clay: 30, iron: 30, crop: 30, pop: 0, cp: 0, time: 30, requirements: [] },
            { attr: { prod: 12000 }, wood: 50, clay: 50, iron: 50, crop: 50, pop: 1, cp: 0, time: 60, requirements: [] }
        ]
    });

    buildings.insert({
        id: Buildings.MAIN_BUILDING, name: 'Main Building', singleton: true, levels: [
            { attr: { reduction: 0 }, wood: 60, clay: 80, iron: 50, crop: 30, pop: 0, cp: 0, time: 3, requirements: [] },
            { attr: { reduction: 50 }, wood: 300, clay: 300, iron: 300, crop: 200, pop: 3, cp: 2000, time: 6, requirements: [] }, 
            { attr: { reduction: 75 }, wood: 900, clay: 900, iron: 900, crop: 700, pop: 7, cp: 5000, time: 12, requirements: [] },
        ]
    });

    buildings.insert({
        id: Buildings.WAREHOUSE, name: 'Warehouse', singleton: false, levels: [
            { attr: { capacity: 0 }, wood: 60, clay: 80, iron: 50, crop: 30, pop: 0, cp: 0, time: 300, requirements: [] },
            { attr: { capacity: 12000 }, wood: 300, clay: 300, iron: 300, crop: 200, pop: 3, cp: 2000, time: 600, requirements: [] }, 
            { attr: { capacity: 17000 }, wood: 900, clay: 900, iron: 900, crop: 700, pop: 7, cp: 5000, time: 1200, requirements: [] },
        ]
    });

    buildings.insert({
        id: Buildings.GRANARY, name: 'Granary', singleton: false, levels: [
            { attr: { capacity: 0 }, wood: 60, clay: 80, iron: 50, crop: 30, pop: 0, cp: 0, time: 300, requirements: [] },
            { attr: { capacity: 12000 }, wood: 300, clay: 300, iron: 300, crop: 200, pop: 3, cp: 2000, time: 600, requirements: [] }, 
            { attr: { capacity: 17000 }, wood: 900, clay: 900, iron: 900, crop: 700, pop: 7, cp: 5000, time: 1200, requirements: [] },
        ]
    });

    buildings.insert({
        id: Buildings.SAWMILL, name: 'Sawmill', singleton: true, levels: [
            { attr: { bonus: 0 }, wood: 60, clay: 80, iron: 50, crop: 30, pop: 0, cp: 0, time: 300, requirements: [ { buildingId: Buildings.WOODCUTTER, level: 2 }, { buildingId: Buildings.MAIN_BUILDING, level: 1 } ] },
            { attr: { bonus: 5 }, wood: 600, clay: 800, iron: 500, crop: 300, pop: 2, cp: 2000, time: 400, requirements: [ { buildingId: Buildings.WOODCUTTER, level: 10 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] }
        ]
    });

    buildings.insert({
        id: Buildings.BRICKYARD, name: 'Brickyard', singleton: true, levels: [
            { attr: { bonus: 0 }, wood: 60, clay: 80, iron: 50, crop: 30, pop: 0, cp: 0, time: 300, requirements: [ { buildingId: Buildings.CLAY_PIT, level: 2 }, { buildingId: Buildings.MAIN_BUILDING, level: 1 } ] },
            { attr: { bonus: 5 }, wood: 600, clay: 800, iron: 500, crop: 300, pop: 2, cp: 2000, time: 400, requirements: [ { buildingId: Buildings.CLAY_PIT, level: 10 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] }
        ]
    });

    buildings.insert({
        id: Buildings.IRON_FOUNDRY, name: 'Iron Foundry', singleton: true, levels: [
            { attr: { bonus: 0 }, wood: 60, clay: 80, iron: 50, crop: 30, pop: 0, cp: 0, time: 300, requirements: [ { buildingId: Buildings.IRON_MINE, level: 2 }, { buildingId: Buildings.MAIN_BUILDING, level: 1 } ] },
            { attr: { bonus: 5 }, wood: 600, clay: 800, iron: 500, crop: 300, pop: 2, cp: 2000, time: 400, requirements: [ { buildingId: Buildings.IRON_MINE, level: 10 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] }
        ]
    });

    buildings.insert({
        id: Buildings.GRAIN_MILL, name: 'Grain Mill', singleton: true, levels: [
            { attr: { bonus: 0 }, wood: 60, clay: 80, iron: 50, crop: 30, pop: 0, cp: 0, time: 300, requirements: [ { buildingId: Buildings.CROP_FIELD, level: 5 }, { buildingId: Buildings.MAIN_BUILDING, level: 1 } ] },
            { attr: { bonus: 5 }, wood: 600, clay: 800, iron: 500, crop: 300, pop: 2, cp: 2000, time: 400, requirements: [ { buildingId: Buildings.CROP_FIELD, level: 5 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] }
        ]
    });

    buildings.insert({
        id: Buildings.BAKERY, name: 'Bakery', singleton: true, levels: [
            { attr: { bonus: 0 }, wood: 60, clay: 80, iron: 50, crop: 30, pop: 0, cp: 0, time: 300, requirements: [ { buildingId: Buildings.CROP_FIELD, level: 10 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] },
            { attr: { bonus: 5 }, wood: 600, clay: 800, iron: 500, crop: 300, pop: 2, cp: 2000, time: 400, requirements: [ { buildingId: Buildings.CROP_FIELD, level: 10 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] }
        ]
    });

}

function createPlayerData(db) {
    const players = db.addCollection('players', { indices: ['id'] });

    const testPlayer = playerService.registerPlayer(db, 'test', 'test');
    worldService.foundNewVillage( db, testPlayer, { x: 100, y: 100} );

    const test2Player = playerService.registerPlayer(db, 'test2', 'test2');
    worldService.foundNewVillage( db, test2Player, { x: 102, y: 100} );
    // for (var i = 0; i < 1000; i++) {
    //     playerService.registerPlayer(db, `player${i}`, `player${i}`);
    // }
}

function createTokenStore(db) {
    const tokens = db.addCollection('tokens');
}

function createGameWorld(db) {
    const world = db.addCollection('world', { indices: ['x', 'y'] });

    // generate world
    for (let i = 0; i < 400; i++ ) {
        for (let j = 0; j < 400; j++) {
            world.insert({
                x: i,
                y: j,
                tile: 1,
                playerId: null,
                villageId: null
                // type: null
            });
        }
    }    

}
