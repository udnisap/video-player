'use strict';

/**
 * @ngdoc function
 * @name vspApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the vspApp
 */
angular.module('vspApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
