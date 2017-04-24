/**
 * Created by Danny on 2015/9/22 9:22.
 */
var express = require("express");

var app = express();

app.get("/",function(req,res){
    res.send("你好");
});

app.get("/haha",function(req,res){
    res.send("这是haha页面，哈哈哈哈哈哈");
});

app.get(/^\/student\/([\d]{10})$/,function(req,res){
    res.send("学生信息，学号" + req.params[0]);
});

app.get("/teacher/:gonghao",function(req,res){
    res.send("老师信息，工号" + req.params.gonghao);
});

app.listen(3000);