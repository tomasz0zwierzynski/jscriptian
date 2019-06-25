var canvas = document.getElementById('map-canvas');
var context = canvas.getContext('2d');

render(context);

function render(context) {
    var dx = 0, dy = 0;
    context.save();

    // change projection to isometric view
    context.translate(0, 0);
    context.scale(1, 0.5);
    context.rotate(45 * Math.PI /180);

    for (var y = 0; i < 10; y++) {
        for (var x = 0; x < 10; x++) {
            context.strokeRect(dx, dy, 40, 40);
            dx += 40;
        }
        dx = 0;
        dy += 40;
    }

    context.restore(); // back to orthogonal projection

    // Now, figure out which tile is under the mouse cursor... :)
}