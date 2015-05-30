'use strict';

angular.module('mean.checks').factory('Checks', ['$resource', 
  function($resource) {
        return $resource('/checks/:checkId', {
            checkId: '@_id'
        });
    }
]);
