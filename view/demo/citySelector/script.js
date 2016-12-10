/*
 * layout
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	require('box');

	var getCity = function() {
		var UIActionSelector = api.require('UIActionSelector');
		UIActionSelector.open({
			datas: 'widget://view/demo/citySelector/city.json',
			layout: {
				row: 5,
				col: 3,
				height: 30,
				size: 12,
				sizeActive: 14,
				rowSpacing: 5,
				colSpacing: 10,
				maskBg: 'rgba(0,0,0,0.2)',
				bg: '#fff',
				color: '#888',
				colorActive: '#f00',
				colorSelected: '#f00'
			},
			animation: true,
			cancel: {
				text: '取消',
				size: 12,
				w: 90,
				h: 35,
				bg: '#fff',
				bgActive: '#ccc',
				color: '#888',
				colorActive: '#fff'
			},
			ok: {
				text: '确定',
				size: 12,
				w: 90,
				h: 35,
				bg: '#fff',
				bgActive: '#ccc',
				color: '#888',
				colorActive: '#fff'
			},
			title: {
				text: '请选择',
				size: 12,
				h: 44,
				bg: '#eee',
				color: '#888'
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
				$('#city').text(_text);
				console.log(_id);
			}
		});
	};

	$('#btn').on('click', getCity);

	app.ready(function() {


	});
});