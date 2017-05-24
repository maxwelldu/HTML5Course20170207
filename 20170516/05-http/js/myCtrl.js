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
    //file_get_content("php://input")
    //前端可以传递json格式的数据过去，后端接受需要使用上面这种方式
    $http.post(
      'http://h6.duchengjiu.top/shop/api_user.php',
      "status=register&username="+$scope.user.name+"&password="+$scope.user.password,
      {
        headers:{"Content-Type":"application/x-www-form-urlencoded"}
      }
    )
    .success(function(res){
      console.log(res);//数据库里面的字段默认不允许为空，不允许为null
      if(res.code == 0) {
        alert("注册成功");
      } else {
        alert(res.message);
      }
    })
    .error(function(err){
    })
  };

});
