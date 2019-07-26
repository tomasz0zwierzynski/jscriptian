const EventTypes = require('./model/event-type');
const playerService = require('./database/player');

module.exports = {

    dispatchEvent: function ( db, event ) {

        switch (event.eventType) {
            case EventTypes.SITE_FINISH:
                this.dispatchSiteFinishEvent( db, event );
            break;
            case EventTypes.CONSTRUCTION_FINISH:
                this.dispatchConstructionFinishEvent( db, event );
            break;
            case EventTypes.MERCHANT_ARRIVED:
                this.dispatchMerchantFinishEvent( db, event );
            break;
            case EventTypes.GENERAL:
            default:
                this.dispatchGeneralEvent( db, event );
        }
    },

    dispatchGeneralEvent: function ( db, event) {
        console.log( 'dispatchGeneralEvent' );
        console.log( event );
    },

    dispatchSiteFinishEvent: function ( db, event ) {
        console.log( 'dispatchSiteFinishEvent' );
        console.log( event );
        const player = playerService.getPlayerById( db, event.playerId );
        const villageId = event.eventDetails.villageId;
        
        player.villages[villageId].buildQueue = player.villages[villageId].buildQueue.filter( el => el.eventDate !== event.eventDetails.eventDate );
        player.villages[villageId].sites[event.eventDetails.siteId].level++;
    },

    dispatchConstructionFinishEvent: function ( db, event ) {
        console.log( 'dispatchConstructionFinishEvent' );
        console.log( event );

        const player = playerService.getPlayerById( db, event.playerId );
        const villageId = event.eventDetails.villageId;
        
        player.villages[villageId].constructQueue = player.villages[villageId].constructQueue.filter( el => el.eventDate !== event.eventDetails.eventDate );
        player.villages[villageId].buildings[event.eventDetails.constructionId].level++;
    },

    dispatchMerchantArrivedEvent: function (db,  event ) {
        console.log( 'dispatchMerchantArrivedEvent' );
        console.log( event );
    }

}