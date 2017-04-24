/**
 * Created by sks on 2017/4/17.
 */

// 引用内置模块http模块
var http = require("http");
// file system文件系统模块
var fs = require("fs");

//创建服务器
var server = http.createServer(function(req,res){
  console.log("欢迎" + req.connection.remoteAddress + "客官光临小店！马上为您上菜！")
  //命令fs进行文件的读取，它是异步语句
  fs.readFile("./test.txt",function(err,data){
    console.log(req.connection.remoteAddress + "您的菜好了！");
    if(err){
      console.log("文件读取错误");
      return;
    }
    //输出data，文件内容
    res.end(data);
  });
});

server.listen(3000,"192.168.50.44");