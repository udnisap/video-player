'use strict';

/**
 * @ngdoc directive
 * @name vspApp.directive:fileread
 * @description
 * # fileread
 */
angular.module('vspApp')
  .directive('fileread', function () {
    return {
      scope: {
        fileread: "="
      },
      link: function (scope, element, attributes) {
        element.bind("change", function (changeEvent) {
          if (!FileReader){
            console.error("File Reader not found");
            return;
          }
          var reader = new FileReader();
          reader.onload = function (loadEvent) {
            scope.$apply(function () {
              scope.fileread = loadEvent.target.result;
            });
          };
          reader.readAsText(changeEvent.target.files[0]);
        });
      }
    }
  });
