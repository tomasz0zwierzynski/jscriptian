componentLoader.load( getJsonData );

function getJsonData() {

    $.getJSON('/user-info-params', { token: token }, res => {

        const { name, message } = res;

        navbarController.init( name, navbarController.ID_CENTER_ITEM );
        messageController.init( message );

    }).fail( handleFail );

    $.getJSON('/production-params', { token: token }, res => {
        const { resources, capacity, production } = res;
    
        resourcesController.init( resources, capacity, production );
        productionController.init( production );
    
    }).fail( handleFail );    
    
    $.getJSON('/villages-params', { token : token }, res => {
    
        const { villageName, villagesNames } = res;
    
        document.getElementById("village-name").innerHTML = villageName;
    
        villagesController.init( villageName, villagesNames, 'village' );
    
    }).fail( handleFail );
    
    $.getJSON('/center-params', { token: token }, res => {
    
        const { buildings, constructQueue } = res;
    
        buildings.forEach( building => {
            let div = document.createElement("div");
            div.innerHTML = '<p> ' 
                + getBuildingName(building.buildingId) 
                + ': '
                + building.level
                + ' level </p> <button type="button" class="btn btn-info btn-sm" onclick="building('
                + building.id 
                + ')"> Details </button> <button type="button" class="btn btn-info btn-sm" onclick="build('
                + building.id
                + ')"> Upgrade </button> <br> <br>';
    
            let container = document.getElementById("building-list");
            container.appendChild(div);
        });
    
        queueController.init( constructQueue );
    
    }).fail( handleFail );
}

function building(num) {
    setTimeout(() => {
        window.location.href = 'construction?id=' + num;
    }, 30);
}

function village(idx) {
    setTimeout(() => {
        window.location.href = 'village?id=' + idx + '&place=center' + '&token=' + token;
    }, 30)
}

function newConstruct() {
    setTimeout(() => {
        window.location.href = 'new-construction';
    }, 30);
}

function build(num) {
    setTimeout(() => {
        window.location.href = 'construct?id=' + num + '&token=' + token;
    }, 30);
}
