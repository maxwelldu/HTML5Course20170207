/**
 * Created by sks on 2017/4/26.
 */
var PageHandler = {
  id: "123456",
  init: function(){
    // this => PangeHandler
    console.log(this);
    document.addEventListener("click", event =>
      this.doSomething(event.type) //Error, this = document
      // console.log(this);
    // }).bind(window), false);
    , false);
  },
  doSomething: function(type) {
    console.log("Handing " + type + "for " + this.id);
  }
}
PageHandler.init();

// document.onclick = function(){
//   this.doSomething();//this = document
// };

