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
      };


      var stationId = $stateParams.id;
            MusicFactory.playMyStation(stationId).success( function(data){
        $scope.songs= [];

        var genre = data.genre;


        var song = data.songs;


        MusicFactory.playRandom().success( function(data){

          // filter the stuff based on inputs
          var filtered = data.filter( function(track){


            // if second param is undefined

            if(song === undefined){

              if( track.genre.toLowerCase().indexOf(genre.toLowerCase())  !== -1 )

            return track;


          // if first param is undefined

          } else if(genre === undefined){

            if( track.title.indexOf(song) !== -1 )

            return track;


          // or if they selected both

          }else{


             if( track.genre.toLowerCase().indexOf(genre.toLowerCase())  !== -1 &&
              track.title.indexOf(song) !== -1)

              return track;
          }

          });

          shuffle(filtered);

          filtered.forEach( function(x){
            $scope.songs.push(new Track(x));
          });





          }).then($timeout(function(){

           $scope.songs.forEach( function(x){
              angularPlayer.addTrack(x);
              $rootScope.loader = true;
          });
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
