const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const nodemon = require('gulp-nodemon');
const rollup = require('rollup-stream');
const shell = require('gulp-shell');
const source = require('vinyl-source-stream');
const browserSync = require('browser-sync');

const reload = browserSync.reload;

// Sass
gulp.task('sass', () =>
  gulp.src('./src/scss/styles.scss')
    .pipe(sass({
      includePaths: ['./node_modules/']
    })
    .on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./assets/css'))
    .pipe(reload({ stream: true }))
);

// ES6 Modules with Rollup
gulp.task('rollup', () =>
  rollup('rollup.config.js')
    .pipe(source('main.js', './src/js'))
    .pipe(gulp.dest('./assets/js'))
    .pipe(reload({ stream: true }))
);

// Browsersync
gulp.task('browser-sync', ['server'], () => {
  browserSync({
    proxy: "localhost:5000",
    port: 5050,
    notify: true
  });
});

// Shell for Running Nodemone
gulp.task('server', function (cb) {
  var called = false;
  return nodemon({
    script: 'server.js',
    ignore: [
      'gulpfile.js',
      'node_modules/',
      'views/',
      'src/'
    ]
  })
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});

// Main Tasks
gulp.task('build', ['sass', 'rollup']);
gulp.task('default', ['build', 'browser-sync'], () => {
  gulp.watch('./src/js/**/*.js', ['rollup']);
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./views/**/*.ejs', reload);
});