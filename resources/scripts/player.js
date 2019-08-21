componentLoader.load(getJsonData);

function getJsonData() {

    $.getJSON('/user-info-params', { token: token }, res => {

        const { name, message } = res;

        navbarController.init( name, navbarController.ID_PLAYER_ITEM );
        messageController.init( message );

    }).fail( handleFail ); 

    $.getJSON('/player-params', { token: token }, res => {

        const { population, culturePoints, cultureProduction } = res;
    
        document.getElementById("pop").innerHTML = population;
    
        document.getElementById("culture-points").innerHTML = culturePoints;
    
        document.getElementById("culture-production").innerHTML = cultureProduction;
    
    }).fail( handleFail );

}
