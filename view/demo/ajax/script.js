/*
 * layout
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;

	var $log = $('#log')[0];

	$('#view').on('click', '.btn', function(e){
		var btn = e.target;
		app.loading.show();
		switch(btn.getAttribute('id')){
			case "default":
				app.ajax({
					url: appcfg.host.control + "/return/Yes",
					success: function(res){
						app.loading.hide();
						app.toast('数据请求成功');
						$log.innerText = JSON.stringify(res);
					}
				});
				break;
			case "cache":
				app.ajax({
					url: "http://spider.dcloud.net.cn/api/banner/36kr",
					cache: true,
					success: function(res) {
						app.loading.hide();
						app.toast('数据已缓存');
						$log.innerText = JSON.stringify(res);
					}
				});
				break;
			case "snapshoot":
				app.ajax({
					url: appcfg.host.control + "/return/timestamp",
					snapshoot: true,
					success: function(res){
						if(res.snapshoot){
							$log.innerText = ('快照数据:' + res.data);
						}else{
							setTimeout(function(){
								$log.innerText = $log.innerText + ('\n最新数据:' + res.data);
								app.loading.hide();
							},0);
						}
					}
				});
				break;
			default:
				console.warn('button id error');
		}
	});

	
});