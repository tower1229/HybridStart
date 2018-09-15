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
	var otaPath = "fs://plugins/";

	/*
	* 插件列表数据
	* 格式：
		[{
			"remote": "http://static-zt.oss-cn-qingdao.aliyuncs.com/mock/plugin-test.zip",
			"homepage": "/view/index/temp.html",
			"name": "plugin-test",
			"showName": "测试插件"
		}, {
			"remote": "http://static-zt.oss-cn-qingdao.aliyuncs.com/mock/plugin-refined-x.zip",
			"homepage": "/view/index/temp.html",
			"name": "plugin-refined-x",
			"showName": "下载失败测试"
		}]
	*/
	var localPluginsData = [];
	
	//渲染列表
	var myRender = render({
		el: '#view',
		callback: function(ele, data) {
			app.loading.hide();
		}
	});

	//获取插件列表
	var getData = function() {
		app.loading.show();
		app.ajax({
			url: 'http://static-zt.oss-cn-qingdao.aliyuncs.com/mock/plugins.json',
			type: 'get',
			success: function(res) {
				if (Array.isArray(res.data)) {
					res.data.forEach(function(e){
						if(checkPlugin(e)){
							e.isDone = true
						}
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

	/*
	* 检查插件文件
	*/
	var checkPlugin = function(item) {
		var pagePath = otaPath + item.name + item.homepage;
		//检测本地文件是否存在
		item.isDone = api.readFile({
			sync: true,
		    path: pagePath
		});
		if(item.isDone){
			return pagePath
		}else{
			return false
		};
	};

	/*
	* 打开插件
	*/
	var openPlugin = function(item) {
		var pagePath = checkPlugin(item);
		if (pagePath) {
	        app.window.open({
				url: pagePath
			});
	    } else {
	        downloadPlugin(item);
	    }
	};

	/*
	* 下载插件
	*/
	var downloadPlugin = function(item){
		if(!item.remote || !item.name){
			return app.toast("该插件暂不可用");
		}
		app.toast('正在安装');
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
				    			local.isDone = true;
				    		}
				    	});
				        myRender.data({
							data: localPluginsData
						});
						app.toast('插件安装完成');
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