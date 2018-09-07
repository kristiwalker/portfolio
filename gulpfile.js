/*jshint esversion: 6 */

const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const useref = require('gulp-useref');
// minifies js
const uglify = require('gulp-uglify');
const gulpIf = require('gulp-if');
// checks if certain file type
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const runSequence = require('run-sequence');
const del = require('del');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const csso = require('gulp-csso');

/*******************************************************************************
DEVELOPMENT TASKS
*******************************************************************************/

// runs all development tasks in order listed with the 'gulp' command (default)
gulp.task('default', function(callback) {
  runSequence(['sass', 'babel', 'browserSync', 'watch'],
    callback
  );
});

// reloads browser on file save
gulp.task('browserSync', function() {
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
    // .pipe(changed('prod'))
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
  .pipe(gulp.dest('babel/scripts'))
  .pipe(browserSync.reload({
    stream: true
  }))
);

gulp.task('watch', function() {
  gulp.watch('build/sass/**/*.scss', ['sass']);
  gulp.watch('build/*.html', browserSync.reload);
  gulp.watch('build/scripts/**/*.js', browserSync.reload);
});

/*******************************************************************************
PRODUCTION TASKS
*******************************************************************************/

// sequences build task to run after production tasks
gulp.task('prod', function(callback) {
  // runs each task in order listed
  runSequence('clean:prod', ['sass', 'useref', 'uglifyScripts', 'minifyStyles'],
    callback
  );
});

// Gulp task to minify JavaScript files
gulp.task('uglifyScripts', function() {
  return gulp.src('./build/scripts/babel/*.js')
    // Minify the file
    .pipe(uglify())
    // Output
    .pipe(gulp.dest('./prod'));
});

// Gulp task to minify CSS files
gulp.task('minifyStyles', function() {
  // gets all files ending with .scss in build/sass
  return gulp.src('build/css/**/*.css')
    // Auto-prefix css styles for cross browser compatibility
    // .pipe(autoprefixer({
    //   browsers: AUTOPREFIXER_BROWSERS
    // }))
    // Minify the file
    .pipe(csso())
    // Output
    .pipe(gulp.dest('./prod'));
});

// combines simliar file to one file in prod/build folder
gulp.task('useref', function() {
  return gulp.src('build/*.html')
    .pipe(useref())
    // minifies only if it's a JS file
    .pipe(gulpIf('*.js', uglify()))
    // minifies only if it's a CSS file
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('prod'));
});

// optimiazes images
// gulp.task('images', function() {
//     return gulp.src('build/images/**/*.+(png|jpg|jpeg|gif|svg)')
//         // caches images that ran through imagemin
//         .pipe(cache(imagemin([
//                 imagemin.gifsicle({
//                     interlaced: true
//                 }),
//                 imagemin.jpegtran({
//                     progressive: true
//                 }),
//                 imagemin.optipng({
//                     optimizationLevel: 5
//                 }),
//                 imagemin.svgo({
//                     plugins: [{
//                         removeViewBox: true
//                     }]
//                 }), {
//                     verbose: true
//                 }
//             ]))
//             .pipe(gulp.dest('prod/images')));
// });

// copies fonts to prod/fonts
// gulp.task('fonts', function() {
//     return gulp.src('build/fonts/**/*')
//         .pipe(gulp.dest('prod/fonts'));
// });

// deletes unused files in prod
gulp.task('clean:prod', function() {
  return del.sync('prod');
});

/*
 * clears cache (usually means images)
 * must be manually run (not set up with build task)
 */
gulp.task('cache:clear', function(callback) {
  return cache.clearAll(callback);
});
