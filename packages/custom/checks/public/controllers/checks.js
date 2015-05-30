'use strict';
/* jshint -W098 */
(function(){
  var ChecksController = function($scope, Global, Checks) {
    $scope.global = Global;
    $scope.checks = [];
    
    Checks.query({}, function(checks){
      $scope.checks = checks;
    });

  };

  var dependencies = ['$scope', 'Global', 'Checks', ChecksController];

  angular.module('mean.checks').controller('ChecksController', dependencies);
})();
