var browserSync = require("browser-sync"),
	changed     = require("gulp-changed"),
	imagemin    = require("gulp-imagemin");

module.exports = function (gulp, config) {

	return function imagesTask() {
		return gulp.src(config.src)
			.pipe(changed(config.dest)) // Ignore unchanged files
			.pipe(imagemin()) // Optimize
			.pipe(gulp.dest(config.dest))
			.pipe(browserSync.reload({stream: true}));
	};
};
