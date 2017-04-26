#ES6支行环境安装
```
感觉环境慢使用淘宝镜像，cnpm
.babelrc使用命令创建不成功，直接新建一个文件
touch可以换成手动创建文件,
mkdir可以使用手动创建文件夹,
echo "" >> 1.js可以直接将字符串的内容写入到1.js
```
- touch .babelrc
``` { "presets": [ "es2015" ] } ```
- npm i -g babel-cli
- npm i -D babel-preset-latest babel-cli gulp gulp-babel
- npm init -y
- mkdir src lib
- package.json的script中添加
    ``` "build": "babel src -d lib" ```
- echo "console.log('hello es6')" >> src/01.js
- npm run build
- 新建index.html
``` <script src="lib/01.js"></script> ```
- touch gulpfile.js
```
var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('es6', function(){
  return gulp.src('src/*.js')
      .pipe(babel())
      .pipe(gulp.dest('lib'));
});
gulp.task('watch', function(){
  gulp.watch('src/*.js', ['es6']);
});
gulp.task('default', [ 'watch'] );
```
- gulp
