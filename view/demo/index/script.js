/*
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var $ = app.util;
	var wwid = window.innerWidth;
	
	var $head = $('#head')[0];
	var $title = $('#title')[0];
	var channelSet = {
		home: {
			url: './content.html',
			set: function(){
				$title.innerText = 'HybridStart 功能示例';
			}
		},
		product: {
			url: '../../blank/temp.html',
			set: function(){
				$title.innerText = '空白栏目1';
				$head.classList.add('product-head');
			}
		},
		discover: {
			url: '../../blank/temp.html',
			set: function(){
				$title.innerText = '空白栏目2';
				$head.classList.add('discover-head');
			}
		},
		member: {
			url: '../../member/index/temp.html',
			set: function(){
				$title.innerText = '会员中心';
				$head.classList.add('member-head');
				setTimeout(function(){
					app.window.evaluate('', 'member', 'update()')
				},0)
			}
		}
	};
	//首页Frame切换
	$('.foot').on('touchstart', '[active]', function(e) {
		var target = e.target;
		var tid = target.getAttribute('id');
		if (target.className.indexOf('cur') !== -1) {
			return null;
		}
		if (e.detail) {
			setTimeout(function() {
				$(target)[0].classList.remove('active');
			}, 0);
		}
		//移除头部栏目类
		$head.classList.remove('product-head', 'discover-head', 'member-head');
		//移除导航当前状态
		$('.foot .cur')[0].classList.remove('cur');
		$(target)[0].classList.add('cur');
		//执行栏目设定
		channelSet[tid].set();
		//打开对应frame
		app.window.popoverElement({
			id: 'view',
			name: tid,
			url: channelSet[tid].url
		});
	});

	//头部按钮事件绑定
	$('#head').on('touchstart', '.btn', function(e) {
		var btn = e.target;
		switch (btn.getAttribute('id')) {
			case "offcanvas":
				app.openView({
					subType: 'from_left'
				}, 'demo', 'menu');
				break;
			case "systemSet":
				app.openView(null, 'member', 'set');
				break;
			default:
				console.warn('头部按钮点击异常');
		}

	});


	//返回拦截
	app.key('keyback', function() {
		if ($('#home')[0].className.indexOf('cur') === -1) {
			return $('#home').trigger('touchstart', {
				from_back: true
			});
		}
		app.exit();
	});
	
	//frame预加载
	$.each(channelSet, function(name, obj) {
		if (name !== 'home') {
			app.window.popoverElement({
				id: 'view',
				name: name,
				url: obj.url
			});
		}
	});
	//打开首页
	app.window.popoverElement({
		id: 'view',
		name: 'home',
		url: './content.html'
	});

	//静默检查更新
	comm.checkUpdate(true);
	
});