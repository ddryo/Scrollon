var gulp = require('gulp');
var rimraf = require('rimraf');

/*
    プラグイン
*/

//error時用
var plumber = require('gulp-plumber');  //続行
var notify = require('gulp-notify');   //通知

//concat + babel + minify + rename
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');


/* Babel */
gulp.task('babel', function () {
    gulp.src('./scrollon/scrollon.js')
        .pipe(plumber({ errorHandler: notify.onError('<%= error %>') }))
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({
            extname: '.min.js'
        }))
        .pipe(gulp.dest('./scrollon/'));
});


//default
gulp.task('default', function () {
    gulp.watch('./scrollon/scrollon.js', ['babel']);
});