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

	window.detail_open = function() {
		//参数信息
		var param = app.getParam();
		if (!param || !param.guid) {
			return console.log('详细页参数错误');
		}
		$('#title')[0].innerText = param.title;
		metaRender.data(param);
		//向服务端请求文章详情内容
		app.ajax({
			type: 'get',
			url: 'http://spider.dcloud.net.cn/api/news/36kr/' + param.guid,
			success: function(res) {
				try{
					artRender.data(res);
				}catch(e){
					console.log(e.message)
				}
				app.window.evaluate({
					frameName: "view",
					script: "detail_done()"
				});
			},
			error: function(err) {
				alert(err.msg);
			}
		});
	}

});