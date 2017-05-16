angular.module('app',[])
.controller('UserCtrl', function($scope,$http){
  $scope.goods = [];

  $http.get('http://h6.duchengjiu.top/shop/api_goods.php')
  .success(function(res){
    console.log(res);
    $scope.goods = res.data;
  });

  $scope.user = {name:"", password:""};
  $scope.register = function(){
    $http.post(
      'http://h6.duchengjiu.top/shop/api_user.php',
      "status=register&username="+$scope.user.name+"&password="+$scope.user.password,
      {
        headers:{"Content-Type":"application/x-www-form-urlencoded"}
      }
    )
    .success(function(res){
      console.log(res);
      if(res.code == 0) {
        alert("注册成功");
      } else {
        alert(res.message);
      }
    })
    .error(function(err){
    })
  };

  $scope.register();

});
