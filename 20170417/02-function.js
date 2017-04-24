/**
 * Created by sks on 2017/4/17.
 */

//引用内置模块
var http = require("http");
//声明一个变量
var a = 0;
//创建服务器
var server = http.createServer(function(req,res){
  a++;
  //在页面上输出a。res.end()必须输出字符串，所以我们toString()
  res.end(a.toString());
});

//监听3000端口
server.listen(3000,"192.168.50.44");