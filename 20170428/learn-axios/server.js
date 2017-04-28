/**
 * Created by sks on 2017/4/28.
 */
const http = require('http');
const server = http.createServer(function(req,res){
  res.end(`{"username":"maxwelldu"}`);
});
server.listen(8080, "192.168.50.67");
