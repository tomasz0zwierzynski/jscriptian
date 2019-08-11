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
            { attr: { prod: 2000 }, wood: 100, clay: 80, iron: 30, crop: 60, pop: 0, cp: 0, time: 450 / 1000, requirements: [] },
            { attr: { prod: 5000 }, wood: 165, clay: 135, iron: 50, crop: 100, pop: 3, cp: 1000, time: 900 / 1000, requirements: [] },
            { attr: { prod: 9000 }, wood: 280, clay: 225, iron: 85, crop: 165, pop: 5, cp: 1000, time: 1800 / 1000, requirements: [] },
            { attr: { prod: 15000 }, wood: 465, clay: 375, iron: 140, crop: 280, pop: 7, cp: 2000, time: 3600 / 1000, requirements: [] },
            { attr: { prod: 22000 }, wood: 780, clay: 620, iron: 235, crop: 465, pop: 9, cp: 2000, time: 7200 / 1000, requirements: [] },
            { attr: { prod: 33000 }, wood: 1300, clay: 1040, iron: 390, crop: 780, pop: 11, cp: 2000, time: 14200 / 1000, requirements: [] },
            { attr: { prod: 50000 }, wood: 2170, clay: 1735, iron: 650, crop: 1300, pop: 13, cp: 3000, time: 28400 / 1000, requirements: [] },
            { attr: { prod: 70000 }, wood: 3625, clay: 2900, iron: 1085, crop: 2175, pop: 15, cp: 4000, time: 56800 / 1000, requirements: [] },
            { attr: { prod: 100000 }, wood: 6050, clay: 4840, iron: 1815, crop: 3630, pop: 17, cp: 4000, time: 11360 / 1000, requirements: [] },
            { attr: { prod: 145000 }, wood: 10105, clay: 8080, iron: 3030, crop: 6060, pop: 19, cp: 5000, time: 22720 / 1000, requirements: [] },
            { attr: { prod: 200000 }, wood: 9999999999, clay: 9999999999, iron: 9999999999, crop: 9999999999, pop: 21, cp: 6000, time: 9999999999, requirements: [] } // 10 level
        ]
    });

    buildings.insert({
        id: Buildings.CROP_FIELD, name: 'Crop Field', singleton: false, levels: [
            { attr: { prod: 2000 }, wood: 70, clay: 90, iron: 70, crop: 20, pop: 0, cp: 0, time: 150 / 1000, requirements: [] },
            { attr: { prod: 5000 }, wood: 115, clay: 150, iron: 115, crop: 35, pop: 0, cp: 1000, time: 300 / 1000, requirements: [] },
            { attr: { prod: 9000 }, wood: 195, clay: 250, iron: 195, crop: 55, pop: 0, cp: 1000, time: 600 / 1000, requirements: [] },
            { attr: { prod: 15000 }, wood: 325, clay: 420, iron: 325, crop: 95, pop: 0, cp: 2000, time: 1200 / 1000, requirements: [] },
            { attr: { prod: 22000 }, wood: 545, clay: 700, iron: 545, crop: 155, pop: 0, cp: 2000, time: 2400 / 1000, requirements: [] },
            { attr: { prod: 33000 }, wood: 910, clay: 1170, iron: 910, crop: 260, pop: 0, cp: 2000, time: 4800 / 1000, requirements: [] },
            { attr: { prod: 50000 }, wood: 1520, clay: 1950, iron: 1520, crop: 435, pop: 1, cp: 3000, time: 9600 / 1000, requirements: [] },
            { attr: { prod: 70000 }, wood: 2535, clay: 3260, iron: 2535, crop: 725, pop: 2, cp: 4000, time: 19200 / 1000, requirements: [] },
            { attr: { prod: 100000 }, wood: 4235, clay: 5445, iron: 4235, crop: 1210, pop: 3, cp: 4000, time: 38400 / 1000, requirements: [] },
            { attr: { prod: 145000 }, wood: 7070, clay: 9095, iron: 7070, crop: 2020, pop: 4, cp: 5000, time: 76800 / 1000, requirements: [] },
            { attr: { prod: 200000 }, wood: 9999999999, clay: 9999999999, iron: 9999999999, crop: 9999999999, pop: 5, cp: 6000, time: 9999999999, requirements: [] } // 10 level
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
            { attr: { capacity: 0 }, wood: 60, clay: 80, iron: 50, crop: 30, pop: 0, cp: 0, time: 3, requirements: [] },
            { attr: { capacity: 12000 }, wood: 300, clay: 300, iron: 300, crop: 200, pop: 3, cp: 2000, time: 600, requirements: [] }, 
            { attr: { capacity: 17000 }, wood: 900, clay: 900, iron: 900, crop: 700, pop: 7, cp: 5000, time: 1200, requirements: [] },
        ]
    });

    buildings.insert({
        id: Buildings.GRANARY, name: 'Granary', singleton: false, levels: [
            { attr: { capacity: 0 }, wood: 60, clay: 80, iron: 50, crop: 30, pop: 0, cp: 0, time: 3, requirements: [] },
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

    buildings.insert({
        id: Buildings.MARKETPLACE, name: 'Marketplace', singleton: true, levels: [
            { attr: { merchants: 0}, wood: 50, clay: 70, iron: 40, crop: 20, pop: 0, cp: 0, time: 10, requirements: [ { buildingId: Buildings.MAIN_BUILDING, level: 1 }, { buildingId: Buildings.GRANARY, level: 1 }, { buildingId: Buildings.WAREHOUSE, level: 1 } ] },
            { attr: { merchants: 1}, wood: 100, clay: 140, iron: 80, crop: 40, pop: 0, cp: 0, time: 20, requirements: [ { buildingId: Buildings.MAIN_BUILDING, level: 1 }, { buildingId: Buildings.GRANARY, level: 1 }, { buildingId: Buildings.WAREHOUSE, level: 1 } ] }
        ]
    })

}

function createPlayerData(db) {
    const players = db.addCollection('players', { indices: ['id'] });

    const testPlayer = playerService.registerPlayer(db, 'test', 'test');
    worldService.foundNewVillage( db, testPlayer, { x: 50, y: 50} );

    const test2Player = playerService.registerPlayer(db, 'test2', 'test2');
    worldService.foundNewVillage( db, test2Player, { x: 52, y: 50} );
    // for (var i = 0; i < 1000; i++) {
    //     playerService.registerPlayer(db, `player${i}`, `player${i}`);
    // }
}

function createTokenStore(db) {
    const tokens = db.addCollection('tokens');
}

function createGameWorld(db) {
    const world = db.addCollection('world', { indices: ['id'] });

    // generate world
    const grid = {
        id: 0,
        name: 'World 1',
        tiles: []
    }

    for (let i = 0; i < 120; i++ ) {
        const tilesY = [];
        for (let j = 0; j < 120; j++) {
            tilesY.push({
                tile: 1,
                playerId: null,
                villageId: null
                // type: null
            });
        }
        grid.tiles.push(tilesY);
    }    

    world.insert( grid );

}
