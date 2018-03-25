'use strict'

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();
var merge = require('merge-stream');
var del = require('del');

/**
 * Build scripts
 */

gulp.task('build:vue', () => {});

gulp.task('build:libs', () => {});

/**
 * Compress scripts
 */

gulp.task('compress', ['build:vue', 'build:libs'], () => {});

/**
 * Build Templates
 */

gulp.task('build:template', () => {
    var index = gulp.src('app/client/index.html').pipe(gulp.dest('public'));

    return index;
});

/**
 * Build CSS
 */

gulp.task('build:css', () => {});

/**
 * Dev Server
 */

gulp.task('dev', ['build:vue', 'build:libs', 'build:template'], () => {
    console.log('Dev server running...');
    nodemon({
        script: 'app/server/server.js',
        ext: 'js',
        ignore: ['gulpfile.js', 'app/client', 'public/']
    })
    browserSync.init(null, { proxy: "localhost:4000"});
    gulp.watch(['app/client/index.html'], ['build:template']);
    gulp.watch('public/**', browserSync.reload);
});

/**
 * Clean scripts
 */

gulp.task('clean:vue', () => {});
gulp.task('clean:libs', () => {});
gulp.task('clean:templates', () => {});
gulp.task('clean:css', () => {});
gulp.task('clean:all', () => {});
gulp.task('clean', ['clean:vue', 'clean:libs', 'clean:templates', 'clean:css'], () => {});
