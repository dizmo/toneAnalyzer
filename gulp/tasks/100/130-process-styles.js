var pkg = require('../../package.js'),
    path = require('path');

var gulp = require('gulp'),
    gulp_copy = require('gulp-copy'),
    gulp_sass = require('gulp-sass'),
    gulp_sourcemaps = require('gulp-sourcemaps');

gulp.task('process-styles:copy', function () {
    return gulp.src(['src/style/**/*', '!src/style/**/*.scss'])
        .pipe(gulp_copy(path.join('build', pkg.name, 'style'), {
            prefix: 2
        }));
});
gulp.task('process-styles', ['process-styles:copy'], function () {
    var sass = [{
        outputStyle: 'compressed'
    }];
    if (pkg.dizmo && pkg.dizmo.build) {
        var min = pkg.dizmo.build.minify;
        if (min && min.styles !== null && typeof min.styles === 'object') {
            sass = min.styles;
        } else if (min === false || min.styles === false) {
            sass = [{
                outputStyle: 'expanded'
            }];
        }
    }
    return gulp.src('src/style/**/*.scss')
        .pipe(gulp_sourcemaps.init())
        .pipe(gulp_sass.apply(this, sass).on('error', gulp_sass.logError))
        .pipe(gulp_sourcemaps.write('./'))
        .pipe(gulp.dest(path.join('build', pkg.name, 'style')));
});
