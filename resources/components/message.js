var messageController = {

    ID_MESSAGE_ALERT: 'message-alert',
    ID_MESSAGE_TEXT: 'message-text',

    init: function ( text ) {
        const self = this;

        if ( text ) {
            document.getElementById( self.ID_MESSAGE_TEXT ).innerHTML = text;
            document.getElementById( self.ID_MESSAGE_ALERT ).style.display = 'inherit';
            document.getElementById( self.ID_MESSAGE_ALERT ).classList.add('alert-primary');

            setTimeout( () => self.hide( self ), 4000);
        }
    },

    hide: function ( self ) {
        document.getElementById( self.ID_MESSAGE_ALERT ).style.display = 'none';
    }

}