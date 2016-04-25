module.exports = function (gulp, config) {
	require("./build")(gulp, config.build);
	require("./dist")(gulp, config.dist);
	require("./watch")(gulp, config.build);

	gulp.task("default", [
		"build:images",
		"build:sass",
		"watch"
	]);
};
