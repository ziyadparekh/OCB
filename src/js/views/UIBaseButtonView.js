'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('lib/ZPBackbone');
var template = require('@templates/UIBaseButtonTemplate');
var UIBaseButtonView;

UIBaseButtonView = Backbone.BaseView.extend({

	defaults: {
		template: template['ui-button'],
		templateVars: {
			text: 'UIBaseButton',
			className: 'primary',
			id: 'UIBaseButton',
			dataAttributes : 'data-title="UIBaseButton"'
		}
	},

	initialize: function (options) {
		this.options = _.extend(this.defaults, options);
		this.templateVars = this.options.templateVars;
		this.template = this.options.template;
	},

	render: function () {
		this.$el.html(this.template(this.templateVars));

		return this;
	},

	clickEventHandler: function (e) {
		console.log('click');
	},

	events: {
		'click .ui.button' : 'clickEventHandler'
	}
});

module.exports = UIBaseButtonView;
