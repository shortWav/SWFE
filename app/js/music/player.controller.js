;( function(){

  'use strict';

  angular.module('App')

  .controller('PlayerCtrl', ['$scope', 'MusicFactory', '$timeout',

   function ($scope, MusicFactory, $timeout) {

    MusicFactory.playRandom().success( function(data){
      var track = data[Math.floor(Math.random()*data.length)];

       $scope.songs = new Track(track);


    }).then($timeout(function(){
      $scope.songs.play();
    }, 1000));


  }]);


}());
