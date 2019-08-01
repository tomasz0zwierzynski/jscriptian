var productionController = {

    ID_WOOD: 'production-wood',
    ID_CLAY: 'production-clay',
    ID_IRON: 'production-iron',
    ID_CROP: 'production-crop',

    wood: 0,
    clay: 0,
    iron: 0,
    crop: 0,

    init: function ( production ) {
        const self = this;

        self.wood = production.wood;
        self.clay = production.clay;
        self.iron = production.iron;
        self.crop = production.crop;

        self.updateProduction( self );
    },

    updateProduction: function ( self ) {
        document.getElementById(self.ID_WOOD).innerHTML = self.wood;
        document.getElementById(self.ID_CLAY).innerHTML = self.clay;
        document.getElementById(self.ID_IRON).innerHTML = self.iron;
        document.getElementById(self.ID_CROP).innerHTML = self.crop;
    }

}