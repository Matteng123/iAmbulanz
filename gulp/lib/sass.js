var browserSync  = require("browser-sync"),
	sass         = require("gulp-sass"),
	sourcemaps   = require("gulp-sourcemaps"),
	handleErrors = require("./util/handle-errors"),
	autoprefixer = require("gulp-autoprefixer");

module.exports = function (gulp, config) {

	return function sassTask() {
		return gulp.src(config.src)
			.pipe(sourcemaps.init())
			.pipe(sass(config.settings))
			.on("error", handleErrors)
			.pipe(sourcemaps.write())
			.pipe(autoprefixer({browsers: ["last 2 version"]}))
			.pipe(gulp.dest(config.dest))
			.pipe(browserSync.reload({stream: true}));
	};
};
