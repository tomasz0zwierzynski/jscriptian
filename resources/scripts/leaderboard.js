componentLoader.load(getJsonData);

function getJsonData() {

    $.getJSON('/user-info-params', { token: token }, res => {

        const { name, message } = res;

        navbarController.init( name, navbarController.ID_PLAYER_ITEM );
        messageController.init( message );

    }).fail( handleFail ); 

    $.getJSON('/leaderboard-params', { token: token }, res => {

        const { playersPop } = res;

        const leaderboards = [];
        playersPop.forEach( p => {
            leaderboards.push(
                {
                    name: p.name,
                    pop: p.population.population
                }
            )
        });

        leaderboards.sort( (o1, o2) => {
            if ( o1.pop < o2.pop ) return +1;
            if ( o1.pop > o2.pop ) return -1;
            return 0; 
        } );


        leaderboards.forEach( (p, i) => {
            let div = document.createElement("div");
            div.innerHTML = '<p> '
            + ( i + 1 )
            + '. '
            + p.name
            + ': '
            + p.pop
            + '</p>';

            let container = document.getElementById("leaderboard-list");
            container.appendChild(div);
        });

    }).fail( handleFail );

}