/**
 * Created by sks on 2017/4/26.
 */

// var [x,y]=getVal(),//函数返回值的解构
//     [name,,age]=['zf','male','secrect'];//数组解构

// function getVal() {
//     return [ 1, 2 ];
// }

// console.log('x:'+x+', y:'+y);//输出：x:1, y:2
// console.log('name:'+name+', age:'+age);//输出： name:zf, age:secrect


// 数组的解构赋值
// let [foo, [[bar], baz]] = [1, [[2], 3]];
// console.log(foo); // 1
// console.log(bar); // 2
// console.log(baz); // 3

// 对象的解构赋值
var { foo, bar } = { foo: "aaa", bar: "bbb" };
console.log(foo);   // "aaa"
console.log(bar );  // "bbb"

// 字符串的解构赋值
const [a, b, c, d, e] = 'hello';
console.log(a + b + c + e); // 'hello'