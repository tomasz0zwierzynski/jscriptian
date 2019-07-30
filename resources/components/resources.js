var resourcesController = {

    ID_WOOD: 'resources-wood',
    ID_CLAY: 'resources-clay',
    ID_IRON: 'resources-iron',
    ID_CROP: 'resources-crop',
    ID_WOOD_CAPACITY: 'resources-wood-capacity',
    ID_CLAY_CAPACITY: 'resources-clay-capacity',
    ID_IRON_CAPACITY: 'resources-iron-capacity',
    ID_CROP_CAPACITY: 'resources-crop-capacity',

    wood: 0,
    clay: 0,
    iron: 0,
    crop: 0,

    woodInterval: 0,
    clayInterval: 0,
    ironInterval: 0,
    cropInterval: 0,

    capacity: {},

    init: function ( resources, capacity, production ) {
        const self = this;

        self.capacity = capacity;
        self.updateCapacities( self );

        self.woodInterval = 0.02 * production.wood / 3600;
        self.clayInterval = 0.02 * production.clay / 3600;
        self.ironInterval = 0.02 * production.iron / 3600;
        self.cropInterval = 0.02 * production.crop / 3600;

        self.wood = resources.wood;
        self.clay = resources.clay;
        self.iron = resources.iron;
        self.crop = resources.crop;

        self.updateResources( self );

        setInterval( () => self.tickResources(self) , 20);

    },

    tickResources: function ( self ) {
        const newWood = self.wood + self.woodInterval;
        const newClay = self.clay + self.clayInterval;
        const newIron = self.iron + self.ironInterval;
        const newCrop = self.crop + self.cropInterval;

        if (newWood <= self.capacity.warehouseCapacity) self.wood = newWood; 
        if (newClay <= self.capacity.warehouseCapacity) self.clay = newClay;
        if (newIron <= self.capacity.warehouseCapacity) self.iron = newIron;
        if (newCrop <= self.capacity.granaryCapacity) self.crop = newCrop;

        self.updateResources( self );
    },

    updateCapacities: function ( self ) {
        document.getElementById(self.ID_WOOD_CAPACITY).innerHTML = self.capacity.warehouseCapacity;
        document.getElementById(self.ID_CLAY_CAPACITY).innerHTML = self.capacity.warehouseCapacity;
        document.getElementById(self.ID_IRON_CAPACITY).innerHTML = self.capacity.warehouseCapacity;
        document.getElementById(self.ID_CROP_CAPACITY).innerHTML = self.capacity.granaryCapacity;
    },

    updateResources: function ( self ) {
        document.getElementById(self.ID_WOOD).innerHTML = Math.round(self.wood);
        document.getElementById(self.ID_CLAY).innerHTML = Math.round(self.clay);
        document.getElementById(self.ID_IRON).innerHTML = Math.round(self.iron);
        document.getElementById(self.ID_CROP).innerHTML = Math.round(self.crop);
    }


}