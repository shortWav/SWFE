;( function(){

  'use strict';
  angular.module('App')

  .controller('ListenerCtrl', ['$scope', 'UsersFactory', '$cookies',
    function ($scope, UsersFactory, $cookies) {

      $scope.name = $cookies.get('first_name');



  }]);

}());
