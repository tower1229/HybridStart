/*
 * layout
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;

	//关闭详细页
	window.closePage = function() {
		app.window.animPopover({
			name: 'page_detail',
			translation: {
				x: window.innerWidth
			},
			callback: function(){
				app.window.evaluate({
					script: 'detailIsOpen = false'
				});
				resetData();
				window.scrollTo(0, 0);
			}
		});
	};
	$('#goBack-cus')[0].addEventListener('touchstart', closePage);

	var render = require('render');
	var metaRender = render({
		el: '#meta'
	});
	var artRender = render({
		el: '#article'
	});
	function resetData(){
		metaRender.data(getDefaultData());
		artRender.data(getDefaultData());
	}
	function getDefaultData() {
		return {
			cover: '',
			title: '',
			author: '',
			time: '',
			content: ''
		};
	}

	app.ready(function() {
		//监听
		app.subscribe('detail_open', function(param) {
			//参数信息
			$('#title')[0].innerText = param.title;
			metaRender.data(param);
			//文章内容
			if (!param.guid) {
				return;
			}
			//向服务端请求文章详情内容
			app.ajax({
				type: 'get',
				url: 'http://spider.dcloud.net.cn/api/news/36kr/' + param.guid,
				checkData: false,
				success: function(res) {
					artRender.data({
						content: res.content
					});
					app.publish('detail_done');
				},
				error: function(err) {
					alert(err.msg);
				}
			});
		});

	});
});