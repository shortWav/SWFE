;( function(){

  'use strict';

  angular.module('App')


  .factory('MusicFactory', ['$http', 'PARSE', '$cookies',
    function ($http, PARSE, $cookies) {

    var endpoint = 'https://api.soundcloud.com/users/14646252/tracks.json?client_id=242a1e223a2af256f37ce3648bb93104';

    var stationsEnd = PARSE.URL + 'classes/Stations_test/';

    var songsEnd = PARSE.URL + 'classes/Songs_test1';

    var Station = function(options){
      this.genre = options.genre;
      this.title = options.songs;
      this.user = options.user;
      this.ACL = options.ACL;

    };

    var Track = function(options){
        this.title = options.title;
        this.userdata = options.userdata;
        this.id = options.id;
        this.genre = options.genre;
        this.albumArt= options.albumArt;
        this.description = options.description;
        this.license= options.license;
        this.soundcloudLink = options.soundcloudLink;
        this.wavePic = options.wavPic;
        this.url = options.url;
        this.user = options.user;
        this.ACL = options.ACL;
      };

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

    var favStation = function(station){

      var userID = $cookies.get('userObjectId');

        var ACLObj = {};

        ACLObj[userID] = {
          read: true,
          write: true
        };

        station.ACL = ACLObj;

        station.user = {
          _type: 'Pointer',
          className : '_User',
          objectId: userID

        };


        var newStation = new Station (station);


        return $http.post(stationsEnd, newStation, PARSE.CONFIG);

    };

    var getStations = function(){
      return $http.get(stationsEnd, PARSE.CONFIG);
    };

    var playMyStation = function(station){

      return $http.get(stationsEnd + station, PARSE.CONFIG);

    };

    var favSong = function(song){
      console.log(song);
       var userID = $cookies.get('userObjectId');

        var ACLObj = {};

        ACLObj[userID] = {
          read: true,
          write: true
        };

        song.ACL = ACLObj;

        song.user = {
          _type: 'Pointer',
          className : '_User',
          objectId: userID

        };


        var newSong = new Track (song);


        return $http.post(songsEnd, newSong, PARSE.CONFIG);

    };

    var getSongs= function(){
      return $http.get(songsEnd, PARSE.CONFIG);
    };

    var deleteStation = function(x){
          var d = stationsEnd + x.objectId;
          return $http.delete(d, PARSE.CONFIG);
        };

    return {
      playRandom : playRandom,
      togglePlay : togglePlay,
      toggleMute : toggleMute,
      stopToggle : stopToggle,
      favStation : favStation,
      getStations : getStations,
      playMyStation : playMyStation,
      favSong : favSong,
      getSongs : getSongs,
      deleteStation : deleteStation

    };
  }]);


}());
