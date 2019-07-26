var wood = 0;
var clay = 0;
var iron = 0;
var crop = 0;

var queue = [];

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

    document.getElementById("woodProd").innerHTML = production.wood;
    document.getElementById("clayProd").innerHTML = production.clay;
    document.getElementById("ironProd").innerHTML = production.iron;
    document.getElementById("cropProd").innerHTML = production.crop;

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
} ).fail( (msg) => {
    console.log('production-params fail: ' + msg);

    window.location.href = 'login';
} );

$.getJSON('/villages-params', { token : token }, res => {

    const { villageName, villagesNames } = res;

    document.getElementById("village-name").innerHTML = villageName;

    villagesNames.forEach( (village, idx) => {
        let div = document.createElement("div");
        div.innerHTML = '<p><a href="#" class="text-secondary" onclick="village('
            + idx
            + ')">'
            + village
            + '</a></p>';

        let container = document.getElementById("villages-list");
        container.appendChild(div);

    });

} ).fail( (msg) => {
    console.log('villages-params fail: ' + msg);

    window.location.href = 'login';
} );

$.getJSON('/center-params', { token: token }, res => {

    const { buildings, constructQueue } = res;

    buildings.forEach( building => {
        let div = document.createElement("div");
        div.innerHTML = '<p> ' 
            + getBuildingName(building.buildingId) 
            + ': '
            + building.level
            + ' level </p> <button type="button" class="btn btn-info" onclick="building('
            + building.id 
            + ')"> Upgrade </button> <br> <br>';

        let container = document.getElementById("building-list");
        container.appendChild(div);
    });

    // let comutativeTime = 1;
    constructQueue.forEach( (build, idx) => {

        // comutativeTime += build.timeLeft;
        queue.push( {
            timeLeft: (new Date(build.eventDate).getTime() - (new Date()).getTime() ) * 0.001,
            date: build.eventDate,
            siteName: getBuildingName(build.buildingId),
            level: build.level 
        } )

        let div = document.createElement("div");
        div.innerHTML = '<p> '
            + getBuildingName(build.buildingId)
            + ' Level '
            + build.level
            + ' <span id="queue' + idx + '">0</span></p>';
        let container = document.getElementById("build-queue");
        container.appendChild(div);    
    });

    buildQueueInterval();
    setInterval( buildQueueInterval, 1000 );

} ).fail( (msg) => {
    console.log('center-params fail: ' + msg);

    window.location.href = 'login';
} );

function buildQueueInterval() {
    queue.forEach( build => {
        build.timeLeft -= 1;
        if (build.timeLeft < -1) {
            location.reload();
        }
    } );

    updateBuildingQueue();
}

function updateBuildingQueue() {
    queue.forEach( (build, idx) => {
        const left = new Date( Math.round(build.timeLeft) * 1000).toISOString().substr(11, 8);
        document.getElementById("queue" + idx.toString()).innerHTML = left + ' ' + build.date;
    } );
}

function updateResources() {
    document.getElementById("wood").innerHTML = Math.round(wood);
    document.getElementById("clay").innerHTML = Math.round(clay);
    document.getElementById("iron").innerHTML = Math.round(iron);
    document.getElementById("crop").innerHTML = Math.round(crop);
}

function building(num) {
    setTimeout(() => {
        window.location.href = 'construction?id=' + num;
    }, 30);
}

function village(idx) {
    setTimeout(() => {
        window.location.href = 'village?id=' + idx + '&place=center' + '&token=' + token;;
    }, 30)
}

function newConstruct() {
    setTimeout(() => {
        window.location.href = 'new-construction';
    }, 30);
}