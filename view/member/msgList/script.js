/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');require('sdk/common');

	app.ready(function() {
		app.window.popoverElement({
			id: 'View',
			name: 'popView',
			url: 'content.html'
		});
		//刷新
		app.window.pause(function(){
			app.window.evaluatePopoverScript('','popView','change(true)');
		});

	});
});