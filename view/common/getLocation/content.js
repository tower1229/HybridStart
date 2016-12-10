/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	require('box');
	//重新定义html字号
	if (/Android (\d+\.\d+)/.test(navigator.userAgent)) {
      var version = parseFloat(RegExp.$1);
      var winWidth = Math.min($('body').width(),360);
      if (version /*< 4.4*/) {
        var phoneScale = winWidth / 640;
        var rootSize = parseInt(phoneScale * 100) + 'px';
        document.documentElement.style.fontSize = rootSize;
      }
    }

	var map, userMark, location = {};
	app.loading.show('定位中...');
	var saveDataAndClose = function(){
		app.ls.val('location', JSON.stringify(location));
		setTimeout(function() {
			app.window.evaluateScript('', 'app.window.close();')
		}, 0);
	}
	//确定
	window.submitLoc = function() {
		var inuts = $('#addrText').add($('#addrProv')).add($('#addrCity')).add($('#addrArea'));
		var emptyInp = 0;
		var valCache;
		$.each(inuts,function(i,e){
			if(e.tagName.toLowerCase()=='input'){
				valCache = $(e).val()
			}else{
				valCache = $(e).text();
			}
			if(!$.trim(valCache)){
				emptyInp++;
			}
		});
		if(emptyInp){
			return app.window.openToast('请选择或填写详细地址！',1000);
		}
		//重新获取location数据
		location.province = $('#addrProv').text();
		location.city = $('#addrCity').text();
		location.district = $('#addrArea').text();
		location.formatted_address = location.formatted_address || location.province+location.city+location.district+$('#addrText').val();
		if (location.city && location.formatted_address) {
			if (location.lng && location.lat) {
				saveDataAndClose();
			} else {
				app.loading.show('正在反查经纬度');
				$.ajax({
					url: 'http://api.map.baidu.com/geocoder/v2/',
					dataType: 'jsonp',
					data: {
						ak: appcfg.plugin.bdmap.key,
						output: 'json',
						address: location.formatted_address,
						city: location.city
					},
					success: function(res) {
						app.loading.hide();
						if(res.status==0){
							var _loca = res.result.location;
							location.lng = _loca.lng;
							location.lat = _loca.lat;
							saveDataAndClose();
						}else{
							app.window.openToast('baiduMap API错误,code:'+res.status,2000);
						}
					}
				});
			}
		} else {
			$.box.alert('地址无效，请重新选择！');
		}
		inuts = emptyInp = valCache = null;
	};
	//地址反查回调
	var getLocCb = function(res){
		app.loading.hide();
		var locObj = res.result.addressComponent;
		$('#addrText').val(locObj.street+locObj.street_number);
		$('#addrProv').text(locObj.province);
		$('#addrCity').text(locObj.city);
		$('#addrArea').text(locObj.district);
		location.lng = lng;
		location.lat = lat;
		location.country = locObj.country;
		location.province = locObj.province;
		location.city = locObj.city;
		location.district = locObj.district;
		location.formatted_address = res.result.formatted_address;
		location.street = locObj.street;
		location.street_number = locObj.street_number;
	}
	var userDrag = function() {
		userMark.enableDragging();
		userMark.addEventListener("dragend", function(e) {
			//获取拖拽坐标
			location.lng = e.point.lng;
			location.lat = e.point.lat;
			comm.getAddrByLoc(location.lat, location.lng, {
				callback:getLocCb
			});
		});
	}
	
	var getLoc = function() {
		//获取地址
		comm.getLocation(function(lat, lng){
			var point = new BMap.Point(lng, lat);
			map.panTo(point);
			userMark = new BMap.Marker(point);
			map.addOverlay(userMark);
			userDrag();
			//gps坐标反查
			comm.getAddrByLoc(lat, lng, {
				callback:getLocCb
			});
		});
	}
	

	app.ready(function() {
		app.getScript('http://api.map.baidu.com/getscript?v=2.0&ak=' + appcfg.plugin.bdmap.key, function() {
			map = new BMap.Map("bdMap");
			var point = new BMap.Point(116.404, 39.915);
			map.centerAndZoom(point, appcfg.plugin.bdmap.zoomLeval);
			getLoc();
		});
		//选择省市
		if (window.uexAreaPickerView) {
			$('#choosePC').on('click', function(e) {
				e.preventDefault();
				uexAreaPickerView.open();
			});
			uexAreaPickerView.onConfirmClick = function(json) {
				var areaStr = $.isPlainObject(json) ? json.city : JSON.parse(json).city,
					areaArr = areaStr.split(' ');
				//处理两位地址
				if(areaArr[2]==""){
					areaArr[2] = areaArr[1];
					areaArr[1] = areaArr[0];
				}

				$('#addrText').val('');
				$('#addrProv').text(areaArr[0]);
				$('#addrCity').text(areaArr[1]);
				$('#addrArea').text(areaArr[2]);
				location.province = areaArr[0];
				location.city = areaArr[1];
				location.district = areaArr[2];
				location.formatted_address = '';
				location.street = '';
				location.street_number = '';
				location.lng = '';
				location.lat = '';
				uexAreaPickerView.close();
			}
		}
	});
});