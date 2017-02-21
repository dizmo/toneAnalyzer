var gulp = require('gulp');
gulp.task('process-assets:watch', function () {
    gulp.watch('assets/**/*', [
        'process-assets'
    ]);
});
