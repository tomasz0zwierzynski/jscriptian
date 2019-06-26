$.getJSON('/player-params', { token: token }, res => {

    const { population } = res;

    document.getElementById("pop").innerHTML = population;

}).fail( (msg) => {
    console.log('player-params fail: ' + msg);

    window.location.href = 'login';
} );;