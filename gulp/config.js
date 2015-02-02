var dest = "./build";
var src = './src';

module.exports = {
  browserSync: {
    server: {
      // Serve up our build folder
      baseDir: dest
    }
  },
  styles: {
    src: src + "/sass/*.{sass,scss}",
    dest: dest,
    options: {
      project: "./",
      config_file: 'config.rb',
      css: './src/.temp',
      sass: './src/sass/',
    }
  },
  images: {
    src: src + "/images/**",
    dest: dest + "/images"
  },
  sprites: {
    src: src + '/images/sprites/icon/*.png',
    dest: {
      css: src + '/scss/base/',
      image: src + '/images/sprites/'
    },
    options: {
      cssName: '_sprites.scss',
      cssFormat: 'css',
      cssOpts: {
        cssClass: function (item) {
          // If this is a hover sprite, name it as a hover one (e.g. 'home-hover' -> 'home:hover')
          if (item.name.indexOf('-hover') !== -1) {
            return '.icon-' + item.name.replace('-hover', ':hover');
            // Otherwise, use the name as the selector (e.g. 'home' -> 'home')
          } else {
            return '.icon-' + item.name;
          }
        }
      },
      imgName: 'icon-sprite.png',
      imgPath: '/assets/images/sprites/icon-sprite.png'
    }
  },
  markup: {
    src: src + "/htdocs/**",
    dest: dest
  },
  browserify: {
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      //entries: src + '/javascript/global.coffee',
      dest: dest,
      outputName: 'global.js',
      // Additional file extentions to make optional
      //extensions: ['.coffee', '.hbs'],
      // list of modules to make require-able externally
      require: ['jquery', 'underscore']
    }, {
      entries: src + '/javascript/page.js',
      dest: dest,
      outputName: 'page.js',
      // list of externally available modules to exclude from the bundle
      external: ['jquery', 'underscore']
    }]
  },
  production: {
    cssSrc: dest + '/*.css',
    jsSrc: dest + '/*.js',
    dest: dest
  }
};
