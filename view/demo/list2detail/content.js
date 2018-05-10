/*
 * 
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;

	var lastId = ''; //最新新闻的id
	var reqData = {
		column: "id,post_id,title,author_name,cover,published_at" //需要的字段名
	};

	var render = require('render');
	var bannerRender = render({
		el: '#banner'
	});
	var listRender = render({
		el: '#list'
	});
	/**
	 * 1、将服务端返回数据，转换成前端需要的格式
	 * 2、若服务端返回格式和前端所需格式相同，则不需要此功能
	 * 
	 * @param {Array} items 
	 */
	function convert(items) {
		var newItems = [];
		items.forEach(function(item) {
			newItems.push({
				guid: item.post_id,
				title: item.title,
				author: item.author_name,
				cover: item.cover
			});
		});
		return newItems;
	}

	//打开详细页事件
	var openLock;
	$('#list').on('touchmove', '[data-guid]', function() {
		openLock = true;
	}).on('touchend', '[data-guid]', function() {
		if (openLock) {
			console.log('openLock');
			return setTimeout(function(){
				openLock = false;
			},200);
		}
		var guid = $(this).data('guid');
		var title = this.querySelector(".title").innerHTML.trim();
		var author = this.querySelector(".author").innerHTML;
		var cover = this.querySelector("img").getAttribute("src");
		openLock = true;
		//存参数
		app.storage.val('crossParam', {
			guid: guid,
			title: title,
			author: author,
			cover: cover
		});
		//通知详细页
		app.window.evaluate({
			frameName: 'page_detail',
			script: "detail_open()"
		});
	});

	var loadData = function() {
		if (lastId) { //说明已有数据，目前处于下拉刷新，增加时间戳，触发服务端立即刷新，返回最新数据
			reqData.lastId = lastId;
			reqData.time = String(new Date().getTime());
		}
		
		//请求顶部banner信息
		app.ajax({
			type: 'get',
			url: "http://spider.dcloud.net.cn/api/banner/36kr",
			data: reqData,
			success: function(rsp) {
				bannerRender.data({
					banner: {
						title: rsp.title,
						cover: rsp.cover
					}
				});
				//引擎bug: IOS不支持同时发起多个AJAX，只能挨个发
				fetchList();
			},
			error: function(err) {
				console.log(err.msg);
				app.pull.stop();
			}
		});
		//请求列表信息流
		var fetchList = function(){
			app.ajax({
				type: 'get',
				url: "http://spider.dcloud.net.cn/api/news",
				data: reqData,
				success: function(rsp) {
					app.pull.stop();
					if (rsp && rsp.length > 0) {
						lastId = rsp[0].id; //保存最新消息的id，方便下拉刷新时使用
						listRender.push('data', convert(rsp));
					}
				},
				error: function(err) {
					console.log(err.msg);
					app.pull.stop();
				}
			});
		}
	};

	//详细页加载完成
	window.detail_done = function(){
		app.window.animPopover({
			name: 'page_detail',
			translation: {
				x: -window.innerWidth
			},
			callback: function() {
				openLock = false;
				app.window.evaluate({
					script: 'detailIsOpen = true'
				});
			}
		});
	}

	app.ready(function() {
		app.pull.init(loadData);

		//加载初始数据
		loadData();
		//预加载详细页
		app.window.openPopover({
			name: 'page_detail',
			url: './detail.html',
			width: window.innerWidth, //必须设置宽度，否则不渲染
			left: window.innerWidth
		});
		
	});
});