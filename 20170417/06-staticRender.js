/**
 * Created by sks on 2017/4/17.
 */

var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){
 console.log(req.url);
 if (req.url == "/fang") {
  fs.readFile("./test/xi.html", function(err, data){
   res.writeHead(200,{"content-type":"text/html;charset=utf-8"});
   res.end(data);
  });
 } else if(req.url == "/0.jpg") {
  fs.readFile('./test/0.jpg', function(err, data){
   res.writeHead(200, {"content-type":"image/jpg"});
   res.end(data);
  });
 } else if(req.url == '/1.css') {
  fs.readFile('./test/1.css', function(err, data){
    res.writeHead(200, {"content-type":"text/css"});
    res.end(data);
  })
 } else {
   res.writeHead(404, {"content-type":"text/html; charset=utf-8"});
   res.end("找不到对象");
 }

});

server.listen(3000, "192.168.50.44");