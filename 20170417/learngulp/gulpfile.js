var gulp = require('gulp');
var less = require('gulp-less');
var connect = require('gulp-connect');

gulp.task('hello', function () {
  console.log('您好');
});
gulp.task('hi', function(){console.log('hi');})
gulp.task('copy-html', function(){
  return gulp.src('index.html').pipe(gulp.dest('dist/'))
      .pipe(connect.reload());
});
gulp.task('copy-images', function(){
  return gulp.src('imgs/*.jpg').pipe(gulp.dest('dist'));
});
gulp.task('less', function(){
  return gulp.src('src/less/*.less')
      .pipe(less())
      .pipe(gulp.dest('dist/less'));
});
gulp.task('server',function(){
  connect.server({
    root:'dist',//服务器的根目录
    port:8080, //服务器的地址，没有此配置项默认也是 8080
    livereload:true
  });
});
gulp.task('watch', function(){
  gulp.watch('index.html',['copy-html']);
});
gulp.task('default', ['hello', 'hi', 'less', 'server', 'watch'], function() {
  // 将你的默认的任务代码放在这
  gulp.src('src/script.js').pipe(gulp.dest('dist/script'));
  // gulp.watch('index.html',['copy-html']);
});
