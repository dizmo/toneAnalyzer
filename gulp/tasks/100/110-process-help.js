var pkg = require('../../package.js'),
    path = require('path');

var gulp = require('gulp'),
    gulp_zip = require('gulp-zip');

gulp.task('process-help:zip', function () {
    return gulp.src('help/**/*', {base: '.'})
        .pipe(gulp_zip('help.zip'))
        .pipe(gulp.dest(path.join('build', pkg.name)));
});
gulp.task('process-help', ['process-help:zip']);
