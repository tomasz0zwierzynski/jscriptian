const loki = require('lokijs');

module.exports = {
    getBuildingByName: function (db, buildingName) {
        
        const buildings = db.getCollection('buildings');
        const building = buildings.find( {name: buildingName} );

        return building;
    },

    getBuildingById: function (db, buildingId) {

        const buildings = db.getCollection('buildings');
        const building = buildings.find( {id: buildingId} );
        
        return building;
    }
};