;( function(){

  'use strict';

  angular.module('App')

  .controller('ArtistCtrl', ['$scope', 'UsersFactory', '$cookies', '$rootScope', '$mdDialog',
    function ($scope, UsersFactory, $cookies, $rootScope, $mdDialog) {

      $('.collection-item').removeClass('active');
      $("#myDash1").addClass('active');
      $("#myDash").addClass('active');

        // var cookies = $cookies.getAll();

        // $scope.user = cookies;
         var id = $cookies.get('id');

      if ($rootScope.currentUserArtist === true){

      UsersFactory.loadArtist(id).success( function(data){

        $scope.user = data.user;

      });
      UsersFactory.getArtistTracks(id).success( function(data){
        $scope.tracks = data;
        $rootScope.hasSongs = true;

      });
    }

      $scope.syncTracks = function(ev){
        var userid = $cookies.get('id');
        UsersFactory.syncTracks(userid);
        $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.body))
          .title('Success!')
          .content('Your tracks are queued to be synced, they should appear in our database in a few minutes!')
          .ariaLabel('Alert Dialog Demo')
          .ok('Got it!')
          .targetEvent(ev)
      );
      };

       $scope.deleteAccount = function(artist){

        var id = $cookies.get('id');
        UsersFactory.deleteUser(artist, id);
      };

  }]);


}());
