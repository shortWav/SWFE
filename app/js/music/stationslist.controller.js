;( function(){

  'use strict';
  angular.module('App')

  .controller('StationsList', ['$scope', 'MusicFactory', '$state',
    function ($scope, MusicFactory, $state) {



      $('.collection-item').removeClass('active');
      $("#myStations").addClass('active');

      $('#stationsList').on('click', 'a', function(){
        $('a').removeClass('active');
        $(this).addClass('active');

      });

      MusicFactory.getStations().success( function(data){

        $scope.stations = data.results;

      });

      $scope.findStation = function(){

        $state.go('find-station');

      };

      $scope.deleteStation = function(thisdel) {

            MusicFactory.deleteStation(thisdel).success(function(){
              $state.go($state.current, {}, {reload: true});

          });
      };
  }]);

}());
