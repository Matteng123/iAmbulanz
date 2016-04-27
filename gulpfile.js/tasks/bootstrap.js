var config = require('../config');
if(!config.tasks.bootstrap) return

var gulp = require('gulp');
var condition = require('gulp-if');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var path        = require('path');
var uglify = require('gulp-uglify');

var dest = path.join(config.root.dest, config.tasks.bootstrap.dest);

var bootstrapTask = function() {
  return gulp.src(config.tasks.bootstrap.sources)
    .pipe(sourcemaps.init({ loadMaps: true }))
    .pipe(jshint())
    .pipe(concat('bootstrap.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.', { includeContent: false, sourceRoot: config.root.themeBasePath + '/dist' + config.tasks.bootstrap.dest }))
    .pipe(gulp.dest(dest))
}

gulp.task('bootstrap', bootstrapTask);
module.exports = bootstrapTask