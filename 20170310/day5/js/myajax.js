/**
 * Created by sks on 2017/3/9.
 */
(function(){
    //唯一向外暴露的顶层变量
    var myajax = window.myajax = {};
    //作者、版本号等等信息
    myajax.author = "Maxwell";
    myajax.version = "1.0.0";

    //这个对象有两个属性，get, post属性，值是函数
    //http://www.duchengjiu.top/a.php?name=a&age=b
    myajax.get = function(URL, queryJSON, callback){
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else {
            var xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300
                || xhr.status == 304) {
                    callback(null, xhr.responseText);
                } else {
                    callback(new Error("没有找到请求的文件"),
                        undefined);
                }
            }
        };
        // {name:'t',age:18}  => name=t&age=18
        var queryString = queryJSON;
        if (typeof queryJSON == "object") {
          queryString =
              myajax._queryjson2querystring(queryJSON);
        }
        xhr.open("GET", URL+"?"+queryString, true);
        xhr.send(null);
    };

    myajax.post = function(URL, queryJSON, callback) {
        if (window.XMLHttpRequest) {
            var xhr = new XMLHttpRequest();
        } else {
            var xhr =new ActiveXObject("Microsoft.XMLHTTP");
        }
        xhr.onreadystatechange = function(){
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 300
                || xhr.status == 304) {
                    callback(null, xhr.responseText);
                } else {
                    callback(new Error("没有找到请求的文件"), undefined);
                }
            }
        }
        xhr.open("POST", URL, true);
        var querystring = myajax._queryjson2querystring(queryJSON);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(querystring);
    };

    //内部函数，查询json变为查询字符串
    //输入一个{"name":"max","age":18,"sex":"男"}
    //返回一个name=max&age=18&sex=%E8%C6%B6
    myajax._queryjson2querystring = function(json) {
        /*
        var result = "";
        for (var k in json) {
            result += k+"="+encodeURIComponent(json[k])+"&";
        }
        return result;
        */
        var arr = [];//结果数组
        for (var k in json) {
            arr.push(k + "=" + encodeURIComponent(json[k]));
        }
        return arr.join("&");
    }

})();
