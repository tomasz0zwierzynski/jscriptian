const buildingService = require('./building');
const cultureService = require('./culture');

module.exports = {

    // TODO: zrobic metody db bezpieczniejsze 

    getPlayerByName: function (db, playerName) {

        const players = db.getCollection('players');
        const player = players.find({name: playerName})[0];

        return player;
    },

    getPlayerById: function (db, playerId) {
        const players = db.getCollection('players');
        const player = players.find({id: playerId})[0];

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

    // TODO: przeniesc gdzies indziej
    getPlayersPopulations: function (db, player) {
        const players = this.getAllPlayers(db);

        const playersPopulation = [];

        players.forEach( p => {

            const pop = cultureService.getTotalPopulation(db, p);
            playersPopulation.push(
                {
                    name: p.name,
                    population: pop
                }
            );
        });

        return playersPopulation;
    },

    registerPlayer: function(db, name, password) {
        const players = db.getCollection('players');

        // TODO: check player already in database

        const newPlayer = {
            id: generatePlayerId(),
            name: name,
            password: password,
            activeVillage: 0,
            villages: [ ],
            message: null
        };

        players.insert(newPlayer);

        db.saveDatabase();

        return newPlayer;
    },

    // TODO: usunąć w final version
    registerKala: function( db, name, password) {
        const players = db.getCollection('players');

        const newPlayer = {
            id: generatePlayerId(),
            name: name,
            password: password,
            activeVillage: 0,
            villages: [
                {
                  "name": "Kalalala's village #0",
                  "position": {
                    "x": 40,
                    "y": 40
                  },
                  "resources": {
                    "wood": 706.8816666666664,
                    "clay": 735.5527777777776,
                    "iron": 714.4944444444442,
                    "crop": 752.3783333333332
                  },
                  "resourceSync": "2019-09-18T20:18:51.549Z",
                  "sites": [
                    {
                      "id": 0,
                      "buildingId": 0,
                      "level": 10
                    },
                    {
                      "id": 1,
                      "buildingId": 1,
                      "level": 10
                    },
                    {
                      "id": 2,
                      "buildingId": 2,
                      "level": 10
                    },
                    {
                      "id": 3,
                      "buildingId": 3,
                      "level": 10
                    },
                    {
                      "id": 4,
                      "buildingId": 0,
                      "level": 10
                    },
                    {
                      "id": 5,
                      "buildingId": 1,
                      "level": 10
                    },
                    {
                      "id": 6,
                      "buildingId": 2,
                      "level": 10
                    },
                    {
                      "id": 7,
                      "buildingId": 3,
                      "level": 10
                    },
                    {
                      "id": 8,
                      "buildingId": 0,
                      "level": 10
                    },
                    {
                      "id": 9,
                      "buildingId": 1,
                      "level": 10
                    },
                    {
                      "id": 10,
                      "buildingId": 2,
                      "level": 10
                    },
                    {
                      "id": 11,
                      "buildingId": 3,
                      "level": 10
                    },
                    {
                      "id": 12,
                      "buildingId": 0,
                      "level": 10
                    },
                    {
                      "id": 13,
                      "buildingId": 1,
                      "level": 10
                    },
                    {
                      "id": 14,
                      "buildingId": 2,
                      "level": 10
                    },
                    {
                      "id": 15,
                      "buildingId": 3,
                      "level": 10
                    }
                  ],
                  "buildQueue": [],
                  "buildings": [
                    {
                      "id": 0,
                      "buildingId": 4,
                      "level": 20
                    },
                    {
                        "id": 1,
                        "buildingId": 5,
                        "level": 20
                    },
                    {
                        "id": 2,
                        "buildingId": 6,
                        "level": 20
                    },
                    {
                        "id": 3,
                        "buildingId": 5,
                        "level": 20
                    },
                    {
                        "id": 4,
                        "buildingId": 6,
                        "level": 20
                    },
                    {
                        "id": 5,
                        "buildingId": 5,
                        "level": 20
                    },
                    {
                        "id": 6,
                        "buildingId": 6,
                        "level": 20
                    }
                  ],
                  "constructQueue": [],
                  "culturePoints": 0
                }
              ],
            message: null
        };

        players.insert(newPlayer);

        db.saveDatabase();

        return newPlayer;
    }

};

var playerIdSequence = 0;

function generatePlayerId() {
    // TODO: sekwencja generowanych id nowych graczy
    return playerIdSequence++;
}