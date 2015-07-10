;( function(){

  'use strict';

  angular.module('App')

  .controller('PlayerCtrl', ['$scope', 'MusicFactory', '$timeout', 'angularPlayer', '$sce',

   function ($scope, MusicFactory, $timeout, angularPlayer, $sce) {



    // Track constructor
      var Track = function(options){
        this.title = options.title;
        this.user = options.user;
        this.id = options.id;
        this.genre = options.genre;
        this.albumArt= options.artwork_url;
        this.description = options.description;
        this.license= options.license;
        this.soundcloudLink = options.permalink_url;
        this.wavePic = options.wavform_url;
        this.url = options.stream_url + '?client_id=242a1e223a2af256f37ce3648bb93104';
        this.play = function(){
          angularPlayer.addTrack($scope.songs);
          angularPlayer.play($scope.songs);

        };
      };

    MusicFactory.playRandom().success( function(data){
      var track = data[Math.floor(Math.random()*data.length)];

       $scope.songs = new Track(track);

      }).then($timeout(function(){
        $scope.songs.play();
      }, 1000));


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




  }]);


}());
