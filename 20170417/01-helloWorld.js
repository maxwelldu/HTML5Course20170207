/**
 * Created by sks on 2017/4/17.
 */
//require表示引包，引包就是引用自己的特殊功能
var http = require("http");
//创建服务器, 参数是一个回调函数，表示如果有请求进来，我们要做什么
var server = http.createServer(function(req,res){
  //req表示请求，request; res 表示响应，response
  res.writeHead(200, {"content-type":"text/html; charset=UTF-8"})
  res.end("我买了" + (2+2+3) + 's');
});

//运行服务器
server.listen(3000, "127.0.0.1");