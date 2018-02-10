/**
 * 
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;
	var render = require('render');
	var download = require('download');
	var zip = api.require('zip');

	//配置
	var otaPath = "/HybridStartOTA/";
	var pluginCommonParam = {
		root: api.wgtRootDir
	};
	//本地数据
	var localPluginsData = app.storage.val('ota-plugins') || [];
	//渲染列表
	var myRender = render({
		el: '#view',
		data: {},
		callback: function() {
			app.loading.hide();
		}
	});
	//获取插件数据
	var getData = function() {
		app.loading.show();
		app.ajax({
			url: 'http://static-zt.oss-cn-qingdao.aliyuncs.com/mock/plugins.json',
			type: 'get',
			data: {},
			success: function(res) {
				if (Array.isArray(res.data)) {
					//合并本地数据
					var moreArray = [];
					res.data.forEach(function(remote){
						var isIn = false;
						localPluginsData.forEach(function(local){
							if(local.name===remote.name){
								isIn = true;
								$.extend(local,remote);
							}
						});
						if(!isIn){
							moreArray.push(remote);
						}
					});
					localPluginsData = localPluginsData.concat(moreArray);
					app.storage.val('ota-plugins', localPluginsData);
					myRender.data({
						data: localPluginsData
					});
				} else if (res.msg) {
					app.loading.hide();
					app.toast(res.msg);
				}
			}
		});
	};

	getData();

	var openPlugin = function(item) {
		var remote = $(item).data('remote');
		var path = $(item).data('path');
		var index = $(item).data('index');
		var name = $(item).data('name');
		var pagePath = path + name + index;
		//检测文件存在
		api.readFile({
		    path: pagePath
		}, function(ret, err) {
		    if (ret.status) {
		        app.window.open({
					url: pagePath,
					param: pluginCommonParam
				});
		    } else {
		    	localPluginsData.forEach(function(local){
		    		if(local.name===name){
		    			delete local.path;
		    		}
		    	});
		    	app.storage.val('ota-plugins', localPluginsData);
		    	app.toast('开始下载');
		        downloadPlugin(item, true);
		    }
		});
	};
	var downloadPlugin = function(item, open){
		var remote = $(item).data('remote');
		var name = $(item).data('name');
		if(!remote || !name){
			return app.toast("该插件暂不可用");
		}
		app.loading.show();
		download(remote,{
			path: otaPath,
			name: name + ".zip",
			cache: false,
			success: function(path){
				app.loading.hide();
				var downPath = path.replace(name + ".zip","");
				zip.unarchive({
				    file: path,
				    toPath: downPath
				}, function(ret, err) {
					app.loading.hide();
				    if (ret.status) {
				    	localPluginsData.forEach(function(local){
				    		if(local.name===name){
				    			local.path = downPath;
				    		}
				    	});
				    	app.storage.val('ota-plugins', localPluginsData);
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
	$('#view').on('touchend', '.item', function(e) {
		var item = e.target;
		openPlugin(item);
	});


});