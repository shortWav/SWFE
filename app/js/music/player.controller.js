;( function(){

  'use strict';

  angular.module('App')

  .controller('PlayerCtrl', ['$scope', 'MusicFactory', '$timeout', 'angularPlayer', '$sce', '$mdUtil','$mdSidenav',

   function ($scope, MusicFactory, $timeout, angularPlayer, $sce, $mdUtil, $mdSidenav) {
    // nav toggles
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
        this.user = options.user;
        this.id = options.id;
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

    MusicFactory.playRandom().success( function(data){

      shuffle(data);
      $scope.songs = [];
      data.forEach( function(x){

        $scope.songs.push(new Track(x));

      });
      }).then($timeout(function(){
        $scope.songs.forEach( function(x){
            angularPlayer.addTrack(x);

        });
          // then play the bitch
          angularPlayer.play($scope.songs);
          angularPlayer.repeatToggle();

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
