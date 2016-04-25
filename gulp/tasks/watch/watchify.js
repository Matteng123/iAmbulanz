var browserify = require("../../lib/browserify");

module.exports = function (gulp, config) {
	gulp.task("watch:watchify", browserify(gulp, config, true));
};
