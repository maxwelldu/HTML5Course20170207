(function(){
	var jq = function(selector) {
		return new jq.fn.init(selector);
		// return new init(selector);
	};
	jq.fn = {
		init : function(selector) {
			//选择器：#id 和 tag标签
			if(/^#/.test(selector)) {
				console.log('this is a id selector');
				//去掉select的#
				var flag = selector.substr(1, selector.length-1);
				console.log(flag);
				var elem = document.getElementById(flag);
				//this代表jquery实例化出来的对象
				//jquery对象 与 dom对象 进行合并
				this[0] = elem;
				this.length = 1;
			} else {
				var elems = document.getElementsByTagName(selector);
				//遍历elems, 获得每个dom对象，一个个塞到this里面
				for (var i = 0 ; i < elems.length; i ++) {
					this[i] = elems[i];
				}
				this.length = elems.length;
			}
		},
		css : function(k,v) {
			console.log('i can');
			//this代表调用该方法的当前对象(jquery对象)
			//this[0].style[k] = v;
			console.log(this);
			//遍历当前的jquery对象，为每个具体 dom对象设置css样式
			if (typeof k === "string" && typeof v === "string") {
				for (var i = 0; i < this.length; i ++) {
					this[i].style[k] = v;
				}
			} else if (typeof k === "string" && v === undefined) {
				//getComputedStyle
				//返回一个样式，或者返回一个样式数组
			} else if (typeof k === "object") {
				for (var i = 0; i < this.length; i ++) {
					for (var key in k) {
						this[i].style[key] = k[key];
					}
				}
			}
		},
		attr : function(k, v) {
			for (var i = 0; i < this.length; i ++) {
				this[i].setAttribute(k, v);
			}
		},
		each : function(callback) {
			for (var i = 0 ; i < this.length; i ++) {
				// this[i]
				//callback();
				//callback.call(函数内部的this的指向, 函数形参, 形参)

				callback.call(this[i], i, this[i]);
			}
		}
	};

	//设置init()构造函数通过原型prototype方式继承jq.fn
	//这样new init()的对象不仅可以访问init内部的对象，而且还可以访问fn的成员
	jq.fn.init.prototype = jq.fn;

	window.$ = jq;

})();