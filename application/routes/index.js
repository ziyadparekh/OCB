'use strict';

var _ = require('underscore');
var topnav = require('./configs/schema').topnav;

var buildVars = function () {
    var js_vars = {
        title : '',
        user: '',
        navMenu: ''
    }
    return js_vars
};

exports.login = function(req, res){
    var js_vars = _.extend({}, buildVars(), {
        navMenu : topnav.navMenu,
        title: 'Welcome'
    });
    res.render('home', js_vars);
};

exports.index = function(req, res){
    var js_vars = _.extend({}, buildVars(), {
        navMenu : topnav.navMenu,
        title: 'Welcome'
    });
    if (req && req.user) {
        var user = req.user;
        js_vars.user = user
    }
    res.render('home', js_vars);
};

exports.logout = function(req, res){
    if(req && req.user && req.user.id){
        req.session.destroy();
        res.redirect('/login');
    }else
    res.redirect('/login');
};

exports.create = function (req, res) {
    var js_vars = _.extend({}, buildVars(), {
        navMenu : topnav.navMenu,
        title: 'Welcome'
    });
    if (req && req.user) {
        var user = req.user;
        js_vars.user = user
    }
    res.render('create', js_vars);
};

exports.profile = function (req, res) {
    var user = req.user;
    var name = req.user.user_name;
    var js_vars = _.extend({}, buildVars(), {
        navMenu: topnav.navMenu,
        title: name,
        user: user
    });
    res.render('profile', js_vars);
};
