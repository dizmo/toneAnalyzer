var gulp = require('gulp');
gulp.task('process-help:watch', function () {
    gulp.watch('help/**/*', [
        'process-help'
    ]);
});
