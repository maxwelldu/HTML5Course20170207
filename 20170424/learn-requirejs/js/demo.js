/**
 * Created by sks on 2017/4/24.
 */

// define('hello');

// define({
//   color: "blue"
// });

// define(function (abc, efg) {
//   console.log(arguments);
//   console.log(this);
// });

define(['js/header.js'], function (header) {
  	var red = require(['red'], function (obj) {
    		console.log(obj, 333)
    	});
  	console.log(red, 444)
});
