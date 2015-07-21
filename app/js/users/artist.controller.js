;( function(){

  'use strict';

  angular.module('App')

  .controller('ArtistCtrl', ['$scope', 'UsersFactory', '$cookies',
    function ($scope, UsersFactory, $cookies) {

      $('.collection-item').removeClass('active');
      $("#myDash1").addClass('active');
      $("#myDash").addClass('active');

        // var cookies = $cookies.getAll();

        // $scope.user = cookies;

      var id = $cookies.get('id');
      UsersFactory.loadArtist(id).success( function(data){

        $scope.user = data.user;

      });


  }]);


}());
