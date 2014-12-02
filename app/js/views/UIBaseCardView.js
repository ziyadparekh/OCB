'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('lib/ZPBackbone');
var template = require('@templates/UIBaseCardTemplate');
var UIBaseCardView;

UIBaseCardView = Backbone.BaseView.extend({

	defaults: {
		template: template['ui-card'], 
		templateVars: {
			text: 'UIBaseButton',
			className: 'green',
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

module.exports = UIBaseCardView;