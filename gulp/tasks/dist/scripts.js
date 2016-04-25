var scripts = require("../../lib/scripts");

module.exports = function (gulp, config) {
	gulp.task("dist:scripts", [
		"build:browserify"
	], scripts(gulp, config));
};
