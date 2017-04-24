var gulp = require('gulp');
//定义一个任务

gulp.task('default',function(){
    gulp.src('script/src.js')         // 获取文件的流的api
        .pipe(gulp.dest('dist')); // 写文件的api
});
