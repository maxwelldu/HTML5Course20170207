angular.module("app",[])
.directive('hello',function(){
  return {
    restrict:"A",
    link:function(scope, element){
      scope.title = "Hello";
      console.log(element);
      element[0].onclick = function(){
        alert('clicked');
      }
      alert("I'm here");
    }
  }
})
