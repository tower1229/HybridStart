/*
 * layout
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	require('datepicker');

	


	app.ready(function() {
		$('#picker').datepicker();
		$('#picker2').datepicker();

	});
});