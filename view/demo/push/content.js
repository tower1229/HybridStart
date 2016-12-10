/*
 * layout
 */
define(function(require) {
	var comm = require('sdk/server');

	app.ready(function() {
		app.push.init(function(){
			setTimeout(function(){
				$('#list').html('refreshed:'+app.getUUID());
				app.push.stop();
			},1000);
		});

	});
});