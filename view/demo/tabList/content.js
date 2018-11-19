/*
 * layout
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;

	var render = require('render');
	var myRender = render({
		el: '#view',
		callback: function(){
			app.loading.hide();
			app.pull.stop();
			if(!scrollLoadHandle){
				myRender.set({
					reload: false
				});
				scrollLoadHandle = scrollLoad({
					el: $('body')[0],
					callback: function(stopFn) {
						pageLoadObj.load(stopFn);
					}
				});
			}
		}
	});

	var pageLoad = require('paging-load');
	var scrollLoadHandle;
	var pageLoadObj;

	window.getData = function(status){
		app.loading.show();
		pageLoadObj && pageLoadObj.destroy();
		$('body')[0].scrollTop = 0;
		pageLoadObj = pageLoad({
			url: appcfg.host.control + '/page-data-mock',
			data: {
				status: status
			},
			success: function(res) {
				if(res.status==='Y'){
					//数据处理
					switch(status){
						case "1":
							res.data.forEach(function(e){
								e.statusText = "处理中";
							});
						break;
						case "2":
							res.data.forEach(function(e){
								e.statusText = "已完成";
							});
						break;
						case "3":
							res.data.forEach(function(e){
								e.statusText = "未通过";
							});
						break;
						default:
							res.data.forEach(function(e){
								e.statusText = "未知状态";
							});
					}
					myRender.data(res);
				}
			},
			nomore: function() {
				//返回数据需要有count字段，否则永远不会触发nomore回调
				app.toast('没有更多了');
				scrollLoadHandle && (scrollLoadHandle = scrollLoadHandle.destroy());
			}
		});
		//初始加载
		myRender.set({
			reload: true
		});
		pageLoadObj.load();
	};

	//滚动加载
	var scrollLoad = require('scroll-load');
	scrollLoadHandle = scrollLoad({
		el: $('body')[0],
		callback: function(stopFn) {
			myRender.set({
				reload: false
			});
			pageLoadObj.load(stopFn);
		}
	});
	//下拉刷新
	app.pull.init(function(){
		myRender.set({
			reload: true
		});
		pageLoadObj.reload();
	});
	//通知父页面
	app.window.evaluate({
		script: "childrenInit()"
	});

});
