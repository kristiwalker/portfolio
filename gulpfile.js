/*jshint esversion: 6 */

const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const runSequence = require('run-sequence');

/*******************************************************************************
BUILD TASKS
*******************************************************************************/

// runs all development tasks in order listed with the 'gulp' command (default)
gulp.task('default', (callback => {
  runSequence(['sass', 'babel', 'browserSync', 'watch'],
    callback
  );
}));

// reloads browser on file save
gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
  });
});

// compiles sass to css
gulp.task('sass', function() {
  // gets all files ending with .scss in build/sass
  return gulp.src('build/sass/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('build/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('babel', () =>
  gulp.src('build/scripts/custom.js')
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(gulp.dest('build/scripts/babel'))
  .pipe(browserSync.reload({
    stream: true
  }))
);

gulp.task('watch', () => {
  gulp.watch('build/sass/**/*.scss', ['sass']);
  gulp.watch('build/scripts/**/*.js', ['babel']);
  gulp.watch('build/*.html', browserSync.reload);
  gulp.watch('build/scripts/**/*.js', browserSync.reload);
});

/*******************************************************************************
DEPLOYMENT TASKS
*******************************************************************************/

// sequences build task to run for netlify
gulp.task('build', (callback => {
  // deploy!
}));
