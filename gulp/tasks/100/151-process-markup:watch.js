var gulp = require('gulp');
gulp.task('process-markup:watch', function () {
    gulp.watch('src/**/*.html', [
        'process-markup'
    ]);
});
