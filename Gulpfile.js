'use strict';

var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var runSequence = require('run-sequence');
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require('./webpack.config.js');

var webpackLogOptions = {
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
};

gulp.task("webpack", function(cb) {
	var config = Object.create(webpackConfig);
    // run webpack
    webpack(config, function(err, stats) {
		if (err) {
            gutil.error("[webpack] - build error", err);
            cb(err);
            return;
        }
        if (stats.hasErrors()) {
            var jsonStats = stats.toJson();
            gutil.log("[webpack] - stats has errors", jsonStats.errors);
            cb(jsonStats);
            return;
        }
        gutil.log("[webpack]", stats.toString(webpackLogOptions));
        cb();
    });
});

gulp.task('webpack-dev-server', function () {
    var compiler = webpack(webpackConfig);
    new WebpackDevServer(compiler, {
            contentBase: 'app',
            stats: webpackLogOptions
        }).listen(8901, "localhost", function (err) {
            if (err) {
                throw new gutil.PluginError("webpack-dev-server", err);
            }
            // Server listening
            gutil.log("[webpack-dev-server]", "Listening on localhost:8901");
        });
});

gulp.task('dev-javascript', function (cb) {
	gulp.watch(["app/**/*"], ["webpack"]);
    runSequence(['webpack', 'webpack-dev-server'], cb);
});

gulp.task('default', function (cb) {
    runSequence('dev-javascript', cb);
});