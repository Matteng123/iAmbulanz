module.exports = function (gulp, config) {
	require("./browser-sync")(gulp, config.browserSync);
	require("./watchify")(gulp, config.browserify);

	function task() {
		gulp.watch(config.images.src, ["build:images"]);
		gulp.watch(config.sass.src,   ["build:sass"]);
		// Watchify will watch and recompile our JS, so no need to gulp.watch it
	}

	gulp.task("watch", [
		"watch:watchify",
		"watch:browserSync"
	], task);
};
