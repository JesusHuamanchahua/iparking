'use strict';

angular.module('mean.checks').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider
    .state('checks', {
      url: '/admin/checks',
      templateUrl: 'checks/views/index.html'
    })
    .state('user checks', {
      url: '/admin/users/:userId/checks',
      templateUrl: 'checks/views/user-checks.html'
    });
  }
]);
