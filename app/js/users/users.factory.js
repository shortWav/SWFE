;( function (){

    "use strict";

    angular.module('App')
    .factory('UsersFactory', [ '$http', 'PARSE', '$cookies', '$state', '$mdUtil','$mdSidenav',
      function ($http, PARSE, $cookies, $state, $mdUtil, $mdSidenav) {



        // Toggle Right function, to use with login

      var toggleRight = buildToggler('right');
      function buildToggler(navID) {
        var debounceFn =  $mdUtil.debounce(function(){
              $mdSidenav(navID)
                .toggle();
            },300);
        return debounceFn;
      }


      //listener constructor
      var Listener = function(options){
        this.first = options.first_name;
        this.last = options.last_name;
        this.username = options.user_name;
        this.password = options.password;
        this.email = options.email;

      };


      // Artist constructor

      var Artist = function(options){
        this.artist = options.artist_name;
        this.country = options.country;
        this.city = options.city;
        this.state = options.state;
        this.username = options.username;
        this.password = options.password;

      };


      // Route the user if they're logged in
      var _routeUser = function(st){
          if(st === undefined) {
            // route to Login Page
            // $state.go('home');
            console.log('you not logged in');
          } else{
            $('#logOut').removeClass('logOutButton');

          }

      };

      // If the cookie is there update the headers
      var _updateToken = function(st){
         if (st !== undefined) {
            PARSE.CONFIG.headers['X-Parse-Session-Token'] = st;
          }
          _routeUser(st);
      };


      // Function after a successfull login
      var _successLog = function(data){
        $cookies.put('sessionToken', data.sessionToken);
        $cookies.put('userObjectId', data.objectId);
        // $('#menuStuff').html('<ul class="collection"><li><a href="#" class="collection-item">Listen</a></li><li><a href="#" class="collection-item"><i class="material-icons">settings_input_antenna</i>Stations</a></li></ul><md-button ng-click="logOut()" class="md-raised md-primary">Log Out</md-button>');
        $('#logOut').removeClass('logOutButton');
        // ng-show/hide
      };


      // Check to see if user has a cookie
      var checkUser = function(){
          var st = $cookies.get('sessionToken');
          _updateToken(st);
      };

      var loginUserBand = function(){



      };


      var loginUserListener = function(user){
           $http({
            method: 'GET',
            url: PARSE.URL + 'login',
            headers: PARSE.CONFIG.headers,
            params: user
          }).success( function (data) {
              toggleRight();
            _successLog(data);
          });

      };


      // Register a new listener
      var registerListener = function(user){
        var newUser = new Listener(user);
       $http.post(PARSE.URL + 'users', newUser, PARSE.CONFIG)
        .success( function(data){
          _successLog(data);
        });

      };

      // register a new Artist
      var registerArtist = function(user){
        // var newArtist = new Artist(user);
        SC.connect(function() {
        SC.get('/me', function(me) {
          alert('Hello, ' + me.username);
        });
      });
        // $http.post(PARSE.URL + 'users', newArtist, PARSE.CONFIG)
        // .success(function(data){
        //   _successLog(data);

        // });
      };



      // Log out
      var logOut = function(){
           $http.post(PARSE.URL + 'logout', {}, PARSE.CONFIG)
            .success( function () {
              $cookies.remove('sessionToken');
              $cookies.remove('userObjectId');
              $state.go('home');
              PARSE.CONFIG.headers['X-Parse-Session-Token'] = '';
              $('#logOut').addClass('logOutButton');
            }
          );
      };



      // Declare all the functions
      return {
        loginUserBand : loginUserBand,
        loginUserListener : loginUserListener,
        registerListener : registerListener,
        registerArtist : registerArtist,
        checkUser : checkUser,
        _routeUser : _routeUser,
        _updateToken : _updateToken,
        _successLog : _successLog,
        logOut : logOut

      };
    }]);

}());
