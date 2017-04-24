var gulp = require('gulp');
var rename = require('gulp-rename');
//定义一个任务

gulp.task('default',function(){
    gulp.src('script/jquery/**/*.js',{base:'script'})         // 获取文件的流的api
        .pipe(rename(function (path) {
            /*path.dirname += "/zfpx";
            path.basename += "-goodbye";
            path.extname = ".md"*/
        }))
        .pipe(gulp.dest('config')); // 写文件的api
});

var file = {
    filename:'script/src.js',
    content:'console.log("hello");',
    path:'script'
}