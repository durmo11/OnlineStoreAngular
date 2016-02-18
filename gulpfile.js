var gulp = require('gulp');
var sass = require('gulp-sass');
var uncss = require('gulp-uncss');
var inject = require('gulp-inject');
var path = require('path');
var wiredep = require('wiredep').stream;
var gulpConcat=require('gulp-concat');
var size=require('gulp-size');
var minify = require('gulp-minify');
var minifyCss = require('gulp-minify-css');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var browserSync= require('browser-sync');
var rename = require("gulp-rename");
var templateCache = require('gulp-angular-templatecache');
gulp.task('styles', function(){
  var injectAppFiles = gulp.src('app/src/styles/*.scss', {read: false});
  var injectGlobalFiles = gulp.src('app/src/global/*.scss', {read: false});
  function transformFilepath(filepath) {
    return '@import "' + filepath + '";';
  }

  var injectAppOptions = {
    transform: transformFilepath,
    starttag: '// inject:app',
    endtag: '// endinject',
    addRootSlash: false
  };

  var injectGlobalOptions = {
    transform: transformFilepath,
    starttag: '// inject:global',
    endtag: '// endinject',
    addRootSlash: false
  };

  return gulp.src([
    'app/src/main.scss'])
    .pipe(sourcemaps.init())
    .pipe(wiredep())
    .pipe(inject(injectGlobalFiles, injectGlobalOptions))
    .pipe(inject(injectAppFiles, injectAppOptions))
    .pipe(sass())
    .pipe(rename({suffix: '.min'}))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('app/dist'))
    .pipe(browserSync.stream());
});

// this tells gulp to combine my Angular dependencies and to output the vendor.js file into the dist/ folder
gulp.task("vendor", function() {
        return gulp.src([
                'app/bower_components/jquery/dist/jquery.js',
                'app/bower_components/angular/angular.js',
                'app/bower_components/angular-ui-router/release/angular-ui-router.min.js',
                'app/bower_components/angular-animate/angular-animate.js',
                'app/bower_components/angular-resource/angular-resource.js',
                'app/bower_components/angular-spinner/angular-spinner.js',
                'app/bower_components/angular-payments/lib/angular-payments.js',
                'app/bower_components/ui-bootstrap-custom-tpls-1.1.2.min.js',
                'app/bower_components/angular-aria/angular-aria.js',
                'app/bower_components/angular-material/angular-material.js'
        ])
        .pipe(sourcemaps.init())
        .pipe( gulpConcat('vendor.js'))
        .pipe( size())
        .pipe(rename({suffix: '.min'}))
        .pipe(minify())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('app/dist'));
});
gulp.task("angular", function() {
    return gulp.src([
      'app/Components/*/*.js',
      'app/js/*.js',
    ])
    .pipe(sourcemaps.init())
    .pipe( gulpConcat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minify())
    .pipe(sourcemaps.write('maps'))
    .pipe(gulp.dest('app/dist'));
});
// Static Server + watching scss/html files
gulp.task('browser-sync', ['styles'], function() {

    browserSync.init({
        server: "./app"
    });
    gulp.watch("app/src/*.scss", ['styles']).on('change', browserSync.reload);
    gulp.watch("app/js/*.js",['angular']).on('change', browserSync.reload);
    gulp.watch("app/Components/*/*.js",['angular']).on('change', browserSync.reload);
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("app/partials/*.html").on('change', browserSync.reload);
    gulp.watch("app/partials/Cart/*.html").on('change', browserSync.reload);
});
gulp.task('templateCache', function () {

  return gulp.src('app/partials/*.html')
    .pipe(templateCache(module='templates.js'))
    .pipe(gulp.dest('app/js/'));
});
gulp.task('uncss', function () {
    return gulp.src('app/dist/main.min.css')
        .pipe(uncss({
            html: ['app/*.html', 'app/partials/*.html']
        }))
        .pipe(gulp.dest('app/dist/styles/'));
});
gulp.task('default', ['vendor', 'angular', 'browser-sync'], function() {
});
