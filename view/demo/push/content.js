/*
 * layout
 */
define(function(require) {
	var comm = require('sdk/server');
	
	app.ready(function() {
		app.push.init(function(){
			setTimeout(function(){
				$('#list').html('refreshed at: '+new Date());
				app.push.stop();
			},1000);
		});

	});
});