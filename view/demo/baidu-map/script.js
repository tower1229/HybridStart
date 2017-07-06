/*
 * layout
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var $ = app.util;

	var headHeight = $('.head')[0].getBoundingClientRect().height;
	
	app.ready(function() {
		app.loading.show('正在定位');
		comm.getLocation(function(lat, lng) {
			app.loading.hide();
			//使用定位打开百度地图
			comm.openBaiduMap('View', {
				longitude: lng,
				latitude: lat
			});
		}, function() {
			//定位失败
			var map = api.require('bMap');
			map.open({
				rect: {
					x: 0,
					y: headHeight,
					h: headHeight * 10
				},
				center: {
					lon: 116.4021310000,
					lat: 39.9994480000
				},
				zoomLevel: 14,
				showUserLocation: false,
				fixed: false
			});
		});


		app.subscribe('baiduMapDragPosition', function(ret) {
			console.log(JSON.stringify(ret));
		});

	});
});