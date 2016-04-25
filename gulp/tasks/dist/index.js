module.exports = function (gulp, config) {
	require("./assets")(gulp, config.assets);
	require("./clean")(gulp, config.clean);
	require("./scripts")(gulp, config.scripts);
	require("./styles")(gulp, config.styles);
	require("./version")(gulp, config.version);

	gulp.task("dist", [
		"dist:assets",
		"dist:scripts",
		"dist:styles",
		"dist:version"
	]);
};
