/*
 */
define(function(require) {
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
		//禁止返回
		app.monitorKey(0, function() {
			app.ls.remove('notice');
			app.ls.remove('referrer');
			setTimeout(function() {
				app.exit();
			}, 0);
		});


	});
});