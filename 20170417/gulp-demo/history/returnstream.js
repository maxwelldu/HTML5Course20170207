var gulp = require('gulp');

gulp.task('one',function(cb){
    var stream = gulp.src('script/**/*.js')
        .pipe(gulp.dest('build'));
    //return stream;
});

gulp.task('default',['one'],function(){
    console.log('default is done');
});
