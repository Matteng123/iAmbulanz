var browserify   = require("browserify"),
	browserSync  = require("browser-sync"),
	watchify     = require("watchify"),
	bundleLogger = require("./util/bundle-logger"),
	handleErrors = require("./util/handle-errors"),
	source       = require("vinyl-source-stream"),
	assign       = require("lodash.assign"),
	omit         = require("lodash.omit");

module.exports = function (gulp, config, devMode) {

	return function browserifyTask(callback) {
		var bundleQueue = config.bundleConfigs.length,
			browserifyThis;

		browserifyThis = function (bundleConfig) {
			var b, bundle, reportFinished;

			if (devMode) {
				// Add watchify args and debug (sourcemaps) option
				assign(bundleConfig, watchify.args, {debug: true});
				// A watchify require/external bug that prevents proper recompiling,
				// so (for now) we'll ignore these options during development
				bundleConfig = omit(bundleConfig, ["external", "require"]);
			}

			b = browserify(bundleConfig);

			bundle = function () {
				// Log when bundling starts
				bundleLogger.start(bundleConfig.outputName);

				return b
					.bundle()
					// Report compile errors
					.on("error", handleErrors)
					// Use vinyl-source-stream to make the
					// stream gulp compatible. Specify the
					// desired output filename here.
					.pipe(source(bundleConfig.outputName))
					// Specify the output destination
					.pipe(gulp.dest(bundleConfig.dest))
					.on("end", reportFinished)
					.pipe(browserSync.reload({stream: true}));
			};

			if (devMode) {
				// Wrap with watchify and rebundle on changes
				b = watchify(b);
				// Rebundle on update
				b.on("update", bundle);
				bundleLogger.watch(bundleConfig.outputName);
			} else {
				// Sort out shared dependencies.
				// b.require exposes modules externally
				if (bundleConfig.require) {
					b.require(bundleConfig.require);
				}
				// b.external excludes modules from the bundle, and expects
				// they"ll be available externally
				if (bundleConfig.external) {
					b.external(bundleConfig.external);
				}
			}

			reportFinished = function () {
				// Log when bundling completes
				bundleLogger.end(bundleConfig.outputName);

				if (bundleQueue) {
					bundleQueue--;
					if (bundleQueue === 0) {
						// If queue is empty, tell gulp the task is complete.
						// https://github.com/gulpjs/gulp/blob/master/docs/API.md#accept-a-callback
						callback();
					}
				}
			};

			return bundle();
		};

		// Start bundling with Browserify for each bundleConfig specified
		config.bundleConfigs.forEach(browserifyThis);
	};
};
