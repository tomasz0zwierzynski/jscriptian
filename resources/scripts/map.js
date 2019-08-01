componentLoader.load(getJsonData);

function getJsonData() {
    $.getJSON('/user-info-params', { token: token }, res => {

        const { name } = res;

        navbarController.init( name, navbarController.ID_MAP_ITEM );

    }).fail( handleFail );
}

var canvas = document.getElementById('map-canvas');
var context = canvas.getContext('2d');

IsometricMap.setMap(
    [
        [1,1,1,1,1,1],
        [1,1,1,1,1,1],
        [1,1,1,1,1,1],
        [1,1,1,1,1,1],
        [1,1,1,1,1,1],
        [1,1,1,1,1,1]
    ]
);

Isometric.setCanvas(canvas);
Isometric.setContext(context);
Isometric.load();

Isometric.setClickHandler( (x, y) => {
    console.log(`Clicked: x=${x} y=${y}`);
} );

var sliderX = document.getElementById("range-x");
var sliderY = document.getElementById("range-y");

sliderX.oninput = function() {
    console.log(+sliderX.value);
    Isometric.setDebugXyOffset(+sliderX.value, +sliderY.value);
    document.getElementById("r-x").innerHTML = this.value;
}

sliderY.oninput = function() {
    console.log(+sliderY.value);
    Isometric.setDebugXyOffset(+sliderX.value, +sliderY.value);
    document.getElementById("r-y").innerHTML = this.value;
}