;( function(){

  'use strict';

  angular.module('App')

  .controller('FavTracksCtrl', ['$scope', 'MusicFactory', '$state',
    function ($scope, MusicFactory, $state) {

      $('.collection-item').removeClass('active');
      $("#myFaves").addClass('active');

      MusicFactory.getSongs().success( function(data){
        $scope.tracks = data.results;
      });
      $scope.deleteTrack = function(thisdel) {

            MusicFactory.deleteTrack(thisdel).success(function(){
              if($state.is('fav-tracks')){
                $state.reload();
              }else{
                $state.go('fav-tracks');
                $state.reload();
              }

            });
        };

  }])

  .controller('TrackInfoCtrl', ['$scope', 'MusicFactory', '$stateParams', '$state',
    function ($scope, MusicFactory, $stateParams, $state) {

      var songId = $stateParams.id;


      MusicFactory.getSongInfo(songId).success( function(data){

        $scope.track = data;
        console.log($scope.track);

      });

      $scope.deleteTrack = function(thisdel) {

            MusicFactory.deleteTrack(thisdel).success(function(){

              // ('fav-tracks');
              $state.reload();

            });
        };


  }]);


}());
