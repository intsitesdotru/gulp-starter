import gulp from 'gulp';

const requireDir = require('require-dir');

requireDir('./gulp-tasks/');

export const prod = gulp.series(
  'clean',
  gulp.parallel([
    'views',
    'styles',
    'copy:jquery',
    gulp.series('lint:scripts', 'scripts'),
    'images',
    'webp',
    'assets',
    'fonts',
  ]),
);

export const development = gulp.series(
  'clean',
  gulp.parallel([
    'views',
    'styles',
    'copy:jquery',
    gulp.series('lint:scripts', 'scripts'),
    'images',
    'assets',
    'fonts',
  ]),
  gulp.parallel('serve'),
);

export const images = gulp.series('images');
export const webp = gulp.series('webp');

export default development;
