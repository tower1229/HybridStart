/*
 * layout
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;

	var rangeVal = $('#rangeVal')[0];
	var range = $('#myrange')[0];
	
	rangeVal.innerText = range.value;

	range.addEventListener('change', function(e){
		rangeVal.innerText = range.value;
	});

	
});