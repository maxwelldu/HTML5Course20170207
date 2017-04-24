var gulp = require('gulp');
var concat = require('gulp-concat');//把多个文件合并成一个文件
var uglify = require('gulp-uglify')
var rename = require('gulp-rename');
gulp.task('uglify',function(){
    return gulp.src(['app/js/*.js','!app/js/*tmp.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(uglify())
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('default',['uglify']);