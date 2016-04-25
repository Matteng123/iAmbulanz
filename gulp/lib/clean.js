var del = require("del");

module.exports = function (gulp, config) {

	return function cleanTask(callback) {
		del(config.src, callback);
	};
};
