/*
 * layout
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;

	$('#toggle')[0].addEventListener('change', function(e) {
		if (e.target.checked) {
			app.subscribe('test-event', function(msg) {
				app.alert(msg);
			});
			app.toast('已开启监听');
		} else {
			app.off('test-event');
			app.toast('已移除监听');
		}
	})

});