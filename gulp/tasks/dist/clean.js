var clean = require("../../lib/clean");

module.exports = function (gulp, config) {
	gulp.task("dist:clean", clean(gulp, config));
};
