var pkg = require('../../package.js'),
    path = require('path');
var gulp = require('gulp'),
    gulp_uglify = require('gulp-uglify'),
    gulp_sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer'),
    browserify = require('browserify'),
    source = require('vinyl-source-stream');

gulp.task('process-scripts', function () {
    var uglify;
    if (pkg.dizmo && pkg.dizmo.build) {
        var min = pkg.dizmo.build.minify;
        if (min && min.scripts !== null && typeof min.scripts === 'object') {
            uglify = min.scripts;
        } else if (min === false || min.scripts === false) {
            uglify = false
        }
    }
    var browserified = browserify({
        basedir: '.', entries: ['src/index.js']
    });
    if (uglify || uglify === undefined) {
        return browserified.bundle()
            .pipe(source('index.js'))
            .pipe(buffer())
            .pipe(gulp_sourcemaps.init({loadMaps: true}))
            .pipe(gulp_uglify.apply(this, uglify))
            .pipe(gulp_sourcemaps.write('./'))
            .pipe(gulp.dest(path.join('build', pkg.name)));
    } else {
        return browserified.bundle()
            .pipe(source('index.js'))
            .pipe(gulp.dest(path.join('build', pkg.name)));
    }
});
