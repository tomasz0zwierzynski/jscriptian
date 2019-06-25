const token = localStorage.getItem('token');

function hash(input) {
    // TODO: implement hashing function
    return input;
}

function getSiteName(id) {
    switch (id) {
        case 0: return "Woodcutter";
        case 1: return "Clay Pit";
        case 2: return "Iron Mine";
        case 3: return "Crop Field";
        default: return "Undefined";
    }
}

function getBuildingName(id) {
    switch (id) {
        case 4: return "Main Building";
        case 5: return "Warehouse";
        case 6: return "Granary";
        default: return "Undefined";
    }
}
