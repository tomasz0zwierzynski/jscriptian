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


    }

}