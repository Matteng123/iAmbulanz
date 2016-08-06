var config = require('../config');
if(!config.tasks.sitemap) return

var browserSync = require('browser-sync');
var gulp = require('gulp');
var sitemap = require('gulp-sitemap');

var sitemapTask = function() {
	// console.log(config.tasks.sitemap.src);
	// console.log(config.root.domain);
	// console.log(config.root.dest);

	return gulp.src(config.tasks.sitemap.src)
			.pipe(sitemap({
		  		siteUrl: config.root.domain
		}))
		.pipe(gulp.dest(config.root.dest))
		.pipe(browserSync.stream())
}

gulp.task('sitemap', sitemapTask)
module.exports = sitemapTask