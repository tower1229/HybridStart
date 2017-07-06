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
			src: 'http://7xnt8z.com1.z0.glb.clouddn.com/view0.jpg'
		}, {
			src: 'http://7xnt8z.com1.z0.glb.clouddn.com/view1.jpg'
		}, {
			src: 'http://7xnt8z.com1.z0.glb.clouddn.com/view2.jpg'
		}]
	});

	app.ready(function() {


	});
});