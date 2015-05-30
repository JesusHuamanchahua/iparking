'use strict';

/* jshint -W098 */
angular.module('mean.checks').controller('ChecksController', ['$scope', 'Global', 'Checks',
  function($scope, Global, Checks) {
    $scope.global = Global;
    $scope.package = {
      name: 'checks'
    };
  }
]);
