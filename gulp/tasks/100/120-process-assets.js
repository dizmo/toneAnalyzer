var pkg = require('../../package.js');
var gulp = require('gulp'),
    gulp_copy = require('gulp-copy');

gulp.task('process-assets:base', function () {
    return gulp.src([
        'assets/Icon.*', 'assets/Icon-dark.*', 'assets/Preview.*'
    ])
    .pipe(gulp_copy('build/{0}/'.replace('{0}', pkg.name), {
        prefix: 1
    }));
});
gulp.task('process-assets', ['process-assets:base'], function () {
    return gulp.src('assets/**/*')
        .pipe(gulp_copy('build/{0}/assets/'.replace('{0}', pkg.name), {
            prefix: 1
        }));
});
