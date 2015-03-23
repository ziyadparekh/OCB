"use strict";

var path = require('path');
var glob = require('glob');
var _ = require('underscore');
var entries = {};

var g = new glob.Glob('./src/js/entries/**/*.js', {
    sync: true
});

g.found.forEach(function (file) {
    var outputFile = file.replace('./src/js/entries/', '').replace('.js', '');
    entries[outputFile] = path.resolve(__dirname, file);

});

var babelConfig = {
    whitelist: [
        'es6.arrowFunctions',
        'es6.properties.shorthand',
        'es6.properties.computed',
        'es6.destructuring',
        'es6.parameters.default',
        'es6.parameters.rest',
        'es6.templateLiterals',
        'es6.blockScoping',
        'runtime',
        'react'
    ]
};

module.exports = {
    cache: true,
    entry: entries,
    output: {
        path: path.resolve(__dirname, './public'),
        filename: 'compiled/js/[name].js',
        sourceMapFilename: '/' + '[file].map'
    },
    resolve: {
        unsafeCache: true,
        root: path.resolve(__dirname, './src/js'),
        alias: {
            '@templates': path.resolve(__dirname, './public/templates'),
            '@scss': path.resolve(__dirname, './src/scss')
        },
        extensions: ["", ".js", ".json", ".html", ".es", ".jsx"]
    },
    resolveLoader: { root: path.join(__dirname, "node_modules") },
    module: {
        loaders: [
            {
              test: /\.scss$/,
              loader: "style!css!sass?outputStyle=expanded&includePaths[]=" + (path.resolve(__dirname, "./node_modules"))
            },
            { test: /\.es|jsx$/, loader: 'babel-loader', query: babelConfig },
            { test: /\.html$/, loader: 'webpack-compile-templates' },
            { test: /\.json$/, loader: 'json' },
            { test : /\.js$/, loader: 'jstransform-loader'}
        ]
    },
    devtool: '#eval',
    debug: true
};
