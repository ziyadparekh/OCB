'use strict';

var root = typeof window === 'undefined' ? global : window;
var SV = {};

if (root) {
    SV = root.__SERVER_VARS__ || {};
}

module.exports = SV;
