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
   .config(['$mdThemingProvider', '$stateProvider', '$urlRouterProvider',
    function($mdThemingProvider, $stateProvider, $urlRouterProvider) {


    $mdThemingProvider.theme('default')
      .dark()
      .primaryPalette('grey')

      .accentPalette('blue-grey');

    $urlRouterProvider.otherwise('/');



    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'js/templates/home.tpl.html',
        controller: 'AppCtrl'
      })
      .state('home.profile', {
        url: ':username',
        templateUrl: 'js/templates/dashboards/profile.tpl.html',
        controller: 'ListenerCtrl'
      })
      .state('devs',{
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
