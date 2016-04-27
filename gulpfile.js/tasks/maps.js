var config      = require('../config')
if(!config.tasks.maps) return

var browserSync = require('browser-sync')
var changed     = require('gulp-changed')
var gulp        = require('gulp')
var path        = require('path')

var paths = {
  src: path.join(config.root.src, config.tasks.maps.src, '/**/*'),
  dest: path.join(config.root.dest, config.tasks.maps.dest)
}

var mapsTask = function() {
  return gulp.src(paths.src)
    .pipe(changed(paths.dest)) // Ignore unchanged files
    .pipe(gulp.dest(paths.dest))
    .pipe(browserSync.stream())
}

gulp.task('maps', mapsTask)
module.exports = mapsTask
