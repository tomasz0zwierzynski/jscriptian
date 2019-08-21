componentLoader.load(getJsonData);

var canvas = document.getElementById('map-canvas');
var context = canvas.getContext('2d');

var centerX;
var centerY;

function getJsonData() {
    $.getJSON('/user-info-params', { token: token }, res => {

        const { name, message } = res;

        navbarController.init( name, navbarController.ID_MAP_ITEM );
        messageController.init( message );

    }).fail( handleFail );

    $.getJSON('villages-params', { token: token }, res => {

        const { villagePosition } = res;

        const x = getUrlParam('x');
        const y = getUrlParam('y');

        centerX = +villagePosition.x;
        centerY = +villagePosition.y;

        if (x != null && y != null) {
            centerX = +x;
            centerY = +y;
        }

        $.getJSON('/map-params', { token: token, x: centerX, y: centerY }, resp => {

            const { tiles } = resp;

            tilesFetched( tiles );
        }).fail( handleFail );

    }).fail( handleFail );
}

function tilesFetched( tiles ) {

    const mapa = [];
    for (let i = 0; i < 7 + 2; i++) {
        mapa.push([]);
    }

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            mapa[i][j] = 2;
        }
    }

    let xMin = Infinity;
    let yMin = Infinity;
    tiles.forEach(tile => {
        xMin = Math.min(xMin, tile.x);
        yMin = Math.min(yMin, tile.y);
    });

    tiles.forEach(tile => {
        mapa[tile.x - xMin + 1][tile.y - yMin + 1] = tile.tile;
    });

    mapa[0][4] = 44;
    mapa[4][0] = 42;
    mapa[4][8] = 43;
    mapa[8][4] = 41;

    IsometricMap.setMap( mapa );
    
    Isometric.setCanvas(canvas);
    Isometric.setContext(context);
    Isometric.load();
    
    Isometric.setClickHandler( (x, y) => {
        console.log(`Clicked: x=${x} y=${y}`);

        if ( x == 0 && y == 4 ) {
            reloadMap( centerX - 1, centerY );
        } else if ( x == 4 && y == 0 ) {
            reloadMap( centerX, centerY - 1 );
        } else if ( x == 4 && y == 8 ) {
            reloadMap( centerX , centerY + 1 );
        } else if ( x == 8 && y == 4 ) {
            reloadMap( centerX + 1, centerY );
        }

    } );
    

}

function reloadMap(x, y) {
    setTimeout(() => {
        window.location.href = 'map?x=' + x + '&y=' + y;
    }, 30);
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