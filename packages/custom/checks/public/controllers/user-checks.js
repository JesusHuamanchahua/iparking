'use strict';
/* jshint -W098 */
(function() {
    var UserChecksController = function($scope, $state, $stateParams, Global, Users, Checks) {
        $scope.global = Global;
        $scope.checks = [];
        console.log(Global);

        Users.get({
            userId: $stateParams.userId
        }, function(user) {
            $scope.user = user;
        });

        var ChecksGroup = function(checkin, checkout) {
            this.in = checkin;
            this.out = checkout;
            if (checkout) {
                var duration = moment.duration(moment(checkout.created).diff(moment(checkin.created))),
                    hours = parseInt(duration.asHours()),
                    minutes = parseInt(duration.asMinutes()),
                    seconds = parseInt(duration.asSeconds()) - minutes * 60;
                minutes -= hours * 60;
                console.log(hours, minutes, seconds);
                this.duration = '';
                if (hours) {
                    this.duration += hours + ' hr' + (hours > 1 ? 's' : '');
                }
                if (minutes) {
                    this.duration += ' ' + minutes + ' min' + (minutes > 1 ? 's' : '');
                }
                if (seconds) {
                    this.duration += ' ' + seconds + ' sec' + (seconds > 1 ? 's' : '');
                }
            }
        };


        Checks.query({
            user: $stateParams.userId
        }, function(checks) {
            angular.forEach(checks, function(check) {
                check.time = moment(check.created).format('h:mm:ss a');
                check.date = moment(check.created).format('dddd D MMMM YYYY').split(' ');
                check.date.splice(check.date.length - 2, 0, 'de');
                check.date.splice(check.date.length - 1, 0, 'de');
                check.date = check.date.join(' ');
            });

            var groupedChecks = [];

            for (var i = checks.length - 1; i >= 0; i -= 2) {
                groupedChecks.push(new ChecksGroup(checks[i], checks[i - 1]));
            }

            groupedChecks = groupedChecks.reverse();
            console.log(groupedChecks);
            $scope.checks = groupedChecks;
        });
    };

    var dependencies = ['$scope', '$state', '$stateParams', 'Global', 'Users', 'Checks', UserChecksController];

    angular.module('mean.checks').controller('UserChecksController', dependencies);
})();
