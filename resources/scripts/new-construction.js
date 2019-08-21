componentLoader.load( getJsonData );

function getJsonData() {

    $.getJSON('/user-info-params', { token: token }, res => {

        const { name } = res;

        navbarController.init( name, navbarController.ID_CENTER_ITEM );

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

    $.getJSON('/new-construction-params', { token: token }, res => { 

        const { availableBuildings } = res;

        availableBuildings.forEach( building => {
            let div = document.createElement("div");
            div.innerHTML = '<p> ' 
                + getBuildingName(building.id) 
                + ' '
                + ' </p> <button type="button" class="btn btn-info" onclick="building('
                + building.id 
                + ')"> Build </button> <br> <br>';

            let container = document.getElementById("new-construction-list");
            container.appendChild(div);
        });

    } ).fail( handleFail );
    
}

function building(num) {
    setTimeout(() => {
        window.location.href = 'construct-new?id=' + num + '&token=' + token;
    }, 30);
}

function village(idx) {
    setTimeout(() => {
        window.location.href = 'village?id=' + idx + '&place=sites' + '&token=' + token;
    }, 30)
}

