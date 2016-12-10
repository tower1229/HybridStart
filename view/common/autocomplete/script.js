/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var autocompleteHistory = app.ls.val('autocompleteHistory') || [];

	var renderHistroy = function() {
		var html = '';
		if (autocompleteHistory.split) {
			autocompleteHistory = JSON.parse(autocompleteHistory);
		}
		$.each(autocompleteHistory, function(i, e) {
			html += ('<span class="label">' + e + '</span>');
		});
		$('#searchHistory').html(html).get(0).style.visibility = 'hidden';
		setTimeout(function() {
			$('#searchHistory').get(0).style.visibility = 'visible';
		}, 0);
	};

	var searchLock = false;
	var tempStr = $('#searchResultTemp').val();
	var dataRender = function(data) {
		var render = etpl.compile(tempStr);
		var html = render(data);
		$('#searchResult').html(html).show();
	};

	var getData = function(t) {
		app.ajax({
			url: "http://rap.taobao.org/mockjsdata/1201/core/autocomplate",
			data: {
				query: t
			},
			success: function(res) {
				if (res.status === "Y") {
					dataRender(res);
				}
			}
		});
	};
	//发布
	var sendAutocomplate = function(val) {
			var cachehistroy = app.ls.val('autocompleteHistory') || [];
			if (cachehistroy.split) {
				cachehistroy = JSON.parse(cachehistroy);
			}
			if (val && $.isArray(cachehistroy)) {
				$.each(cachehistroy, function(i, e) {
					if (e == val) {
						cachehistroy.splice(i, 1);
						return;
					}
				});
				cachehistroy.unshift(val);
				app.ls.val('autocompleteHistory', JSON.stringify(cachehistroy));
			}
			app.window.publish('autocomplete', val);
			app.window.close();
		};
		//监听输入
	$('#autoInp').on('keyup', function() {
		var t = $(this).val();
		if (t == "" || searchLock) {
			return $('#searchResult').hide();
		}
		getData(t);
		t = null;
	});

	//选中
	$('#searchResult').on('click', '.item', function() {
		var that = this,
			val = $(that).text();
		searchLock = true;
		$(that).addClass('active');
		$('#autoInp').val(val);
		setTimeout(function() {
			$(that).removeClass('active');
			searchLock = false;
			that = val = null;
			$('#keyForm').submit();
		}, 100);
	});
	//提交
	$('#keyForm').on('submit', function(e) {
		e.preventDefault();
		var key = $.trim($('#autoInp').val());
		sendAutocomplate(key);
		key = null;
	});
	//历史直接搜索
	$('#searchHistory').on('click', '.label', function() {
		var that = $(this),
			text = that.text();
		that.addClass('active');
		setTimeout(function() {
			that.removeClass('active');
			sendAutocomplate(text);
			that = text = null;
		}, 100);
	});
	//渲染历史记录
	renderHistroy();

	app.ready(function() {
		$('#autoInp').focus();
	});
});