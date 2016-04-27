var config = require('../config')
var gulp   = require('gulp')
var path   = require('path')
var watch  = require('gulp-watch')

var watchTask = function() {
  // var watchableTasks = ['fonts', 'iconFont', 'images', 'videos', 'maps', 'panos', 'html', 'css', 'jade']
  var watchableTasks = ['fonts', 'images', 'css', 'jade']

  watchableTasks.forEach(function(taskName) {
    var task = config.tasks[taskName]
    if(task) {
      var glob = path.join(config.root.src, task.src, '**/*.{' + task.extensions.join(',') + '}')
      console.log("taskName:", taskName );
      console.log("glob watch in:", glob );
      console.log("_______");
      watch(glob, function() {
       require('./' + taskName)()
      })
    }
  })
}

gulp.task('watch', ['browserSync'], watchTask)
module.exports = watchTask
