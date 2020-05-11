var gulp = require('gulp');
var sass = require('gulp-sass');
var compass = require('gulp-compass');
var browserSync = require('browser-sync').create();
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var wiredep = require('wiredep').stream;
var concat = require('gulp-concat');
var inject = require('gulp-inject');
var mainBowerFiles = require('gulp-main-bower-files');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});

gulp.task('compass', function () {
  return gulp.src('./assets/css/*.scss').pipe(plumber({
    errorHandler: function (err) {
      this.emit('end');
    }
  })).pipe(compass({
    config_file: './config.rb',
    css: './assets/css',
    sass: 'assets/css' // removed the dot-slash from here
  })).pipe(browserSync.reload({
    stream: true
  }));
});

gulp.task('bower', function () {
  gulp.src('./*.html').pipe(wiredep()).pipe(gulp.dest('./'));
});

/*built*/
gulp.task('wiredep', ['concatBowerJS', 'concatBowerCSS'], function () {
  var target = gulp.src('./*.html');
  var sources = gulp.src(['assets/vendor.min.js', 'assets/js/functions.js', 'assets/js/main.js', 'assets/vendor.min.css', 'assets/css/main.css'], {
    read: false
  });
  return target.pipe(inject(sources, {
    ignorePath: 'dist/',
    addRootSlash: false
  })).pipe(gulp.dest('./'));
});

gulp.task('concatBowerJS', function () {
  return gulp.src('./bower.json').pipe(mainBowerFiles(['**/*.js'])).pipe(concat('assets/vendor.js')).pipe(rename({
    suffix: '.min'
  })).pipe(uglify()).pipe(gulp.dest('.'));
});

gulp.task('concatBowerCSS', function () {
  return gulp.src('./bower.json').pipe(mainBowerFiles(['**/*.css'])).pipe(concat('assets/vendor.css')).pipe(rename({
    suffix: '.min'
  })).pipe(cssmin()).pipe(gulp.dest('.'));
});

gulp.task('minify-css', function () {
  gulp.src('assets/css/main.css').pipe(cssmin()).pipe(rename({
    suffix: '.min'
  })).pipe(gulp.dest('assets/css/'));
});

gulp.task('minify-js', function () {
  return gulp.src('assets/js/main.js').pipe(uglify()).pipe(rename({
    suffix: '.min'
  })).pipe(gulp.dest('assets/js/'));
});

gulp.task('default', ['browserSync', 'compass', 'wiredep'], function () {
  gulp.watch('assets/css/**/*.scss', ['compass']);
  gulp.watch("*.html").on('change', browserSync.reload);
  gulp.watch("assets/js/*.js").on('change', browserSync.reload);
});

gulp.task('final', ['compass', 'minify-css', 'minify-js', 'wiredep']);
