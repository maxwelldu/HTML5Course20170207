var app = angular.module("app", []);
app.directive('hello', function(){
  return {
    restrict: 'E',//Element
    replace: true,//是否替换原有的指令标签
    template: "<div>Hello angularjs</div>"
  };
});
