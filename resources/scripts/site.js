var wood = 0;
var clay = 0;
var iron = 0;
var crop = 0;

$.urlParam = function(name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}

const id = $.urlParam('id');

$.getJSON('/site-params/' + id, { token: token }, res => {

    const { name, buildingId, cost, buildingAttributes } = res;

    document.getElementById("wood-cost").innerHTML = cost.wood;
    document.getElementById("clay-cost").innerHTML = cost.clay;
    document.getElementById("iron-cost").innerHTML = cost.iron;
    document.getElementById("crop-cost").innerHTML = cost.crop;

    document.getElementById("data").innerHTML = getSiteDescription(buildingId, buildingAttributes);

    document.getElementById("site-name").innerHTML = name;
} ).fail( (msg) => {
    console.log('site-params?id=' + id + ' fail: ' + msg);

    window.location.href = 'login';
} );

$.getJSON('/production-params', { token: token }, res => { 

    const { resources, capacity, production } = res;

    document.getElementById("wood-capacity").innerHTML = capacity.warehouseCapacity;
    document.getElementById("clay-capacity").innerHTML = capacity.warehouseCapacity;
    document.getElementById("iron-capacity").innerHTML = capacity.warehouseCapacity;
    document.getElementById("crop-capacity").innerHTML = capacity.granaryCapacity;

    const woodInterval = 0.02 * production.wood / 3600;
    const clayInterval = 0.02 * production.clay / 3600;
    const ironInterval = 0.02 * production.iron / 3600;
    const cropInterval = 0.02 * production.crop / 3600;

    wood = resources.wood;
    clay = resources.clay;
    iron = resources.iron;
    crop = resources.crop;

    updateResources();

    setInterval( () => {
        const newWood = wood + woodInterval;
        const newClay = clay + clayInterval;
        const newIron = iron + ironInterval;
        const newCrop = crop + cropInterval;

        if (newWood <= capacity.warehouseCapacity) wood = newWood; 
        if (newClay <= capacity.warehouseCapacity) clay = newClay;
        if (newIron <= capacity.warehouseCapacity) iron = newIron;
        if (newCrop <= capacity.granaryCapacity) crop = newCrop;

        updateResources();
    }, 20 );
}).fail( (msg) => {
    console.log('sites-params fail: ' + msg);

    window.location.href = 'login';
} );

function updateResources() {
    document.getElementById("wood").innerHTML = Math.round(wood);
    document.getElementById("clay").innerHTML = Math.round(clay);
    document.getElementById("iron").innerHTML = Math.round(iron);
    document.getElementById("crop").innerHTML = Math.round(crop);
}

function build() {
    setTimeout(() => {
        window.location.href = 'upgrade?id=' + id + '&token=' + token;
    }, 30);
}

function back() {
    setTimeout(() => {
        window.location.href = "sites";
    }, 30);
}
