var queueController = {
    ID_QUEUE_LIST: 'queue-list',
    
    queue: [],

    init: function ( queue ) {
        const self = this;

        queue.forEach( (elem, idx) => {
            self.queue.push( {
                timeLeft: (new Date(elem.eventDate).getTime() - (new Date()).getTime() ) * 0.001,
                date: elem.eventDate,
                name: getBuildingName(elem.buildingId),
                level: elem.level 
            } );            
        
            let div = document.createElement("div");
            div.innerHTML = '<p> '
                + getBuildingName(elem.buildingId)
                + ' Level '
                + elem.level
                + ' <span id="queue-element-' + idx + '">0</span></p>';
            let container = document.getElementById( self.ID_QUEUE_LIST );
            container.appendChild(div);    
        } );

        self.tickQueue( self );

        setInterval( () => self.tickQueue( self ), 1000);

    },

    updateQueueList: function ( self ) {
        self.queue.forEach( (elem, idx) => {
            const left = new Date( Math.round(elem.timeLeft) * 1000).toISOString().substr(11, 8);
            document.getElementById("queue-element-" + idx.toString()).innerHTML = left + ' ' + elem.date;
        } );
    },

    tickQueue: function ( self ) {
        self.queue.forEach( elem => {
            elem.timeLeft -= 1;
            if (elem.timeLeft < -1) {
                location.reload();
            }
        } );

        self.updateQueueList( self );
    },

}