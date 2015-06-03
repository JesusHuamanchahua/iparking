'use strict';
(function() {
    var IndexController = function($scope, $timeout, $modal, Global, Checks) {
        $scope.global = Global;
        $scope.checkIn = true;
        $scope.userId = '';

        moment.locale('es');

        var computeTime = function() {
            var now = moment();

            $scope.time = now.format('h:mm:ss a');
            $scope.date = now.format('dddd D MMMM YYYY').split(' ');
            $scope.date.splice($scope.date.length - 2, 0, 'de');
            $scope.date.splice($scope.date.length - 1, 0, 'de');
            $scope.date = $scope.date.join(' ');

            $timeout(computeTime, 1000);
        };

        computeTime();

        var getMessage = function(check) {
            var message = check.type === 'in' ? 'Wellcome' : 'Goodbye';

            message += '<span style="width: 6px;"></span><span class="yellow-text">' + check.user.name + '</span>';

            return message;
        };

        $scope.saveCheck = function() {
            if (!$scope.userId) {
              return;
            }

            var type = $scope.checkIn ? 'in' : 'out';

            Checks.save({
                userId: $scope.userId,
                type: type
            }, function(check) {
                console.log(check);
                $scope.userId = '';
                Materialize.toast(getMessage(check), 2000);
            }, function(err) {
                console.log(err);
                if (err.status === 500 || err.status === 404) {
                    $scope.userId = '';
                }

                if (typeof err.data === 'string') {
                    err.data = err.data.split(' ');
                    err.data[err.data.length - 1] = '<span style="width: 6px;"></span><span class="yellow-text">' + err.data[err.data.length - 1] + '</span>';
                    err.data = err.data.join(' ');
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
