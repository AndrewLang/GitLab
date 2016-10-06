//'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');
var merge = require('merge2');
var concat = require('gulp-concat');
var ts = require('gulp-typescript');
var rename = require('gulp-rename');
var sequence = require('run-sequence');
var shell = require('gulp-shell');
var uglify = require('gulp-uglify');


var del = require('del');
var dist = 'dist';
var folder = 'src/app/';
var useAot = false;

gulp.task('compile', function() {
    return gulp.src('/')
        .pipe(shell('tsc && concurrently'));

});

gulp.task('sass', function() {
    console.log("Compile sass to css.")

    var folder = 'src/assets/';
    return merge(
            gulp.src(folder + "css/*.css"),
            gulp.src(folder + 'styles/*.scss')
            .pipe(sass().on('error', sass.logError))
        )
        .pipe(concat('app.css'))
        .pipe(minify())
        .pipe(gulp.dest(dist));
});

gulp.task('electron', function() {
    return gulp.src('/')
        .pipe(shell('electron .'));
});

gulp.task('start:server', function() {
    return gulp.src('/')
        .pipe(shell('concurrently \"npm run tsc:w\" \"npm run lite\" \"gulp sass:watch\"'));
});

gulp.task('sass:watch', function() {
    gulp.watch('app/assets/styles/*.scss', ['sass']);
    //gulp.watch('*.ts', ['scripts'])
});

gulp.task('start', function(callback) {
    sequence(["compile", "sass"], "electron", function() {
        console.log("gulp task finish");
    });
});

gulp.task('run', function() {
    childProcess.spawn(electron, ['--debug=5858', './src'], {
        stdio: 'inherit'
    });
});
// backup of npm
// tsc && concurrently  && electron .

/*

    1. Install typings 
    npm install typings --global

    2. Install typings for jquery
    typings install dt~jquery --global --save

    
*/