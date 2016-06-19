'use strict';

/**
 * @ngdoc function
 * @name vspApp.controller:AlertsCtrl
 * @description
 * # AlertsCtrl
 * Controller of the vspApp
 */
angular.module('vspApp')
  .controller('AlertsCtrl', function ($rootScope, $scope) {
      $scope.alerts = [
        //{ type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
        //{ type: 'success', msg: 'Well done! You successfully read this important alert message.' }
      ];

      $rootScope.addAlert = function(alert){
        $scope.alerts.push(alert);
        $scope.$apply();
      };

      $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
      };
  });
