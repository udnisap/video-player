'use strict';

/**
 * @ngdoc function
 * @name vspApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the vspApp
 */

angular.module('vspApp')
  .controller('MainCtrl', function ($scope, $modal, $rootScope,
      localStorageService, flowplayer, $log, $routeParams, sync) {
    var player = flowplayer('player');
    $scope.video = _.extend({},localStorageService.get('video'));
    $scope.subtitle = localStorageService.get('subtitle') || {};

    if (!FileReader)
      $rootScope.addAlert({type : 'danger', msg: 'You are using an old browser and you wont be able to use file uploads. Copy paste the content of the subtitle.'});

    $log.debug('Router Params',$routeParams);

    if($routeParams.url)
      $scope.video.url = decodeURIComponent($routeParams.url);

    if($routeParams.source)
      $scope.video.source = decodeURIComponent($routeParams.source);

    $scope.updateVideo = function(){
      var video = $scope.video;
      localStorageService.set('video',video);
      $log.info('Updating video', video);
      player.updateVideo(video.source, video.url, video.suffix);
    };

    $scope.updateVideo();


    $scope.addSubtitlesFromText = function(){
      var subtitle = $scope.subtitle;
      localStorageService.set('subtitle', subtitle);
      $log.info('Updating subtitle', subtitle);
      player.addSubtitlesFromText(subtitle);
    };


    $scope.collaborate = function(){
      sync.init();
    };

    $scope.sync = function(){
      console.log('Syncing');
      sync.send('sync', {
        comp : 'Subtitles',
        subtitles : $scope.subtitle
      });
      sync.send('sync', {
        comp : 'Video',
        player : $scope.video
      });
    };

    sync.onSync(function(data){
      console.log(data);
      var name, time, subs;
      switch (data.comp) {
        case 'Video':
          showModal(
            'Do you want to sync Video with ' + name + '?',
            'You will be seeked to match ' + name + ' video.'
          ).then(function () {
              player.seekTime(time);
            }, function () {
              $log.log('Video synced rejected');
            });

          break;

        case 'Subtitles':
          showModal(
            'Do you want to sync Subtitles with ' + name + '?',
            'Your subtitles will be removed and ' + name + ' subtitles will be added.'
          ).then(function () {
              player.updateSubtitles(subs);
            }, function () {
              $log.log('Subtitle synced rejected');
            });

          break;
      }
    });


    function showModal(title, body){
      var modalInstance = $modal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalCtrl',
        size: 'sm',
        resolve: {
          content: function () {
            return {body : body, title : title};
          }
        }
      });
      return modalInstance.result;
    }




  });
