/*
 * layout
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var box = require('box');
	
	$('.pro_counter_val').on('click',function(e){
		var inp = $(this),
			v = inp.val(),
			max = inp.data('max');
		inp.blur();
		box.amount(v,function(num){
			inp.val(Math.min(num,max));
		});
	});

	app.ready(function() {
		

	});
});