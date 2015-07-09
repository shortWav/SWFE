;( function(){

  'use strict';
 angular.module('App', ['ngMaterial', 'ui.router', 'ngCookies', 'ngMessages'])



  .constant('PARSE', {
    URL: 'https://api.parse.com/1/',
    CONFIG: {
      headers: {
        'X-Parse-Application-Id' : 'GkMxrPGFdEYhr5shfAMSUNSSKVW2NS25VzJbhlKq',
        'X-Parse-REST-API-Key'  : 'Jn5AheIL8l41LDNXcmZXtmu4wUBclpYUeskKzVFo'
      }
    }
  })
   .config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider',
    function($mdThemingProvider, $stateProvider, $urlRouterProvider) {


    $mdThemingProvider.theme('default')
      .dark()
      .primaryPalette('grey')

      .accentPalette('blue-grey');


    $urlRouterProvider.otherwise(('/'));


    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'js/templates/home.tpl.html',
        controller: 'AppCtrl'
      })
      .state('register',{
        url: '/register',
        templateUrl: 'js/templates/register.tpl.html',
        controller: 'RegisterCtrl'
      })
      .state('artistregister',{
        url: '/artistregister',
        templateUrl: 'js/templates/artistregister.tpl.html',
        controller: 'ArtistRegisterCtrl'
      })
      .state('find-station',{
        url:'/find-station',
        templateUrl: 'js/templates/station.tpl.html',
        controller: 'StationCtrl'
      });


  }])

   .run(['UsersFactory', '$rootScope',

    function (UsersFactory, $rootScope) {

      $rootScope.$on('$stateChangeStart', function () {
        UsersFactory.checkUser();
      });

    }

  ]);



}());
