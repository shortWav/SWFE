;( function (){

    "use strict";

    angular.module('App')
    .controller('RegisterCtrl', ['$scope', '$http', 'PARSE', 'UsersFactory',
      function ($scope, $http, PARSE, UsersFactory) {

        $scope.register = function(x){

          UsersFactory.registerListener(x);
        };


    }]);

}());
