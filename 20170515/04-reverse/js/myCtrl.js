angular.module('app',[])
.controller('MyCtrl', function($scope){
    $scope.msg = "angularjs";
    $scope.reverse = function(){
      return $scope.msg.split("").reverse().join("");
    }
})
