/*
 * layout
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;

	var $log = $('#log')[0];
	app.window.on('swipleft', function(type){
		$log.innerText = type + ':' + new Date().getTime();
	});
	app.window.on('swipright', function(type){
		$log.innerText = type + ':' + new Date().getTime();
	});
	app.window.on('swipup', function(type){
		$log.innerText = type + ':' + new Date().getTime();
	});
	app.window.on('swipdown', function(type){
		$log.innerText = type + ':' + new Date().getTime();
	});
	
});