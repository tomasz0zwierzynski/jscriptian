module.exports = {

    getWorldTileByPosition: function ( db, position ) {
        const world = db.addCollection('world');
        const tile = world.find(position)[0];

        return tile;
    },

    foundNewVillage: function ( db, player, position ) {
        const world = db.getCollection('world');
        const players = db.getCollection('players');

        const tile = this.getWorldTileByPosition(db, position);
    
        if (tile) {
            // TODO: weryfikacja czy mozna tutaj itd.
            
            tile.tile = 1;
            tile.playerId = player.id;
            tile.villageId = player.villages.length;

            player.villages.push(
                {
                    name: player.name + "'s village #" + player.villages.length,
                    position: position,
                    resources: { wood: 750, clay: 750, iron: 750, crop: 750 },
                    resourceSync: new Date(),
                    sites: [
                        { id: 0, buildingId: 0, level: 0 },
                        { id: 1, buildingId: 1, level: 0 },
                        { id: 2, buildingId: 2, level: 0 },
                        { id: 3, buildingId: 3, level: 0 }
                    ],
                    buildQueue: [ ],
                    buildings: [
                        { id: 0, buildingId: 4, level: 0 }
                    ],
                    constructQueue: [ ],
                    culturePoints: 0
                }
            )
            
            world.update(tile);
            players.update(player);
        }
    }

};