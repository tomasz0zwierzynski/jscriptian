const express = require('express');
const initService = require('./src/init/init');
const gameLoop = require('./src/game-loop');
const eventQueue = require('./src/queue');

const paramsEndpoints = require('./src/request/params');
const viewsEndpoints = require('./src/request/views');
const actionsEndpoints = require('./src/request/action');

const app = express();
const port = 3000;

// Prepare game database
const db = initService.createDatabase();

app.use( express.static(__dirname + '/resources') );
app.use( express.urlencoded({
    extended: true
}) );
app.use( express.json() );

viewsEndpoints.build(app, __dirname);

paramsEndpoints.build(app, db);

actionsEndpoints.build(app, db);

eventQueue.setDatabase( db );

app.listen(port, () => console.log(`App listening on port ${port}!`));

setInterval(() => {
    gameLoop.process( db );
}, 60000);

// Testting purposes
//const eventQueue = require('./src/queue');
//const moment = require('./node_modules/moment');
// eventQueue.addEventToQueue('GENERAL_EVENT', 0, moment(new Date()).add(10, 's').toDate(), {} );
// setTimeout(() => {
//     eventQueue.addEventToQueue('1000 EVENT', 0, moment(new Date()).add(10, 's').toDate(), {} );
// }, 1000);
// setTimeout(() => {
//     eventQueue.addEventToQueue('200 EVENT', 0, moment(new Date()).add(5, 's').toDate(), {} );
// }, 200);
// eventQueue.addEventToQueue('NOW_EVENT', 0, new Date(), {} );
// eventQueue.addEventToQueue('LATE_EVENT', 0, moment(new Date()).subtract(10, 's').toDate(), {} )

// for (let i = 0; i < 1000; i++) {
//     eventQueue.addEventToQueue(`EVENT ${i}`, 0, moment(new Date()).add(Math.random() * 10000, 'ms').toDate(), {} );
// }

