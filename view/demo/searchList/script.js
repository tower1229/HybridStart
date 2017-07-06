/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var $ = app.util;

	//关闭搜索
	$('#goBack').on('click', function() {
		app.window.close('demo_search', 'none');
		app.storage.remove('partsFilter');
	});
	//存放排序和筛选
	var otherParam = {};
	var sendChange = function() {
		app.storage.val('partsFilter', JSON.stringify(otherParam));
		app.window.evaluate('', 'popView', 'change()');
	};

	//排序
	$('.sortBar').on('click', '.sort', function() {
		if ($(this).hasClass('cur')) {
			return null;
		}
		$(this)[0].classList.add('cur').siblings()[0].classList.remove('cur');
		otherParam.order_by = $(this).data('code');
		$('#partsList').empty();
		sendChange();
	});

	//筛选类别
	$('#catList').on('touchend', 'li', function() {
		var that = $(this),
			catval = that.data('val') || '';

		syncStatus();

		that[0].classList.add('cur').siblings()[0].classList.remove('cur');
		$('#openSearch')[0].classList.remove('active');
		otherParam.cat = catval;
		otherParam.cattext = that.text();
		sendChange();
	});

	//搜索
	$('#openSearch').on('click', function() {
		app.openView({
			anim: 11
		}, 'demo', 'search');
	});
	//渲染配件类别
	var render = require('render');
	var catRender = render({
		el: '#catList',
		callback: function() {
			syncStatus();
			app.window.popoverElement({
				id: 'mainCont',
				name: 'popView',
				url: 'content.html'
			});
		}
	});
	var doRend = function() {
		var partcat = app.storage.val('partcat');
		var handle = function() {
			if (!partcat) {
				partcat = app.storage.val('partcat');
			}
			catRender.data({
				data: partcat
			});
		};
		if (!partcat) {
			comm.preGet(handle);
		} else {
			handle();
		}
	};
	//同步状态
	var syncStatus = function() {
		var param = app.storage.val('partsFilter');
		var $openSearch = $('#openSearch')[0];
		if (!$.isPlainObject(param)) {
			param = {};
		} 
		otherParam = param;
		//app.storage.remove('partsFilter');
		$.each($('#catList li'), function(i, e) {
			if ($(e).data('val') == param['cat']) {
				e.className = e.className + ' cur';
			} else {
				e.className = e.className.replace(/\s*cur\s*/g, ' ');
			}
		});
		//标识隐含条件
		if (otherParam.keywords || otherParam.vin || otherParam.no) {
			$openSearch.className = ' active';
		} else {
			$openSearch.className = $openSearch.className.replace(/\s*active\s*/g, ' ');
		}
	};

	app.ready(function() {
		doRend();

		//搜索回调
		app.subscribe('partsearch', function(msg) {
			if (msg) {
				syncStatus();
				sendChange();
			}

		});

	});
});