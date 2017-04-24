var http = require("http");
var fs = require("fs");

var server = http.createServer(function(req,res){
	if(req.url == "/"){
		//显示首页
		fs.readFile("./index.html",function(err,data){
			res.end(data);
		});
	}
});

//创建一个io对象 
var io = require('socket.io')(server);
//监听连接事件
io.on("connection",function(socket){
	console.log("1个客户端连接了");
	socket.on("tiwen",function(msg){
		console.log("本服务器得到了一个提问" + msg);
		socket.emit("huida","吃了");
	});
});

server.listen(4000,"192.168.50.44");