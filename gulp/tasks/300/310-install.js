var pkg = require('../../package.js'),
    gulp = require('gulp'),
    os = require('os'),
    path = require('path');

var install = function (result) {
    var install_to = process.env.DIZMO_INSTALL_TO || pkg.dizmo['install-to'];
    if (path.isAbsolute(install_to) === false)
        install_to = path.join(os.homedir(), install_to);
    return install_to ? result.pipe(gulp.dest(path.join(
        install_to, pkg.dizmo.settings['bundle-identifier']))) : result;
};

gulp.task('install', ['build'], function () {
    return install(gulp.src(
        'build/{0}/**/*'.replace('{0}', pkg.name)));
});
gulp.task('install:only', function () {
    return install(gulp.src(
        'build/{0}/**/*'.replace('{0}', pkg.name)));
});
