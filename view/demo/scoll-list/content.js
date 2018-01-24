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

	var pageLoadObj = pageLoad({
		url: 'http://rapapi.org/mockjsdata/1201/page-data-mock/',
		data: {},
		success: function(res) {
			if(res.status==='Y'){
				myRender.data(res);
			}
		},
		nomore: function() {
			//返回数据需要有count字段，否则永远不会触发nomore回调
			app.toast('没有更多了');
			scrollLoadHandle && (scrollLoadHandle = scrollLoadHandle.destory());
		}
	});

	//滚动加载
	var scrollLoad = require('scroll-load');
	scrollLoadHandle = scrollLoad({
		el: $('body')[0],
		callback: function(stopFn) {
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
	//初始加载
	pageLoadObj.load();
});
