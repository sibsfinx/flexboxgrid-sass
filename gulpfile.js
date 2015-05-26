/*global -$ */
'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('styles', function () {
  return gulp.src('source/sass/flexboxgrid.scss')
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      outputStyle: 'nested',
      precision: 10,
      includePaths: ['.'],
      onError: console.error.bind(console, 'Sass error:')
    }))
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 1 version']})
    ]))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('dist'))
});

gulp.task('clean', require('del').bind(null, ['dist']));

gulp.task('watch', ['styles'], function () {
  // watch for changes
  gulp.watch('source/sass/*.scss', ['styles']);
  gulp.watch('bower.json', ['wiredep']);
});

// inject bower components
gulp.task('wiredep', function () {
  var wiredep = require('wiredep').stream;

  gulp.src('source/sass/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('default', function () {
  gulp.start('watch');
});
