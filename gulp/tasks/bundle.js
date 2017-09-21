const gulp = require('gulp')
const browserify = require('browserify')
const source = require('vinyl-source-stream')
const buffer = require('vinyl-buffer')
const sourcemaps = require('gulp-sourcemaps')
const uglify = require('gulp-uglify')
const gutil = require('gulp-util')

const browser = browserify({
  debug: true,
  entries: 'index.js',
  transform: ['babelify'],
  standalone: 'Struct'
})

gulp.task('bundle', () => {
  return browser.bundle()
    .pipe(source('struct.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(uglify())
      .on('error', gutil.log)
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('umd'))
})
