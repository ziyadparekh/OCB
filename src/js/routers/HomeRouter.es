'use strict';

var _ = require('underscore');
var Backbone = require('lib/ZPBackbone');
var React = require('react');
var Dispatcher = require('flux').Dispatcher;
var HomeRouter;

HomeRouter = Backbone.Router.extend({
    routes: {
        '(/)': 'createNewPromo',
    },
    initialize: function (options) {
        this.options = _.defaults(options || {}, {
            //set option defaults here...
        });
    },
    createNewPromo: function () {
        console.log("asdasdas");
        this.renderForm();
    },
    redirectTo: function (promoId, pageType) {
        var url = [urlPrefix, promoId, pageType].join('/');
        this.navigate(url);
    },
    renderForm: function (promo, currentPage) {
        var dispatcher = new Dispatcher();
        var navigateToUrl = this.navigate.bind(this);

        React.render(<h1>Hello, world!</h1>, document.getElementById('create-app'));
    }
});

module.exports = HomeRouter;
