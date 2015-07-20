;( function (){

    "use strict";

    angular.module('App')
    .factory('UsersFactory', [ '$http', 'PARSE', '$cookies',
      '$state', '$mdUtil','$mdSidenav', '$rootScope', '$timeout',
      function ($http, PARSE, $cookies, $state, $mdUtil, $mdSidenav, $rootScope, $timeout) {




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
          if(st !== undefined) {
            $rootScope.currentUserSignedIn = true;
            // route to Login Page
            // $state.go('home');

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


          $rootScope.currentUserSignedIn = true;
          if($state.is('home')){
          $state.reload();
        }else{
          $state.go('home');
        }

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
             $cookies.put('sessionToken', data.sessionToken);
        $cookies.put('userObjectId', data.objectId);
        $cookies.put('first', data.first);
        $cookies.put('last', data.last);

        // $cookies.put('access_token', data.user.access_token);
        // $cookies.put('first_name', data.user.first_name);
        // $cookies.put('last_name', data.user.last_name);
        $cookies.put('username', data.username);
        // $cookies.put('email', data.user.email);
              toggleRight();

          }).then( function(){

            _successLog();

          // $state.go('home');

          });

      };


      // Register a new listener
      var registerListener = function(user){
        var newUser = new Listener(user);
       $http.post(PARSE.URL + 'users', newUser, PARSE.CONFIG)
        .success( function(data){
            $cookies.put('sessionToken', data.sessionToken);
            $cookies.put('userObjectId', data.objectId);
            $cookies.put('first', data.first);
            $cookies.put('last', data.last);

            // $cookies.put('access_token', data.user.access_token);
            // $cookies.put('first_name', data.user.first_name);
            // $cookies.put('last_name', data.user.last_name);
            $cookies.put('username', data.username);
        // $cookies.put('email', data.user.email);


          }).then( function(){

            $rootScope.currentUserSignedIn = true;
            $state.go('home');

          // $state.go('home');

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
     $http.post(PARSE.URL + 'logout', {}, PARSE.CONFIG)
            .success( function () {
              $rootScope.currentUserSignedIn = false;
              $rootScope.hasStations = false;
              $cookies.remove('sessionToken');
              $cookies.remove('userObjectId');
              $cookies.remove('username');
              $cookies.remove('first');
              $cookies.remove('last');
              PARSE.CONFIG.headers['X-Parse-Session-Token'] = '';
        // $rootScope.currentUser.name = data.name;

              $state.go('home');
            }
          );


      };

      var getSingleUser = function(username){


        return $http.get(PARSE.URL + 'users/'+ username, PARSE.CONFIG);


      };

      var startOauth = function(){

       var clientId = '242a1e223a2af256f37ce3648bb93104';
       var redirectUri = encodeURIComponent('http://localhost:8000/#/register-artist');

       SC.initialize({
            client_id: clientId,
            redirect_uri: redirectUri
       });

       window.location = 'https://soundcloud.com/connect?response_type=code_and_token&client_id=' + clientId + '&redirect_uri=' + redirectUri;

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
        logOut : logOut,
        getSingleUser : getSingleUser,
        startOauth : startOauth


      };
    }]);

}());
