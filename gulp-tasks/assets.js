import gulp from 'gulp';
import browsersync from 'browser-sync';

import pkg from '../package.json';

const dirs = pkg.configs.directories;

gulp.task('assets', () => gulp
  .src(`${dirs.src}/${dirs.assets}/**/*`)
  .pipe(gulp.dest(`${dirs.dist}/${dirs.assets}`))
  .on('end', browsersync.reload));
