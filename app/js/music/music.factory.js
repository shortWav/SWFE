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


    // toggle play/pause
    var togglePlay = function(x){
      var play = "play_arrow";
      var pause = "pause";
      $('#moon').toggleClass('moon-orbit-animation');
      $('#satellite').toggleClass('satellite-orbit-animation');

      if (x === true){
        $('#playIcon').text(pause);

      } else {
        $('#playIcon').text(play);

      }

    };


    // Toggle mute function

    var toggleMute = function(x){
      var muted = "volume_off";
      var sound = "volume_mute";

      if (x === false) {
        $('#muteIcon').text(muted);
        } else{
          $('#muteIcon').text(sound);
      }
    };


    // stop toggle

    var stopToggle = function(){
      var play = "play_arrow";
      $('#playIcon').text(play);
      $('#moon').removeClass('moon-orbit-animation');
      $('#satellite').removeClass('satellite-orbit-animation');
    };


    return {
      playRandom : playRandom,
      togglePlay : togglePlay,
      toggleMute : toggleMute,
      stopToggle : stopToggle

    };
  }]);


}());
