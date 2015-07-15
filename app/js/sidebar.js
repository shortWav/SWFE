;( function(){

  'use strict';
  angular.module('App')

   .controller('AppCtrl',['$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log','UsersFactory', '$state',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, UsersFactory, $state) {
    $scope.logOut = function(){
      UsersFactory.logOut();
    };
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    $scope.showDevs = function(){
      $state.go('home.devs');
    };
    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle();
          },300);
      return debounceFn;
    }

    $scope.theDevs= [
    {
      id: 1,
      name: 'Nick Leach',
      description: 'Front End Developer',
      picture: '/images/nick.jpeg'
    },
    {
      id: 2,
      name: 'Jim Leach',
      description: 'Front End Developer',
      picture: '/images/jim.jpeg'
    },
    {
      id: 3,
      name: 'Tyler Day',
      description: 'Back End Developer',
      picture: '/images/tyler.jpeg'
    }
    ];

  }])
   .directive('defaultNav', [function () {
     return {
       restrict: 'E',
       templateUrl: 'js/templates/sidebar/default-nav.tpl.html'
     };
   }])
   .directive('listenerNav', [function () {
     return {
       restrict: 'E',
       templateUrl: 'js/templates/sidebar/listener-nav.tpl.html'
     };
   }])
   .directive('artistNav', [function () {
     return {
       restrict: 'EA',
       templateUrl: 'js/templates/sidebar/artist-nav.tpl.html'
     };
   }])
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
