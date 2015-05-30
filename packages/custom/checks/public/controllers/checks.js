'use strict';
/* jshint -W098 */
(function(){
  var ChecksController = function($scope, Global, Checks) {
    $scope.global = Global;
    $scope.checks = [];
    
    Checks.query({}, function(checks){
      angular.forEach(checks, function(check){
        check.time = moment(check.created).format('h:mm:ss a');
        check.date = moment(check.created).format('dddd D MMMM YYYY').split(' ');
        check.date.splice(check.date.length - 2, 0, 'de');
        check.date.splice(check.date.length - 1, 0, 'de');
        check.date = check.date.join(' ');
      });
      
      $scope.checks = checks;
    });

  };

  var dependencies = ['$scope', 'Global', 'Checks', ChecksController];

  angular.module('mean.checks').controller('ChecksController', dependencies);
})();
