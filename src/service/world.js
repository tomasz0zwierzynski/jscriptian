module.exports = {

    getWorldTileByPosition: function ( db, position ) {
        const world = db.getCollection('world');
        const grid = world.find({id: 0})[0];

        const tile = grid.tiles[position.x][position.y];

        return tile;
    },

    updateTile: function ( db, tile, position ) {
        const world = db.getCollection('world');
        const grid = world.find({id: 0})[0];

        grid.tiles[position.x][position.y] = tile;

        world.update(grid);
    },

    getWorldTilesSquare: function ( db, centerPosition ) {
        const world = db.getCollection('world');
        const grid = world.find({id: 0})[0];

        // TODO: obsluga cyklicznej mapy
        const tiles = [];
        for (let i = +centerPosition.x - 3; i <= +centerPosition.x + 3; i++) {
            for (let j = +centerPosition.y - 3; j <= +centerPosition.y + 3; j++ ) {
                const tile = grid.tiles[i][j];
                tile.x = i;
                tile.y = j;
                tiles.push( tile );
            }
        }

        return tiles;
    },

    foundNewVillage: function ( db, player, position ) {
        const world = db.getCollection('world');
        const players = db.getCollection('players');

        const tile = this.getWorldTileByPosition(db, position);
    
        if (tile) {
            // TODO: weryfikacja czy mozna tutaj itd.
            
            tile.tile = 2;
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
            
            this.updateTile(db, tile, position);
            players.update(player);
        }
    }

};