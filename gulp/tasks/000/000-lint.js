var pkg = require('../../package.js'),
    gulp = require('gulp'),
    gulp_eslint = require('gulp-eslint');

gulp.task('lint:js', function () {
    var eslint;
    if (pkg.dizmo && pkg.dizmo.build) {
        var build = pkg.dizmo.build;
        if (build.lint !== null && typeof build.lint === 'object') {
            eslint = build.lint;
        } else if (build.lint === false) {
            eslint = false;
        }
    }
    if (eslint || eslint === undefined) {
        return gulp.src([
            './src/**/*.js', '!src/lib/**', '!build/**', '!node_modules/**'])
            .pipe(gulp_eslint.apply(this, eslint))
            .pipe(gulp_eslint.format());
    }
});

gulp.task('lint', ['lint:js']);
