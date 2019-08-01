componentLoader.load(getJsonData);

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

    $.getJSON('/sites-params', { token: token }, res => {

        const { sites, buildQueue } = res;

        sites.forEach(site => {
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

        queueController.init( buildQueue );
        
    }).fail( handleFail );
}

function field(num) {
    setTimeout(() => {
        window.location.href = 'site?id=' + num;
    }, 30);
}

function village(idx) {
    setTimeout(() => {
        window.location.href = 'village?id=' + idx + '&place=sites' + '&token=' + token;;
    }, 30)
}

function newSite() {
    setTimeout(() => {
        window.location.href = 'new-site';
    }, 30);
}
