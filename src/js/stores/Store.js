'use strict';

var _ = require('underscore');
var Backbone = require('lib/ZPBackbone');

/**
 * @class Store
 * An interface to receive actions from a Flux Dispatcher. Can optionally
 *
 * @param {object} options
 * @param {Backbone.Model} [options.model]
 * @param {Backbone.Collection} [options.collection]
 * @param {object} options.dispatcher a Flux dispatcher
 *
 * @example
 * var MyStore = Store.extend({
 *     // actions object works similar to backbone events and routes
 *     // value can be a function or a string reference to a function
 *     // on the store
 *     actions: {
 *         event1: 'doFirstAction',
 *         event2: function (payload) {
 *             console.log('second action invoked on dispatcher');
 *         }
 *     },
 *     doFirstAction: function (payload) {
 *         console.log('first action invoked on dispatcher:', payload.value);
 *     }
 * });
 *
 * var globalDispatcher = new flux.Dispatcher();
 * var storeInstance = new MyStore({
 *     dispatcher: globalDispatcher
 * });
 *
 * globalDispatcher.dispatch({
 *     actionType: 'event1',
 *     value: 'foo'
 * });
 *
 * // prints "first action invoked on dispatcher: foo" to the console.
 *
 */
var Store = function (options) {
    options = options || {};

    this.model = options.model;
    this.collection = options.collection;

    /**
     * @memberOf Store#
     */
    this.dispatcher = options.dispatcher;
    this._setUpEvents(options);
    this.initialize(options);
};

_.extend(Store.prototype, {
    initialize: function () {},
    _setUpEvents: function () {
        var actions = _.result(this, 'actions');
        // Registers a callback function on the dispatcher. When an action is dispatched,
        // see if we have a registered action in this.actions. If we do invoke it.
        // Also stores the dispatch token from register on this.dispatchToken.
        this.dispatchToken = this.dispatcher.register(function (payload) {
            _.each(actions, function (method, actionType) {
                if (!_.isFunction(method)) {
                    method = this[method];
                }
                if (!method || actionType !== payload.actionType) {
                    return;
                }
                method.call(this, payload);
            }, this);
        }.bind(this));
        return this.dispatchToken;
    }
}, Backbone.Events);


/**
 * Extend the Store class like you would a Backbone.Model
 * @function
 * @memberOf Store
 * @param {object} [instanceProperties]
 * @param {object} [staticProperties]
 * @returns {function(new:Store)} A new Store constructor
 */
Store.extend = Backbone.Model.extend;

module.exports = Store;
