import gulp from 'gulp';
import browsersync from 'browser-sync';

import pkg from '../package.json';

const dirs = pkg.configs.directories;

gulp.task('serve', () => {
  browsersync.init({
    server: `./${dirs.dist}`,
    port: 4000,
    notify: true
  });

  gulp.watch(`${dirs.src}/${dirs.views}`, gulp.parallel('views'));
  gulp.watch(`${dirs.src}/${dirs.styles}`, gulp.parallel('styles'));
  gulp.watch(`${dirs.src}/${dirs.js}`, gulp.series('lint:scripts', 'scripts'));
  gulp.watch(`${dirs.src}/${dirs.assets}`, gulp.parallel('assets'));
  gulp.watch(`${dirs.src}/${dirs.images}`, gulp.parallel('images'));
});
