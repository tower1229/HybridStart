/*
 * layout
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;

	var inputNumber = require('input-number');
	var mycount = inputNumber({
		el: '.mytest',
		min: 2,
		max: 9,
		val: 5,
		style: 'inline',
		onChange: function(val) {
			$('#log')[0].innerHTML = ('<p>实例1的值：' + val + '</p>');
		}
	});

	var disable = false;
	$('#act1')[0].addEventListener('touchend', function() {
		disable = !disable;
		mycount.disabled(!disable);
	});


	
});