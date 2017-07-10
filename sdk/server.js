/*
 * name: server
 * version: 0.5.0
 * update: bug fix/ add openSelecter
 * date: 2017-04-28
 */

define(function(require, exports, module) {
	"use strict";
	var $ = app.util;
	var etpl = require('etpl');
	//资源路径处理
	var _source = function(source, host) {
		if (!$.trim(source)) {
			return "";
		}
		host = host && host.split ? host : appcfg.host.source;
		if (/^([\w-]+:)?\/\/([^\/]+)/.test(source)) {
			//source = host + source.replace(/^([\w-]+:)?\/\/([^\/]+)/,'');
		} else {
			source = host + source;
		}
		return source.replace(/\\/g, '/');
	};
	//时间格式处理
	var _getDate = function(source, ignore_minute, logfunction) {
		var myDate;
		var separate = '-';
		var minute = '';
		if (source === void(0)) {
			source = new Date();
		}
		logfunction && logfunction(source);
		if (source.split) {
			source = source.replace(/\-/g, '/');
		} else if (isNaN(parseInt(source))) {
			source = source.toString().replace(/\-/g, '/');
		} else {
			source = new Date(source);
		}
		logfunction && logfunction(source);
		if (new Date(source) && (new Date(source)).getDate) {
			myDate = new Date(source);
			logfunction && logfunction(myDate);
			if (!ignore_minute) {
				minute = (myDate.getHours() < 10 ? " 0" : " ") + myDate.getHours() + ":" + (myDate.getMinutes() < 10 ? "0" : "") + myDate.getMinutes();
			}
			return myDate.getFullYear() + separate + (myDate.getMonth() + 1) + separate + (myDate.getDate() < 10 ? '0' : '') + myDate.getDate() + minute;
		} else {
			return source.slice(0, 16);
		}
	};

	//日期格式化
	etpl.addFilter('date', function(source, ignore_minute) {
		return _getDate(source, ignore_minute);
	});
	//图片域名处理
	etpl.addFilter('source', function(source, host) {
		return _source(source, host);
	});
	//货币小数点
	etpl.addFilter('decimal', function(source, index) {
		var num = parseFloat(source),
			i = index ? index : 1;
		if (isNaN(num)) {
			return source;
		}
		return num.toFixed(i);
	});

	//退出登录
	var _logout = function() {
		app.storage.remove('user');
		//注销推送
		var ajpush = api.require('ajpush');
		ajpush.bindAliasAndTags({
			alias: '',
			tags: []
		}, function(ret) {
			if (ret.statusCode) {
				console.log('推送已注销');
			}
		});
		app.openView({
			closeback: true
		}, 'member', 'login');

	};

	//存储用户信息
	var _initUser = function(userData) {
		if (!userData) {
			return app.toast('初始化用户信息失败');
		}
		if (userData.photo && ($.trim(userData.photo) === '')) {
			userData.photo = '';
		} else {
			userData.photo = _source(userData.photo);
		}
		// if ($.trim(userData.nowScore) === '') {
		// 	userData.nowScore = 0;
		// }
		if ($.trim(userData.realName) === '') {
			userData.realName = '';
		}
		app.storage.val('user', userData);
		//app初始化
		app.storage.val('appInit', 1);
		//注册推送
		if (userData.tag) {
			var ajpush = api.require('ajpush');
			ajpush.bindAliasAndTags({
				alias: "user_" + userData.id,
				tags: userData.tag.split(',')
			}, function(ret) {
				if (ret.statusCode) {
					console.log("user_" + userData.id + "成功注册推送");
				}
			});
		}

	};
	//推送开关
	var _push = {
		open: function(cb) {
			var ajpush = api.require('ajpush');
			if (ajpush) {
				ajpush.resumePush(function(ret) {
					if (typeof cb === 'function') {
						cb(ret && ret.status);
					}
				});
			} else {
				console.log('ajpush插件未就绪');
			}
		},
		close: function(cb) {
			var ajpush = api.require('ajpush');
			if (ajpush) {
				ajpush.stopPush(function(ret) {
					if (typeof cb === 'function') {
						cb(ret && ret.status);
					}
				});
			} else {
				console.log('ajpush插件未就绪');
			}
		}
	};
	//获取用户信息
	var _getUser = function(hold) {
		//测试数据
		return {
			id: "0001",
			headImg: seajs.root + '/res/img/avat.jpg',
			nickName: '珊珊',
			realName: '伐木累',
			nowScore: 99,
			mobile: '15067589521'
		};
		var _user = app.storage.val('user');
		if (!$.isPlainObject(_user)) {
			app.ready(function() {
				app.alert('请先登录！', function() {
					app.openView(null, 'member', 'login');
				}, {
					bgclose: false
				});
			});
			return {};
		}
		return _user;
	};
	//坐标反查
	var _getAddrByLoc = function(lat, lng, config) {
		var def = {
			callback: null,
			silent: false
		};
		var opt = $.extend(def, config || {});
		var map = api.require('bMap');
		var getTimeout = setTimeout(function() {
			app.loading.hide();
			app.toast('检索超时，请重试', 2000);
		}, appcfg.set.longtime);
		if (!lat || !lng) {
			return app.toast('坐标反查参数错误');
		}
		if (!opt.silent) {
			app.loading.show('正在检索地址...');
		}

		map.getNameFromCoords({
			lon: lng,
			lat: lat
		}, function(ret, err) {
			app.loading.hide();
			clearTimeout(getTimeout);
			if (err) {
				var baiduerrmap = ['', '检索词有岐义', '检索地址有岐义', '没有找到检索结果', 'key错误', '网络连接错误', '网络连接超时', '还未完成鉴权，请在鉴权通过后重试'];
				return console.log('百度坐标反查:' + baiduerrmap[err.code]);
			}
			if (ret.status) {
				opt.callback(ret);
			} else {
				app.toast('百度地图API错误', 2000);
			}
		});
	};
	//回传用户注册地
	var _uploadifyLocation = function() {
		var hasLocat;
		var userData = _getUser();
		var updateUser = function(location) {
			app.ajax({
				url: appcfg.api.uploadifyLocation,
				data: {
					"member_id": userData.id,
					"province": location.province,
					"city": location.city,
					"area": location.district
				},
				success: function(res) {
					if (res.status === 'Y') {

					} else {
						console.log('回传用户地理位置返回异常：' + res.msg);
					}
				},
				error: function(o) {
					console.log('回传用户地理位置发生错误');
				}
			});
		};
		_getLocation(function(lat, lng) {
			_getAddrByLoc(lat, lng, {
				silent: true,
				callback: function(res) {
					var location = {};
					location.lng = lng;
					location.lat = lat;
					location.province = res.province;
					location.city = res.city;
					location.district = res.district;
					location.streetName = res.streetName;
					location.streetNumber = res.streetNumber;
					updateUser(location);
				}
			});
		});
	};
	//收集信息
	var _collection = function() {
		var oldInfo = app.storage.val('DeviceInfo') || {},
			newInfo = {},
			send = function(extraParam) {
				var userData = app.storage.val('user'),
					hasChange;
				extraParam.saveDate = _getDate(false, true);
				//日期过滤
				if (oldInfo.saveDate && oldInfo.saveDate >= extraParam.saveDate) {
					return null;
				}
				//信息改变过滤
				$.each(extraParam, function(i, e) {
					if (e !== oldInfo[i]) {
						hasChange = true;
						return null;
					}
				});
				if (hasChange && $.isPlainObject(userData)) {
					app.storage.val('DeviceInfo', extraParam);
					var data = $.extend({
						member_id: userData.id
					}, extraParam);
					app.ajax({
						url: appcfg.api.loginLog,
						data: data,
						success: function(res) {

						},
						error: function() {
							console.log('回传设备信息时发生错误');
						}
					});
				}
			};
		newInfo.app_version = appcfg.set.version;
		newInfo.os = api.systemType;
		newInfo.connect_status = api.connectionType;
		newInfo.mobile_operator_name = api.operator;
		newInfo.model = api.deviceModel;
		_getLocation(function(lat, lng) {
			newInfo.latitude = lat;
			newInfo.longitude = lng;
			send(newInfo);
		}, function() {
			send(newInfo);
		});
	};

	//数据预取
	var _preGet = function(cb) {
		var got = 0,
			preGetList = _preGet.prototype.preGetList,
			getOne = function() {
				got++;
				if (got >= preGetList.length && typeof(cb) === 'function') {
					cb();
					got = null;
					getOne = null;
					preGetList = null;
				}
			};

		//开始加载
		$.each(preGetList, function(i, e) {
			app.ajax({
				url: e.url,
				data: e.data,
				success: function(res) {
					getOne();
					if (res.status === 'Y') {
						var data = res.data;
						if (data.split) {
							data = JSON.parse(data);
						}
						app.storage.val(e.key, data);
					}
				},
				error: function() {}
			});
		});
	};
	_preGet.prototype.preGetList = [];
	//预取配置信息
	_preGet.prototype.preGetList.push({
		key: 'websiteConfig',
		url: appcfg.api.websiteConfig,
		data: {}
	});

	//预取数据
	var _checkPreget = function() {
		var preGetList = _preGet.prototype.preGetList,
			isDone = true;
		$.each(preGetList, function(i, e) {
			if (!app.storage.val(e.key)) {
				_preGet();
				isDone = false;
				return false;
			}
		});
		return isDone;
	};
	//检查升级
	var _checkUpdate = function(platform, silence) {
		var mam = api.require('mam');
		
		mam.checkUpdate(function(ret, err) {
			if (ret) {
				var result = ret.result;
				if (result.update === true && result.closed === false) {
					app.confirm(ret.updateTip, function() {
						if (platform == 'ios') {
							api.installApp({
								appUri: result.source
							});
						} else if (platform == 'android') {
							api.download({
								url: result.source,
								report: true
							}, function(ret, err) {
								if (ret && 0 === ret.state) { /* 下载进度 */
									app.toast("正在下载:" + ret.percent + "%", 1000);
								}
								if (ret && 1 === ret.state) { /* 下载完成 */
									var savePath = ret.savePath;
									api.installApp({
										appUri: savePath
									});
								}
							});
						}
					}, null, {
						bar: true,
						title: '升级到 V' + result.version
					});
				} else if (!silence) {
					app.alert("暂无更新");
				}
			} else if (!silence) {
				app.alert(err.msg);
			}
		});
	};
	//获取地理位置
	var _getLocation = function(callback, errcb) {
		var bMap = api.require('bMap');
		var chaoshi = setTimeout(function() {
			app.loading.hide();
			bMap.stopLocation();
			if (app.storage.val('gps')) {
				var gpsCache = app.storage.val('gps');
				if (typeof(callback) === 'function') {
					callback(gpsCache.lat, gpsCache.lng);
				}
				console.log('定位超时，使用缓存数据');
			} else {
				if (typeof(errcb) === 'function') {
					errcb();
				} else {
					app.toast('GPS定位超时！', 1000);
				}
			}
		}, appcfg.set.outime);
		bMap.getLocation({
			accuracy: '10m',
			autoStop: true,
			filter: 1
		}, function(ret, err) {
			app.loading.hide();
			if (ret && ret.status) {
				chaoshi = clearTimeout(chaoshi);
				if(ret.lat && ret.lon){
					app.storage.val('gps', {
						lat: ret.lat,
						lng: ret.lon
					});
				}else{
					console.log('bMap.getLocation定位异常');
				}
				bMap.stopLocation();
				if (typeof(callback) === 'function') {
					callback(ret.lat, ret.lon);
				}
			} else {
				if (typeof(errcb) === 'function') {
					errcb();
				} else {
					app.toast('GPS定位失败：' + JSON.stringify(err) );
				}
			}
		});
	};
	//指定DOM打开地图
	var _openBaiduMap = function(dom, data, refresh) {
		if (!$.isPlainObject(data) || !data.longitude || !data.latitude) {
			return app.toast('参数缺失，无法打开地图');
		}
		var bdMapParam = {
			lat: data.latitude,
			lng: data.longitude
		};
		app.storage.val('bdMapData', bdMapParam);
		if (refresh) {
			app.window.evaluate('', 'bdMapView', 'refresh()');
		} else {
			setTimeout(function() {
				var offset = $("#" + dom)[0].getBoundingClientRect();
				app.window.popoverElement({
					id: dom,
					name: 'bdMapView',
					url: seajs.root + '/view/common/baiduMap/temp.html',
					top: parseInt(window.selfTop) + offset.top,
					bounce: false
				});
			}, 0);
		}
	};
	//公用模板
	var _commonTemp = function(tempName, data) {
		var templateCache = app.storage.val('templateCache') || {};
		if (!data) {
			data = {};
		}
		if(templateCache[tempName]){
			return templateCache[tempName];
		}
		var etplEngine = new etpl.Engine();
		var template = api.readFile({
			sync: true,
			path: seajs.root + '/res/temp/template.html'
		});
		etplEngine.compile(template);
		var Render = etplEngine.getRenderer(tempName);
		if(Render){
			var html = Render(data);
			templateCache[tempName] = html;
			app.storage.val('templateCache', templateCache);
			return html;
		} else {
			console.log('找不到指定模板：' + tempName);
		}
	};

	var cacheImg = function(element, callback) {
		var placeholderPic = seajs.root + '/res/img/placeholder.jpg';
		var remoteEle;
		if ($(element)[0].getAttribute('data-remote')) {
			remoteEle = $(element);
		} else {
			remoteEle = $(element)[0].querySelectorAll('[data-remote]');
		}
		app.ready(function() {
			var cacheCount = 0;
			$.each(remoteEle, function(i, ele) {
				var remote = ele.getAttribute('data-remote') || placeholderPic;
				api.imageCache({
					url: remote,
					policy: "cache_else_network"
				}, function(ret, err) {
					var url = ret.url;
					if (ele.tagName.toLowerCase() === 'img') {
						ele.setAttribute('src', url);
					} else {
						ele.style.backgroundImage = "url(" + url + ")";
					}
					ele.removeAttribute('data-remote');
					cacheCount++;
					if(cacheCount===remoteEle.length){
						typeof callback === 'function' && callback();
					}
				});
			});
		});
		return remoteEle;
	};
	module.exports = {
		logout: _logout,
		initUser: _initUser,
		getUser: _getUser,
		push: _push,
		preGet: _preGet,
		checkPreget: _checkPreget,
		source: _source,
		getDate: _getDate,
		checkUpdate: _checkUpdate,
		uploadifyLocation: _uploadifyLocation,
		openBaiduMap: _openBaiduMap,
		commonTemp: _commonTemp,
		getAddrByLoc: _getAddrByLoc,
		getLocation: _getLocation,
		collection: _collection,
		cacheImg: cacheImg
	};
});