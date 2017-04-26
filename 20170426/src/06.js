/**
 * Created by sks on 2017/4/26.
 */
var reflect = value => value;

var sum = (num1, num2) => num1 + num2;

var sum = () => 1 + 2;

var sum = (num1, num2) => { return num1 + num2; }

var getTempItem = id => ({
  id: id,
  name: "temp"
});

//1
var PageHandler = {
  id: "123456",
  init: function(){
    document.addEventListener("click", function(event){
      this.doSomething(event.type); //Error, this = document
      // console.log(this);
    }, false);
  },
  doSomething: function(type) {
    console.log("Handing " + type + "for " + this.id);
  }
}
document.onclick = function(){
  // console.log(this); //document
}

//2
var PageHandler1 = {
  id: "123456",
  init: function(){
    document.addEventListener("click", (function(event){
      this.doSomething(event.type);
    }).bind(this), false)
  },
  doSomething: function(type) {
    console.log("Handing " + type + "for " + this.id);
  }
}

//3
var PageHandler2 = {
  id: "123456",
  init: function(){
    document.addEventListener("click", event => this.doSomething(event.type), false)
  },
  doSomething: function(type) {
    console.log("Handing " + type + "for " + this.id);
  }
};

//ES5
let values = [1,2,3,1,2,3,1,1];
let result = values.sort(function(a,b){
  return a - b;
})
//ES6
let r = values.sort((a,b) => a -b);