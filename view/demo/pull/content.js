/*
 * layout
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var box = require('box');
	var pageLoad = require('paging-load');
	var scrollLoadHandle;

	var pageLoadObj = pageLoad({
		url: 'http://rapapi.org/mockjsdata/1201/other/render-data-mock/',
		data: {},
		success: function(res) {
			//此处简化数据渲染操作
			$('body').append($cache);
		},
		nomore: function() {
			//返回数据需要有count字段，否则永远不会触发nomore回调
			box.msg('没有更多了');
			scrollLoadHandle && scrollLoadHandle.destory();
		}
	});
	var $cache = $('body').html();

	app.ready(function() {
		require.async('scroll-load', function() {
			scrollLoadHandle = $('body').scrollLoad({
				callback: function(stopFn) {
					pageLoadObj.load(stopFn);
				}
			});
		});


	});
});