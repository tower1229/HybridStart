/*
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;

	//导航事件
	var $head = $('#head')[0];
	var $title = $('#title')[0];
	$('.foot').on('touchstart', '[active]', function(e) {
		var target = e.target;
		if (target.className.indexOf('cur') !== -1) {
			return null;
		}
		if(e.detail){
			setTimeout(function(){
				$(target)[0].classList.remove('active');
			},0);
		}
		//移除头部栏目类
		$head.classList.remove('product-head', 'discover-head', 'member-head');
		//移除导航当前状态
		$('.foot .cur')[0].classList.remove('cur');
		$(target)[0].classList.add('cur');
		switch (target.getAttribute('id')) {
			case 'home':
				app.window.popoverElement({
					id: 'view',
					url: './content.html'
				});
				$title.innerText = 'HybridStart 功能示例';
				break;
			case 'product':
				app.window.popoverElement({
					id: 'view',
					url: '../../product/index/temp.html'
				});
				$title.innerText = '产品';
				$head.classList.add('product-head');
				break;
			case 'discover':
				app.window.popoverElement({
					id: 'view',
					url: '../../discover/index/temp.html'
				});
				$title.innerText = '发现';
				$head.classList.add('discover-head');
				break;
			case 'member':
				app.window.popoverElement({
					id: 'view',
					url: '../../member/index/temp.html'
				});
				$title.innerText = '会员中心';
				$head.classList.add('member-head');
				break;
			default:
				console.log('底部菜单异常！');
		}
	});

	//头部按钮
	$('#head').on('touchstart', '.btn', function(e) {
		var btn = e.target;
		switch(btn.getAttribute('id')){
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


	app.ready(function() {
		//返回拦截
		app.key('keyback', function() {
			if ($('#home')[0].className.indexOf('cur') === -1) {
				return $('#home').trigger('touchstart', {from_back: true});
			}
			app.storage.remove('referrer');
			setTimeout(function() {
				app.exit();
			}, 0);
		});
		//打开首页
		app.window.popoverElement({
			id: 'view',
			url: './content.html',
			bounce: true
		});


	});
});