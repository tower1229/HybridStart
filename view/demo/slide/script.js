/*
 * layout
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var $ = app.util;
	var slide = require('slide');

	slide({
		el: '#banner',
		data: [{
			src: 'http://static.refined-x.com/view0.jpg'
		}, {
			src: 'http://static.refined-x.com/view1.jpg'
		}, {
			src: 'http://static.refined-x.com/view2.jpg'
		}]
	});

	
});