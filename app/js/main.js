;( function(){

  'use strict';
 angular.module('App', ['ngMaterial', 'ui.router', 'angularSoundManager', 'td.easySocialShare', 'ngAnimate',
  'ngCookies', 'ngMessages'])



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

    $urlRouterProvider.otherwise('/home');



    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'js/templates/home.tpl.html',
        controller: 'AppCtrl'
      })
      .state('home.username', {
        url: '/:id',
        templateUrl: 'js/templates/users/profile.tpl.html',
        controller: 'ProfileCtrl'
      })
      .state('home.username.edit',{
        url:'/edit',
        templateUrl: 'js/templates/users/edit-profile.tpl.html',
        controller: 'ProfileCtrl'
      })
      .state('devs',{
        url:'/dev',
        templateUrl: 'js/templates/dev.tpl.html',
        controller: 'AppCtrl'
      })
      .state('devs.id',{
        url:'/:id',
        templateUrl: 'js/templates/singledev.tpl.html',
        controller: 'DevCtrl'
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
        templateUrl: 'js/templates/main/player.tpl.html',
        controller: 'PlayerCtrl'
      })
      .state('nowplaying',{
        url: '/nowplaying',
        templateUrl: 'js/templates/main/player.tpl.html',
        controller: 'NowPlayingCtrl'
      })
      .state('find-station',{
        url:'/find-station',
        templateUrl: 'js/templates/main/station.tpl.html',
        controller: 'StationCtrl'
      })
      .state('find-station.radio',{
        url:'/station-search',
        templateUrl: 'js/templates/main/player.tpl.html',
        controller:'StationCtrl'
      })
      .state('mystations',{
        url:'/mystations',
        templateUrl:'js/templates/users/mystations.tpl.html',
        controller:'StationsList'
      })
      .state('mystations.my-station',{
        url:'/:id',
        templateUrl:'js/templates/main/player.tpl.html',
        controller: 'MyStationCtrl'
      })
      .state('fav-tracks',{
        url: '/fav-tracks',
        templateUrl: 'js/templates/users/mytracks.tpl.html',
        controller: 'FavTracksCtrl'
      })
      .state('fav-tracks.track-info',{
        url: '/:id',
        templateUrl: 'js/templates/users/single-track.tpl.html',
        controller: 'TrackInfoCtrl'
      })
      .state('password',{
        url: '/reset-password',
        templateUrl: 'js/templates/users/password-reset.tpl.html',
        controller: 'LoginCtrl'
      })
      .state('password-success', {
        url:'/success',
        templateUrl: 'js/templates/users/password-reset-success.tpl.html',
        controller: 'LoginCtrl'
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
