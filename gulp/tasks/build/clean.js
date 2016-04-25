var clean = require("../../lib/clean");

module.exports = function (gulp, config) {
	gulp.task("build:clean", clean(gulp, config));
};
