angular.module("app",[])
.directive('hello',function(){
  return {
    restrict:"C",
    link:function(scope,elements,attrs){
      console.log(scope,elements,attrs);
      alert("I'm here");
    }
  }
})
