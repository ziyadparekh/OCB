'use strict';

/**
 * USERS model
 * @type {exports}
 */
 var connection = require('../helpers/connection');
 var mysql = require('mysql');

 var async = require('async');
 var _ = require('underscore');
 var db = require('../db');

/**
 * Find a user
 * @param id
 * @param done
 * @param next
 */
 exports.render = function(id, req, done, next) {
    var render_user = function (user, req, done, next) {
        if (!id || isNaN(id) || id == 0) {
            return done(null, anon);
        }else {
            return done(null, user);
        }
    };
    if (id && !isNaN(id)) {
        connection.query('SELECT * FROM users WHERE id = ? LIMIT 1', id, function(err, result){
            if (err || !result || !result[0]) {
                return done('No such user.', null);
            }
            render_user(result[0], req, done, next);
        }, next);
    } else {
        render_user(id, req, done, next);
    }
 };
 exports.create = function(post, req, done, next){
    connection.query('INSERT INTO users SET ?', post, function(err, rows) {
        if(err)
            console.log(err);
        return done(null, rows);
    }, next)
 };

 exports.findByFacebookId = function(body, req, done, next) {
    connection.query('SELECT * FROM users WHERE facebook_id = ? AND facebook_id != 0 LIMIT 1', body, function(err, rows) {
        if(err)
            console.log(err)
        if(rows && rows.length > 0) {
            return done(true, rows[0]);
        } else {
            return done(false, body);
        }
    }, next);
 };
