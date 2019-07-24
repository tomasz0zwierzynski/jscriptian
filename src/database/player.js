const buildingService = require('./building');

module.exports = {
    getPlayerByName: function (db, playerName) {

        const players = db.getCollection('players');
        const player = players.find({name: playerName})[0];

        return player;
    },

    getAllPlayers: function (db) {
        const players = db.getCollection('players');
        
        return players.data;
    },

    updatePlayer: function (db, player) {
        const players = db.getCollection('players');

        players.update(player);

        db.saveDatabase();
    },

    getPlayerAvailableSitesByVillage: function (db, player, villageId) {
        const buildingMap = buildingService.getAllBuildingsMap(db);

        // TODO: add site requirenment logic here
        const availableSites = [];
        availableSites.push(buildingMap.get(0));
        availableSites.push(buildingMap.get(1));
        availableSites.push(buildingMap.get(2));
        availableSites.push(buildingMap.get(3));

        return availableSites;
    },

    getPlayerAvailableBuildingsByVillage: function (db, player, villageId) {
        const buildingMap = buildingService.getAllBuildingsMap(db);

        const playerSites = player.villages[villageId].sites;
        const playerBuildings = player.villages[villageId].buildings;

        const allBuildings = [ ...playerSites, ...playerBuildings ];

        // TODO: add buildings requirement logic here
        const availableBuildings = [];
        buildingMap.forEach( (building, id) => {
            if ( id > 3) {
                
                const requirenmentsArray = building.levels[0].requirements;

                let singletonPass = true;
                // czy mozna drugi raz ten sam budynek postawic
                if ( building.singleton ) {
                    for ( let i = 0; i < allBuildings.length; i++ ) {
                        if (allBuildings[i].buildingId === building.id ) {
                            singletonPass = false;
                        }  
                    }
                }

                let pass = true;
                // sprawdzic czy wszystkie sa spelnione wymagania dla 0 poziomu
                requirenmentsArray.forEach( (requirenment) => {
                    let found = false;
                    for ( let i = 0; i < allBuildings.length; i++ ) {
                        if (allBuildings[i].buildingId === requirenment.buildingId) {
                            if (allBuildings[i].level >= requirenment.level) {
                                found = true;
                            }
                        }
                    }
                    if (!found) {
                        pass = false;
                    }
                });

                if ( pass && singletonPass ) {
                    availableBuildings.push(building);
                }
            }
        });

        return availableBuildings;
    },

    getPlayerAvailableBuildings: function (db, player) {
        return this.getPlayerAvailableBuildingsByVillage(db, player, player.activeVillage);
    },

    getPlayerAvailableSites: function (db, player) {
        return this.getPlayerAvailableSitesByVillage(db, player, player.activeVillage);
    },

    registerPlayer: function(db, name, password) {
        const players = db.getCollection('players');

        // TODO: check player already in database
        const newPlayer = {
            name: name,
            password: password,
            activeVillage: 0,
            villages: [
                {
                    name: name + "'s village",
                    resources: { wood: 750, clay: 750, iron: 750, crop: 750 },
                    sites: [
                        { id: 0, buildingId: 0, level: 2 },
                        { id: 1, buildingId: 1, level: 0 },
                        { id: 2, buildingId: 2, level: 0 },
                        { id: 3, buildingId: 3, level: 0 }
                    ],
                    buildQueue: [ ],
                    buildings: [
                        { id: 0, buildingId: 4, level: 1 }
                    ],
                    constructQueue: [ ],
                    culturePoints: 0
                },
                {
                    name: name + "'s VILLAGE",
                    resources: { wood: 7500, clay: 7500, iron: 7500, crop: 7500 },
                    sites: [
                        { id: 0, buildingId: 3, level: 0 },
                        { id: 1, buildingId: 3, level: 0 },
                        { id: 2, buildingId: 3, level: 0 },
                        { id: 3, buildingId: 3, level: 0 }
                    ],
                    buildQueue: [ ],
                    buildings: [
                        { id: 0, buildingId: 5, level: 1 },
                        { id: 1, buildingId: 4, level: 1 }
                    ],
                    constructQueue: [ ],
                    culturePoints: 0
                }
            ],
        };

        players.insert(newPlayer);

        db.saveDatabase();
    }

};