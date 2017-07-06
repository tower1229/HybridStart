/**
 * 
 */
define(function(require) {
	require('sdk/common');
	var $ = require('jquery');

	var syncStatus = function() {
		var currentParam = app.storage.val('partsFilter');
		if ($.isPlainObject(currentParam)) {
			$('#keywords').val(currentParam['keywords'] || '');
			$('#vin').val(currentParam['vin'] || '');
			$('#no').val(currentParam['no'] || '');
		}
	};

	var setAllEmpty = function() {
		$('#keywords').val('');
		$('#vin').val('');
		$('#no').val('');
	};

	var setCatEmpty = function(empty) {
		$('#cat').val('');
		$('#catshow').text('所有分类');
		$('#catList .partcat').each(function(i, e) {
			if ($(e).data('val') == '') {
				$(e)[0].classList.add('bg-danger').siblings()[0].classList.remove('bg-danger');
			}
		});
	};

	syncStatus();
	//下拉
	$('body').on('click', '.item-stacked-label.item-icon-right', function(e) {
		var target = $(e.target);
		if (target.hasClass('_handle') || target.parents('._handle').length) {
			$(target).parents('.item').toggleClass('actived');
		}
	});
	$('#catList').on('click', '.partcat', function() {
		var val = $(this).data('val'),
			txt = $(this).text();
		$(this)[0].classList.add('bg-danger').siblings()[0].classList.remove('bg-danger');
		$(this).parents('.item').querySelector('input').val(val).end()
			.querySelector('._show').text(txt);
	});

	//关键词自动补全
	$('#keywords').prop('readOnly', true).on('click', function(e) {
		e.preventDefault();
		app.openView({
			anim: 0
		}, 'common', 'autocomplete');
	});
	//提交搜索
	$('#doSearch').on('click', function() {
		var param = {
			keywords: $('#keywords').val(),
			vin: $('#vin').val(),
			no: $('#no').val(),
			cat: $('#cat').val()
		};
		//console.log(param)
		app.storage.val('partsFilter', JSON.stringify(param));
		//跳转前把类别置空
		setCatEmpty();
		setTimeout(function() {
			app.openView({
				anim: 4
			}, 'demo', 'searchList');
			app.publish('partsearch', 1);
			param = null;
		}, 0);
	});
	//清除筛选条件
	$('#cleanCondition').on('click', function() {
		//删数据
		app.storage.remove('partsFilter');
		//界面置空
		setAllEmpty();
		//类别置空
		setCatEmpty();
	});
	//初始化
	var partcat = app.storage.val('partcat');
	var render = require('render');
	var renderHandle = render({
		el: '#catList',
		data: {
			data: partcat
		}
	});
	
	//vin自动转大写
	var vinInput = $('#vin');
	vinInput.on('keyup', function() {
		var _val = $(this).val();
		_val = _val.slice(0, 8);
		vinInput.val(_val.toUpperCase());
	});

	app.ready(function() {
		//接收自动补全
		app.subscribe('autocomplete', function(key) {
			var currentParam = app.storage.val('partsFilter');
			if ($.isPlainObject(currentParam)) {
				currentParam.keywords = key;
				app.storage.val('partsFilter', JSON.stringify(currentParam));
			}
			$('#keywords').val(key);
		});
		//返回同步状态
		app.window.on('resume', function() {
			syncStatus();
		});

	});
});