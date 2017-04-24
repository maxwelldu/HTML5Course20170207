var http = require("http");
var url = require("url");

var server = http.createServer(function(req,res){
	//url.parse()可以将一个完整的URL地址，分为很多部分：
	//host、port、pathname、path、query
	var pathname = url.parse(req.url).pathname;
  // var path = url.parse(req.url).path;
  // var query = url.parse(req.url).query;
  // console.log(pathname);
  // console.log(path);
  // console.log(query);
	//url.parse()如果第二个参数是true，那么就可以将所有的查询变为对象
	//就可以直接打点得到这个参数
	var query = url.parse(req.url,true).query;
	//直接打点得到这个参数
	var name = query.name;
  var age = query.age;

	console.log("pathname:" + pathname);
	console.log("name:" + name);
  console.log("age:" + age);

	res.end();
});

server.listen(3000,"127.0.0.1");