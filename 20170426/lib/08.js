'use strict';

/**
 * Created by sks on 2017/4/26.
 */

//通过对象字面量创建对象
var human = {
  breathe: function breathe() {
    console.log('breathing...');
  }
};
var worker = {
  __proto__: human, //设置此对象的原型为human,相当于继承human
  company: 'freelancer',
  work: function work() {
    console.log('working...');
  }
};
human.breathe(); //输出 ‘breathing...’
//调用继承来的breathe方法
worker.breathe(); //输出 ‘breathing...’


var createAssigner = function createAssigner(keysFunc, undefinedOnly) {
  return function (obj) {
    var length = arguments.length;
    if (length < 2 || obj == null) return obj;
    for (var index = 1; index < length; index++) {
      var source = arguments[index],
          keys = keysFunc(source),
          l = keys.length; //为什么这里要是1=keys.length??这样写是个什么意思？

      // 看好了 人家是l 不是1 keys是函数keysFunc对source处理后的结果，
      // 看函数名和后面写法返回的应该是一个数组，表示对象所有的键名，下面是对键名的遍历
      // 所以 l = keys.length;  就是缓存键名数组的长度喽。


      for (var i = 0; i < l; i++) {
        var key = keys[i];
        if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
      }
      // 也可以下面这么写 不用l 但是效率要低一点 循环的条件是每次都要判断的，直接和具体的值比较比和数组的长度（一个属性）要快一些。
      // for (var i = 0; i < keys.length; i++) {
      //     var key = keys[i];
      //     if (!undefinedOnly || obj[key] === void 0) obj[key] = source[key];
      // }
    }
    return obj;
  };
};

var target = { a: 1 };

var source1 = { b: 2 };
var source2 = { c: 3 };

Object.assign(target, source1, source2);
console.log(target); // {a:1, b:2, c:3}