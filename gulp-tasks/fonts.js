import gulp from 'gulp';
import debug from 'gulp-debug';

import pkg from '../package.json';

const dirs = pkg.configs.directories;

gulp.task('fonts', () => gulp
  .src(`${dirs.src}/${dirs.fonts}/**/*`)
  .pipe(gulp.dest(`${dirs.dist}/${dirs.fonts}`))
  .pipe(
    debug({
      title: 'Fonts',
    }),
  ));
