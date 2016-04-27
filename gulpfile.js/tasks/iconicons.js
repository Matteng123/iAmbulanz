var config = require('../config')
if (!config.tasks.ionicons) {
  return
}

var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  handleErrors = require('../lib/handleErrors'),
  path = require('path')

var dest = path.join(config.root.dest, config.tasks.ionicons.dest)

var ioniconsTask = function () {
  return gulp.src(config.tasks.ionicons.sources)
    .on('error', handleErrors)
    .pipe(gulp.dest(dest))
    .pipe(browserSync.stream())
}

gulp.task('ionicons', ioniconsTask)
module.exports = ioniconsTask
