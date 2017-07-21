/**
 *
 */
define(function(require) {
	var comm = require('sdk/server');
	var $ = app.util;
	require('sdk/common');
	
	app.ready(function() {
		var listPlaceholder = comm.commonTemp('errorPage', {
			text:'出错咯'
		});
		$('#view')[0].innerHTML = listPlaceholder;

	});
});
