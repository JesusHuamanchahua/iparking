'use strict';

angular.module('mean.checks').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('checks example page', {
      url: '/checks/example',
      templateUrl: 'checks/views/index.html'
    });
  }
]);
