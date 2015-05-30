'use strict';
(function() {
    var IndexController = function($scope, $timeout, $modal, Global, Checks) {
        $scope.global = Global;
        $scope.checkIn = true;

        moment.locale('es');

        var computeTime = function() {
            var now = moment();
            $scope.time = now.format('h:mm:ss a');
            $scope.date = now.format('dddd D MMMM YYYY');
            $timeout(computeTime, 1000);
        };

        computeTime();

        var getMessage = function(check) {
            var message = check.type === 'in' ? 'Wellcome' : 'Goodbye';

            message += ' ' + check.user.name + ' <i class=&quot;mdi-social-mood yellow-text&quot; href=&quot;#!&quot;>Undo<i>';

            return message;
        };

        $scope.saveCheck = function($event) {
            $event.preventDefault();

            var type = $scope.checkIn ? 'in' : 'out';

            Checks.save({
                username: $scope.username,
                type: type
            }, function(check) {
                console.log(check);
                $scope.username = '';
                Materialize.toast(getMessage(check), 2000);
            }, function(err) {
                console.log(err);
                if(err.status === 500 || err.status === 404) {
                  $scope.username = '';
                }
                Materialize.toast(err.data, 2000);
            });
        };

        $scope.focus = function(id) {
            $timeout(function() {
                var element = document.getElementById(id);
                
                if (element) {
                    element.focus();
                }
            });
        };

        $(document).ready(function() {
            $scope.focus('search');
        });
    };

    var dependencies = ['$scope', '$timeout', '$modal', 'Global', 'Checks', IndexController];
    
    angular.module('mean.system').controller('IndexController', dependencies);
})();
