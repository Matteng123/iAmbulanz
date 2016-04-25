var assign = require("lodash.assign");
var version = require("../../lib/version");
var regexp = /\bv?(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?\b/ig;

module.exports = function (gulp, config) {
	config = assign({regexp: regexp}, config);
	gulp.task("dist:version", version(gulp, config));
};
