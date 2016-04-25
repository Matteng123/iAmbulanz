var browserSync = require("browser-sync");

module.exports = function (gulp, config) {

	function task() {
		browserSync(config);
	}

	gulp.task("watch:browserSync", task);
};
