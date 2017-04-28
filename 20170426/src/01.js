/**
 * Created by sks on 2017/4/26.
 */

console.log('hello es6');

function test(){
  for(let i = 1; i < 3; i ++) {
    console.log(i);
  }
  console.log(i);
}
test();

function latest(){
  const PI = 3.1415926535;
  // PI = 3;
  console.log(PI);

  const k = {
    a:1
  };
  k.a = 2;
  k.b = 3;
  // k = 3;
  console.log(k);
}
latest();