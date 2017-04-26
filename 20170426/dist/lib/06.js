"use strict";

/**
 * Created by sks on 2017/4/26.
 */

var reflect = function reflect(value) {
  return value;
};

var sum = function sum(num1, num2) {
  return num1 + num2;
};

var sum = function sum() {
  return 1 + 2;
};

var sum = function sum(num1, num2) {
  return num1 + num2;
};

var getTempItem = function getTempItem(id) {
  return {
    id: id,
    name: "temp"
  };
};

//1
var PageHandler = {
  id: "123456",
  init: function init() {
    document.addEventListener("click", function (event) {
      this.doSomething(event.type); //Error, this = document
      // console.log(this);
    }, false);
  },
  doSomething: function doSomething(type) {
    console.log("Handing " + type + "for " + this.id);
  }
};
document.onclick = function () {}
// console.log(this); //document


//2
;var PageHandler1 = {
  id: "123456",
  init: function init() {
    document.addEventListener("click", function (event) {
      this.doSomething(event.type);
    }.bind(this), false);
  },
  doSomething: function doSomething(type) {
    console.log("Handing " + type + "for " + this.id);
  }
};

//3
var PageHandler2 = {
  id: "123456",
  init: function init() {
    var _this = this;

    document.addEventListener("click", function (event) {
      return _this.doSomething(event.type);
    }, false);
  },
  doSomething: function doSomething(type) {
    console.log("Handing " + type + "for " + this.id);
  }
};

//ES5
var values = [1, 2, 3, 1, 2, 3, 1, 1];
var result = values.sort(function (a, b) {
  return a - b;
});
//ES6
var r = values.sort(function (a, b) {
  return a - b;
});
//# sourceMappingURL=06.js.map