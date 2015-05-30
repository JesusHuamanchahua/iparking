'use strict';

angular.module('mean.checks').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('checks', {
      url: '/checks',
      templateUrl: 'checks/views/index.html'
    });
  }
]);
