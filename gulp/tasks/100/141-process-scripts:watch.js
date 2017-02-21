var pkg = require('../../package.js'),
    path = require('path');
var gulp = require('gulp'),
    gulp_util = require('gulp-util'),
    gulp_uglify = require('gulp-uglify'),
    gulp_sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream'),
    watchify = require('watchify');

var watched = watchify(browserify({
    basedir: '.', entries: ['src/index.js'],
    cache: {}, packageCache: {}, debug: true
}));

var on_watch = function () {
    var uglify;
    if (pkg.dizmo && pkg.dizmo.build) {
        var min = pkg.dizmo.build.minify;
        if (min && min.scripts !== null && typeof min.scripts === 'object') {
            uglify = min.scripts;
        } else if (min === false || min.scripts === false) {
            uglify = false
        }
    }
    if (uglify || uglify === undefined) {
        return watched.bundle()
            .pipe(source('index.js'))
            .pipe(buffer())
            .pipe(gulp_sourcemaps.init({loadMaps: true}))
            .pipe(gulp_uglify.apply(this, uglify))
            .pipe(gulp_sourcemaps.write('./'))
            .pipe(gulp.dest(path.join('build', pkg.name)));
    } else {
        return watched.bundle()
            .pipe(source('index.js'))
            .pipe(gulp.dest(path.join('build', pkg.name)));
    }
};

watched.on('update', on_watch);
watched.on('log', gulp_util.log);
gulp.task('process-scripts:watch', on_watch);
