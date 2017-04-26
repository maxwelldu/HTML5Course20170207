var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('es6', function(){
  return gulp.src('src/**/*.js')
      .pipe(babel())
      .pipe(gulp.dest('lib'));
});
gulp.task('watch', function(){
  gulp.watch('src/**/*.js', ['es6']);
});
gulp.task('default', [ 'watch'] );
