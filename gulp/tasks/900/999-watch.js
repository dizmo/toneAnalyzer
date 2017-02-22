var gulp = require('gulp'),
    gulp_sync = require('gulp-sync')(gulp);

gulp.task('watch', gulp_sync.sync([
    [
        'build'
    ], [
        'process-help:watch',
        'process-assets:watch',
        'process-styles:watch',
        'process-scripts:watch',
        'process-markup:watch',
        'process-properties:watch',
        'process-libs:watch'
    ], [
        'process-dzm:watch'
    ], [
        'install:watch'
    ]
], 'watch'));
