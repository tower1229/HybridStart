/*
 * layout
 */
define(function(require) {
	var server = require('sdk/server');
	require('sdk/common');
	var $ = app.util;

	var $log = $('#log')[0];
	var $attr = $('#attr')[0];

	app.ready(function() {
		server.getLocation(function(lat, lng){
			$log.innerText = 'lat: ' + lat + 'lng:' + lng;
			server.getAddrByLoc(lat, lng, {
				silent: true,
				callback: function(res) {
					$attr.innerText = JSON.stringify(res);
				}
			});
		});

	});
});