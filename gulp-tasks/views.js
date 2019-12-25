import gulp from 'gulp';
import browsersync from 'browser-sync';
import fs from 'fs';

import plugins from 'gulp-load-plugins';
import ssri from 'ssri';
import include from 'gulp-file-include';

import pkg from '../package.json';

const dirs = pkg.configs.directories;

gulp.task('views', () => {
  const hash = ssri.fromData(fs.readFileSync('node_modules/jquery/dist/jquery.min.js'), {
    algorithms: ['sha256'],
  });
  const version = pkg.dependencies.jquery.slice(pkg.dependencies.jquery.search(/\d/));

  return gulp
    .src(`${dirs.src}/${dirs.views}/**/*`)
    .pipe(
      include({
        prefix: '@@',
        basepath: '@file',
      }),
    )
    .pipe(plugins().replace(/{{JQUERY_VERSION}}/g, version))
    .pipe(plugins().replace(/{{JQUERY_SRI_HASH}}/g, hash.toString()))
    .pipe(gulp.dest(dirs.dist))
    .pipe(browsersync.stream());
});
