var gulp = require('gulp');

/**
 * 匹配多个目录 glob
 * 可以填写一个数组
 *
 */
gulp.task('copy-other',function(){
    return gulp.src(['app/css/*.css','app/js/*.js']).pipe(gulp.dest('dist'));
});