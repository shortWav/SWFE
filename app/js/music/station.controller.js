;( function(){

  'use strict';

  angular.module('App')

  .controller('StationCtrl',

    function($timeout, $scope, $http) {

      // track index
      var endpoint = 'https://api.soundcloud.com/users/14646252/tracks.json?client_id=242a1e223a2af256f37ce3648bb93104';

      // prototype that makes all strings capitalized
      Array.prototype.myUcase = function(){
      for (var i = 0, len = this.length; i < len; i += 1){
        this[i] = this[i][0].toUpperCase() + this[i].slice(1);
      }return this;
    };

      $scope.genres= [];
  $scope.loadUsers = function() {
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
          $scope.genres.myUcase();
          // alphabetize
          $scope.genres.sort();
          //get rid of doubles
          $scope.genre = _.uniq($scope.genres);

        });

      }, 650);

    };


  });

}());
