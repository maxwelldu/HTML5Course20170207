angular.module('app',[])
.controller('MyCtrl', function($scope){
    $scope.user = {name:"",password:""};
    $scope.errmsg = "";
    $scope.login = function(){
      if ($scope.user.name == "admin" && $scope.user.password=="admin") {
        alert("登录成功");
        $scope.errmsg = "";
      } else {
        $scope.errmsg = "用户名或密码错误";
      }
    };
    $scope.resetMsg = function(){
      $scope.errmsg = "";
    }
})
