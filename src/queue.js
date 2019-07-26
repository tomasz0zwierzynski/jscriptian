const eventDispatcher = require('./event-dispatcher');

module.exports = {

    db: null,

    eventQueue: [],

    nextEventSubscription: null,
    
    setDatabase: function ( db ) {
        this.db = db;
    },

    addEventToQueue: function ( eventType, playerId, eventDate, eventDetails ) {

        console.log('(+) push event to queue: ' + eventType);
        this.eventQueue.push({
            eventType: eventType,
            playerId: playerId,
            eventDate: eventDate,
            eventDetails: eventDetails,
            completed: false
        });

        // console.log('(*) sort queue');
        this.eventQueue.sort( ( o1, o2 ) => new Date( o1.eventDate ) - new Date( o2.eventDate ) );
        clearTimeout( this.nextEventSubscription );

        this.checkQueue();
    },

    timeoutNextEvent: function ( event ) {
        const time = event.eventDate.getTime() - ( new Date() ).getTime();
        if ( time < 0 ) {
            // zdarzenie już powinno zostać wywołane, bo się spóźnia
            this.dispatchEvent( event );
        }
        // zdarzenie powinno zostać wywołane za określony czas
        this.nextEventSubscription = setTimeout( () => {
            this.dispatchEvent( event );
        }, time);
    },

    dispatchEvent: function ( event ) {
        if ( !event.completed ) {
            console.log('dispatching event ' + event.eventType + ': ' + event.eventDate);
            eventDispatcher.dispatchEvent( this.db, event );
            event.completed = true;
        } 
    
        // console.log('(-) shift queue: ' + this.eventQueue.shift().eventType );
        this.eventQueue.shift();
        this.checkQueue();
    },
    
    checkQueue: function() {
        if (this.eventQueue.length > 0) {
            // console.log('(*) read from queue: ' + this.eventQueue[0].eventType );
            this.timeoutNextEvent( this.eventQueue[0] );
        }
    }

}