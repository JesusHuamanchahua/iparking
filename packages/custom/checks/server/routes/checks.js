'use strict';

/* jshint -W098 */

var checks = require('../controllers/checks');

// The Package is past automatically as first parameter
module.exports = function(Checks, app, auth, database) {

  app.get('/checks/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/checks/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/checks/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  // Checks API 
  app.route('/checks')
    .get(checks.all)
    .post(checks.create);

  app.get('/checks/example/render', function(req, res, next) {
    Checks.render('index', {
      package: 'checks'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};