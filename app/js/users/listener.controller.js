;( function(){

  'use strict';
  angular.module('App')

  .controller('ListenerCtrl', ['$scope', 'UsersFactory', '$cookies', '$rootScope',
    function ($scope, UsersFactory, $cookies, $rootScope) {

      var username = $cookies.get('username');

      UsersFactory.getSingleUser(username).success( function(data){

         $scope.user = data.user;
         $rootScope.user = $scope.user;
      });




  }])

  .controller('ProfileCtrl', ['$scope', 'UsersFactory', '$stateParams',
   function ($scope, UsersFactory, $stateParams) {

      var username = $stateParams.username;


      UsersFactory.getSingleUser(username).success( function(data){

         $scope.user= data.user;
          console.log($scope.user);

      });


  }]);

}());
