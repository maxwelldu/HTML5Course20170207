var gulp = require('gulp');
//定义一个任务
// name 任务的名字 匿名函数，任务定义
gulp.task('hello1',function(){
    console.log('hello1');
});
gulp.task('hello2',function(){
    console.log('hello2');
});

//此任务依赖哪些前置任务
gulp.task('default',['hello1','hello2'],function(){
    console.log('default');
});
