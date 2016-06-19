'use strict';

/**
 * @ngdoc service
 * @name vspApp.flowplayer
 * @description
 * # flowplayer
 * Factory in the vspApp.
 */
angular.module('vspApp')
  .factory('flowplayer', function (localStorageService, $log, subtitle, $rootScope) {
    var defaults = {
      showErrors : true,
      onError : function(code, message){
        // $rootScope.addAlert({type:'danger', msg: message});
      },
      clip:  {
        autoPlay: false,
        autoBuffering: true,
        scaling : 'fit',
        provider: 'stream',
      },
      plugins: {
        content: {
          bottom: 25,
          height:90,
          backgroundColor: 'transparent',
          backgroundGradient: 'none',
          border: 0,
          textDecoration: 'outline',
          style: {
            body: {
              fontSize: 20,
              fontFamily: 'Arial',
              textAlign: 'center',
              color: '#ffffff'
            }
          },
          url: 'swf/flowplayer.content-3.2.8.swf'
        },
        stream: {
          url: 'swf/flowplayer.pseudostreaming-3.2.11.swf'
          //                queryString : escape('&start=${start}')
        }
      },
      source : ''
    };
    $log.debug('Default Configurations', defaults);

    var storedOptions = localStorageService.get('player');
    // if (storedOptions)
    //   $rootScope.addAlert({type : 'success', msg: 'Settings from the last session are loaded'});

    $log.debug('Stored Configurations', storedOptions);

    var options = _.extend({}, defaults, storedOptions);
    var api = {};
    var player, subArray;


    return function(playerID){
      function initPlayer(ops) {
        options = _.extend(options, ops);
        localStorageService.set('player',options);
        $log.debug('Player initialized with ', options);
        player =  flowplayer(playerID, '/swf/flowplayer-3.2.15.swf', options)
      }

      api.getSubtitles = function(){
        return subArray;
      };

      api.seekTo = function(time){
        player.seek(time);
      };

      api.updateSubtitles = function(subArray){
        if(_.isEmpty(subArray)){
          // $rootScope.addAlert({type : 'danger', msg: 'No subtitles found in the file/text. Are you sure the file is a SRT file?'});
          return;
        }

        var cuePoints = _.flatten(_.map(subArray, function(sub){
          return [sub.startTime, sub.endTime];
        }));

        var startTimeIndex = _.object(_.map(subArray, function(sub){
          return [sub.startTime, sub.text];
        }));

        var endTimeIndex = _.object(_.map(subArray, function(sub){
          return [sub.endTime, sub.text];
        }));

        var content = player.getPlugin('content');
        if (content){
          player.onCuepoint(cuePoints, function(clip, time) {
            var subtitle = startTimeIndex[time];
            if (subtitle){
              content.setHtml(subtitle);
            }else if(endTimeIndex[time]){
              content.setHtml("");
            }
          });
        }else{
          // $rootScope.addAlert({type : 'danger', msg: 'Something wrong with the player.'});
        }
      };

      api.getPlayerStatus = function(){
        return player.getStatus();
      };

      api.updateVideo = function(source, url, suffix){
        var options = {
          clip: {
            url: url
          }
        };
        if (suffix)
          options.plugins = {
            stream: {
              queryString: escape('&' + suffix + '=${start}')
            }
          };
        initPlayer(options);
      };

      api.addSubtitlesFromText = function(sub){
        subArray = subtitle(sub.text);
        api.updateSubtitles(subArray);
      };

      return api;
    };
 });
