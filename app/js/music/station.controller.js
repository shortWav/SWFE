;( function(){

  'use strict';

  angular.module('App')

  .controller('StationCtrl', ['$timeout', '$scope', '$http', '$state', 'MusicFactory', 'angularPlayer', '$rootScope',

    function($timeout, $scope, $http, $state, MusicFactory, angularPlayer, $rootScope) {

      // track index
      var endpoint = 'https://api.soundcloud.com/users/19342225/tracks.json?client_id=242a1e223a2af256f37ce3648bb93104';

        // prototype that makes all first letters in strings capitalized
        Array.prototype.upperCaseThis = function(){

        for (var i = 0;  i < this.length; i += 1){

          this[i] = this[i][0].toUpperCase() + this[i].slice(1);

        }
        return this;

      };


        $scope.genres= [];



         // Load genres function
      $scope.loadGenres = function() {
        // Use timeout to simulate a 650ms request.

        return $timeout(function() {
          $http.get(endpoint)
            .success( function(data){
              data.forEach( function(x){

                // push to first array
                $scope.genres.push(x.genre.toLowerCase());

              });

            }).then(function(x){
              // capitalize all genres
              $scope.genres.upperCaseThis();
              // alphabetize
              $scope.genres.sort();
              //get rid of doubles
              $scope.genre = _.uniq($scope.genres);

            });

          }, 650);

        };



        // Load Tracks function
      $scope.loadTracks = function(x){


        // If no genre is defined, then run this
        if(x === undefined){

          $scope.genreSongs = [];

          $http.get(endpoint).success( function(data){
            $scope.genreSongs = data.map( function(x){
              return x;
            });
          });

          return $scope.genreSongs;


          // if theres a genre then do this
        }else{

          var selectedGenre = x.genre.toLowerCase();

          $http.get(endpoint).success( function(data){

            $scope.genreSongs = data.filter( function(item){
              return item.genre.toLowerCase() === selectedGenre;

            });

           return $scope.genreSongs;

        });
      }

    };
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


   // load the station of choice
    $scope.loadStation = function(x){

      var genre = x.genre;


      var song = x.songs;


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

        // get a random track from the array

        var randomTrack = filtered[Math.floor(Math.random()*filtered.length)];

        // run it through the constructor
        $scope.songs= new Track(randomTrack);

        }).then($timeout(function(){

          // then play the bitch
          $scope.songs.play();

      }, 1000));

        // show the radio
      $state.go('find-station.radio');


    };

  }]);

}());
