'use strict';

/**
 * @ngdoc service
 * @name vspApp.sync
 * @description
 * # sync
 * Factory in the vspApp.
 */
angular.module('vspApp')
  .factory('sync', function ($log, $window) {

    var TogetherJS = $window.TogetherJS;

    TogetherJS.on('ready', function () {
      $log.info('TogetherJS init');
    });

    TogetherJS.on('close', function () {
      $log.info('TogetherJS close')
    });

    TogetherJS.config('suppressInvite', true);
    TogetherJS.config('suppressJoinConfirmation', true);
    TogetherJS.config('dontShowClicks', true);
    TogetherJS.config('cloneClicks', false);
    TogetherJS.config('ignoreMessages', true);


    return {
      onSync: function (callback) {
        TogetherJS.hub.on('sync', callback);
      },
      init : function(){
        TogetherJS(this);
      },
      send : function(type , msg){
        msg.type = type;
        TogetherJS.send(msg);
      }
    };
  });
