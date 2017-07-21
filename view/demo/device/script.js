/*
 * layout
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;
	var $log = $('#log')[0];

	$('.getInfo')[0].addEventListener('touchend', function(){
		var os = 'os: ' + JSON.stringify(app.device.os());
		var uuid = 'uuid: ' + app.device.uuid();
		var screen = 'screen: ' + JSON.stringify(app.device.screen());
		var model = 'model: ' + app.device.model();
		var connect = 'connect: ' + app.device.connect();
		$log.innerText = [os, uuid, screen, model, connect].join('\n');
	});
	$('.call')[0].addEventListener('touchend', function(){
		app.device.call('10010');
	});

	
	
});