import gulp from 'gulp';
import del from 'del';

import pkg from '../package.json';

const dirs = pkg.configs.directories;

gulp.task('clean', () => del([dirs.dist]));
