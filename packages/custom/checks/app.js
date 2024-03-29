'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var Checks = new Module('checks');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
Checks.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  Checks.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  Checks.menus.add({
    title: 'Checks',
    link: 'checks',
    roles: ['admin'],
    menu: 'admin'
  });
  
  Checks.aggregateAsset('css', 'checks.css');

  Checks.angularDependencies(['mean.mean-admin']);

  /**
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    Checks.settings({
        'someSetting': 'some value'
    }, function(err, settings) {
        //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    Checks.settings({
        'anotherSettings': 'some value'
    });

    // Get settings. Retrieves latest saved settigns
    Checks.settings(function(err, settings) {
        //you now have the settings object
    });
    */

  return Checks;
});
