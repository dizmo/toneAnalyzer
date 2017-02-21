var gulp = require('gulp'),
    rimraf = require('rimraf');

gulp.task('clean:build', function () {
    return rimraf.sync('build')
});
gulp.task('clean', ['clean:build']);
