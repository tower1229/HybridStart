/*
 */
define(function(require) {
	require('sdk/common');

	app.ready(function() {
		//禁止返回
		app.monitorKey(0, function() {
			app.ls.remove('notice');
			app.ls.remove('referrer');
			setTimeout(function() {
				app.exit();
			}, 0);
		});
		app.window.popoverElement({
			id:'view',
			url:'./content.html',
			bounce:true
		});

	});
});