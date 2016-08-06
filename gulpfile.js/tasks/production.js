var config       = require('../config')
var gulp         = require('gulp')
var gulpSequence = require('gulp-sequence')
var getEnabledTasks = require('../lib/getEnabledTasks')

var productionTask = function(cb) {
  var tasks = getEnabledTasks('production')
  gulpSequence('clean', tasks.codeTasks, 'favicons', 'optimize', 'uglifyJs', cb)
}

gulp.task('production', productionTask)
module.exports = productionTask
