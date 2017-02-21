var pkg = require('../../package.js'),
    fs = require('fs'),
    lodash = require('lodash'),
    path = require('path');
var gulp = require('gulp'),
    gulp_plist = require('gulp-plist'),
    gulp_rename = require('gulp-rename');

gulp.task('process-properties', function () {
    var settings = lodash.mapKeys(pkg.dizmo.settings, function (value, key) {
        return lodash.upperFirst(lodash.camelCase(key));
    });

    var self = this, on_stat = function (error, stat) {
        if (error === null) {
            return gulp.src('.info.plist')
                .pipe(gulp_plist(settings))
                .pipe(gulp_rename('Info.plist'))
                .pipe(gulp.dest(path.join('build', pkg.name)));
        } else {
           self.emit('error', error);
        }
    };

    fs.stat('.info.plist', on_stat);
});

