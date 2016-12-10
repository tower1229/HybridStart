/*
 * layout
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');

	app.ready(function() {
		app.loading.show('正在定位');
		comm.getLocation(function(lat, lng) {
			app.loading.hide();
			//查附近
			var map = api.require('bMap');
			map.searchNearby({
				keyword: '公司',
				lon: lng,
				lat: lat,
				radius: 1000,
				pageCapacity: 10
			}, function(ret, err) {
				if (ret.status) {
					console.log(JSON.stringify(ret));
				} else {
					alert(JSON.stringify(err));
				}
			});
			//打开百度地图
			comm.openBaiduMap('View', {
				longitude: lng,
				latitude: lat
			});
		});


		app.window.subscribe('baiduMapDragPosition', function(ret) {
			console.log(JSON.stringify(ret));
		});

	});
});