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

function getBuildingDescription(id, attr) {
    switch (id) {
        case 4: 
            return `In main building are living organisms reducing building time by <b>${attr.reduction}</b>`;
        case 5: 
            return `In werehouse are stored important resources other than crop. Capacity: ${attr.capacity}`;
        case 6: 
            return `In granary are stored crop. Capacity: ${attr.capacity}`;
        default: 
            return "Undefined building";
    }
}

function getSiteDescription(id, attr) {
    switch (id) {
        case 0:
            return `In woodcutter (...) production: ${attr.prod}`;
        case 1:
            return `In clay pit (...) production: ${attr.prod}`;
        case 2:
            return `In iron mine (...) production: ${attr.prod}`;
        case 3:
            return `In crop field (...) production: ${attr.prod}`;
        default:
            return "Undefined site";
    }
}
