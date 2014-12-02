'use strict';

var BaseView = require('../../js/views/BaseView');

describe('base view', function () {
	var baseView = new BaseView();
	
	it('should be defined', function () {
		expect(baseView).toBeDefined();		
	});
});