var appModule = angular.module('app', []);
appModule.directive("hello", function(){
  return {
    restrict: 'E',
    replace: true,
    // template: "<div>Hi there</div>"
    transclude: true,
    template: "<div>Hi there<span ng-transclude></span></div>"
  };
});
