"use strict";

/**
 * Created by sks on 2017/4/26.
 */

var array = [1, 2, 3];
//传统写法
// array.forEach(function(v) {
//     console.log(v);
// });

// array.forEach(v => console.log(v));

array.forEach(function (a, b, c) {
  return console.log(a, b, c);
});