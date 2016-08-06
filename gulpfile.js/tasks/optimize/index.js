var gulp         = require('gulp')
var gulpSequence = require('gulp-sequence')

// If you are familiar with Rails, this task the equivalent of `rake assets:precompile`
var optimizeTask = function(cb) {
  gulpSequence(
    'minify-css',
    'size-report',
  cb)
}

gulp.task('optimize', optimizeTask)
module.exports = optimizeTask
