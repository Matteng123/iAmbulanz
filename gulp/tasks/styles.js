var gulp         = require('gulp'),
	plumber      = require('gulp-plumber'),
	compass 	= require('gulp-compass'),
	browserSync  = require('browser-sync'),
	config       = require('../config').styles,
	notify       = require('gulp-notify'),
	autoprefixer     = require('gulp-autoprefixer'),
	notifyInfo = { title: 'Gulp', icon: "" };

var plumberErrorHandler = { errorHandler: notify.onError({
		title: notifyInfo.title,
		icon: notifyInfo.icon,
		message: "Error: <%= error.message %>"
	})
};

gulp.task('styles', function() {
	return gulp.src(config.src)
		.pipe(plumber(plumberErrorHandler))
		.pipe(compass(config.options))
		.pipe(gulp.dest(config.dest))
		.pipe(browserSync.reload({stream:true}));
});