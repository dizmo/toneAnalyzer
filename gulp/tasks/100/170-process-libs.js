var pkg = require('../../package.js');
var gulp = require('gulp'),
    gulp_copy = require('gulp-copy');

gulp.task('process-libs', function () {
    return gulp.src('src/lib/**/*')
        .pipe(gulp_copy('build/{0}/'.replace('{0}', pkg.name), {
            prefix: 1
        }));
});
