const token = localStorage.getItem('token');

function hash(input) {
    // TODO: implement hashing function
    return input;
}

function logout() {
    $.getJSON('/logout', { token: token }, data => {
        localStorage.removeItem('token');
        setTimeout(() => {
            window.location.href = 'login';
        }, 30);
    });
}

function getUrlParam(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results) {
        return results[1] || 0;
    }
    return null;
}

function handleFail(msg) {
    console.log('getJSON fail:' + msg);
    window.location.href = 'login';
}

function getSiteName(id) {
    return getBuildingName(id);
}

function getBuildingName(id) {
    switch (id) {
        case 0: return "Woodcutter";
        case 1: return "Clay Pit";
        case 2: return "Iron Mine";
        case 3: return "Crop Field";
        case 4: return "Main Building";
        case 5: return "Warehouse";
        case 6: return "Granary";
        case 7: return "Sawmill";
        case 8: return "Brickyard";
        case 9: return "Iron Foundry";
        case 10: return "Grain Mill";
        case 11: return "Bakery";
        default: return "Undefined";
    }
}

function getBuildingDescription(id, attr) {
    return getSiteDescription(id, attr);
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
