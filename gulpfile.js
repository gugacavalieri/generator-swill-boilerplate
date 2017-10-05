var coveralls = require('gulp-coveralls')
var eslint = require('gulp-eslint')
var excludeGitignore = require('gulp-exclude-gitignore')
var gulp = require('gulp')
var istanbul = require('gulp-istanbul')
var mocha = require('gulp-mocha')
var nsp = require('gulp-nsp')
var path = require('path')
var plumber = require('gulp-plumber')

gulp.task('eslint', function () {
  return gulp
    .src([
      '**/*.js',
      '!app/templates/gulpfile.babel.js',
      '!app/templates/src/scripts/imports/javascript.js'
    ])
    .pipe(excludeGitignore())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
})

gulp.task('nsp', function (cb) {
  return nsp({
    package: path.resolve('package.json')
  }, cb)
})

gulp.task('istanbul', function () {
  return gulp
    .src('app/index.js')
    .pipe(excludeGitignore())
    .pipe(istanbul({includeUntested: true}))
    .pipe(istanbul.hookRequire())
})

gulp.task('mocha', ['istanbul'], function (cb) {
  var mochaErr

  gulp.src('test/**/*.js')
    .pipe(plumber())
    .pipe(mocha({
      reporter: 'spec'
    }))
    .on('error', function (err) {
      mochaErr = err
    })
    .pipe(istanbul.writeReports())
    .on('end', function () {
      cb(mochaErr)
    })
})

gulp.task('coveralls', ['mocha'], function () {
  if (!process.env.CI) {
    return
  }

  return gulp
    .src(path.join(__dirname, 'coverage/lcov.info'))
    .pipe(coveralls())
})

gulp.task(
  'test',
  [
    'nsp',
    'eslint',
    'mocha',
    'coveralls'
  ]
)

gulp.task('watch-test', function () {
  gulp.watch(
    [
      'app/index.js',
      'test/**/*.js'
    ],
    ['mocha']
  )
})
