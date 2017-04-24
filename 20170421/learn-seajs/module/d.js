/**
 * Created by sks on 2017/4/21.
 */

define('aaa', function () {
	console.log(arguments);
	console.log(this);
});

define(function(require){
	var aaa = require('aaa');
	console.log(aaa);
});