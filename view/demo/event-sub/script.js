/*
 * layout
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;

	$('#onSub').tap(function(){
		app.subscribe('test-event', function(msg){
			app.alert(msg);
		});
		app.toast('已开启监听');
	});
	$('#offSub').tap(function(){
		app.off('test-event');
		app.toast('已移除监听');
	});

});