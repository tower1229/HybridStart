/*
 * layout
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;

	$('#sendEvent').tap(function(){
		var msg = 'msg:' + parseInt(Math.random()*1e6);
		app.publish('test-event', msg);
	});
	

});