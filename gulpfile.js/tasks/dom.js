var config       = require('../config')
var gulp         = require('gulp')
var gulpSequence = require('gulp-sequence')
var getEnabledTasks = require('../lib/getEnabledTasks')

var domTask = function(cb) {
  gulpSequence('pug', cb)
}

gulp.task('dom', domTask)
module.exports = domTask
