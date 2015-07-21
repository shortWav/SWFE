;( function (){

    "use strict";

    angular.module('App')
    .controller('LoginCtrl', ['$scope', 'UsersFactory', '$state',
      function ($scope, UsersFactory, $state) {

        $scope.loginListener = function(user){

          UsersFactory.loginUserListener(user);


        };

        $scope.loginArtist = function(artist){

          UsersFactory.loginUserBand(artist);

        };

        $scope.resetPassword = function(email){
          UsersFactory.passwordReset(email);
            $state.go('password-success');

        };


    }]);


}());
