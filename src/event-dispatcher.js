const EventTypes = require('./model/event-type');
const playerService = require('./service/player');
const logService = require('./service/log');
const log = logService.getLogger('event-dispatcher.js');

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
        log.debug(`dispatchGeneralEvent: ${JSON.stringify(event)}`);
    },

    dispatchSiteFinishEvent: function ( db, event ) {
        log.debug(`dispatchSiteFinishedEvent: ${JSON.stringify(event)}`);
        try {
            const player = playerService.getPlayerById( db, event.playerId );
            const villageId = event.eventDetails.villageId;
        
            player.villages[villageId].buildQueue = player.villages[villageId].buildQueue.filter( el => el.eventDate !== event.eventDetails.eventDate );
            player.villages[villageId].sites[event.eventDetails.siteId].level++;
        } catch ( err ) {
            log.error(`error: ${JSON.stringify(err)}, player: ${JSON.stringify(player)}, event: ${JSON.stringify(event)} `);
        }
    },

    dispatchConstructionFinishEvent: function ( db, event ) {
        log.debug(`dispatchConstructionEvent: ${JSON.stringify(event)}`);
        try {
            const player = playerService.getPlayerById( db, event.playerId );
            const villageId = event.eventDetails.villageId;
        
            player.villages[villageId].constructQueue = player.villages[villageId].constructQueue.filter( el => el.eventDate !== event.eventDetails.eventDate );
            player.villages[villageId].buildings[event.eventDetails.constructionId].level++;
        } catch ( err ) {
            log.error(`error: ${JSON.stringify(err)}, player: ${JSON.stringify(player)}, event: ${JSON.stringify(event)} `);
        }
    },

    dispatchMerchantArrivedEvent: function (db,  event ) {
        log.debug(`dispatchMerchantArrivedEvent: ${JSON.stringify(event)}`);
    }

}