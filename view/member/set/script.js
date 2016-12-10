/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');require('sdk/common');
	var globalTimeout;

	$("#ver").text(appcfg.set.version || '0.0.1');
	
	//接收推送
	var pushable = app.ls.val('pushable');
	$('#pushable').prop('checked',pushable==1 ?  true : false);
	$('#pushable').on('change',function(){
		var ajpush = api.require('ajpush');
		if($(this).prop('checked')){
			app.ls.val('pushable','1');
			ajpush.resumePush(function(ret) {
			    if(ret && ret.status){
			        console.log('已恢复推送');
			    }
			});
		}else{
			app.ls.val('pushable','0');
			ajpush.stopPush(function(ret) {
			    if(ret && ret.status){
			        console.log('已停止推送');
			    }
			});
		}
	});

	$('body').on('click','[data-action]',function(){
		var act = $(this).data('action');
		switch(act){
			case "clearCache":
				app.loading.show('正在清理...');
				//ls cache
				var lst;
            	for (lst in window.localStorage){
            		if(appcfg.set.safeStorage.indexOf(lst)===-1){
            			localStorage.removeItem(lst);
            		}
            	}
            	//sys cache
            	api.clearCache(function() {
				    clearTimeout(globalTimeout);
					app.loading.hide();
					app.window.openToast('缓存清除成功！',1000);
					lst = null;
				});

				globalTimeout = setTimeout(function(){
					app.loading.hide();
					app.window.openToast('操作超时！',2000);
					lst = null;
				},appcfg.set.outime);
				break;
			case "exit":
				comm.logout();
				break;
			case "upload":
				app.loading.show('检测中...',{
					mark:'puload'
				});
				comm.checkUpdate(api.systemType);
				break;
		}
	});
	
	app.ready(function(){
		//获取缓存大小
		api.getCacheSize(function(ret) {
		    var size = ret.size/1024/1024;
		    $('#cacheSize').text(size.toFixed(2)+'M');
		});

	});
});