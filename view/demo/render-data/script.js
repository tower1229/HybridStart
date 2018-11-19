/*
 * layout
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var $ = app.util;
	var render = require('render');
	var myRender = render({
		el: '#view',
		callback: function(){
			app.loading.hide();
		}
	});
	
	var getData = function() {
		app.loading.show();
		
		app.ajax({
			url: appcfg.host.control + '/render-data-mock',
			type: 'get',
			data: {},
			success: function(res) {
				if (res.status === 'Y') {
					res.update = comm.getDate();
					myRender.data(res);
				} else if (res.msg) {
					app.toast(res.msg);
				}
			}
		});
	};

	app.ready(function() {
		getData();

	});
});