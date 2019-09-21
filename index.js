const express = require('express');
const initService = require('./src/init/init');
const intervalServices = require('./src/interval-services');
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

intervalServices.start();

