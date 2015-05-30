'use strict';
/* jshint -W098 */
(function() {
    var UserChecksController = function($scope, $state, $stateParams, Global, Users, Checks) {
        $scope.global = Global;
        $scope.checks = [];
        console.log(Global);
        // Users.get({
        //     userId: $routeParams.userId
        // }, function(user) {
        //     $scope.global.user
        // }, function(err) {
        //   $location.href('/admin/users');
        // });

        // Checks.query({
        //     user: $stateParams.userId
        // }, function(checks) {
        //     angular.forEach(checks, function(check) {
        //         check.time = moment(check.created).format('h:mm:ss a');
        //         check.date = moment(check.created).format('dddd D MMMM YYYY').split(' ');
        //         check.date.splice(check.date.length - 2, 0, 'de');
        //         check.date.splice(check.date.length - 1, 0, 'de');
        //         check.date = check.date.join(' ');
        //     });

        //     $scope.checks = checks;
        // });
      console.log('UserChecksController');
    };

    var dependencies = ['$scope', '$state', '$stateParams', 'Global', 'Users', 'Checks', UserChecksController];

    angular.module('mean.checks').controller('UserChecksController', dependencies);
})();
