var path = require('path');
var babelConfig = require('./babel.js')
var iPackage = require('../package.json')
var hashToPort = require('hash-to-port')
var testServerPort = hashToPort(iPackage.name + 'onface/test:server')
var webpackConfig = require('./webpack.karma')
var karmaConf = function(config) {
    return {
      basePath: '../',
      frameworks: ['jasmine'],
      files: [
        require.resolve('../example/polyfill-lt-ie10.js'),
        'test/**/*.js'
      ],
      preprocessors: {
        // add webpack as preprocessor
        'lib/**/*.js': ['webpack', 'sourcemap'],
        'test/**/*.js': ['webpack', 'sourcemap']
      },

      webpack: webpackConfig,

      webpackServer: {
        noInfo: true //please don't spam the console when running in karma!
      },

      plugins: [
        'karma-webpack',
        'karma-jasmine',
        'karma-sourcemap-loader',
        'karma-chrome-launcher',
        'karma-phantomjs-launcher',
        'karma-sauce-launcher'
      ],


      babelPreprocessor: {
        options: babelConfig
      },
      reporters: ['progress'],
      port: testServerPort,
      colors: true,
      logLevel: config.LOG_INFO,
      autoWatch: true,
      browsers: ['Chrome'],
      singleRun: false,
      processKillTimeout: 1200000
    }
}
module.exports = function(config) {
  config.set(karmaConf(config))
};
module.exports.conf = karmaConf
