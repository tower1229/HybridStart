/*
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;
	//详细页状态标识
	window.detailIsOpen = false;

	app.ready(function() {
		app.window.popoverElement({
			id: 'view',
			url: './content.html',
			bounce: true
		});
		//详细页返回
		app.key('keyback', function() {
			if (detailIsOpen) {
				app.window.evaluate('', 'page_detail', 'closePage()');
			} else {
				return $('#goBack').trigger('touchstart');
			}
		});
	});
});