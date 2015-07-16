;( function(){

  'use strict';
  angular.module('App')

   .controller('AppCtrl',['$scope', '$timeout',
    '$mdSidenav', '$mdUtil', '$log','UsersFactory', '$state', '$rootScope',

    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, UsersFactory, $state, $rootScope) {

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
      $scope.goToDev = function(x){

        $state.go('devs.id',{id: x});
      };
      // go to register page
      $scope.goRegister= function(){
        $state.go('register');
      };

      $scope.checkUser = function(){
        UsersFactory.checkUser();
      };


      // devs array
      $rootScope.theDevs= [
      {
        id: 1,
        name: 'Nick Leach',
        description: 'Front End Developer',
        picture: '/images/nick.jpeg',
        github: 'https://github.com/nickleach',
        email: 'nickleach22@gmail.com',
        linkedin: 'https://www.linkedin.com/pub/nick-leach/bb/599/279'
      },
      {
        id: 2,
        name: 'Jim Leach',
        description: 'Front End Developer',
        picture: '/images/jim.jpeg',
        github: 'https://github.com/jaleach',
        email: 'jimleach09@gmail.com',
        linkedin: 'https://www.linkedin.com/pub/james-leach/2b/47b/b'
      },
      {
        id: 3,
        name: 'Tyler Day',
        description: 'Back End Developer',
        picture: '/images/tyler.jpeg',
        github: 'https://github.com/TK2Day',
        email: 'something@gmail.com',
        linkedin: 'got no shit here'
      }
      ];

     $scope.theDevs = $rootScope.theDevs;

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
  })
  .controller('DevCtrl', ['$scope', '$stateParams', '$rootScope', function ($scope, $stateParams, $rootScope) {

    var devId = Number($stateParams.id);
    $scope.devs =  _.findWhere($rootScope.theDevs, { id: devId });

  }]);

}());
