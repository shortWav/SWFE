;( function(){

  'use strict';

  angular.module('App')


  .factory('MusicFactory', ['$http', 'PARSE', '$cookies', '$rootScope',
    function ($http, PARSE, $cookies, $rootScope) {

    var endpoint = 'https://api.soundcloud.com/users/14646252/tracks.json?client_id=242a1e223a2af256f37ce3648bb93104';

    var stationsEnd = PARSE.URL + 'classes/Stations_test2/';

    var songsEnd = PARSE.URL + 'classes/Songs_test2/';

    var Station = function(options){
      this.city = options.city;
      this.state = options.state;
      this.genre = options.genre;
      this.user = options.user;
      this.ACL = options.ACL;


    };

    var Track = function(options){
        this.title = options.title;
        this.artist = options.artist;
        this.id = options.soundcloud_id;
        this.genre = options.genre;
        this.albumArt= options.artwork_url;
        this.description = options.description;
        this.license= options.license;
        this.soundcloudLink = options.permalink_url;
        this.wavePic = options.wavform_url;
        this.url = options.stream_url + '?client_id='+ clientId;
        this.location = options.location;
        this.user = options.user;
        this.ACL = options.ACL;
      };

      // Get random track from the list and play it.
    var playRandom = function(){

    return $http.get(PARSE.ARTISTURL + 'tracks');

    };


    // toggle play/pause
    var togglePlay = function(x){
      var play = "play_arrow";
      var pause = "pause";
      $('#moon').toggleClass('moon-orbit-animation');
      $('#satellite').toggleClass('satellite-orbit-animation');
      $(".bar").toggleClass("noAnim");
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
       $(".bar").addClass("noAnim");
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

    var getSongInfo = function(song){

      return $http.get(songsEnd + song, PARSE.CONFIG);

    };

    var deleteStation = function(x){
          var d = stationsEnd + x.objectId;
          return $http.delete(d, PARSE.CONFIG);
        };
    var deleteTrack = function(x){
          var d = songsEnd + x.objectId;
          return $http.delete(d, PARSE.CONFIG);
        };

    var loadParams = function(){
      return $http.get(PARSE.ARTISTURL + '/tracks/completion');
    };

    var searchStations = function(p){

      return $http({
        url: PARSE.ARTISTURL + 'tracks/search',
        method: "GET",
        params: p
      });
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
      deleteStation : deleteStation,
      deleteTrack : deleteTrack,
      getSongInfo : getSongInfo,
      loadParams : loadParams,
      searchStations : searchStations


    };
  }]);


}());
