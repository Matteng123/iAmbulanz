var browserify = require("../../lib/browserify");

module.exports = function (gulp, config) {
	gulp.task("build:browserify", browserify(gulp, config));
};
