"use strict";

/**
 * Created by sks on 2017/4/26.
 */

var PageHandler = {
  id: "123456",
  init: function init() {
    var _this = this;

    // this => PangeHandler
    console.log(this);
    document.addEventListener("click", function (event) {
      return _this.doSomething(event.type);
    } //Error, this = document
    // console.log(this);
    // }).bind(window), false);
    , false);
  },
  doSomething: function doSomething(type) {
    console.log("Handing " + type + "for " + this.id);
  }
};
PageHandler.init();

// document.onclick = function(){
//   this.doSomething();//this = document
// };
//# sourceMappingURL=05.js.map