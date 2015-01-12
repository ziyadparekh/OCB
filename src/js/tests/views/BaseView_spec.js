'use strict';

var BaseView = require('views/UIBaseButtonView');

describe('base view', function () {
	var baseView = new BaseView();

	it('should be defined', function () {
		expect(baseView).toBeDefined();
	});
});
