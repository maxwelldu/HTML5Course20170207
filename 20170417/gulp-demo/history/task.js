var gulp = require('gulp');
var rename = require('gulp-rename');
//定义一个任务
var a = 0;
gulp.task('a+',function(cb){
    //one是一个异步执行的任务
    setTimeout(function(){
       a++;
        console.log('a++');
        cb();
    },3000);
});
gulp.task('a-',function(){
    //one是一个异步执行的任务
    setTimeout(function(){
       a--;
        console.log('a--');
    },3000);
});

gulp.task('default',['a+','a-']);