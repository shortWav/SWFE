;( function (){

    "use strict";

    angular.module('App')
    .factory('UsersFactory', [ '$http', 'HEROKU', '$cookies', '$state', '$mdUtil','$mdSidenav', '$rootScope',
      function ($http, HEROKU, $cookies, $state, $mdUtil, $mdSidenav, $rootScope) {




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
        this.first_name = options.first_name;
        this.last_name = options.last_name;
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
           return true;
          } else{
            $('#logOut').removeClass('logOutButton');
            // $state.go('home');
            $rootScope.currentUserSignedIn = true;
            // $rootScope.currentUser.name = data.name;
            return false;
          }

      };

      // If the cookie is there update the headers
      var _updateToken = function(st){
         if (st !== undefined) {
            HEROKU.CONFIG.headers['Access-Token'] = st;
          }
          _routeUser(st);
      };


      // Function after a successfull login
      var _successLog = function(data){

        $cookies.put('access_token', data.user.access_token);
        $cookies.put('first_name', data.user.first_name);
        $cookies.put('last_name', data.user.last_name);
        $cookies.put('username', data.user.username);
        $cookies.put('email', data.user.email);
        $rootScope.currentUserSignedIn = true;

        $('#logOut').removeClass('logOutButton');

      };


      // Check to see if user has a cookie
      var checkUser = function(){
          var st = $cookies.get('access_token');
          _updateToken(st);
      };

      var loginUserBand = function(){



      };


      var loginUserListener = function(user){
           $http.post(HEROKU.URL +'users/login', user).success( function (data) {
              toggleRight();
            _successLog(data);
          });

      };


      // Register a new listener
      var registerListener = function(user){
        var newUser = new Listener(user);
       $http.post(HEROKU.URL + 'users', newUser)
        .success( function(data){
          _successLog(data);
        });

      };

      // register a new Artist
      var registerArtist = function(user){
        // var newArtist = new Artist(user);

        // $http.post(PARSE.URL + 'users', newArtist, PARSE.CONFIG)
        // .success(function(data){
        //   _successLog(data);

        // });
      };



      // Log out
      var logOut = function(){
              $cookies.remove('access_token');
              $cookies.remove('first_name');
              $cookies.remove('last_name');
              $cookies.remove('username');
              $cookies.remove('email');
               $rootScope.currentUserSignedIn = false;
        // $rootScope.currentUser.name = data.name;
              // $state.go('home');
              $('#logOut').addClass('logOutButton');

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
