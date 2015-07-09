;( function(){

  'use strict';

  angular.module('App')

  .controller('StationCtrl', StationCtrl);
  function StationCtrl ($timeout, $q, $log, $http){

  var endpoint = 'https://api.soundcloud.com/users/14646252/tracks.json?client_id=242a1e223a2af256f37ce3648bb93104';



    this.querySearch = function(){
            var httpPromise = $http.get(endpoint);
            var nextPromise = httpPromise.then(function(x){
              return x.data[0];
            });

            var lastPromise = nextPromise.then(function(x){
                return x ;
            });
          };

  }




}());
