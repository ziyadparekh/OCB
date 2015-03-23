// Karma configuration
// Generated on Thu Nov 27 2014 16:09:10 GMT-0500 (EST)
var webpackConfig = require('./webpack.config.js');
var karmaWebpack = require('karma-webpack');
var karmaJasmine = require('karma-jasmine');
var _ = require('underscore');

module.exports = function(config) {
  webpackConfig = _.clone(webpackConfig);
  webpackConfig.cache = true; // force cache
  webpackConfig.entry = undefined; // don't load the normal entry files
  webpackConfig.plugins = undefined; // don't write buster.json or common chunks
  webpackConfig.devtool = 'inline-source-map'; // use regular sourcemaps in tests
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'src/js/tests/specloader.js'
    ],


    // list of files to exclude
    exclude: [
    ],

    webpack: {
      cache: true,
      devtool: webpackConfig.devtool,
      debug: webpackConfig.debug,
      resolve: webpackConfig.resolve,
      //externals: webpackConfig.externals,
      module: webpackConfig.module
    },

    webpackServer: {
      contentBase: 'public',
      stats: {
        colors: true,
        hash: false,
        timings: true,
        assets: false,
        chunks: true,
        chunkModules: false,
        modules: false,
        cached: false,
        reasons: false,
        source: false,
        chunkOrigins: false
      }
    },


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
        'src/js/tests/specloader.js' : [ 'webpack' ],
        'public/templates/*.html' : [],
        "**/*/.html" : [],
        "**/*.json" : []
    },

    plugins : [
      'karma-phantomjs-launcher',
       karmaJasmine,
       karmaWebpack
    ],


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
