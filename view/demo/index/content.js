/*
 * layout
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;

	//demo打开网页
	$('body').tap('#openWeb', function(event) {
		app.openView({
			param: {
				url: 'http://m.baidu.com/',
				title: '打开网页'
			}
		}, 'shell');
	});

	
	
});
