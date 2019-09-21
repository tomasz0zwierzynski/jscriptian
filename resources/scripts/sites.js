componentLoader.load(getJsonData);

function getJsonData() {
   
    $.getJSON('/user-info-params', { token: token }, res => {

        const { name, message } = res;

        navbarController.init( name, navbarController.ID_SITES_ITEM );
        messageController.init( message );

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

        let maxWood = 0;
        let maxClay = 0;
        let maxIron = 0;
        let maxCrop = 0;

        sites.forEach(site => {

            if ( site.level >= 10 ) {
                if ( site.buildingId === 0 ) {
                    maxWood++;
                } else if ( site.buildingId === 1 ) {
                    maxClay++;
                } else if ( site.buildingId === 2 ) {
                    maxIron++;
                } else if ( site.buildingId === 3 ) {
                    maxCrop++;
                }
            } else {
                let div = document.createElement("div");
                div.innerHTML = '<p> '
                    + getSiteName(site.buildingId)
                    + ': '
                    + site.level
                    + ' level </p> <button type="button" class="btn btn-info btn-sm" onclick="field('
                    + site.id
                    + ')"> Details </button> <button type="button" class="btn btn-info btn-sm" onclick="build('
                    + site.id
                    + ')"> Upgrade </button> <br> <br>';
    
                let container = document.getElementById("site-list");
                container.appendChild(div);    
            }
        });

        document.getElementById("max-wood").innerHTML = maxWood;
        document.getElementById("max-clay").innerHTML = maxClay;
        document.getElementById("max-iron").innerHTML = maxIron;
        document.getElementById("max-crop").innerHTML = maxCrop;

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

function build(num) {
    setTimeout(() => {
        window.location.href = 'upgrade?id=' + num + '&token=' + token;
    }, 30);
}
