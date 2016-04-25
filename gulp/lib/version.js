var replace = require("gulp-replace");

module.exports = function (gulp, config) {

	return function versionTask() {
		return gulp.src(config.src)
			.pipe(replace(config.regexp, config.version))
			.pipe(gulp.dest(config.dest));
	};
};
