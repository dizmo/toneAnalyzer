var gulp = require('gulp');
gulp.task('process-styles:watch', function () {
    gulp.watch('src/style/**/*.scss', [
        'process-styles'
    ]);
});
