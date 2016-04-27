var config = require('../config')
if (!config.tasks.fonts) {
  return
}

var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  handleErrors = require('../lib/handleErrors'),
  path = require('path')

var paths = {
  src: path.join(config.root.src, config.tasks.fonts.src, '/**/*.{' + config.tasks.fonts.extensions.join(',') + '}'),
  dest: path.join(config.root.dest, config.tasks.fonts.dest),
}

if (config.tasks.fonts.exclude) {
  paths.src = [ paths.src ]
  config.tasks.fonts.exclude.forEach(function (glob) {
    paths.src.push('!' + path.join(config.root.src, config.tasks.fonts.src, glob))
  })
}

var fontsTask = function () {
  return gulp.src(paths.src)
    .on('error', handleErrors)
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('fonts', fontsTask)
module.exports = fontsTask
