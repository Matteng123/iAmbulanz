var assets = require("../../lib/assets");

module.exports = function (gulp, config) {
	gulp.task("dist:assets", [
		"build:images"
	], assets(gulp, config));
};
