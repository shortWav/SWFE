;( function(){

  'use strict';

  angular.module('App')

  .controller('StationCtrl', ['$timeout', '$scope', '$http', '$state', 'MusicFactory',

    function($timeout, $scope, $http, $state, $MusicFactory) {

      $scope.isOpen = false;
      $scope.demo = {
        isOpen: false,
        count: 0,
        selectedAlignment: 'md-left'
      };
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

    $scope.loadStation = function(){

      $state.go('find-station.radio');

    };

  }]);

}());
