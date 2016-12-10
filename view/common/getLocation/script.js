/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	//点击确定
	$('#sure').on('click',function(){
		app.window.evaluatePopoverScript({
	        name:'',
	        popName:'mapView',
	        scriptContent:'submitLoc()'
	    });
	});

	app.ready(function() {
		app.window.popoverElement({
			id: 'View',
			name: 'mapView',
			url: 'content.html'
		});

	});
});