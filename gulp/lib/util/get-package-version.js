var fs = require("fs");

module.exports = function () {
	var pkg = JSON.parse(fs.readFileSync("./package.json", "utf8"));
	if (pkg && pkg.version) {
		return pkg.version;
	}
	throw new Error("Could not find 'version' from 'package.json'.");
};
