$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}

const id = $.urlParam('id');

componentLoader.load(getJsonData);

function getJsonData() {

    $.getJSON('/user-info-params', { token: token }, res => {

        const { name } = res;

        navbarController.init( name, navbarController.ID_SITES_ITEM );

    }).fail( handleFail );

    $.getJSON('/site-params/' + id, { token: token }, res => {

        const { name, buildingId, cost, buildingAttributes } = res;

        document.getElementById("wood-cost").innerHTML = cost.wood;
        document.getElementById("clay-cost").innerHTML = cost.clay;
        document.getElementById("iron-cost").innerHTML = cost.iron;
        document.getElementById("crop-cost").innerHTML = cost.crop;

        document.getElementById("data").innerHTML = getSiteDescription(buildingId, buildingAttributes);

        document.getElementById("site-name").innerHTML = name;
    }).fail( handleFail );

    $.getJSON('/production-params', { token: token }, res => {

        const { resources, capacity, production } = res;

        resourcesController.init( resources, capacity, production );

    }).fail( handleFail );

    $.getJSON('/villages-params', { token: token }, res => {

        const { villageName, villagesNames } = res;

        // TODO: ustawić coś fajnego jako layout
        // document.getElementById("village-name").innerHTML = villageName;
        
        villagesController.init( villageName, villagesNames, 'village');

    }).fail( handleFail );
}

function village(idx) {
    setTimeout(() => {
        window.location.href = 'village?id=' + idx + '&place=sites' + '&token=' + token;;
    }, 30)
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
