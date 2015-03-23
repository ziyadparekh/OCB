"use strict";


// ---------------------------------------------------
// Module Dependencies

window.$ = window.jQuery = require('jquery');

// require('lib/TopNav');
// ---------------------------------------------------
// Module Definition

/**
 * Returns an object with an 'onReady' method
 * @type {function}
 * @module loader
 *
 * @example
 * loader().onReady(function () {
 *  // do stuff...
 * });
 */
var loader = module.exports = function () {
    return new loader.getInstance();
};

// ---------------------------------------------------
// Define Module Static Properties

/**
 * Returns singleton loader.LoaderHelper class instance
 * @memberOf module:loader
 */
loader.getInstance = function () {
    if (!loader._instance) {
        loader._instance = new loader.LoaderHelper();
    }
    return loader._instance;
};

/**
 * @class LoaderHelper
 * @memberOf module:loader
 */
loader.LoaderHelper = function () {};

loader.LoaderHelper.prototype = {
    /**
     * @param {function} callback
     * @returns LoaderHelper
     */
    onReady: function (callback) {
        return this._onJQueryDomReady(callback);
    },
    /**
     * @protected
     * @param {function} callback
     * @returns LoaderHelper
     */
    _onJQueryDomReady: function (callback) {
        $(function () {
            callback($);
        });
        return this;
    }
};
