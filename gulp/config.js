var getPackageVersion = require("./lib/util/get-package-version");

var version = getPackageVersion();
var pub = ".";
var build = pub + "/build";
var dist = pub + "/dist." + version;
var src = "./app";

module.exports = {

	build: {
		browserify: {
			// A separate bundle will be generated for each
			// bundle config in the list below
			bundleConfigs: [{
				entries: src + "/index.js",
				dest: build,
				outputName: "app.js",
				// Additional file extentions to make optional
				extensions: [".hbs"]
			}, {
				entries: src + "/static.js",
				dest: build,
				outputName: "static.js"
			}]
		},
		browserSync: {
			open: false,
			proxy: "iAmbulanz.dev"
		},
		clean: {
			src: build
		},
		images: {
			src: src + "/assets/**",
			dest: build + "/assets"
		},
		sass: {
			src: src + "/styles/**/*.scss",
			dest: build,
			settings: {
				// Required if you want to use SASS syntax
				// See https://github.com/dlmanning/gulp-sass/issues/81
				sourceComments: "map",
				imagePath: "/assets" // Used by the image-url helper
			}
		}
	},

	dist: {
		assets: {
			src: build + "/*/**",
			dest: dist
		},
		clean: {
			src: dist
		},
		scripts: {
			src: build + "/*.js",
			dest: dist
		},
		styles: {
			src: build + "/*.css",
			dest: dist
		},
		version: {
			src: src+ "/version/version.ts",
			dest: src+ "/version",
			version: version
		}
	}
};
