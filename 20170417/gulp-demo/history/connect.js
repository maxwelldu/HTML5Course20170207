var gulp = require('gulp');
var less = require('gulp-less');
var connect = require('gulp-connect');

gulp.task('copyhtml',function(){
    gulp.src('app/index.html').pipe(gulp.dest('dist')).pipe(connect.reload());
});

gulp.task('less',function(){
    gulp.src('app/less/index.less').
        pipe(less()).pipe(gulp.dest('dist/css')).pipe(connect.reload());
});

gulp.task('server',function(){
    connect.server({
        root:'dist',//服务器的根目录
        port:8080 //服务器的地址，没有此配置项默认也是 8080
        , livereload: true //自动刷新
    });
    gulp.watch('app/index.html',['copyhtml']);
    gulp.watch('app/less/index.less',['less']);
});
//运行此任务的时候会在8080上启动服务器，
gulp.task('default',['copyhtml','less','server']);