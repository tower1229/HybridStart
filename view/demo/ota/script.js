/**
 * 
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;
	var render = require('render');
	var download = require('download');
	var zip = api.require('zip');

	//下载配置
	var otaPath = api.systemType === "android" ? "/Download/" : "fs://Download/";

	//本地数据
	var localPluginsData = app.storage.val('plugins-data') || [];
	
	//渲染列表
	var myRender = render({
		el: '#view',
		callback: function(ele, data) {
			app.storage.val('plugins-data', data.data)
			app.loading.hide();
		}
	});

	//获取插件数据
	var getData = function() {
		app.loading.show();
		app.ajax({
			url: 'http://static-zt.oss-cn-qingdao.aliyuncs.com/mock/plugins.json',
			type: 'get',
			success: function(res) {
				if (Array.isArray(res.data)) {
					res.data.forEach(function(e){
						localPluginsData.forEach(function(l){
							if(e.name===l.name){
								$.extend(e,l)
							}
						})
					})
					localPluginsData = res.data;
					myRender.data({
						data: localPluginsData
					});
				} else {
					app.loading.hide();
					app.toast("插件数据异常");
				}
			}
		});
	};

	getData();

	var openPlugin = function(item) {
		var pagePath = item.path + item.name + item.index;
		//检测文件存在
		api.readFile({
		    path: pagePath
		}, function(ret, err) {
		    if (ret.status) {
		        app.window.open({
					url: pagePath
				});
		    } else {
		    	localPluginsData.forEach(function(local){
		    		if(local.name===item.name){
		    			delete local.path;
		    		}
		    	});
		    	myRender.data({
					data: localPluginsData
				});
		    	app.toast('开始下载');
		        downloadPlugin(item, true);
		    }
		});
	};
	var downloadPlugin = function(item, open){
		if(!item.remote || !item.name){
			return app.toast("该插件暂不可用");
		}
		app.loading.show();
		download(item.remote,{
			path: otaPath,
			name: item.name + ".zip",
			cache: false,
			success: function(path){
				app.loading.hide();
				var downPath = path.replace(item.name + ".zip","");
				zip.unarchive({
				    file: path,
				    toPath: downPath
				}, function(ret, err) {
					app.loading.hide();
				    if (ret.status) {
				    	localPluginsData.forEach(function(local){
				    		if(local.name===item.name){
				    			local.path = downPath;
				    		}
				    	});
				        myRender.data({
							data: localPluginsData
						});
						app.toast('插件下载完成，可以使用了');
				    } else {
				        alert(JSON.stringify(err));
				    }
				});
			}
		});
	};
	//事件绑定
	$('#view').tap('.item', function(e) {
		var itemData = $(e.target).data('str');
		if(itemData){
			openPlugin(JSON.parse(itemData))
		}
		
	});


});