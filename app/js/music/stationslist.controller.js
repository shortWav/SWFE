;( function(){

  'use strict';
  angular.module('App')

  .controller('StationsList', ['$scope', 'MusicFactory', '$state',
    function ($scope, MusicFactory, $state) {

      MusicFactory.getStations().success( function(data){
        $scope.stations = data.results;
      });

      $scope.findStation = function(){
        $state.go('find-station');
      };

  }]);

}());
