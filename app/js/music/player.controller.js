;( function(){

  'use strict';

  angular.module('App')

  .controller('PlayerCtrl', ['$scope', 'MusicFactory', '$timeout',

   function ($scope, MusicFactory, $timeout) {

    MusicFactory.playRandom();

  }]);


}());
