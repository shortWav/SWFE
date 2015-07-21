;( function(){

  'use strict';
  angular.module('App')

  .controller('ListenerCtrl', ['$scope', 'UsersFactory', '$cookies', '$rootScope', 'MusicFactory',
    function ($scope, UsersFactory, $cookies, $rootScope, MusicFactory) {

      $('.collection-item').removeClass('active');
      $("#myDash").addClass('active');


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

  .controller('ProfileCtrl', ['$scope', 'UsersFactory', '$stateParams',
   function ($scope, UsersFactory, $stateParams) {

      $('.collection-item').removeClass('active');
      $('#myProfile').addClass('active');

      var id = $stateParams.id;


      UsersFactory.getSingleUser(id).success( function(data){

         $scope.user= data;


      });


  }]);

}());
