var pkg = require('../../package.js'),
    gulp = require('gulp');

gulp.task('process-dzm:watch', function () {
    gulp.watch('build/{0}/**/*'.replace('{0}', pkg.name), [
        'process-dzm'
    ]);
});
