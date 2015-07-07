;( function (){

    "use strict";

    angular.module('App')
    .factory('UsersFactory', [ '$http', 'PARSE', '$cookies',
      function ($http, PARSE, $cookies) {
      //listener constructor
      var Listener = function(options){
        this.first = options.first_name;
        this.last = options.last_name;
        this.username = options.user_name;
        this.password = options.password;
        this.email = options.email;

      };

      var _successLog = function(data){
        $cookies.put('token', data.sessionToken);
      };r

      var loginUserBand = function(){

      };


      var loginUserListener = function(){

      };

      var registerListener = function(user){
        var newUser = new Listener(user);
       $http.post(PARSE.URL + 'users', newUser, PARSE.CONFIG)
        .success( function(data){
          _successLog(data)
        });


      };


      var checkUser = function(){

      };


      var _routeUser = function(){

      };


      var _updateToken = function(){

      };


      var logOut = function(){

      };




      return {
        loginUserBand : loginUserBand,
        loginUserListener : loginUserListener,
        registerListener : registerListener,
        checkUser : checkUser,
        _routeUser : _routeUser,
        _updateToken : _updateToken,
        _successLog : _successLog,
        logOut : logOut

      };
    }]);

}());
