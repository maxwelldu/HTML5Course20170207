var gulp = require('gulp');
gulp.task('copy-other',function(){
    return gulp.src(['app/css/*.css','app/js/*.js','!app/js/tmp.js'],{base:'app'}).pipe(gulp.dest('dist'));
});