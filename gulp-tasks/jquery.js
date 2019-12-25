import gulp from 'gulp';
import plugins from 'gulp-load-plugins';

import pkg from '../package.json';

const dirs = pkg.configs.directories;

const version = pkg.dependencies.jquery.slice(pkg.dependencies.jquery.search(/\d/));

gulp.task('copy:jquery', () => gulp
  .src(['node_modules/jquery/dist/jquery.min.js'])
  .pipe(plugins().rename(`jquery-${version}.min.js`))
  .pipe(gulp.dest(`${dirs.dist}/${dirs.js}/vendor`)));
