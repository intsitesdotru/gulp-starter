import gulp from 'gulp';
// import responsive from 'gulp-responsive';
import webp from 'gulp-webp';
import debug from 'gulp-debug';

import pkg from '../package.json';

const dirs = pkg.configs.directories;

gulp.task('webp', () => gulp
// .src(`${dirs.src}/${dirs.images}/**/*.{jpg,jpeg,png,gif,tiff,svg}`)
  .src(`${dirs.src}/${dirs.images}/logo.png`)
// .pipe(responsive({}))
  .pipe(webp())
  .pipe(gulp.dest(`${dirs.dist}/${dirs.images}`))
  .pipe(
    debug({
      title: 'Webp',
    }),
  ));
