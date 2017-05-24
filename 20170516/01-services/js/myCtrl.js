angular.module('app',[])
//value constant factory service
.value("realname", "maxwelldu")
.value("realname", "maxwell")
.constant("url", "www.baidu.com")
.constant("url", "www.ucai.com")//不能修改，修改不成功
.factory("data", function(){
  return {
    msg:"Hi",
    setMsg:function(){
      this.msg = "Hey"
    }
  }
})
.service("User", function(){
  this.firstName = "Maxwell";
  this.lastName = "Du";
  this.getName = function(){
    return this.firstName + this.lastName;
  }
})
.factory("User2", function(){
  return new U();
})
.controller("MyCtrl", function($scope,realname, url, data, User, User2){
  $scope.msg = "Hello";
  $scope.realname = realname;
  $scope.url = url;
  $scope.data = data;
  data.setMsg();
  $scope.uname = User.getName();
  $scope.uname2 = User2.getName();
});

function U(){
  this.firstName = "Ben";
  this.lastName = "Li";
  this.getName = function(){
    return this.firstName + this.lastName;
  }
}
