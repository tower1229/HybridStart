/*
 * layout
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	require('box');
	
	$('.pro_counter_val').on('click',function(e){
		e.preventDefault();
		var inp = $(this),
			v = inp.val(),
			max = inp.data('max');
		$.box.amount(v,function(num){
			inp.val(Math.min(num,max));
		});
	});

	app.ready(function() {
		

	});
});