angular.module('app',[])
.factory('Data', function(){
  return {
    msg:"我来自factory",
    shopcart:["1","2"]
  }
})
.controller("FCtrl", function($scope, Data, shopcart){//下单ctrl
  $scope.data = Data;
})
.controller("SCtrl", function($scope, Data, shopcart){//购物车ctrl
  $scope.data = Data;
});
