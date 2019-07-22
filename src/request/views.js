const path = require('path');

module.exports = {

    build: function (app, dirname) {

        app.get('/', (req, res) => {
            res.sendFile(path.join(dirname, 'resources', 'sites.html'));
        });

        app.get('/login', (req, res) => {
            res.sendFile(path.join(dirname, 'resources', 'login.html'));
        });

        app.get('/sites', (req, res) => {
            res.sendFile(path.join(dirname, 'resources', 'sites.html'));
        });

        app.get('/site', (req, res) => {
            res.sendFile(path.join(dirname, 'resources', 'site.html'));
        });

        app.get('/center', (req, res) => {
            res.sendFile(path.join(dirname, 'resources', 'center.html'));
        });

        app.get('/map', (req, res) => {
            res.sendFile(path.join(dirname, 'resources', 'map.html'));
        });

        app.get('/player', (req, res) => {
            res.sendFile(path.join(dirname, 'resources', 'player.html'));
        });

        app.get('/construction', (req, res) => {
            res.sendFile(path.join(dirname, 'resources', 'construction.html'));
        });

        app.get('/new-site', (req, res) => {
            res.sendFile(path.join(dirname, 'resources', 'new-site.html'));
        });

        app.get('/new-construction', (req, res) => {
            res.sendFile(path.join(dirname, 'resources', 'new-construction.html'));
        });

    }

}