var pkg = require('../../package.js'),
    gulp = require('gulp');

gulp.task('install:watch', function () {
    gulp.watch('build/{0}/**/*'.replace('{0}', pkg.name), [
        'install:only'
    ]);
});
