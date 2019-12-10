import gulp from 'gulp';
import gulpif from 'gulp-if';
import sass from 'gulp-sass';
import mincss from 'gulp-clean-css';
import groupmedia from 'gulp-group-css-media-queries';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import browsersync from 'browser-sync';
import debug from 'gulp-debug';
import yargs from 'yargs';

import pkg from '../package.json';

const dirs = pkg.configs.directories;

const prod = !!yargs.argv.production;

gulp.task('styles', () =>
  gulp
    .src(`${dirs.src}/${dirs.styles}/styles.scss`)
    .pipe(gulpif(!prod, sourcemaps.init()))
    .pipe(plumber())
    .pipe(sass())
    .pipe(groupmedia())
    .pipe(autoprefixer())
    .pipe(
      gulpif(
        prod,
        mincss({
          level: 2
        })
      )
    )
    .pipe(plumber.stop())
    .pipe(gulpif(!prod, sourcemaps.write()))
    .pipe(gulp.dest(`${dirs.dist}/css`))
    .pipe(
      debug({
        title: 'CSS files'
      })
    )
    .pipe(browsersync.stream())
);
