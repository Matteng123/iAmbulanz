var cssnano = require("gulp-cssnano"),
	size    = require("gulp-filesize");

module.exports = function (gulp, config) {

	return function stylesTask() {
		return gulp.src(config.src)
			.pipe(cssnano())
			.pipe(gulp.dest(config.dest))
			.pipe(size());
	};
};
