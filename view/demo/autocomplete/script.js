/**
 * 
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;

	$('#input').on('focus', function(e) {
		e.preventDefault();
		app.openView(null, 'common', 'autocomplete');
	});

	app.ready(function() {
		app.subscribe('autocomplete', function(val) {
			$('#input').val(val);
		});


	});
});