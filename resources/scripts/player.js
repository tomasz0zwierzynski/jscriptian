$.getJSON('/player-params', { token: token }, res => {

    const { population, culturePoints, cultureProduction } = res;

    document.getElementById("pop").innerHTML = population;

    document.getElementById("culture-points").innerHTML = culturePoints;

    document.getElementById("culture-production").innerHTML = cultureProduction;

}).fail( (msg) => {
    console.log('player-params fail: ' + msg);

    window.location.href = 'login';
} );;