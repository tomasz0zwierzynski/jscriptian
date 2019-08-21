componentLoader.load( getJsonData );

function getJsonData() {

    $.getJSON('/user-info-params', { token: token }, res => {

        const { name } = res;

        navbarController.init( name, navbarController.ID_SITES_ITEM );

    }).fail( handleFail );

    
    $.getJSON('/production-params', { token: token }, res => {
        const { resources, capacity, production } = res;

        resourcesController.init( resources, capacity, production );
        productionController.init( production );

    }).fail( handleFail );

    $.getJSON('/villages-params', { token: token }, res => {

        const { villageName, villagesNames } = res;

        document.getElementById("village-name").innerHTML = villageName;
        
        villagesController.init( villageName, villagesNames, 'village');

    }).fail( handleFail );

    $.getJSON('/new-site-params', { token: token }, res => { 

        const { availableSites } = res;

        availableSites.forEach( site => {
            let div = document.createElement("div");
            div.innerHTML = '<p> ' 
                + getSiteName(site.id) 
                + ' '
                + ' </p> <button type="button" class="btn btn-info" onclick="site('
                + site.id 
                + ')"> Build </button> <br> <br>';

            let container = document.getElementById("new-site-list");
            container.appendChild(div);
        });

    } ).fail( handleFail );

}

function site(num) {
    setTimeout(() => {
        window.location.href = 'upgrade-new?id=' + num + '&token=' + token;
    }, 30);
}

function village(idx) {
    setTimeout(() => {
        window.location.href = 'village?id=' + idx + '&place=sites' + '&token=' + token;
    }, 30)
}

