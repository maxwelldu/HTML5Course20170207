var expanderModule = angular.module('expanderModule', []);
expanderModule.directive("expander", function(){
  return {
    restrict: 'E',
    replace: true,
    transclude: true,
    template: "<div>"
              + "<div class='title' ng-click='toggle()'>{{title}}</div>"
              + '<div class="body" ng-show="showMe" ng-transclude></div>'
              + "</div>",
    link: function(scope, element, attrs){
      scope.showMe = false;
      scope.toggle = function(){
        scope.showMe = !scope.showMe;
      }
    }
  };
});
expanderModule.controller("SomeController", function($scope){
  $scope.title = "点击展开";
  $scope.text = "这里是内部的内容";
});
expanderModule.controller("SCtrl", function($scope){
  $scope.title = "展开2";
  $scope.text = "内容2";
})
