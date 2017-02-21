var gulp = require('gulp');
gulp.task('process-properties:watch', function () {
    gulp.watch('package.json', [
        'process-properties'
    ]);
});
