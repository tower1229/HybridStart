/**
 * 
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;
	var base = require('base');
	
	var bdMapData = app.storage.val('bdMapData');

	if (!bdMapData || !bdMapData['lng'] || !bdMapData['lat']) {
		return alert('bdMap参数缺失');
	}

	window.refresh = function() {
		openMap(true);
	};

	app.ready(function() {
		var map = api.require('bMap'),
			userMark = [];
		var addMark = function() {
			var _uid = base.getUID();
			userMark.push(_uid);
			map.addAnnotations({
				annotations: [{
					id: _uid,
					lon: bdMapData.lng,
					lat: bdMapData.lat
				}],
				draggable: true
			}, function(ret) {
				if (ret) {
					if(ret.eventType==='drag' && ret.dragState==='ending'){
						map.getAnnotationCoords({
						    id: _uid
						}, function(ret) {
						    if (ret) {
						        //console.log(JSON.stringify(ret));
						        app.publish('baiduMapDragPosition',ret);
						    }
						});
					}
				}
			});
		};

		var drawMap = function() {
			map.open({
				rect: {
					x: 0,
					y: 0
				},
				center: {
					lon: bdMapData.lng,
					lat: bdMapData.lat
				},
				zoomLevel: appcfg.plugin.bdmap.zoomLeval,
				showUserLocation: false,
				fixedOn: api.frameName,
				fixed: false
			}, function(ret) {
				if (ret.status) {
					addMark();
				}
			});

		};

		var openMap = function(refresh) {
			if (refresh) {
				bdMapData = app.storage.val('bdMapData');
				if (userMark.length) {
					map.removeAnnotations({
						ids: userMark
					});
					userMark = [];
				}
				map.setCenter({
					coords: {
						lon: bdMapData.lng,
						lat: bdMapData.lat
					},
					animation: false
				});
				setTimeout(function() {
					addMark();
				}, 0);
			} else {
				drawMap();
			}
		};

		openMap();

	});
});