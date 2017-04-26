'use strict';

/**
 * Created by sks on 2017/4/26.
 */

function sayHello(name) {
  //传统的指定默认参数的方式
  var name = name || 'dude';
  console.log('Hello ' + name);
}

//运用ES6的默认参数
function sayHello2() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'dude';

  console.log('Hello ' + name);
}
sayHello(); //输出：Hello dude
sayHello('zf'); //输出：Hello zf
sayHello2(); //输出：Hello dude
sayHello2('zf'); //输出：Hello zf

// rest
function restFunc(a) {
  for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    rest[_key - 1] = arguments[_key];
  }

  console.log(a, rest);
}
restFunc(1);
restFunc(1, 2, 3, 4);

//将所有参数相加的函数
function add() {
  for (var _len2 = arguments.length, x = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    x[_key2] = arguments[_key2];
  }

  console.log(x);
  return x.reduce(function (m, n) {
    return m + n;
  });
}
//传递任意个数的参数
console.log(add(1, 2, 3)); //输出：6
console.log(add(1, 2, 3, 4, 5)); //输出：15

var people = ['zf', 'John', 'Sherlock'];

function sayHello(people1, people2, people3) {
  console.log('Hello ' + people1 + ',' + people2 + ',' + people3);
}
//但是我们将一个数组以拓展参数的形式传递，它能很好地映射到每个单独的参数
sayHello.apply(undefined, people); //输出：Hello zf,John,Sherlock

//而在以前，如果需要传递数组当参数，我们需要使用函数的apply方法
sayHello.apply(null, people); //输出：Hello zf,John,Sherlock
//# sourceMappingURL=11.js.map