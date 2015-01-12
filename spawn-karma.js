"use strict";

// We can't have karma running in the same process as gulp
var server = require('karma').server;
var data = JSON.parse(process.argv[2]);
server.start(data);
