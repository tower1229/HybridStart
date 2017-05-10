/*
 * layout
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var box = require('box');

	var getCity = function() {
		var UIActionSelector = api.require('UIActionSelector');
		if(!UIActionSelector){
			return console.warn('UIActionSelector插件未就绪');
		}
		UIActionSelector.open({
			datas: 'widget://view/demo/citySelector/city.json', //测试数据
			layout: {
				row: 5,
				col: 3,
				height: 30,
				size: 14,
				sizeActive: 16,
				rowSpacing: 5,
				colSpacing: 0,
				maskBg: 'rgba(0,0,0,0.2)',
				bg: '#fff',
				color: appcfg.defaultTheme.info,
				colorSelected: appcfg.defaultTheme.primary
			},
			animation: true,
			cancel: {
				text: '取消',
				size: 14,
				w: 90,
				h: 35,
				bg: appcfg.defaultTheme.success,
				bgActive: appcfg.defaultTheme.heav_success,
				color: '#fff',
				colorActive: '#fff'
			},
			ok: {
				text: '确定',
				size: 14,
				w: 90,
				h: 35,
				bg: appcfg.defaultTheme.success,
				bgActive: appcfg.defaultTheme.heav_success,
				color: '#fff',
				colorActive: '#fff'
			},
			title: {
				text: '',
				size: 12,
				h: 44,
				bg: '#fff',
				color: appcfg.defaultTheme.info,
			}
		}, function(ret, err) {
			if (ret.eventType === 'ok') {
				var info = ret.selectedInfo,
					_text = '',
					_id = '';
				$.each(info, function(i, e) {
					_text += e.name;
					_id += e.id;
				});
				$('#input').val(_text);
				console.log('city id is: ' + _id);
			}
		});
	};

	$('#input').on('click', getCity);

	app.ready(function() {


	});
});