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
   .directive('listenerNav', [function () {
     return {
       restrict: 'EA',
       templateUrl: 'js/templates/listener-nav.tpl.html',
       link: function (scope, iElement, iAttrs) {

       }
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
