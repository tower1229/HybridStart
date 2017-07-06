/*
 * layout
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;

	app.ready(function() {
		app.window.popoverElement({
			id: 'view',
			url: './content.html',
			name: 'listWin',
			bounces: true
		});

	});
});