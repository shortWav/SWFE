;( function(){

  'use strict';
  angular.module('App')

   .controller('AppCtrl',['$scope', '$timeout',
    '$mdSidenav', '$mdUtil', '$log','UsersFactory', '$state', '$rootScope',

    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, UsersFactory, $state, $rootScope) {

      $scope.user = $rootScope.user;
        // log out user
      $scope.logOut = function(){
        UsersFactory.logOut();
        $scope.checkUser();
      };

      // nav toggles
      $scope.toggleLeft = buildToggler('left');
      $scope.toggleRight = buildToggler('right');


      function buildToggler(navID) {
        var debounceFn =  $mdUtil.debounce(function(){
              $mdSidenav(navID)
                .toggle();
            },300);
        return debounceFn;
      }

      // go to register page
      $scope.goRegister= function(){
        $state.go('register');
      };

      $scope.checkUser = function(){
        UsersFactory.checkUser();
      };


      // devs array
      $scope.theDevs= [
      {
        id: 1,
        name: 'Nick Leach',
        description: 'Front End Developer',
        picture: '/images/nick.jpeg',
        github: 'https://github.com/nickleach',
        linkedin: 'https://www.linkedin.com/pub/nick-leach/bb/599/279'
      },
      {
        id: 2,
        name: 'Jim Leach',
        description: 'Front End Developer',
        picture: '/images/jim.jpeg',
        github: 'https://github.com/jaleach',
        linkedin: 'https://www.linkedin.com/pub/james-leach/2b/47b/b'
      },
      {
        id: 3,
        name: 'Tyler Day',
        description: 'Back End Developer',
        picture: '/images/tyler.jpeg',
        github: 'https://github.com/TK2Day',
        linkedin: 'got no shit here'
      }
      ];

    }])

   // sidebar controllers
  .controller('LeftCtrl',['$scope', '$timeout', '$mdSidenav', '$log', 'UsersFactory',
   function ($scope, $timeout, $mdSidenav, $log, UsersFactory) {
    $scope.close = function () {
      $mdSidenav('left').close();
    };
  }])
  .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
    $scope.close = function () {
      $mdSidenav('right').close();
    };
  });

}());
