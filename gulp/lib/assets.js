module.exports = function (gulp, config) {

	return function assetsTask() {
		return gulp.src(config.src)
			.pipe(gulp.dest(config.dest));
	};
};
