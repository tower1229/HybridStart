/*
 * layout
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;
	
	var pageLoad = require('paging-load');
	var scrollLoadHandle;

	var pageLoadObj = pageLoad({
		url: 'http://rapapi.org/mockjsdata/1201/other/render-data-mock/',
		data: {},
		success: function(res) {
			//此处简化数据渲染操作
			var pFragment = document.createDocumentFragment();
			for (var i = 0; i < 5; i++) {
				var p = document.createElement("div");
				p.className = 'item';
				var oTxt = document.createTextNode("add" + i);
				p.appendChild(oTxt);
				pFragment.appendChild(p);
			}
			$('body')[0].appendChild(pFragment);
		},
		nomore: function() {
			//返回数据需要有count字段，否则永远不会触发nomore回调
			app.toast('没有更多了');
			scrollLoadHandle && scrollLoadHandle.destroy();
		}
	});

	app.ready(function() {
		require.async('scroll-load', function(scrollLoad) {
			scrollLoadHandle = scrollLoad({
				el: $('body')[0],
				callback: function(stopFn) {
					pageLoadObj.load(stopFn);
				}
			});
		});


	});
});