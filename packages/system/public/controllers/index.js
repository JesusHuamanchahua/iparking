'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', '$timeout', '$modal', 'Global',
  function($scope, $timeout, $modal, Global) {
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
    
    $scope.saveCheck = function($event) {
      console.log('Checked!!!');
      Materialize.toast('<span>Item Deleted</span><a class=&quot;btn-flat yellow-text&quot; href=&quot;#!&quot;>Undo<a>', 5000);
      $event.preventDefault();
    };

    $(document).ready(function() {
            $('ul.tabs').tabs();
        });
  }
]);
