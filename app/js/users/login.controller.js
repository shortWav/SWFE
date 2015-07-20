;( function (){

    "use strict";

    angular.module('App')
    .controller('LoginCtrl', ['$scope', 'UsersFactory',
      function ($scope, UsersFactory) {

        $scope.loginListener = function(user){

          UsersFactory.loginUserListener(user);


        };

        $scope.loginArtist = function(artist){

          UsersFactory.loginUserBand(artist);

        };

        $scope.resetPassword = function(email){
          UsersFactory.passwordReset(email);
        };


    }]);


}());
