;( function(){

  'use strict';

  angular.module('App')

  .controller('StationCtrl',

    function($timeout, $scope, $http) {

    Array.prototype.unique = function() {
    var unique = [];
    for (var i = 0; i < this.length; i++) {
        if (unique.indexOf(this[i]) == -1) {
            unique.push(this[i]);
        }
    }
    return unique;
};
  $scope.loadUsers = function() {
    // Use timeout to simulate a 650ms request.
    $scope.users = [];
    return $timeout(function() {
      $http.get('https://api.soundcloud.com/users/14646252/tracks.json?client_id=242a1e223a2af256f37ce3648bb93104')
      .success( function(data){
        var a = data.unique();
        $scope.users = a;

      });
    }, 650);
  };
});

}());
