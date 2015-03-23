'use strict';

var Backbone = require('lib/ZPBackbone');
var Loader = require('lib/loader');
var HomeRouter = require('routers/HomeRouter');
var root = '/';
var router;

router = new HomeRouter({
    //options go here...
});

Loader().onReady(function () {
    Backbone.history.start({
        root: root,
        pushState: true
    });
});

