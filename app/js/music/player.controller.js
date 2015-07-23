;( function(){

  'use strict';

  angular.module('App')

  .controller('PlayerCtrl', ['$scope', 'MusicFactory', '$timeout', 'angularPlayer', '$sce', '$mdUtil','$mdSidenav', '$rootScope',

   function ($scope, MusicFactory, $timeout, angularPlayer, $sce, $mdUtil, $mdSidenav, $rootScope) {

    $('.collection-item').removeClass('active');
      $("#myListen").addClass('active');
       $("#myListen1").addClass('active');


    // nav toggles

      $(".bar").removeClass("noAnim");
      $scope.toggleLeft = buildToggler('left');
      $scope.toggleRight = buildToggler('right');


      function buildToggler(navID) {
        var debounceFn =  $mdUtil.debounce(function(){
              $mdSidenav(navID)
                .toggle();
            },300);
        return debounceFn;
      }



    // Track constructor
      var Track = function(options){
        this.title = options.title;
        this.userdata = options.user;
        this.id = options.soundcloud_id;
        this.genre = options.genre;
        this.albumArt= options.artwork_url;
        this.description = options.description;
        this.license= options.license;
        this.soundcloudLink = options.permalink_url;
        this.wavePic = options.wavform_url;
        this.url = options.stream_url + '?client_id='+ clientId;
      };

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


      // if theres not a song currently playing

    if (angularPlayer.isPlayingStatus() === false){
    MusicFactory.playRandom().success( function(data){
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
          console.log($scope.playlist);
          console.log($scope.songs);
          console.log($scope.currentPlaying);
      }, 1000));

    }else{
      $scope.currentPlaying = angularPlayer.currentTrackData();
    }


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
    // stop button
 $scope.stopIt = function(){

  MusicFactory.stopToggle();

 };

 // fav station
 $scope.favIt = function(station){
      MusicFactory.favStation(station);
  };

  // fav track
 $scope.thumbit = function(song){
      MusicFactory.favSong(song);
  };



  }]);


}());
