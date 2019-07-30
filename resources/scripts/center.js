var queue = [];

$("#resources-container").load("components/resources.html", () => {
    
});

$.getJSON('/production-params', { token: token }, res => {
    const { resources, capacity, production } = res;

    resourcesController.init( resources, capacity, production );
    
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