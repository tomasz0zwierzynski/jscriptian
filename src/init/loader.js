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

function createPlayerData(db) {
    const players = db.addCollection('players', { indices: ['id'] });

    // TODO: remove test players
    const testPlayer = playerService.registerPlayer(db, 'test', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08');
    worldService.foundNewVillage( db, testPlayer, { x: 50, y: 50} );

    const kalaPlayer = playerService.registerKala(db, 'Kalalala', '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4');
    worldService.foundNewVillage( db, kalaPlayer, { x: 40, y: 40} );

    // const test2Player = playerService.registerPlayer(db, 'test2', '60303ae22b998861bce3b28f33eec1be758a213c86c93c076dbe9f558c11c752');
    // worldService.foundNewVillage( db, test2Player, { x: 52, y: 50} );
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
            { attr: { reduction: 0 }, wood: 70, clay: 40, iron: 60, crop: 20, pop: 0, cp: 0, time: 2000 / 1000, requirements: [] },
            { attr: { reduction: 0 }, wood: 90, clay: 50, iron: 75, crop: 25, pop: 2, cp: 2000, time: 2620 / 1000, requirements: [] }, 
            { attr: { reduction: 4 }, wood: 115, clay: 65, iron: 100, crop: 35, pop: 3, cp: 3000, time: 3340 / 1000, requirements: [] },
            { attr: { reduction: 7 }, wood: 145, clay: 85, iron: 125, crop: 40, pop: 4, cp: 3000, time: 4170 / 1000, requirements: [] },
            { attr: { reduction: 10 }, wood: 190, clay: 105, iron: 160, crop: 55, pop: 5, cp: 4000, time: 5140 / 1000, requirements: [] },
            { attr: { reduction: 14 }, wood: 240, clay: 135, iron: 205, crop: 70, pop: 6, cp: 5000, time: 7570 / 1000, requirements: [] },
            { attr: { reduction: 17 }, wood: 310, clay: 175, iron: 265, crop: 90, pop: 8, cp: 6000, time: 9080 / 1000, requirements: [] },
            { attr: { reduction: 20 }, wood: 395, clay: 225, iron: 340, crop: 115, pop: 10, cp: 7000, time: 10830 / 1000, requirements: [] },
            { attr: { reduction: 23 }, wood: 505, clay: 290, iron: 430, crop: 145, pop: 12, cp: 9000, time: 12140 / 1000, requirements: [] },
            { attr: { reduction: 25 }, wood: 645, clay: 370, iron: 555, crop: 185, pop: 14, cp: 10000, time: 15220 / 1000, requirements: [] },
            { attr: { reduction: 28 }, wood: 825, clay: 470, iron: 710, crop: 235, pop: 16, cp: 12000, time: 17950 / 1000, requirements: [] }, // Level 10
            { attr: { reduction: 31 }, wood: 1060, clay: 605, iron: 905, crop: 300, pop: 18, cp: 15000, time: 21130 / 1000, requirements: [] },
            { attr: { reduction: 33 }, wood: 1355, clay: 775, iron: 1160, crop: 385, pop: 20, cp: 18000, time: 24810 / 1000, requirements: [] },
            { attr: { reduction: 36 }, wood: 1735, clay: 990, iron: 1485, crop: 495, pop: 22, cp: 21000, time: 29080 / 1000, requirements: [] },
            { attr: { reduction: 38 }, wood: 2220, clay: 1270, iron: 1900, crop: 635, pop: 24, cp: 26000, time: 34030 / 1000, requirements: [] },
            { attr: { reduction: 40 }, wood: 2840, clay: 1625, iron: 2435, crop: 810, pop: 26, cp: 31000, time: 41230 / 1000, requirements: [] },
            { attr: { reduction: 42 }, wood: 3635, clay: 2075, iron: 3115, crop: 1040, pop: 29, cp: 37000, time: 46440 / 1000, requirements: [] },
            { attr: { reduction: 44 }, wood: 4650, clay: 2660, iron: 3990, crop: 1330, pop: 32, cp: 44000, time: 54170 / 1000, requirements: [] },
            { attr: { reduction: 46 }, wood: 5955, clay: 3405, iron: 5105, crop: 1700, pop: 35, cp: 53000, time: 63130 / 1000, requirements: [] },
            { attr: { reduction: 48 }, wood: 7620, clay: 4355, iron: 6535, crop: 2180, pop: 38, cp: 64000, time: 79500 / 1000, requirements: [] },
            { attr: { reduction: 50 }, wood: 9999999999, clay: 9999999999, iron: 9999999999, crop: 9999999999, pop: 41, cp: 77000, time: 9999999999, requirements: [] } // Level 20
        ]
    });

    buildings.insert({
        id: Buildings.WAREHOUSE, name: 'Warehouse', singleton: false, levels: [
            { attr: { capacity: 0 }, wood: 130, clay: 160, iron: 90, crop: 40, pop: 0, cp: 0, time: 2000 / 1000, requirements: [] },
            { attr: { capacity: 12000 }, wood: 165, clay: 205, iron: 115, crop: 50, pop: 1, cp: 1000, time: 2620 / 1000, requirements: [] }, 
            { attr: { capacity: 17000 }, wood: 215, clay: 260, iron: 145, crop: 65, pop: 2, cp: 1000, time: 3340 / 1000, requirements: [] },
            { attr: { capacity: 23000 }, wood: 275, clay: 335, iron: 190, crop: 85, pop: 3, cp: 2000, time: 4170 / 1000, requirements: [] }, 
            { attr: { capacity: 31000 }, wood: 350, clay: 430, iron: 240, crop: 105, pop: 4, cp: 2000, time: 5140 / 1000, requirements: [] },
            { attr: { capacity: 40000 }, wood: 445, clay: 550, iron: 310, crop: 135, pop: 5, cp: 2000, time: 6260 / 1000, requirements: [] }, 
            { attr: { capacity: 50000 }, wood: 570, clay: 705, iron: 395, crop: 175, pop: 6, cp: 3000, time: 7570 / 1000, requirements: [] },
            { attr: { capacity: 63000 }, wood: 730, clay: 900, iron: 505, crop: 225, pop: 7, cp: 4000, time: 9080 / 1000, requirements: [] }, 
            { attr: { capacity: 78000 }, wood: 935, clay: 1155, iron: 650, crop: 290, pop: 8, cp: 4000, time: 10830 / 1000, requirements: [] },
            { attr: { capacity: 96000 }, wood: 1200, clay: 1475, iron: 830, crop: 370, pop: 9, cp: 5000, time: 12860 / 1000, requirements: [] }, 
            { attr: { capacity: 118000 }, wood: 1535, clay: 1890, iron: 1065, crop: 470, pop: 10, cp: 6000, time: 15220 / 1000, requirements: [] }, // Level 10
            { attr: { capacity: 144000 }, wood: 1965, clay: 2420, iron: 1360, crop: 605, pop: 12, cp: 7000, time: 17950 / 1000, requirements: [] }, 
            { attr: { capacity: 176000 }, wood: 2515, clay: 3095, iron: 1740, crop: 775, pop: 14, cp: 9000, time: 21130 / 1000, requirements: [] },
            { attr: { capacity: 214000 }, wood: 3220, clay: 3960, iron: 2230, crop: 990, pop: 16, cp: 11000, time: 24810 / 1000, requirements: [] }, 
            { attr: { capacity: 259000 }, wood: 4120, clay: 5070, iron: 2850, crop: 1270, pop: 18, cp: 13000, time: 29080 / 1000, requirements: [] },
            { attr: { capacity: 313000 }, wood: 5275, clay: 6490, iron: 3650, crop: 1625, pop: 20, cp: 15000, time: 34030 / 1000, requirements: [] }, 
            { attr: { capacity: 379000 }, wood: 6750, clay: 8310, iron: 4675, crop: 2075, pop: 22, cp: 18000, time: 39770 / 1000, requirements: [] },
            { attr: { capacity: 457000 }, wood: 8640, clay: 10635, iron: 5980, crop: 2660, pop: 24, cp: 22000, time: 46440 / 1000, requirements: [] }, 
            { attr: { capacity: 551000 }, wood: 11060, clay: 13610, iron: 7655, crop: 3405, pop: 26, cp: 27000, time: 54170 / 1000, requirements: [] },
            { attr: { capacity: 664000 }, wood: 14155, clay: 17420, iron: 9800, crop: 4355, pop: 28, cp: 32000, time: 63130 / 1000, requirements: [] }, 
            { attr: { capacity: 800000 }, wood: 9999999999, clay: 9999999999, iron: 9999999999, crop: 9999999999, pop: 30, cp: 38000, time: 9999999999, requirements: [] } // Level 20
        ]
    });

    buildings.insert({
        id: Buildings.GRANARY, name: 'Granary', singleton: false, levels: [
            { attr: { capacity: 0 }, wood: 80, clay: 100, iron: 70, crop: 20, pop: 0, cp: 0, time: 2000 / 1000, requirements: [] },
            { attr: { capacity: 12000 }, wood: 100, clay: 130, iron: 90, crop: 25, pop: 1, cp: 1000, time: 2620 / 1000, requirements: [] }, 
            { attr: { capacity: 17000 }, wood: 130, clay: 165, iron: 115, crop: 35, pop: 2, cp: 1000, time: 3340 / 1000, requirements: [] },
            { attr: { capacity: 23000 }, wood: 170, clay: 210, iron: 145, crop: 40, pop: 3, cp: 2000, time: 4170 / 1000, requirements: [] }, 
            { attr: { capacity: 31000 }, wood: 215, clay: 270, iron: 190, crop: 55, pop: 4, cp: 2000, time: 5140 / 1000, requirements: [] },
            { attr: { capacity: 40000 }, wood: 275, clay: 345, iron: 240, crop: 70, pop: 5, cp: 2000, time: 6260 / 1000, requirements: [] }, 
            { attr: { capacity: 50000 }, wood: 350, clay: 440, iron: 310, crop: 90, pop: 6, cp: 3000, time: 7570 / 1000, requirements: [] },
            { attr: { capacity: 63000 }, wood: 450, clay: 565, iron: 395, crop: 115, pop: 7, cp: 4000, time: 9080 / 1000, requirements: [] }, 
            { attr: { capacity: 78000 }, wood: 575, clay: 720, iron: 505, crop: 145, pop: 8, cp: 4000, time: 10830 / 1000, requirements: [] },
            { attr: { capacity: 96000 }, wood: 740, clay: 920, iron: 645, crop: 185, pop: 9, cp: 5000, time: 12860 / 1000, requirements: [] }, 
            { attr: { capacity: 118000 }, wood: 945, clay: 1180, iron: 825, crop: 235, pop: 10, cp: 6000, time: 15220 / 1000, requirements: [] }, // Level 10
            { attr: { capacity: 144000 }, wood: 1210, clay: 1510, iron: 1060, crop: 300, pop: 12, cp: 7000, time: 17950 / 1000, requirements: [] }, 
            { attr: { capacity: 176000 }, wood: 1545, clay: 1935, iron: 1355, crop: 385, pop: 14, cp: 9000, time: 21130 / 1000, requirements: [] },
            { attr: { capacity: 214000 }, wood: 1980, clay: 2475, iron: 1735, crop: 495, pop: 16, cp: 11000, time: 24810 / 1000, requirements: [] }, 
            { attr: { capacity: 259000 }, wood: 2535, clay: 3170, iron: 2220, crop: 635, pop: 18, cp: 13000, time: 29080 / 1000, requirements: [] },
            { attr: { capacity: 313000 }, wood: 3245, clay: 4055, iron: 2840, crop: 810, pop: 20, cp: 15000, time: 34030 / 1000, requirements: [] }, 
            { attr: { capacity: 379000 }, wood: 4155, clay: 5190, iron: 3635, crop: 1040, pop: 22, cp: 18000, time: 39770 / 1000, requirements: [] },
            { attr: { capacity: 457000 }, wood: 5315, clay: 6645, iron: 4650, crop: 1330, pop: 24, cp: 22000, time: 46440 / 1000, requirements: [] }, 
            { attr: { capacity: 551000 }, wood: 6805, clay: 8505, iron: 5955, crop: 1700, pop: 26, cp: 27000, time: 54170 / 1000, requirements: [] },
            { attr: { capacity: 664000 }, wood: 8710, clay: 10890, iron: 7620, crop: 2180, pop: 28, cp: 32000, time: 63130 / 1000, requirements: [] }, 
            { attr: { capacity: 800000 }, wood: 9999999999, clay: 9999999999, iron: 9999999999, crop: 9999999999, pop: 30, cp: 38000, time: 9999999999, requirements: [] } // Level 20
        ]
    });

    buildings.insert({
        id: Buildings.SAWMILL, name: 'Sawmill', singleton: true, levels: [
            { attr: { bonus: 0 }, wood: 520, clay: 380, iron: 290, crop: 90, pop: 0, cp: 0, time: 3000 / 1000, requirements: [ { buildingId: Buildings.WOODCUTTER, level: 2 }, { buildingId: Buildings.MAIN_BUILDING, level: 1 } ] },
            { attr: { bonus: 5 }, wood: 935, clay: 685, iron: 520, crop: 160, pop: 4, cp: 2000, time: 5700 / 1000, requirements: [ { buildingId: Buildings.WOODCUTTER, level: 10 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] },
            { attr: { bonus: 10 }, wood: 1685, clay: 1230, iron: 940, crop: 290, pop: 6, cp: 2000, time: 9750 / 1000, requirements: [ { buildingId: Buildings.WOODCUTTER, level: 10 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] },
            { attr: { bonus: 15 }, wood: 3035, clay: 2215, iron: 1690, crop: 525, pop: 8, cp: 2000, time: 15830 / 1000, requirements: [ { buildingId: Buildings.WOODCUTTER, level: 10 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] },
            { attr: { bonus: 20 }, wood: 5460, clay: 3990, iron: 3045, crop: 945, pop: 10, cp: 2000, time: 24940 / 1000, requirements: [ { buildingId: Buildings.WOODCUTTER, level: 10 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] },
            { attr: { bonus: 25 }, wood: 9999999999, clay: 9999999999, iron: 9999999999, crop: 9999999999, pop: 12, cp: 2000, time: 9999999999, requirements: [ { buildingId: Buildings.WOODCUTTER, level: 10 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] }
        ]
    });

    buildings.insert({
        id: Buildings.BRICKYARD, name: 'Brickyard', singleton: true, levels: [
            { attr: { bonus: 0 }, wood: 440, clay: 480, iron: 320, crop: 50, pop: 0, cp: 0, time: 2240 / 1000, requirements: [ { buildingId: Buildings.CLAY_PIT, level: 2 }, { buildingId: Buildings.MAIN_BUILDING, level: 1 } ] },
            { attr: { bonus: 5 }, wood: 790, clay: 865, iron: 575, crop: 90, pop: 3, cp: 2000, time: 4560 / 1000, requirements: [ { buildingId: Buildings.CLAY_PIT, level: 10 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] },
            { attr: { bonus: 10 }, wood: 1425, clay: 1555, iron: 1035, crop: 160, pop: 5, cp: 2000, time: 8040 / 1000, requirements: [ { buildingId: Buildings.CLAY_PIT, level: 10 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] },
            { attr: { bonus: 15 }, wood: 2565, clay: 2800, iron: 1865, crop: 290, pop: 7, cp: 2000, time: 13260 / 1000, requirements: [ { buildingId: Buildings.CLAY_PIT, level: 10 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] },
            { attr: { bonus: 20 }, wood: 4620, clay: 5040, iron: 3360, crop: 525, pop: 9, cp: 2000, time: 21090 / 1000, requirements: [ { buildingId: Buildings.CLAY_PIT, level: 10 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] },
            { attr: { bonus: 25 }, wood: 9999999999, clay: 9999999999, iron: 9999999999, crop: 9999999999, pop: 11, cp: 2000, time: 9999999999, requirements: [ { buildingId: Buildings.CLAY_PIT, level: 10 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] }
        ]
    });

    buildings.insert({
        id: Buildings.IRON_FOUNDRY, name: 'Iron Foundry', singleton: true, levels: [
            { attr: { bonus: 0 }, wood: 200, clay: 450, iron: 510, crop: 120, pop: 0, cp: 0, time: 4080 / 1000, requirements: [ { buildingId: Buildings.IRON_MINE, level: 2 }, { buildingId: Buildings.MAIN_BUILDING, level: 1 } ] },
            { attr: { bonus: 5 }, wood: 360, clay: 810, iron: 920, crop: 215, pop: 6, cp: 2000, time: 7320 / 1000, requirements: [ { buildingId: Buildings.IRON_MINE, level: 10 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] },
            { attr: { bonus: 10 }, wood: 650, clay: 1460, iron: 1650, crop: 390, pop: 9, cp: 2000, time: 12180 / 1000, requirements: [ { buildingId: Buildings.IRON_MINE, level: 10 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] },
            { attr: { bonus: 15 }, wood: 1165, clay: 2625, iron: 2975, crop: 700, pop: 12, cp: 2000, time: 19470 / 1000, requirements: [ { buildingId: Buildings.IRON_MINE, level: 10 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] },
            { attr: { bonus: 20 }, wood: 2100, clay: 4725, iron: 5355, crop: 1260, pop: 15, cp: 2000, time: 30410 / 1000, requirements: [ { buildingId: Buildings.IRON_MINE, level: 10 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] },
            { attr: { bonus: 25 }, wood: 9999999999, clay: 9999999999, iron: 9999999999, crop: 9999999999, pop: 18, cp: 2000, time: 9999999999, requirements: [ { buildingId: Buildings.IRON_MINE, level: 10 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] }
        ]
    });

    buildings.insert({
        id: Buildings.GRAIN_MILL, name: 'Grain Mill', singleton: true, levels: [
            { attr: { bonus: 0 }, wood: 500, clay: 440, iron: 380, crop: 1240, pop: 0, cp: 0, time: 1840 / 1000, requirements: [ { buildingId: Buildings.CROP_FIELD, level: 5 }, { buildingId: Buildings.MAIN_BUILDING, level: 1 } ] },
            { attr: { bonus: 5 }, wood: 900, clay: 790, iron: 685, crop: 2230, pop: 3, cp: 2000, time: 3960 / 1000, requirements: [ { buildingId: Buildings.CROP_FIELD, level: 5 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] },
            { attr: { bonus: 10 }, wood: 1620, clay: 1425, iron: 1230, crop: 4020, pop: 5, cp: 2000, time: 7140 / 1000, requirements: [ { buildingId: Buildings.CROP_FIELD, level: 5 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] },
            { attr: { bonus: 15 }, wood: 2915, clay: 2565, iron: 2215, crop: 7230, pop: 7, cp: 2000, time: 11910 / 1000, requirements: [ { buildingId: Buildings.CROP_FIELD, level: 5 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] },
            { attr: { bonus: 20 }, wood: 5250, clay: 4620, iron: 3990, crop: 13015, pop: 9, cp: 2000, time: 19070 / 1000, requirements: [ { buildingId: Buildings.CROP_FIELD, level: 5 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] },
            { attr: { bonus: 25 }, wood: 9999999999, clay: 9999999999, iron: 9999999999, crop: 9999999999, pop: 11, cp: 2000, time: 9999999999, requirements: [ { buildingId: Buildings.CROP_FIELD, level: 5 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] }
        ]
    });

    buildings.insert({
        id: Buildings.BAKERY, name: 'Bakery', singleton: true, levels: [
            { attr: { bonus: 0 }, wood: 1200, clay: 1480, iron: 870, crop: 1600, pop: 0, cp: 0, time: 3680 / 1000, requirements: [ { buildingId: Buildings.CROP_FIELD, level: 10 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] },
            { attr: { bonus: 5 }, wood: 2160, clay: 2665, iron: 1565, crop: 2880, pop: 4, cp: 2000, time: 6720 / 1000, requirements: [ { buildingId: Buildings.CROP_FIELD, level: 10 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] },
            { attr: { bonus: 10 }, wood: 3890, clay: 4795, iron: 2820, crop: 5185, pop: 6, cp: 2000, time: 11280 / 1000, requirements: [ { buildingId: Buildings.CROP_FIELD, level: 10 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] },
            { attr: { bonus: 15 }, wood: 7000, clay: 8630, iron: 5075, crop: 9330, pop: 8, cp: 2000, time: 18120 / 1000, requirements: [ { buildingId: Buildings.CROP_FIELD, level: 10 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] },
            { attr: { bonus: 20 }, wood: 12595, clay: 15535, iron: 9135, crop: 16795, pop: 10, cp: 2000, time: 28380 / 1000, requirements: [ { buildingId: Buildings.CROP_FIELD, level: 10 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] },
            { attr: { bonus: 25 }, wood: 9999999999, clay: 9999999999, iron: 9999999999, crop: 9999999999, pop: 12, cp: 2000, time: 9999999999, requirements: [ { buildingId: Buildings.CROP_FIELD, level: 10 }, { buildingId: Buildings.MAIN_BUILDING, level: 5 } ] }
        ]
    });

    buildings.insert({
        id: Buildings.MARKETPLACE, name: 'Marketplace', singleton: true, levels: [
            { attr: { merchants: 0}, wood: 80, clay: 70, iron: 120, crop: 70, pop: 0, cp: 4000, time: 1800 / 1000, requirements: [ { buildingId: Buildings.MAIN_BUILDING, level: 1 }, { buildingId: Buildings.GRANARY, level: 1 }, { buildingId: Buildings.WAREHOUSE, level: 1 } ] },
            { attr: { merchants: 1}, wood: 100, clay: 90, iron: 155, crop: 90, pop: 4, cp: 4000, time: 2390 / 1000, requirements: [ { buildingId: Buildings.MAIN_BUILDING, level: 1 }, { buildingId: Buildings.GRANARY, level: 1 }, { buildingId: Buildings.WAREHOUSE, level: 1 } ] },
            { attr: { merchants: 2}, wood: 130, clay: 115, iron: 195, crop: 115, pop: 6, cp: 5000, time: 3070 / 1000, requirements: [ { buildingId: Buildings.MAIN_BUILDING, level: 1 }, { buildingId: Buildings.GRANARY, level: 1 }, { buildingId: Buildings.WAREHOUSE, level: 1 } ] },
            { attr: { merchants: 3}, wood: 170, clay: 145, iron: 250, crop: 145, pop: 8, cp: 6000, time: 3860 / 1000, requirements: [ { buildingId: Buildings.MAIN_BUILDING, level: 1 }, { buildingId: Buildings.GRANARY, level: 1 }, { buildingId: Buildings.WAREHOUSE, level: 1 } ] },
            { attr: { merchants: 4}, wood: 215, clay: 190, iron: 320, crop: 190, pop: 10, cp: 7000, time: 4780 / 1000, requirements: [ { buildingId: Buildings.MAIN_BUILDING, level: 1 }, { buildingId: Buildings.GRANARY, level: 1 }, { buildingId: Buildings.WAREHOUSE, level: 1 } ] },
            { attr: { merchants: 5}, wood: 275, clay: 240, iron: 410, crop: 240, pop: 12, cp: 9000, time: 5840 / 1000, requirements: [ { buildingId: Buildings.MAIN_BUILDING, level: 1 }, { buildingId: Buildings.GRANARY, level: 1 }, { buildingId: Buildings.WAREHOUSE, level: 1 } ] },
            { attr: { merchants: 6}, wood: 350, clay: 310, iron: 530, crop: 310, pop: 14, cp: 11000, time: 7080 / 1000, requirements: [ { buildingId: Buildings.MAIN_BUILDING, level: 1 }, { buildingId: Buildings.GRANARY, level: 1 }, { buildingId: Buildings.WAREHOUSE, level: 1 } ] },
            { attr: { merchants: 7}, wood: 450, clay: 395, iron: 675, crop: 395, pop: 17, cp: 13000, time: 8510 / 1000, requirements: [ { buildingId: Buildings.MAIN_BUILDING, level: 1 }, { buildingId: Buildings.GRANARY, level: 1 }, { buildingId: Buildings.WAREHOUSE, level: 1 } ] },
            { attr: { merchants: 8}, wood: 575, clay: 505, iron: 865, crop: 505, pop: 20, cp: 15000, time: 10170 / 1000, requirements: [ { buildingId: Buildings.MAIN_BUILDING, level: 1 }, { buildingId: Buildings.GRANARY, level: 1 }, { buildingId: Buildings.WAREHOUSE, level: 1 } ] },
            { attr: { merchants: 9}, wood: 740, clay: 645, iron: 1105, crop: 645, pop: 23, cp: 19000, time: 12100 / 1000, requirements: [ { buildingId: Buildings.MAIN_BUILDING, level: 1 }, { buildingId: Buildings.GRANARY, level: 1 }, { buildingId: Buildings.WAREHOUSE, level: 1 } ] },
            { attr: { merchants: 10}, wood: 945, clay: 825, iron: 1415, crop: 865, pop: 26, cp: 22000, time: 14340 / 1000, requirements: [ { buildingId: Buildings.MAIN_BUILDING, level: 1 }, { buildingId: Buildings.GRANARY, level: 1 }, { buildingId: Buildings.WAREHOUSE, level: 1 } ] }, // Level 10
            { attr: { merchants: 11}, wood: 1210, clay: 1060, iron: 1815, crop: 1060, pop: 29, cp: 27000, time: 16930 / 1000, requirements: [ { buildingId: Buildings.MAIN_BUILDING, level: 1 }, { buildingId: Buildings.GRANARY, level: 1 }, { buildingId: Buildings.WAREHOUSE, level: 1 } ] },
            { attr: { merchants: 12}, wood: 1545, clay: 1355, iron: 2320, crop: 1355, pop: 32, cp: 32000, time: 19940 / 1000, requirements: [ { buildingId: Buildings.MAIN_BUILDING, level: 1 }, { buildingId: Buildings.GRANARY, level: 1 }, { buildingId: Buildings.WAREHOUSE, level: 1 } ] },
            { attr: { merchants: 13}, wood: 1980, clay: 1735, iron: 2970, crop: 1735, pop: 35, cp: 39000, time: 23430 / 1000, requirements: [ { buildingId: Buildings.MAIN_BUILDING, level: 1 }, { buildingId: Buildings.GRANARY, level: 1 }, { buildingId: Buildings.WAREHOUSE, level: 1 } ] },
            { attr: { merchants: 14}, wood: 2535, clay: 2220, iron: 3805, crop: 2220, pop: 38, cp: 46000, time: 27480 / 1000, requirements: [ { buildingId: Buildings.MAIN_BUILDING, level: 1 }, { buildingId: Buildings.GRANARY, level: 1 }, { buildingId: Buildings.WAREHOUSE, level: 1 } ] },
            { attr: { merchants: 15}, wood: 3245, clay: 2840, iron: 4870, crop: 2840, pop: 41, cp: 55000, time: 32180 / 1000, requirements: [ { buildingId: Buildings.MAIN_BUILDING, level: 1 }, { buildingId: Buildings.GRANARY, level: 1 }, { buildingId: Buildings.WAREHOUSE, level: 1 } ] },
            { attr: { merchants: 16}, wood: 4155, clay: 3635, iron: 6230, crop: 3635, pop: 45, cp: 67000, time: 37620 / 1000, requirements: [ { buildingId: Buildings.MAIN_BUILDING, level: 1 }, { buildingId: Buildings.GRANARY, level: 1 }, { buildingId: Buildings.WAREHOUSE, level: 1 } ] },
            { attr: { merchants: 17}, wood: 5315, clay: 4650, iron: 7975, crop: 4650, pop: 49, cp: 80000, time: 43940 / 1000, requirements: [ { buildingId: Buildings.MAIN_BUILDING, level: 1 }, { buildingId: Buildings.GRANARY, level: 1 }, { buildingId: Buildings.WAREHOUSE, level: 1 } ] },
            { attr: { merchants: 18}, wood: 6805, clay: 5955, iron: 10210, crop: 5955, pop: 53, cp: 96000, time: 51270 / 1000, requirements: [ { buildingId: Buildings.MAIN_BUILDING, level: 1 }, { buildingId: Buildings.GRANARY, level: 1 }, { buildingId: Buildings.WAREHOUSE, level: 1 } ] },
            { attr: { merchants: 19}, wood: 8710, clay: 7620, iron: 13065, crop: 7620, pop: 57, cp: 115000, time: 59780 / 1000, requirements: [ { buildingId: Buildings.MAIN_BUILDING, level: 1 }, { buildingId: Buildings.GRANARY, level: 1 }, { buildingId: Buildings.WAREHOUSE, level: 1 } ] },
            { attr: { merchants: 20}, wood: 9999999999, clay: 9999999999, iron: 9999999999, crop: 9999999999, pop: 61, cp: 0, time: 9999999999, requirements: [ { buildingId: Buildings.MAIN_BUILDING, level: 1 }, { buildingId: Buildings.GRANARY, level: 1 }, { buildingId: Buildings.WAREHOUSE, level: 1 } ] } // Level 20
        ]
    })

}
