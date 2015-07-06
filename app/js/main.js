;( function(){

  'use strict';
 angular.module('App', ['ngMaterial'])
   .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .dark()
      .primaryPalette('grey')

      .accentPalette('blue-grey');
  });



}());
