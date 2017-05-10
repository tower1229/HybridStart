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
		url: 'http://7xnt8z.com1.z0.glb.clouddn.com/render-data-mock.json',
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