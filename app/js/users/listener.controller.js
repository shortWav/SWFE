;( function(){

  'use strict';
  angular.module('App')

  .controller('ListenerCtrl', ['$scope', 'UsersFactory', '$cookies', '$rootScope', 'MusicFactory',
    function ($scope, UsersFactory, $cookies, $rootScope, MusicFactory) {


      var user = $cookies.get('userObjectId');
      if(user !== undefined){
      MusicFactory.getStations().success( function(data){
        $rootScope.hasStations = true;
        $scope.stations = data.results;
      });
      MusicFactory.getSongs().success( function(data){
        $rootScope.hasSongs = true;
        $scope.songs = data.results;

      });
      UsersFactory.getSingleUser(user).success( function(data){

         $scope.user = data;
         // $rootScope.user = $scope.user;
      });

    }


  }])

  .controller('ProfileCtrl', ['$scope', 'UsersFactory', '$stateParams', '$state',
   function ($scope, UsersFactory, $stateParams, $state) {

      var id = $stateParams.id;


      UsersFactory.getSingleUser(id).success( function(data){

         $scope.user= data;


      });

      $scope.update = function(user){
          UsersFactory.updateListener(user).success( function(data){
           $scope.user = data;
           $state.go('home');


      });

      };

      $scope.resetPassword = function(){
        $state.go('password');
      };



  }]);

}());
