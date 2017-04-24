/**
 * Created by sks on 2017/4/17.
 */

var http = require('http');
var server = http.createServer(function(req,res){
 console.log(req.url);
 res.writeHead(200,{"Content-type":"text/html;charset=utf-8"});
 res.write("<h1>I am main title</h1>");
  res.write("<h2>I am second title</h2>");
  res.write("<h3>I am third title</h3>");
  res.write("<h4>I am fourth title</h4>");
  res.end((1+2+3).toString());
});
server.listen(3000,"127.0.0.1");