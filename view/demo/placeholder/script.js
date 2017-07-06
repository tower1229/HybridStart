/*
 * layout
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var $ = app.util;
	

	app.ready(function() {
		var listPlaceholder = comm.commonTemp('listPlaceholder', {
			text:'列表为空'
		});
		$('#view')[0].innerHTML = listPlaceholder;

	});
});