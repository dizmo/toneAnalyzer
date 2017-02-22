var gulp = require('gulp'),
    gulp_sync = require('gulp-sync')(gulp);

gulp.task('build', gulp_sync.sync([
    [
        'lint'
    ], [
        'clean'
    ], [
        'process-help',
        'process-assets',
        'process-styles',
        'process-scripts',
        'process-markup',
        'process-properties',
        'process-libs'
    ], [
        'process-dzm'
    ]
], 'build'));
