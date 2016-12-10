/*
 * layout
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	require('box');

	var $cache = $('body').html();

	app.ready(function() {
		require.async('scrollLoad', function() {
			$('body').scrollLoad(function($wrap, $loading) {
				app.toload({
					url: 'http://7xnt8z.com1.z0.glb.clouddn.com/render-data-mock.json',
					data: {},
					success: function(res) {
						//此处简化数据渲染操作
						$wrap.append($cache);
						$loading.hide();
					},
					nomore: function() {
						//返回数据如果没有count字段将永远不会触发nomore回调
						$.box.msg('没有更多了');
						//用于屏蔽滚动加载事件
						$('body').attr('nomore', 1);
					}
				});

			});
		});


	});
});