var pkg = require('../../package.js'),
    path = require('path');
var gulp = require('gulp'),
    gulp_htmlmin = require('gulp-htmlmin');

gulp.task('process-markup', function () {
    var htmlmin = [{
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
        removeComments: true
    }];
    if (pkg.dizmo && pkg.dizmo.build) {
        var min = pkg.dizmo.build.minify;
        if (min && min.markups !== null && typeof min.markups === 'object') {
            htmlmin = min.markups;
        } else if (min === false || min.markups === false) {
            htmlmin = [{
                collapseWhitespace: false,
                minifyCSS: false,
                minifyJS: false,
                removeComments: false
            }];
        }
    }
    return gulp.src('src/**/*.html')
        .pipe(gulp_htmlmin.apply(this, htmlmin))
        .pipe(gulp.dest(path.join('build', pkg.name)));
});
