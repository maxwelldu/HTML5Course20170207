"use strict";

var handler = {
  get: function get(target, name) {
    return name in target ? target[name] : 37;
  },
  set: function set(obj, prop, value) {
    // console.log(obj,prop, value);
    obj[prop] = value;
    //如果你想设置属性root的值，我们禁止设置，则返回false
    return prop != "root";
    // return true;
  }
};

var p = new Proxy({ a: 1 }, handler);
p.b = undefined;
p.a = 2;
// p.root = 10;

console.log(p.a, p.b); // 1, undefined
console.log('c' in p, p.c); // false, 37