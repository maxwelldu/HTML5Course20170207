/**
 * Created by sks on 2017/4/28.
 */
// 使用 Mock
const http = require('http');
const Mock = require('mockjs')
const data = Mock.mock({
  // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
  'list|1-10': [{
    // 属性 id 是一个自增数，起始值为 1，每次增 1
    'id|+1': 1,
    "name": "裙子",
    "desc": "这是一条连衣裙",
    "favcount": 20,
    "upcount": 100,
    "count": 5000
  }]
})
const server = http.createServer(function(req,res){
// 输出结果
  res.end(JSON.stringify(data));
});
server.listen(8000, "127.0.0.1");
