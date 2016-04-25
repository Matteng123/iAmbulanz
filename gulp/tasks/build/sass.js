var sass = require("../../lib/sass");

module.exports = function (gulp, config) {
	gulp.task("build:sass", sass(gulp, config));
};
