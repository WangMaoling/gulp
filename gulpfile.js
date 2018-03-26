var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');//js合并
var uglify = require('gulp-uglify');//压缩
var babel = require('gulp-babel');//

var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');

var connect = require('gulp-connect');//开启服务



// npm install --save-dev gulp-connect
gulp.task('myServer', function() {
  connect.server({
    root: 'src',
    port: 8008,
    livereload: true
  });
});
var htmlmin = require('gulp-htmlmin')//对页面上js、css的压缩支持，配置参数
// npm install gulp-htmlmin --save-dev 对页面上js、css的压缩支持，配置参数
gulp.task('htmlmin',['dabao'], function () {
  var options = {
      removeComments: true,  //清除HTML注释
      collapseWhitespace: true,  //压缩HTML
      collapseBooleanAttributes: true,  //省略布尔属性的值 <input checked="true"/> ==> <input checked />
      removeEmptyAttributes: true,  //删除所有空格作属性值 <input id="" /> ==> <input />
      removeScriptTypeAttributes: true,  //删除<script>的type="text/javascript"
      removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
      minifyJS: true,  //压缩页面JS
      minifyCSS: true  //压缩页面CSS
  };
  gulp.src('src/*.html')
      .pipe(htmlmin(options))
      .pipe(gulp.dest('dist'));
});





// gulp.task('hello', function() {
//   // 将你的默认的任务代码放在这
//   console.log(useref)
// });
// gulp.task('sass', function(){
//     return gulp.src('src/scss/styles.scss')
//         .pipe(sass()) // Converts Sass to CSS with gulp-sass
//         .pipe(gulp.dest('src/css'))
// });
// gulp.task('sass', function(){
//     return gulp.src('src/**/*.scss')
//         .pipe(sass()) // Converts Sass to CSS with gulp-sass
//         .pipe(gulp.dest('src/css'))
// });
// gulp.task('watch', function(){
//     gulp.watch('src/**/*.scss', ['sass']);
// // Other watchers
// })
// gulp.task('browserSync', function() {
//     browserSync({
//       server: {
//         baseDir: 'src'
//       },
//     })
//   })
// gulp.task('html', function() {
//     gulp.src('./*.html')
//         .pipe(connect.reload());
// });
// gulp.task('sass', function() {
//     return gulp.src('src/scss/**/*.scss') // Gets all files ending with .scss in app/scss
//         .pipe(sass())
//         .pipe(gulp.dest('src/css'))
//         .pipe(browserSync.reload({
//             stream: true
//         }))
// });
// gulp.task('watch', ['browserSync', 'sass'], function (){
//     gulp.watch('src/scss/**/*.scss', ['sass']);
//     // Other watchers
// })
// js合并
// gulp.task('useref', function(){
//     return gulp.src('src/*.html')
//         .pipe(useref())
//         .pipe(gulp.dest('dist'));
// });
// js合并压缩一起的
// gulp.task('useref', function(){
//     return gulp.src('src/js/**')
//         .pipe(babel())
//         .pipe(uglify()) // Uglifies Javascript files
//         .pipe(useref())
//         .pipe(gulp.dest('dist'))
// });  

// gulp.task('useref', function(){
//     return gulp.src('src/*.html')
//         .pipe(babel())
//         .pipe(uglify()) // Uglifies Javascript files
//         .pipe(useref())
//         .pipe(gulp.dest('dist'))
// });
  
// gulp.task('useref', function(){
//     return gulp.src('src/**')
//       // Minifies only if it's a CSS file
//       .pipe(gulpIf('*.css', minifyCSS()))
//       .pipe(gulpIf('*.scss', sass()))
//       .pipe(gulp.dest('src/css'))
//     //   Uglifies only if it's a Javascript file
//       .pipe(gulpIf('*.js', uglify()))
//     //   .pipe(useref())
//       .pipe(gulp.dest('dist'))
//   });
  
  
gulp.task('images',['babel'],function(){
  return gulp.src('src/images/*.+(png|jpg|gif|svg)')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/images'))
});
gulp.task('sass', function(){
  return gulp.src(['src/sass/*.scss','src/less/*.less'])
    .pipe(sass()) // Converts Sass to CSS with gulp-sass
    .pipe(gulp.dest('src/css'))
});
gulp.task("babel", ['htmlmin'],function () {  
  return gulp.src("src/js/**")
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));  
}); 
gulp.task('dabao',['sass'],function(){
  return gulp.src(['src/**','!src/sass','!src/sass/**','!src/less','!src/less/**','!src/images','!src/images/**','!src/js','!src/js/**'])
    // Minifies only if it's a CSS file
    .pipe(gulpIf('*.css', minifyCSS()))
    //Uglifies only if it's a Javascript file
    // .pipe(gulpIf('*.js',babel({presets: ['es2015']})))
    // .pipe(uglify())
    // .pipe(uglify())
    .pipe(gulp.dest('dist'))
});

gulp.task('default', ['sass', 'dabao','htmlmin','babel','images']);