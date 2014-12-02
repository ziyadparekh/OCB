"use strict";

var path = require('path');
var glob = require('glob');
var _ = require('underscore');
var entries = {};

var g = new glob.Glob('./app/js/app.js', {
    sync: true
});

g.found.forEach(function (file) {
    var outputFile = file.replace('./app/js/views/', '').replace('.js', '');
    entries[outputFile] = path.resolve(__dirname, file);
});

console.log(entries);

module.exports = {
    cache: true,
    entry: entries,
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'views/[name]-built.js',
        sourceMapFilename: '/' + '[file].map'
    },
    resolve: {
        unsafeCache: true,
        root: path.resolve(__dirname, './app/js'),
        alias: {
            '@templates': path.resolve(__dirname, './app/js/templates'),
        },
        extensions: ["", ".js", ".json", ".html"]
    },
    module: {
        loaders: [
            { test: /\.html$/, loader: 'webpack-compile-templates' },
            { test: /\.json$/, loader: 'json' }
        ]
    },
    devtool: '#inline-source-map',
    debug: true
};