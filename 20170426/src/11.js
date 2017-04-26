/**
 * Created by sks on 2017/4/26.
 */
function sayHello(name){
  //传统的指定默认参数的方式
  var name=name||'dude';
  console.log('Hello '+name);
}

//运用ES6的默认参数
function sayHello2(name='dude'){
  console.log(`Hello ${name}`);
}
sayHello();//输出：Hello dude
sayHello('zf');//输出：Hello zf
sayHello2();//输出：Hello dude
sayHello2('zf');//输出：Hello zf

// rest
function restFunc(a, ...rest) {
  console.log(a,rest)
}
restFunc(1);
restFunc(1, 2, 3, 4);

//将所有参数相加的函数
function add(...x){
  console.log(x);
  return x.reduce((m,n)=>m+n);
}
//传递任意个数的参数
console.log(add(1,2,3));//输出：6
console.log(add(1,2,3,4,5));//输出：15

var people=['zf','John','Sherlock'];

function sayHello(people1,people2,people3){
  console.log(`Hello ${people1},${people2},${people3}`);
}
//但是我们将一个数组以拓展参数的形式传递，它能很好地映射到每个单独的参数
sayHello(...people);//输出：Hello zf,John,Sherlock

//而在以前，如果需要传递数组当参数，我们需要使用函数的apply方法
sayHello.apply(null,people);//输出：Hello zf,John,Sherlock
