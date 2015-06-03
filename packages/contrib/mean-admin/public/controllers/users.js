'use strict';

angular.module('mean.mean-admin').controller('UsersController', ['$scope', 'Global', 'Menus', '$rootScope', '$http', 'Users',
    function($scope, Global, Menus, $rootScope, $http, Users) {
        var s4 = function() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        },guid = function() {
            return s4() + s4() + '' + s4() + '' + s4() + '' +
                s4() + '' + s4() + s4() + s4();
        };

        $scope.global = Global;
        $scope.userSchema = [{
            title: 'Email',
            schemaKey: 'email',
            type: 'text',
            inTable: true
        }, {
            title: 'Name',
            schemaKey: 'name',
            type: 'text',
            inTable: true
        }, {
            title: '#Control',
            schemaKey: 'registration_tag',
            type: 'text',
            inTable: true
                // }, {
                //     title: 'Roles',
                //     schemaKey: 'roles',
                //     type: 'select',
                //     options: ['authenticated', 'admin'],
                //     inTable: true
        }];
        $scope.user = {};
        $scope.edit = false;

        $scope.goEdit = function() {
            console.log('goEdit');
            $scope.edit = true;
        };

        $scope.editDone = function() {
            console.log('editDone');
            $scope.edit = false;
        };

        $scope.init = function() {
            Users.query({}, function(users) {
                $scope.users = users;
            });
        };

        var getMessage = function(response) {
            var message;

            if (response.data && response.data instanceof Array && response.data[0].msg) {
                message = response.data[0].msg;
            } else {
                message = 'User saved<span style="width: 6px;"></span><span class="yellow-text"> ' + (response.name ? 'Successfully' : 'Failed') + ' </span>';
            }

            return message;
        };

        $scope.openModal = function(modalSelector) {
            $(modalSelector).openModal();
        };

        $scope.closeModal = function(modalSelector) {
            $(modalSelector).closeModal();
        };

        $scope.add = function() {
            if (!$scope.users) $scope.users = [];

            var user = new Users({
                email: $scope.user.email,
                name: $scope.user.name,
                registration_tag: $scope.user.registration_tag,
                password: $scope.user.password,
                confirmPassword: $scope.user.password,
                roles: $scope.user.isAdmin ? ['authenticated', 'admin'] : ['authenticated']
            });

            user.$save(function(response) {
                $scope.user = {};
                console.log(response);
                $scope.users.push(response);
                $scope.closeModal('#new-user-modal');
                Materialize.toast(getMessage(response), 2000);
            }, function(error) {
                console.log(error);
                Materialize.toast(getMessage(error), 2000);
            });

            this.firstName = this.lastName = this.email = this.password = this.role = '';
        };

        $scope.remove = function(user) {
            for (var i in $scope.users) {
                if ($scope.users[i] === user) {
                    $scope.users.splice(i, 1);
                }
            }

            user.$remove(function() {
                Materialize.toast(getMessage({
                    data: [{
                        msg: 'User removed<span style="width: 6px;"></span><span class="yellow-text"> Successfully </span>'
                    }]
                }), 2000);
            });
        };

        $scope.update = function(user, userField) {
            if (userField && userField === 'roles' && user.roles.indexOf('admin') === -1) {
                if (confirm('Are you sure you want to remove "admin" role?')) {
                    user.$update();
                } else {
                    user.roles = user.tmpRoles;
                }
            } else
                user.$update(function(){
                    Materialize.toast(getMessage({
                    data: [{
                        msg: 'User updated<span style="width: 6px;"></span><span class="yellow-text"> Successfully </span>'
                    }]
                }), 2000);
                });
        };

        $scope.beforeSelect = function(userField, user) {
            if (userField === 'roles') {
                user.tmpRoles = user.roles;
            }
        };

        $('.modal-trigger').leanModal();
    }
]);