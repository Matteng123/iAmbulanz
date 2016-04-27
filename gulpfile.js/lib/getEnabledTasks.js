var config = require('../config')
// var compact = require('lodash/array/compact')
var compact = require('lodash/compact')

// Grouped by what can run in parallel 
var codeTasks = ['css', 'js', 'bootstrap']

module.exports = function(env) {
  var jsTasks = {
    watch: 'webpack:watch',
    media: 'webpack:watch',
    development: 'webpack:watch',
    production: 'webpack:production'
  }

  var matchFilter = function(task) {
    if(config.tasks[task]) {
      if(task === 'js') {
        task = jsTasks[env] || jsTask.watch
      }
      return task
    }
  }

  return {
    codeTasks: compact(codeTasks.map(matchFilter))
  }
}
