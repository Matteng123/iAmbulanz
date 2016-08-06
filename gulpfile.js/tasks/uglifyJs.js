var config = require('../config')
if(!config.tasks.production) return

var gulp = require('gulp')
var size = require('gulp-filesize');
var uglify = require('gulp-uglify');

var uglifyJsTask = function() {
	return gulp.src(config.tasks.production.jsSrc)
		.pipe(uglify())
		.pipe(gulp.dest(config.tasks.production.dest))
		.pipe(size());
}

gulp.task('uglifyJs', uglifyJsTask)
module.exports = uglifyJsTask
