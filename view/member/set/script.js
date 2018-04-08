/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var $ = app.util;
	var globalTimeout;

	$("#ver")[0].innerText = (appcfg.set.version || api.appVersion);
	
	//接收推送
	var pushable = app.storage.val('pushable');
	$('#pushable')[0].checked = (pushable === "1");
	$('#pushable')[0].addEventListener('change', function(e) {
		var ajpush = api.require('ajpush');
		if (e.target.checked) {
			app.storage.val('pushable', '1');
			ajpush.resumePush(function(ret) {
				if (ret && ret.status) {
					console.log('已恢复推送');
				}
			});
		} else {
			app.storage.val('pushable', '0');
			ajpush.stopPush(function(ret) {
				if (ret && ret.status) {
					console.log('已停止推送');
				}
			});
		}
	});

	$('body').on('touchend', '[data-action]', function(e) {
		var act = $(e.target).data('action');
		switch (act) {
			case "clearCache":
				app.loading.show('正在清理...');
				//ls cache
				app.storage.clear();
				//sys cache
				api.clearCache(function() {
					clearTimeout(globalTimeout);
					app.loading.hide();
					app.toast('缓存清除成功！');
					lst = null;
					$('#cacheSize')[0].innerText = '0.00M';
				});

				globalTimeout = setTimeout(function() {
					app.loading.hide();
					app.toast('操作超时！');
					lst = null;
				}, appcfg.set.outime);
				break;
			case "upload":
				comm.checkUpdate();
				break;
			case "exit":
				comm.logout();
				break;
			default:

		}
	});
	
	app.ready(function(){
		//获取缓存大小
		api.getCacheSize(function(ret) {
			var size = ret.size / 1024 / 1024;
			$('#cacheSize')[0].innerText = (size.toFixed(2) + 'M');
		});

	});
});