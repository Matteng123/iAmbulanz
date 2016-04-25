//var replace = require("gulp-replace"),
var size    = require("gulp-filesize"),
	uglify  = require("gulp-uglify");

module.exports = function (gulp, config) {

	return function scriptsTask() {
		return gulp.src(config.src)
			//.pipe(replace(/^.*?console.(error|group|groupEnd|log|warn).*?(?:;|\).*;|(?:\r?\n.*?)*?\).*;).*;?.*?\r?\n/mg, ""))
			.pipe(uglify())
			.pipe(gulp.dest(config.dest))
			.pipe(size());
	};
};
