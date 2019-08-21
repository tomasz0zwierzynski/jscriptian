var componentLoader = {
    loadedResources: [],
    
    totalResourcesRequired: 0,

    components: [
        { name: 'RESOURCES', src: 'components/resources.html', container: 'resources-container' },
        { name: 'PRODUCTION', src: 'components/production.html', container: 'production-container' },
        { name: 'VILLAGES', src: 'components/villages.html', container: 'villages-container' },
        { name: 'QUEUE', src: 'components/queue.html', container: 'queue-container' },
        { name: 'NAVBAR', src: 'components/navbar.html', container: 'navbar-container' },
        { name: 'MESSAGE', src: 'components/message.html', container: 'message-container' }
    ],

    callback: () => {},

    load: function ( callback ) {
        self = this;

        self.callback = callback;

        self.components.forEach( component => {
            const container = document.getElementById( component.container );
            if (container) {
                self.totalResourcesRequired += 1;
                $(`#${component.container}`).load(`${component.src}`, () => {
                    self.loadedResources.push(component);
                });
            }
        });

        self.checkResources( self );
    },
    
    checkResources: function ( self ) {
        if ( self.loadedResources.length < self.totalResourcesRequired ) {
            setTimeout( () => {
                self.checkResources( self );
            }, 30);
        } else {
            self.callback();
        }
    }
}

