'use strict';

var gulp = require("gulp");
var gutil = require("gulp-util");
var webpack = require("webpack");
var path = require('path');
var sass = require('gulp-sass');
var cssmin = require('gulp-minify-css');
var runSequence = require('run-sequence');
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require('./webpack.config.js');
var spawn = require('child_process').spawn;
var tap = require("gulp-tap");

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

function currentTime() {
    var date = new Date();
    var minutes = String(date.getMinutes());
    var seconds = String(date.getSeconds());

    minutes = (minutes.length === 1) ? '0' + minutes : minutes;
    seconds = (seconds.length === 1) ? '0' + seconds : seconds;
    return gutil.colors.cyan(date.getHours() + ':' + minutes + ':' + seconds);
}

function logFile(file) {
    gutil.log(gutil.colors.cyan(currentTime()), gutil.colors.green('Wrote file:'), gutil.colors.magenta(file.path.replace(process.cwd(), '.')));
}

var paths = {
  sassEntries: ['./src/scss/entries/**/*.scss'],
  sassSrc: ['./src/scss/**/*.scss', './src/css/**/*.css'],
  sassDest: './public/compiled/css'
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
            contentBase: 'public',
            stats: webpackLogOptions
        }).listen(8901, "localhost", function (err) {
            if (err) {
                throw new gutil.PluginError("webpack-dev-server", err);
            }
            // Server listening
            gutil.log("[webpack-dev-server]", "Listening on localhost:8901");
        });
});

gulp.task('unit-tests', function (cb) {
    // Spawn new process because karma processes are interfering with each other
    var child = spawn('node', [path.resolve(__dirname, './spawn-karma.js'), JSON.stringify({
        configFile: path.resolve(__dirname, './karma.conf.js'),
        singleRun: true,
        browsers: ['PhantomJS'],
        logLevel: 'ERROR'
    })], { stdio: 'inherit' });
    child.on('exit', function (exitCode) {
        if (exitCode !== 0) {
            gutil.beep();
        }
        gutil.log('Karma tests exited with ' + exitCode);
        cb();
    });
});

// Sass
gulp.task('sass', function () {
    return gulp.src(paths.sassEntries)
        .pipe(sass({
            errLogToConsole: true,
            sourceComments: 'map'
        }))
        .pipe(cssmin())
        .pipe(gulp.dest(paths.sassDest))
        .pipe(tap(logFile));
});

gulp.task('dev-javascript', function (cb) {
	gulp.watch(["src/**/*"], ["webpack"]);
    gulp.watch(paths.sassSrc, ['sass']);
    runSequence(['webpack', 'webpack-dev-server', 'unit-tests', 'sass'], cb);
});

gulp.task('default', function (cb) {
    runSequence('dev-javascript', cb);
});
