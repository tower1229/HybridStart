/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');

	var param = app.ls.val('crossParam');
	var box = require('box');
	if (param && param.split) {
		param = JSON.parse(param);
	}
	if (!param || !param.url) {
		return app.window.openToast('参数缺失:(view/shell)', 2000);
	}
	$('#headTitle').text(param.title || param.url);
	//进度条
	var loadingBar = $('#loadingBar');
	var outTimeSet;

	var startLoad = function(progress) {
		if(param.show){
			return app.ls.remove('crossParam');
		}
		loadingBar.find('.loading-progress').get(0).style.width = progress + '%';
		outTimeSet = setTimeout(function() {
			loadDone();
		}, appcfg.set.longtime);
	};
	//加载完成
	window.loadDone = function() {
		if(outTimeSet){
			clearTimeout(outTimeSet);
		}
		loadingBar.find('.loading-progress').get(0).style.transitionDuration = 600 + 'ms';
		loadingBar.find('.loading-progress').get(0).style.width = '100%';
		setTimeout(function() {
			loadingBar.find('.loading-progress').get(0).style.transitionDuration = '';
			loadingBar.find('.loading-progress').get(0).style.width = '0%';
		}, 700);
	};
	//关闭按钮显隐
	var closeBtn = $('#closeBtn'),
		goBack = $('#goBack'),
		closeShell = function(){
			if(param.shellIsPop){
				app.window.evaluateScript("","api.closeFrame({name: 'pageView'});api.closeFrame({name: 'shell'})");
			}else{
				app.window.close();
			}
		};
	closeBtn.on('click', function() {
		closeShell();
	});
	goBack.on('click', function() {
		var lastUrl;
		pageViewQueue.pop();
		lastUrl = pageViewQueue[pageViewQueue.length-1];
		if (pageViewQueue.length) {
			app.window.evaluatePopoverScript("", "pageView", "window.location.href='"+lastUrl+"'");
			if(pageViewQueue.length===1){
				closeBtn.removeClass('show');
			}
		} else {
			closeShell();
		}
	});
	
	//捕获url
	var pageViewQueue = [];
	var catchUrl = function(url) {
		if (url && url.split) {
			var i = 0,
				routeLength = pageViewQueue.length,
				View = $('#View');
			for (; i < routeLength; i++) {
				if (pageViewQueue[i] == url) {
					pageViewQueue.splice(i, 1);
					break;
				}
			}
			pageViewQueue.push(url);
			if (pageViewQueue.length > 1) {
				closeBtn.addClass('show');
			}
			app.window.resizePopover({
				name: 'pageView',
				left: 0,
				top: View.offset().top,
				width: parseInt(View.width()),
				height: parseInt(View.height())
			});
		}
	};

	app.ready(function() {

		app.window.popoverElement({
			id: 'View',
			name: 'pageView',
			url: param.url,
			left: param.show ? 0 : 9999
		});
		
		//加载监听
		api.setFrameClient({
			frameName: 'pageView'
		}, function(ret, err) {
			if(err){
				return console.log(JSON.stringify(err));
			}
			switch (ret.state) {
				case 0:
					console.log('开始加载');
					break;
				case 1:
					startLoad(ret.progress);
					break;
				case 2:
					loadDone();
					app.window.publish('pageViewDone', 1);
					break;
				case 3:
					$('#headTitle').text(ret.title);
					break;
				case 4:
					catchUrl(ret.url);
					break;
				default:
					break;
			}
		});

		//安卓返回拦截
		app.monitorKey(0, function() {
			goBack.trigger('click');
		});
		

	});
});