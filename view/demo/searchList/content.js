/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var $ = app.util;
	
	var scrollLoad = require('scroll-load');
	var pageLoad = require('paging-load');

	var otherParam = app.storage.val('partsFilter');
	if (otherParam && otherParam.split) {
		otherParam = JSON.parse(otherParam);
	} 

	//模板
	var render = require('render');
	var rendHandle = render({
		el: '#partsList',
		callback: function($el){
			comm.cacheImg($el);
			scrollLoad({
				el: $('body'),
				callback: getData
			});
			app.loading.hide();
		}
	});
	
	var getData = function(reload) {
		if (reload) {
			app.loading.show();
		}
		var finalParam = $.extend({
			method: "getSearchList",
			sid: appcfg.project.sid
		}, otherParam);
		var pageLoadObj = pageLoad({
			url: appcfg.host.control + '/goods/search.jsp',
			data: finalParam,
			size: 5,
			reload: reload,
			success: function(res) {
				app.pull.stop();
				if (res.status === 'Y') {
					rendHandle.set({
						reload: reload
					}).data(res);
				} else {
					app.loading.hide();
					var emptyhtml = comm.commonTemp('parts');
					$('body')[0].innerHTML = (emptyhtml);
				}
			}
		});
		pageLoadObj.load();
	};
	
	//更新
	window.change = function() {
		app.loading.show();
		otherParam = app.storage.val('partsFilter');
		getData(true);
	};

	app.ready(function() {
		app.pull.init(function() {
			getData(true);
		});

		getData(true);


	});
});