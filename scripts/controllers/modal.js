'use strict';

/**
 * @ngdoc function
 * @name vspApp.controller:ModalCtrl
 * @description
 * # ModalCtrl
 * Controller of the vspApp
 */
angular.module('vspApp')
  .controller('ModalCtrl', function ($scope, content, $modalInstance) {
    $scope.title = content.title;
    $scope.body = content.body;

    $scope.ok = function () {
      $modalInstance.close('OK');
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
