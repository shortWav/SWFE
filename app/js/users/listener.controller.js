;( function(){

  'use strict';
  angular.module('App')

  .controller('ListenerCtrl', ['$scope', 'UsersFactory', '$cookies', '$rootScope', 'MusicFactory',
    function ($scope, UsersFactory, $cookies, $rootScope, MusicFactory) {

      $('.collection-item').removeClass('active');
      $("#myDash").addClass('active');
      $("#myDash1").addClass('active');



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

  .controller('ProfileCtrl', ['$scope', 'UsersFactory', '$stateParams', '$state','$rootScope','$mdDialog', '$cookies',
   function ($scope, UsersFactory, $stateParams, $state, $rootScope, $mdDialog, $cookies) {

      $('.collection-item').removeClass('active');
      $('#myProfile').addClass('active');

      var id = $stateParams.id;

      if($rootScope.currentUserSignedIn === true){
      UsersFactory.getSingleUser(id).success( function(data){

         $scope.user= data;


      });
    }else if ($rootScope.currentUserArtist === true){
      UsersFactory.loadArtist(id).success( function(data){
        $scope.user= data.user;

      });
    }

      $scope.update = function(user){
          UsersFactory.updateListener(user).success( function(data){
           $scope.user = data;
           $state.go('home');


        });

      };

      $scope.deleteAccount = function(artist){
        var id = $cookies.get('id');
        UsersFactory.deleteUser(artist, id);
      };

      $scope.resetPassword = function(){
        $state.go('password');
      };

      $scope.showConfirm = function(ev) {
        // Appending dialog to document.body to cover sidenav in docs app
        var confirm = $mdDialog.confirm()
          .parent(angular.element(document.body))
          .title('Are you sure you want to delete your account?')
          .content('This cannot be undone.')
          .ariaLabel('Lucky day')
          .ok('Yes, Delete My Account')
          .cancel('Nevermind')
          .targetEvent(ev);
        $mdDialog.show(confirm).then(function() {
          $state.go('delete-account');
        }, function() {

        });
    };



  }]);

}());
