'use strict';
var Grid = require('gridfs-stream');

// The Package is past automatically as first parameter
module.exports = function(Admin, app, auth, database) {
    var gfs = new Grid(database.connection.connections[0].db, database.connection.mongo);
    var mean = require('meanio');

    //Setting up the users api
    var users = require('../controllers/users');
    app.get('/admin/users', auth.requiresAdmin, users.all);
    app.post('/admin/users', auth.requiresAdmin, users.create);
    app.get('/admin/users/:anUserId', users.show);
    app.put('/admin/users/:userId', auth.requiresAdmin, users.update);
    app.delete('/admin/users/:userId', auth.requiresAdmin, users.destroy);

    //Setting up the users api
    var themes = require('../controllers/themes');
    app.get('/admin/themes', auth.requiresAdmin, function(req, res) {
        themes.save(req, res, gfs);
    });
    app.get('/admin/themes/defaultTheme', auth.requiresAdmin, function(req, res) {
        themes.defaultTheme(req, res, gfs);
    });

    app.get('/admin/themes/defaultTheme', auth.requiresAdmin, function(req, res) {
        themes.defaultTheme(req, res, gfs);
    });

    app.get('/admin/modules', auth.requiresAdmin, function(req, res) {
        var modules = {};
        for (var name in mean.modules)
            modules[name] = mean.modules[name];
        res.jsonp(modules);
    });

    var settings = require('../controllers/settings');
    app.get('/admin/settings', auth.requiresAdmin, settings.get);
    app.put('/admin/settings', auth.requiresAdmin, settings.save);

    app.param('anUserId', users.user);
};