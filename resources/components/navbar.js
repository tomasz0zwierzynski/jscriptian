var navbarController = {

    ID_PLAYER_NAME: 'navbar-player-name',
    ID_PLAYER_ITEM: 'navbar-player',
    ID_SITES_ITEM: 'navbar-sites',
    ID_CENTER_ITEM: 'navbar-center',
    ID_MAP_ITEM: 'navbar-map',
    ID_LEADERBOARD_ITEM: 'navbar-leaderboard',

    init: function ( name, active ) {
        const self = this;

        document.getElementById( self.ID_PLAYER_NAME ).innerHTML = name;

        const element = document.getElementById( active );
        if ( element ) {
            element.classList.add( 'active' );
        }
    }

}