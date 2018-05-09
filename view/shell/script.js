/**
 * 
 */
define(function(require) {
	var $ = app.util;
	var param = app.getParam();
	
	
	if (!param || !param.url) {
		return app.toast('参数缺失:(view/shell)', 2000);
	}
	$('#headTitle')[0].innerText = (param.title || param.url);
	//进度条
	var loadingBar = $('#loadingBar')[0];
	var outTimeSet;

	var startLoad = function(progress) {
		if(param.show){
			return app.storage.remove('crossParam');
		}
		loadingBar.querySelector('.loading-progress').style.width = progress + '%';
		outTimeSet = setTimeout(function() {
			loadDone();
		}, appcfg.set.longtime);
	};
	//加载完成
	window.loadDone = function() {
		if(outTimeSet){
			clearTimeout(outTimeSet);
		}
		loadingBar.querySelector('.loading-progress').style.transitionDuration = 600 + 'ms';
		loadingBar.querySelector('.loading-progress').style.width = '100%';
		setTimeout(function() {
			loadingBar.querySelector('.loading-progress').style.transitionDuration = '';
			loadingBar.querySelector('.loading-progress').style.width = '0%';
		}, 700);
	};
	//关闭按钮显隐
	var closeBtn = $('#closeBtn'),
		goBack = $('#goBack'),
		closeShell = function(){
			if(param.shellIsPop){
				app.window.evaluate({
					script: "api.closeFrame({name: 'pageView'});api.closeFrame({name: 'shell'})"
				});
			}else{
				app.window.close();
			}
		};
	closeBtn.on('touchstart', function() {
		closeShell();
	});
	goBack.on('touchstart', function() {
		var lastUrl;
		pageViewQueue.pop();
		lastUrl = pageViewQueue[pageViewQueue.length-1];
		if (pageViewQueue.length) {
			app.window.evaluate("", "pageView", "window.location.href='"+lastUrl+"'");
			if(pageViewQueue.length===1){
				closeBtn[0].classList.remove('show');
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
				View = $('#View')[0];
			for (; i < routeLength; i++) {
				if (pageViewQueue[i] == url) {
					pageViewQueue.splice(i, 1);
					break;
				}
			}
			pageViewQueue.push(url);
			if (pageViewQueue.length > 1) {
				closeBtn[0].classList.add('show');
			}
			app.window.setPopover({
				name: 'pageView',
				rect: {
					x: 0
				}
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
				return console.log('shell:Error ' + JSON.stringify(err));
			}
			switch (ret.state) {
				case 0:
					//console.log('开始加载');
					break;
				case 1:
					startLoad(ret.progress);
					break;
				case 2:
					loadDone();
					app.publish('pageViewDone', 1);
					break;
				case 3:
					$('#headTitle')[0].innerText = ret.title;
					break;
				case 4:
					catchUrl(ret.url);
					break;
				default:
					break;
			}
		});

		//安卓返回拦截
		app.key('keyback', function() {
			goBack.trigger('touchstart');
		});
		

	});
});