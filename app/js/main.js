;( function(){

  'use strict';
 angular.module('App', ['ngMaterial', 'ui.router', 'angularSoundManager', 'td.easySocialShare', 'satellizer',
  'ngCookies', 'ngMessages'])



  .constant('HEROKU', {
    URL: 'https://arcane-badlands-3651.herokuapp.com/',
    CONFIG: {
      headers: {
        'Access-Token': ''
      }
    }
  })
   .config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider', '$authProvider',
    function($mdThemingProvider, $stateProvider, $urlRouterProvider, $authProvider) {


    $mdThemingProvider.theme('default')
      .dark()
      .primaryPalette('grey')

      .accentPalette('blue-grey');

    $authProvider.oauth2({
      name: 'soundcloud',
      url: '/auth/soundcloud',
      redirectUri: window.location.origin,
      clientId: clientId,
      authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate'
    });


    $urlRouterProvider.otherwise('/');



    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'js/templates/home.tpl.html',
        controller: 'AppCtrl'
      })
      .state('home.devs',{
        url:'/dev',
        templateUrl: 'js/templates/dev.tpl.html',
        controller: 'AppCtrl'
      })
      .state('register',{
        url: '/register',
        templateUrl: 'js/templates/register.tpl.html',
        controller: 'RegisterCtrl'
      })
      .state('register-artist',{
        url: '/register-artist',
        templateUrl: 'js/templates/artistregister.tpl.html',
        controller: 'RegisterCtrl'
      })
      .state('player',{
        url: '/player',
        templateUrl: 'js/templates/player.tpl.html',
        controller: 'PlayerCtrl'
      })
      .state('find-station',{
        url:'/find-station',
        templateUrl: 'js/templates/station.tpl.html',
        controller: 'StationCtrl'
      })
      .state('find-station.radio',{
        url:'/station',
        templateUrl: 'js/templates/player.tpl.html',
        controller:'StationCtrl'
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
