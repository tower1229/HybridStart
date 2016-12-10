/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	
	$('#input').on('focus',function(e){
		e.preventDefault();
		app.openView(null,'common','autocomplete');
	});

	app.ready(function() {
		app.window.subscribe('autocomplete', function(val){
			$('#input').val(val);
		});


	});
});