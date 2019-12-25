import gulp from 'gulp';
import browsersync from 'browser-sync';
import debug from 'gulp-debug';
import eslint from 'gulp-eslint';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import sourcemaps from 'gulp-sourcemaps';
import yargs from 'yargs';
import concat from 'gulp-concat';
import notify from 'gulp-notify';
// import through2 from 'through2';
// import fs from 'fs';
import gulpIf from 'gulp-if';
// import combine from 'stream-combiner2';

import pkg from '../package.json';

const dirs = pkg.configs.directories;

const prod = !!yargs.argv.production;

gulp.task('scripts', () => gulp
  .src([
    // './node_modules/bootstrap/js/dist/util.js',
    // './node_modules/bootstrap/js/dist/collapse.js',
    `${dirs.src}/${dirs.js}/**/*.js`,
  ])
  .pipe(gulpIf(!prod, sourcemaps.init()))
  .pipe(babel())
  .pipe(concat('scripts.js'))
  .pipe(gulpIf(prod, uglify()))
  .pipe(gulpIf(!prod, sourcemaps.write()))
  .pipe(gulp.dest(`${dirs.dist}/${dirs.js}`))
  .pipe(
    debug({
      title: 'JS files',
    }),
  )
  .on('end', browsersync.reload));

gulp.task('lint:scripts', () => gulp
  .src(`${dirs.src}/${dirs.js}/*.js`)
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failAfterError())
  .on(
    'error',
    notify.onError((err) => ({
      title: 'ESLint errors',
      message: err,
      sound: 'Beep',
    })),
  ));

/*
gulp.task("lint:scripts", () => {
    let eslintResults = {};

    let cacheFilePath = process.cwd() + "/tmp/lintCache.json";

    try {
      eslintResults = JSON.parse(fs.readFileSync(cacheFilePath));
    } catch (e) {
      console.log(e)
    }

    return gulp
      .src(`${dirs.src}/${dirs.js}/!*.js`, {read: false})
      .pipe(debug({title: 'src'}))
      .pipe(gulpIf(
        file => eslintResults[file.path] &&
                  eslintResults[file.path].mtime == file.stat.mtime.toJSON(),
        through2.obj((file, enc, cb) => {
          file.eslint = eslintResults[file.path].eslint;
          cb(null, file);
        }),
        combine(
          through2.obj((file, enc, cb) => {
            file.contents = fs.readFileSync(file.path);
            cb(null, file);
          }),
          eslint(),
          debug({title: 'eslint'}),
          through2.obj((file, enc, cb) => {
            eslintResults[file.path] = {
              eslint: file.eslint,
              mtime: file.stat.mtime
            };
            cb(null, file);
          })
        )
      ))
      .on('end', () => {
        fs.writeFileSync(cacheFilePath, JSON.stringify(eslintResults))
      })
      .pipe(eslint.format())
    // .pipe(eslint.failAfterError())

    // return gulp
    //   .src(`${dirs.src}/${dirs.js}/!*.js`)
    //   .pipe(eslint())
    //   .pipe(through2.obj((file, enc, cb) => {
    //     eslintResults[file.path] = {
    //       eslint: file.eslint,
    //       mtime: file.stat.mtime
    //     };
    //     cb(null, file);
    //   }, cb => {
    //     fs.writeFileSync(cacheFilePath, JSON.stringify(eslintResults));
    //     cb();
    //   }))
    //   .pipe(eslint.format())
    //   // .pipe(eslint.failAfterError())
  }
);
*/
