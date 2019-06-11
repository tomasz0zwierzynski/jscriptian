const express = require('express');
const initService = require('./services/init/init');
const playerService = require('./services/player');
const buildingService = require('./services/building');
const gameLoop = require('./services/gameLoop');
const path = require('path');

const app = express();
const port = 3000;

// Prepare game database
const db = initService.createDatabase();

const temporaryToken =  't' + new Date().toString();

app.use( express.static(__dirname + '/resources') );
app.use( express.urlencoded({
    extended: true
}) );
app.use( express.json() );

app.get('/login', (req, res) => {
    res.sendFile( path.join( __dirname, 'resources', 'login.html' ) );
});

app.post('/auth', (req, res) => {
    // logika otrzymywania tokena
    if (req.body.user === 'test' && req.body.password === 'test' ) {
        res.send(temporaryToken);
    } else {
        res.send('fail');
    }
});

app.get('/', (req, res) => {
    res.sendFile( path.join( __dirname, 'resources', 'sites.html' ) );
});

app.get('/sites', (req, res) => {
    res.sendFile( path.join( __dirname, 'resources', 'sites.html' ) );
} );

app.get('/site', (req, res) => {

    res.sendFile( path.join( __dirname, 'resources', 'site.html' ) );
});

app.get('/sites-params', (req, res) => {
    console.log('sites-params');
    if ( isAuth(req) ) {
        const player = playerService.getPlayerByName(db, 'test');
    
        // console.log( req.headers );
        // console.log( req.header('custom-header') );

        const production = playerService.getPlayerProduction(db, player);

        const json = {
            resources: { 
                wood: player.resources.wood,
                clay: player.resources.clay,
                iron: player.resources.iron,
                crop: player.resources.crop,
            },
            sites: player.sites,
            production: {
                wood: production.woodProd,
                clay: production.clayProd,
                iron: production.ironProd,
                crop: production.cropProd
            }
        };

        res.json(json);
    } else {
        res.status(401);
        res.send('Unauthenticated');
    }
} );

app.get('/site-params/:id', (req, res) => {

    const player = playerService.getPlayerByName(db, 'test');
    
    let building = buildingService.getBuildingById(db, +req.params.id)[0];
    let level = player.sites[+req.params.id].level;
    
    const json = {
        name: building.name,

        cost: {
            wood: building.levels[level].wood,
            clay: building.levels[level].clay,
            iron: building.levels[level].iron,
            crop: building.levels[level].crop
        },

        production: building.levels[level].prod
    };

    res.json(json);
} );

app.get('/upgrade', (req, res) => {
    // Upgrade logic

    const siteId = req.query.id; // id w player.site[id]

    const player = playerService.getPlayerByName(db, 'test');
    const buildingId = player.sites[siteId].buildingId;
    let building = buildingService.getBuildingById(db, buildingId)[0];
    let level = player.sites[siteId].level;

    if ( level < 2 ) { // TODO: na sztywno nie można bardziej rozbudować
        player.sites[siteId].level++;

        player.resources.wood -= building.levels[level].wood;
        player.resources.clay -= building.levels[level].clay;
        player.resources.iron -= building.levels[level].iron;
        player.resources.crop -= building.levels[level].crop;
        
        playerService.updatePlayer( db, player );
    }

    res.redirect('/sites');
} );

app.listen(port, () => console.log(`App listening on port ${port}!`));

setInterval(() => {
    const player = playerService.getPlayerByName(db, 'test');

    gameLoop.process( db, player );
}, 20);

function isAuth(req) {
    const token = req.query.token;
    if (token) {
        if (token === temporaryToken ) {
            return true;
        }
    }
    return false;
}
