function Player(name) {
    this.name = name;
    this.villages = [];
}

function Village(name) {
    this.name = name;
    this.resources = new Resources();

    this.resourceFields = new ResourceFields();
    this.buildings = new Buildings();

    this.position = {x: NaN, y: NaN};
}

function AbandonedValley(type) {
    this.type = type;
}

function Resources() {
    this.wood = 0;
    this.clay = 0;
    this.iron = 0;
    this.crop = 0;
}

function ResourceFields() {
    this.fields = [];
}

function ResourceField(resourceType) {
    this.resourceType = resourceType;
    this.level = 0;
}

function Buildings() {
    this.walls = new Building( BuildinType.EMPTY );
    this.rally = new Building( BuildinType.EMPTY );
    this.slots = [];
}

function Building(type) {
    this.type = type;
}

const ResourceType = {
    WOOD: 1,
    CLAY: 2,
    IRON: 3,
    CROP: 4
}

const BuildinType = {
    EMPTY: 1,
    WALL: 2,
    RALLY_POINT: 3,
    MAIN_BUILDING: 4,
    BARRACKS: 5
}

const AbandonedValleyType = {
    CROP_6: 1,
    CROP_9: 2,
    CROP_15: 3,
    CROP_3: 4
};

const levelResourceProductionMap = {
     0: 2,  1: 5,  2: 12,  3: 32,  4: 67,  5: 200,  6: 560,  7: 1600,  8: 5000,  9: 12000, 10: 40000,
    11:  100000, 12: 300000, 13: 800000, 14: 2000000, 15: 5000000, 16: 13000000, 17: 35000000, 18: 90000000, 19: 250000000, 20: 1000000000
};
