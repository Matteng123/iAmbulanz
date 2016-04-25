var browserSync = require("browser-sync");

module.exports = function (gulp, config) {

	return function markupTask() {
		return gulp.src(config.src)
			.pipe(gulp.dest(config.dest))
			.pipe(browserSync.reload({stream: true}));
	};
};
