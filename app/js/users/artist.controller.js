;( function(){

  'use strict';

  angular.module('App')

  .controller('ArtistCtrl', ['$scope', 'UsersFactory',
    function ($scope, UsersFactory) {

      $('.collection-item').removeClass('active');
      $("#myDash1").addClass('active');
      $("#myDash").addClass('active');

        // var cookies = $cookies.getAll();

        // $scope.user = cookies;


      // UsersFactory.loadArtist().then( function(data){
      //   console.log(data)
      // });


  }])
  .controller('ArtistProfileCtrl', ['$scope','UsersFactory', '$cookies', '$stateParams', '$state',
    function ($scope, $cookies, $stateParams, $state) {


      var cookies = $cookies.getAll();

      // $scope.

  }]);


}());
