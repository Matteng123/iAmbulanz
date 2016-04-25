var styles = require("../../lib/styles");

module.exports = function (gulp, config) {
	gulp.task("dist:styles", [
		"build:sass"
	], styles(gulp, config));
};
