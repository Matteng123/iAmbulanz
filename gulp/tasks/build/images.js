var images = require("../../lib/images");

module.exports = function (gulp, config) {
	gulp.task("build:images", images(gulp, config));
};
