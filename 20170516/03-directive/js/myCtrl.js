//ng-bind, {{}}, ng-model, ng-show/ng-hide, ng-if
//ng-checked, ng-src, ng-href, ng-class, ng-selected, ng-submit
angular.module('app',[])
.controller('UserCtrl', function($scope){
  $scope.user = {
    uname:'',
    pwd:'',
    zw:'1',
    sex:'1',
    hobby:[1,2,4],
    icon:'images/cat.jpg',
    showicon:true
  };
  $scope.isChecked = function(n){
    var isok = false;
    for (var i = 0; i < $scope.user.hobby.length; i++) {
      if(n == $scope.user.hobby[i]){
        isok = true;
        break;
      }
    }
    return isok;
  };
  $scope.register = function() {
    console.log($scope.user);
  }
});
