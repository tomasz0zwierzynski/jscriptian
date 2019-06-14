var wood = 0;
var clay = 0;
var iron = 0;
var crop = 0;

const token = localStorage.getItem('token');

$.getJSON('/sites-params', { token: token }, res => { 
    console.log('site-params res: ' + res);

    const { resources, sites, production } = res;

    const woodInterval = 0.02 * production.wood / 3600;
    const clayInterval = 0.02 * production.clay / 3600;
    const ironInterval = 0.02 * production.iron / 3600;
    const cropInterval = 0.02 * production.crop / 3600;

    sites.forEach( site => {
        site.id;
        site.buildingId;
        site.level;

        let div = document.createElement("div");
        div.innerHTML = '<p> ' 
            + getSiteName(site.buildingId) 
            + ': '
            + site.level
            + ' level </p> <button type="button" class="btn btn-info" onclick="field('
            + site.id 
            + ')"> Upgrade </button> <br> <br>';

        let container = document.getElementById("site-list");
        container.appendChild(div);
    });

    document.getElementById("woodProd").innerHTML = production.wood;
    document.getElementById("clayProd").innerHTML = production.clay;
    document.getElementById("ironProd").innerHTML = production.iron;
    document.getElementById("cropProd").innerHTML = production.crop;

    wood = resources.wood;
    clay = resources.clay;
    iron = resources.iron;
    crop = resources.crop;

    updateResources();

    setInterval(() => { // TODO: dorobić pamięc, zeby oddzielic prezentacje od stanu faktycznego
        wood += woodInterval;
        clay += clayInterval;
        iron += ironInterval;
        crop += cropInterval;

        updateResources();
    }, 20);

} ).fail( (msg) => {
    console.log('site-params fail: ' + msg);

    window.location.href = 'login';
} );

function updateResources() {
    document.getElementById("wood").innerHTML = Math.round(wood);
    document.getElementById("clay").innerHTML = Math.round(clay);
    document.getElementById("iron").innerHTML = Math.round(iron);
    document.getElementById("crop").innerHTML = Math.round(crop);
}

function field(num) {
    setTimeout(() => {
        window.location.href = 'site?id=' + num;
    }, 30);
}

function getSiteName(id) {
    if ( id === 0 ) {
        return "Woodcutter";
    } else if (id === 1) {
        return "Clay Pit";
    } else if (id === 2) {
        return "Iron Mine";
    } else if (id === 3) {
        return "Crop Field";
    } else {
        return "Undefined";
    }
}