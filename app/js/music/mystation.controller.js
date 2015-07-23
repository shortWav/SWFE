;( function(){

  'use strict';

  angular.module('App')

  .controller('MyStationCtrl', ['$scope', 'MusicFactory', '$stateParams', '$timeout', 'angularPlayer', '$rootScope',
    function ($scope, MusicFactory, $stateParams, $timeout, angularPlayer, $rootScope) {

      $rootScope.loader = false;

      function shuffle(array) {

        // delcare some variables
        var currentIndex = array.length,
        temporaryValue,
        randomIndex ;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      }

       var Track = function(options){
        this.title = options.title;
        this.artist = options.artist;
        this.id = options.soundcloud_id;
        this.genre = options.genre;
        this.albumArt= options.artwork_url;
        this.description = options.description;
        this.license= options.license;
        this.soundcloudLink = options.permalink_url;
        this.wavePic = options.wavform_url;
        this.url = options.stream_url + '?client_id='+ clientId;
        this.location = options.location;
      };


      var stationId = $stateParams.id;
      MusicFactory.playMyStation(stationId).success( function(data){
        $scope.songs= [];

       var sCity = data.city;
      var sState = data.state;

      var params = {
        city: sCity,
        state: sState,

      };


      MusicFactory.searchStations(params).success( function(data){
       // show preloader
       $rootScope.loader = false;

       // shuffle data
      shuffle(data);

      $scope.songs = [];
      data.forEach( function(x){

        $scope.songs.push(new Track(x));

      });

      }).then($timeout(function(){
        $scope.songs.forEach( function(x){
            angularPlayer.addTrack(x);

        });

        $rootScope.loader = true;
          // then play the bitch
          angularPlayer.play($scope.songs);
          angularPlayer.repeatToggle();

      }, 1000));

        $scope.station = data.results;
      });


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

        // stop button change play icon
     $scope.stopIt = function(){

      MusicFactory.stopToggle();

     };
     // fav song
     $scope.thumbit = function(song){
      MusicFactory.favSong(song);

      };








  }]);


}());
