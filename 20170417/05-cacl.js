/**
 * Created by sks on 2017/4/17.
 */

// 引用内置模块http模块
var http = require("http");

//创建服务器
var server = http.createServer(function(req,res){
  console.log("欢迎客官" + req.connection.remoteAddress);

  while(true){
    var num = parseInt(Math.random() * 999999);
    if(num == 666666) break;
  }

  console.log("客官" + req.connection.remoteAddress + "已经算出6666");
  res.end(num.toString());
});

server.listen(3000,"192.168.50.44");