/*
 * layout
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	
	//demo打开网页
	$('#openWeb').on('click', function() {
		app.openView({
			param: {
				url: 'http://www.baidu.com/',
				title: '打开网页'
			}
		}, 'shell');
	});


	app.ready(function() {
		


	});
});