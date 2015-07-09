;( function(){

  'use strict';

  angular.module('App')

  .factory('MusicFactory', ['$scope', '$http','angularPlayer',
    function ($scope, $http, angularPlayer) {

  var endpoint = 'https://api.soundcloud.com/users/14646252/tracks.json?client_id=242a1e223a2af256f37ce3648bb93104';


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

      // Get random track from the list and play it.
    var playRandom = function(){

      return $http.get(endpoint).success( function(data){
      var track = data[Math.floor(Math.random()*data.length)];

       $scope.songs = new Track(track);


      }).then($timeout(function(){
        $scope.songs.play();
      }, 1000));

    };

    return {
      playRandom : playRandom
    };
  }]);


}());
