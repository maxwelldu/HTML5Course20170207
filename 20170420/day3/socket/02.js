var http = require("http");
var fs = require("fs");

var server = http.createServer(function(req,res){
	if(req.url == "/"){
		//显示首页
		fs.readFile("./huaban.html",function(err,data){
			res.end(data);
		});
	}
});

//创建一个io对象 
var io = require('socket.io')(server);
//监听连接事件
io.on("connection",function(socket){
	console.log("1个客户端连接了");
	socket.on("hua",function(msg){
		io.emit("huida",msg);
	});
});

server.listen(4000,"192.168.50.44");