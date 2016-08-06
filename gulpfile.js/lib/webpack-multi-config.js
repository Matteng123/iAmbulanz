var config = require('../config')
if(!config.tasks.js) return

var path            = require('path')
var webpack         = require('webpack')
var webpackManifest = require('./webpackManifest')

module.exports = function(env) {
  var jsSrc = path.resolve(config.root.src, config.tasks.js.src)
  var jsDest = path.resolve(config.root.dest, config.tasks.js.dest)
  var publicPath = path.join(config.tasks.js.src, '/')
  var filenamePattern = '[name].js'
  var extensions = config.tasks.js.extensions.map(function(extension) {
    return '.' + extension
  })

  var webpackConfig = {
    context: jsSrc,
    plugins: [],
    resolve: {
      extensions: ['', '.js'],
      alias: {
        webworkify: 'webworkify-webpack',
        'jQuery': path.resolve('./node_modules/jquery/dist/jquery.js'),
        '$': path.resolve('./node_modules/jquery/dist/jquery.js'),
        'responsImg': path.resolve('./app/vendor/responsiveimage/jquery.responsImg.js'),
        'ScrollMagic': path.resolve('./node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
        'animationGsap': path.resolve('./node_modules/scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
        'ScrollToPlugin': path.resolve('./node_modules/gsap/src/uncompressed/plugins/ScrollToPlugin.js'),
        'TweenMax': path.resolve('./node_modules/gsap/src/uncompressed/TweenMax.js'),
        'TweenLite': path.resolve('./node_modules/gsap/src/uncompressed/TweenLite.js'),
        'TimelineMax': path.resolve('./node_modules/gsap/src/uncompressed/TimelineMax.js')
      }
    },
    // node: {
    //   fs: "empty"
    // },
    module: {
      loaders: [{
          test: /\.jsx?$/,
          loader: 'babel',
          exclude: /node_modules/,
          query: {
            presets: ['es2015', 'stage-0']
          }
        },
        {
          test: /\.json$/,
          loader: 'json-loader'
        },
        {
          test: /\.js$/,
          include: path.resolve(__dirname, 'node_modules/webworkify/index.js'),
          loader: 'worker'
        },
        {
         test: /mapbox-gl.+\.js$/,
         loader: 'transform/cacheable?brfs'
        }]
      ,postLoaders: [{
          include: /node_modules\/mapbox-gl-shaders/,
          loader: 'transform',
          query: 'brfs'
      }]
   }
  }

  if(env !== 'test') {
    // Karma doesn't need entry points or output settings
    webpackConfig.entry = config.tasks.js.entries

    webpackConfig.output= {
      path: path.normalize(jsDest),
      filename: filenamePattern,
      publicPath: publicPath
    }

    if(config.tasks.js.extractSharedJs) {
      // Factor out common dependencies into a shared.js
      webpackConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
          name: 'shared',
          filename: filenamePattern,
        })
      )
    }
  }

  if(env === 'development') {
    webpackConfig.devtool = 'source-map'
    webpack.debug = true
  }

  if(env === 'production') {
    webpackConfig.plugins.push(
      new webpackManifest(publicPath, config.root.dest),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.NoErrorsPlugin()
    )
  }

  return webpackConfig
}
