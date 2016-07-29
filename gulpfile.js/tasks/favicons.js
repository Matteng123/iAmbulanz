var config = require('../config')
if(!config.tasks.favicons) return

var gulp = require('gulp');
var favicons = require('gulp-favicons');
var gutil = require("gulp-util");

gulp.task("favicons", function () {
    return gulp.src(config.root.src + config.tasks.favicons.src).pipe(favicons({
        appName: config.root.appName,
        appDescription: config.root.appDescription,
        developerName: null,
        developerURL: null,
        background: config.tasks.favicons.background,
        path: "",
        url: "",
        display: "standalone",
        orientation: "portrait",
        version: "1.0",
        logging: false,
        online: true,
        icons: {
            android: true,
            appleIcon: true,
            appleStartup: true,
            coast: true,
            favicons: true,
            firefox: true,
            opengraph: true,
            twitter: true,
            windows: true,
            yandex: true                
        }
    }))
    .on("error", gutil.log)
    .pipe(gulp.dest(config.root.dest + config.tasks.favicons.dest));
});