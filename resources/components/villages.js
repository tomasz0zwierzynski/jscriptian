var villagesController = {
    
    ID_VILLAGES_LIST: 'villages-list',

    selectedVillage: '',
    villages: [],
    onclickFunctionName: '',

    init: function ( village, villages, onclickFunctionName ) {
        const self = this;

        self.selectedVillage = village;
        self.villages = villages;
        self.onclickFunctionName = onclickFunctionName;

        self.updateVillageList( self )
    },

    updateVillageList: function ( self ) {

        self.villages.forEach( (village, idx) => {
            let div = document.createElement('div');
            if ( village === self.selectedVillage ) {
                div.innerHTML = '<p><b><a href="#" class="text-secondary" onclick="'
                + self.onclickFunctionName
                + '('
                + idx
                + ')">'
                + village
                + '</a></b></p>';
            } else {
                div.innerHTML = '<p><a href="#" class="text-secondary" onclick="'
                + self.onclickFunctionName
                + '('
                + idx
                + ')">'
                + village
                + '</a></p>';
            }

            let container = document.getElementById( self.ID_VILLAGES_LIST );
            container.appendChild(div);

        });

    }
}