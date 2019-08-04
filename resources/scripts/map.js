componentLoader.load(getJsonData);

var canvas = document.getElementById('map-canvas');
var context = canvas.getContext('2d');

function getJsonData() {
    $.getJSON('/user-info-params', { token: token }, res => {

        const { name } = res;

        navbarController.init( name, navbarController.ID_MAP_ITEM );

    }).fail( handleFail );

    $.getJSON('villages-params', { token: token }, res => {

        const { villagePosition } = res;

        $.getJSON('/map-params', { token: token, x: villagePosition.x, y: villagePosition.y }, resp => {

            const { tiles } = resp;

            tilesFetched( tiles );
        });

    });
}

function tilesFetched( tiles ) {

    const mapa = [];
    for (let i = 0; i < 7; i++) {
        mapa.push([]);
    }

    let xMin = Infinity;
    let yMin = Infinity;
    tiles.forEach(tile => {
        xMin = Math.min(xMin, tile.x);
        yMin = Math.min(yMin, tile.y);
    });

    tiles.forEach(tile => {
        mapa[tile.x - xMin][tile.y - yMin] = tile.tile;
    });

    IsometricMap.setMap( mapa );
    
    Isometric.setCanvas(canvas);
    Isometric.setContext(context);
    Isometric.load();
    
    Isometric.setClickHandler( (x, y) => {
        console.log(`Clicked: x=${x} y=${y}`);
    } );
    

}


// var sliderX = document.getElementById("range-x");
// var sliderY = document.getElementById("range-y");

// sliderX.oninput = function() {
//     console.log(+sliderX.value);
//     Isometric.setDebugXyOffset(+sliderX.value, +sliderY.value);
//     document.getElementById("r-x").innerHTML = this.value;
// }

// sliderY.oninput = function() {
//     console.log(+sliderY.value);
//     Isometric.setDebugXyOffset(+sliderX.value, +sliderY.value);
//     document.getElementById("r-y").innerHTML = this.value;
// }