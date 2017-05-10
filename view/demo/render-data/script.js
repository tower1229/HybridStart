/*
 * layout
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var box = require('box');

	var getData = function() {
		app.loading.show();
		app.ajax({
			url: 'http://7xnt8z.com1.z0.glb.clouddn.com/render-data-mock.json',
			type: 'get',
			data: {},
			success: function(res) {
				if (res.status === 'Y') {
					res.update = comm.getDate();
					app.render($('#template').val(), res, '#view', true, function(html) {
						console.log(html);
					});
				} else if (res.msg) {
					box.msg(res.msg);
				}
			}
		});
	};

	app.ready(function() {
		getData();

	});
});