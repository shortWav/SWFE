;( function(){

  'use strict';
  angular.module('App')

   .controller('AppCtrl',['$scope', '$timeout', '$mdSidenav', '$mdUtil', '$log','UsersFactory',
    function ($scope, $timeout, $mdSidenav, $mdUtil, $log, UsersFactory) {
    $scope.logOut = function(){
      UsersFactory.logOut();
    };
    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');
    function buildToggler(navID) {
      var debounceFn =  $mdUtil.debounce(function(){
            $mdSidenav(navID)
              .toggle();
          },300);
      return debounceFn;
    }
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
