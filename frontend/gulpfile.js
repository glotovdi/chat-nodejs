var gulp = require('gulp');
var minifyCss = require('gulp-minify-css');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var concat = require('gulp-concat');
var paths = {
  html: ['src/index.html'],
  css: ['src/styles/styles.scss', 'src/styles/media.scss'],
  script: ['src/scripts/variables/*.js', 'src/scripts/*.js']
};

gulp.task(
  'mincss',
  gulp.series(function() {
    return gulp
      .src(paths.css)
      .pipe(concat('style.scss'))
      .pipe(sass().on('error', sass.logError))
      .pipe(minifyCss())
      .pipe(gulp.dest('dist'))
      .pipe(browserSync.stream());
  })
);

gulp.task(
  'html',
  gulp.series(function() {
    return gulp
      .src(paths.html)
      .pipe(gulp.dest('dist'))
      .pipe(reload({
        stream: true
      }));
  })
);

gulp.task(
  'browserSync',
  gulp.series(function() {
    browserSync({
      server: {
        baseDir: './dist'
      },
      port: 8080,
      open: true,
      notify: false,
      ghostMode: false
    });
  })
);

gulp.task(
  'scripts',
  gulp.series(function() {
    return gulp
      .src(paths.script)
      .pipe(concat('index.js'))
      .pipe(gulp.dest('dist'))
      .pipe(reload({
        stream: true
      }));
  })
);

gulp.task(
  'watcher',
  gulp.series(function() {
    gulp.watch(paths.css, gulp.series(['mincss']));
    gulp.watch(paths.script, gulp.series(['scripts']));
    gulp.watch(paths.html, gulp.series(['html']));
  })
);

gulp.task('prepare', gulp.parallel('mincss', 'scripts', 'html'));

gulp.task('default', gulp.parallel('prepare', 'watcher', 'browserSync'));