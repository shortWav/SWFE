;( function(){

  'use strict';

  angular.module('App')

  .controller('FavTracksCtrl', ['$scope', 'MusicFactory',
    function ($scope, MusicFactory) {
      MusicFactory.getSongs().success( function(data){
        $scope.tracks = data.results;
      });

  }])

  .controller('TrackInfoCtrl', ['$scope', 'MusicFactory', '$stateParams',
    function ($scope, MusicFactory, $stateParams) {

      var songId = $stateParams.id;


      MusicFactory.getSongInfo(songId).success( function(data){

        $scope.track = data;
        console.log($scope.track);

      });



  }]);


}());
