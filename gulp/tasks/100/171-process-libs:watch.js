var gulp = require('gulp');
gulp.task('process-libs:watch', function () {
    gulp.watch('src/lib/**/*', [
        'process-libs'
    ]);
});
