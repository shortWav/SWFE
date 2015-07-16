;( function(){

  'use strict';

  angular.module('App')

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
   .directive('notLogged', [function () {
     return {
       restrict: 'E',
       templateUrl: 'js/templates/not-logged-in.tpl.html'
     };


   }])
   .directive('listenerDash', [function () {
     return {
       restrict: 'E',
       templateUrl: 'js/templates/dashboards/listener-dash.tpl.html'
     };


   }]);




}());
