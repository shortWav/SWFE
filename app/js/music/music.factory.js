;( function(){

  'use strict';

  angular.module('App')


  .factory('MusicFactory', ['$http',
    function ($http) {

    var endpoint = 'https://api.soundcloud.com/users/19342225/tracks.json?client_id=242a1e223a2af256f37ce3648bb93104';


      // Get random track from the list and play it.
    var playRandom = function(){

    return $http.get(endpoint);

    };

    return {
      playRandom : playRandom
    };
  }]);


}());
