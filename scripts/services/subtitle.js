'use strict';

/**
 * @ngdoc service
 * @name vspApp.subtitle
 * @description
 * # subtitle
 * Service in the vspApp.
 */
angular.module('vspApp')
  .factory('subtitle', function () {
    var DATE_FORMAT = "HH:mm:ss,SSS";
    var referenceTime = moment("00:00:00,000", "HH:mm:ss,SSS");


    function floorTime(rawtime){
      var time = moment(rawtime, DATE_FORMAT)
      var sec = time.diff(referenceTime);
      return Math.floor(sec/100)*100;
    }

    return function(text){
      //console.log("-----------------");
      var segments = text.split(/\n\r/m);
      // console.log("Segments", segments);
      return _.compact(_.map(segments, function(segment){
        var lines = _.compact(segment.split(/\n/));
        // console.log("lines", lines);
        if (_.isEmpty(lines))
          return "";

        var times = /([^ ]+) --> ([^ ]+)/.exec(lines[1]);
        if (_.isEmpty(times))
          return "";

        //console.log("time", times);
        return {
            startTime : floorTime(times[1]),
            endTime : floorTime(times[2]),
            text : _.rest(lines,2).join("\n")
        };
      }));
    }
  });
