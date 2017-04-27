/**
 * Created by sks on 2017/4/17.
 */

//引用内置模块
var http = require("http");

//创建服务器
var server = http.createServer(function(req,res){
  // 随机生成一个数字
  var num = parseInt(Math.random() * 9);
  console.log(num);
  // 如果是666，那么抛出错误
  if(num == 6){
    alert("中奖用户" + req.connection.remoteAddress)
    throw new Error("错误");
  }

  res.writeHead(200, {"content-type":"text/html;charset=UTF-8"});
  //输出数字
  res.end(num.toString() + "【ip】" + req.connection.remoteAddress);
});

//监听3000端口
server.listen(3000,"192.168.50.67");