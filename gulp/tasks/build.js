const gulp  = require('gulp');
const del   = require('del');

gulp.task('deleteDistFolder', () => {
  return del('./dist/*');
});

gulp.task('copyConfigFiles', ['deleteDistFolder'], () => {
  let pathsToCopy = [
    './app/config/env/env.json',
    './app/config/env/mailConfig.json'
  ];

  return gulp.src(pathsToCopy)
    .pipe(gulp.dest('./dist/config/env'));
});

gulp.task('build', ['deleteDistFolder', 'copyConfigFiles']);
