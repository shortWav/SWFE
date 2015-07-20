;( function(){

  'use strict';
  angular.module('App')

  .controller('NowPlayingCtrl', ['$scope', 'MusicFactory', '$rootScope', 'angularPlayer',
    function ($scope, MusicFactory, $rootScope, angularPlayer) {

$scope.currentPlaying = angularPlayer.currentTrackData();

            //toggle play pause icon
 $scope.played = function(x){
  x = $scope.isPlaying;
  MusicFactory.togglePlay(x);

 };
      // toggle mute icon
 $scope.muteButton = function(x){
  x = $scope.mute;
  MusicFactory.toggleMute(x);

 };

 $scope.stopIt = function(){

  MusicFactory.stopToggle();

 };
 $scope.favIt = function(station){
      MusicFactory.favStation(station);
  };
 $scope.thumbit = function(song){
      MusicFactory.favSong(song);
  };

  }]);

}());
