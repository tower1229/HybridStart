/*
 * 
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');

	//主题
	$('#theme').on('click', function() {
		app.applyTheme({
			primary: "#"+parseInt(Math.random()*1e6)
		});
	});
	
	app.ready(function() {
		
		
	});
});