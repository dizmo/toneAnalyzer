var gulp = require('gulp');

require('./gulp/tasks/000/000-lint.js');
require('./gulp/tasks/000/010-build.js');
require('./gulp/tasks/000/020-clean.js');
require('./gulp/tasks/100/110-process-help.js');
require('./gulp/tasks/100/111-process-help:watch.js');
require('./gulp/tasks/100/120-process-assets.js');
require('./gulp/tasks/100/121-process-assets:watch.js');
require('./gulp/tasks/100/130-process-styles.js');
require('./gulp/tasks/100/131-process-styles:watch.js');
require('./gulp/tasks/100/140-process-scripts.js');
require('./gulp/tasks/100/141-process-scripts:watch.js');
require('./gulp/tasks/100/150-process-markup.js');
require('./gulp/tasks/100/151-process-markup:watch.js');
require('./gulp/tasks/100/160-process-properties.js');
require('./gulp/tasks/100/161-process-properties:watch.js');
require('./gulp/tasks/100/170-process-libs.js');
require('./gulp/tasks/100/171-process-libs:watch.js');
require('./gulp/tasks/200/210-process-dzm.js');
require('./gulp/tasks/200/211-process-dzm:watch.js');
require('./gulp/tasks/300/310-install.js');
require('./gulp/tasks/300/311-install:watch.js');
require('./gulp/tasks/900/999-watch.js');

gulp.task('default', ['build']);
