var gulp = require('gulp'),
    minifyHtml = require("gulp-minify-html");

gulp.task('minify-html', function () {
    gulp.src('app/*.html') // 要压缩的html文件
        .pipe(minifyHtml())    //压缩
        .pipe(gulp.dest('dist/html'));
});