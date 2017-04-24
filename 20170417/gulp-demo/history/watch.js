var gulp = require('gulp');
var rename = require('gulp-rename');
//压缩JS
gulp.task('uglify',function(){
    //do something
    console.log('uglify');
});
//重启服务
gulp.task('reload',function(){
    //do something
    console.log('reload');
});
gulp.task('default',function(){
    //gulp.watch('script/**/*.js', ['uglify','reload']);

    gulp.watch('script/**/*.js', function(event){
        console.log(event.type); //变化类型 added为新增,deleted为删除，changed为改变
        console.log(event.path); //变化的文件的路径
    });

});
