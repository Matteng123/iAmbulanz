module.exports = function (gulp, config) {
	require("./browserify")(gulp, config.browserify);
	require("./clean")(gulp, config.clean);
	require("./images")(gulp, config.images);
	require("./sass")(gulp, config.sass);

	gulp.task("build", [
		"build:browserify",
		"build:images",
		"build:sass"
	]);
};
