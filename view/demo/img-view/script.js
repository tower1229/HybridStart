/*
 * layout
 */
define(function(require) {
	var server = require('sdk/server');
	require('sdk/common');
	var $ = app.util;
	var album = require('album');
	
	server.cacheImg($('#view'), function() {
		album({
			el: '#view',
			cell: '.card'
		});
	});


	
});