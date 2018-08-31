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
	var source = function(source, host) {
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
	//图片域名处理
	etpl.addFilter('source', function(source, host) {
		return source(source, host);
	});
	//时间格式处理
	var getDate = function(source, ignore_minute, logfunction) {
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

	//退出登录
	var logout = function() {
		app.storage.remove('user');
		//注销推送
		try {
			var ajpush = api.require('ajpush');
			ajpush.bindAliasAndTags({
				alias: '',
				tags: []
			}, function(ret) {
				if (ret.statusCode) {
					console.log('推送已注销');
				}
			});
		} catch (e) {
			console.log(e.message)
		}
		app.openView({
			closeback: true
		}, 'member', 'login');

	};

	//存储用户信息
	var initUser = function(userData) {
		if (!userData) {
			return app.toast('初始化用户信息失败');
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
			}, function(ret, err) {
				if (ret) {
					console.log("user_" + userData.id + "成功注册推送");
				} else {
					console.log(JSON.stringify(err));
				}
			});
		}
	};
	//推送开关
	var push = {
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
	var getUser = function(hold) {
		var _user = app.storage.val('user');
		if (!$.isPlainObject(_user) && !hold) {
			app.alert('请先登录！', function() {
				app.openView({
					closeback: true
				}, 'member', 'login');
			}, {
				bgclose: false
			});
			return null;
		}
		return _user;
	};
	//坐标反查
	var getAddrByLoc = function(lat, lng, config) {
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

	//预取队列
	var preGetList = [{
		key: 'preget-test',
		url: 'http://rap2api.taobao.org/app/mock/3567/return/Yes',
		data: {}
	}];
	//数据预取
	var preGet = function(callback) {
		var got = 0,
			resolved = function() {
				got++;
				if (got >= preGetList.length) {
					got = null;
					resolved = null;
					if(typeof(callback) === 'function'){
						callback();
					}
				}
			},
			checkPreget = function() {
				var hasResolved = true;
				$.each(preGetList, function(i, e) {
					if (!app.storage.val(e.key)) {
						return hasResolved = false;
					}
				});
				return hasResolved;
			};
		if(checkPreget()){
	        if (typeof(callback) === 'function') {
	    	    return callback();
	    	} 
	    }else{
	        $.each(preGetList, function(i, e) {
	    		app.ajax({
	    			url: e.url,
	    			data: e.data,
	    			success: function(res) {
	    				if (res) {
	    					app.storage.val(e.key, res);
	    				}
	    				resolved();
	    			},
	    			error: function() {}
	    		});
	    	});
	    }
	};
	

	//检查升级
	var checkUpdate = function(silence) {
		var mam = api.require('mam');
		var platform = api.systemType;
		mam.checkUpdate(function(ret, err) {
			if (ret) {
				var result = ret.result;
				if (result.update === true && result.closed === false) {
					app.confirm(result.updateTip, function() {
						if (platform == 'ios') {
							api.installApp({
								appUri: result.source
							});
						} else if (platform == 'android') {
							app.loading.show('正在下载');
							api.download({
								url: result.source,
								report: true
							}, function(ret, err) {
								if (ret && 1 === ret.state) { /* 下载完成 */
									app.loading.hide();
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
	var getLocation = function(callback, errcb) {
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
				if (ret.lat && ret.lon) {
					app.storage.val('gps', {
						lat: ret.lat,
						lng: ret.lon
					});
				} else {
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
					app.toast('GPS定位失败：' + JSON.stringify(err));
				}
			}
		});
	};
	//指定DOM打开地图
	var openBaiduMap = function(dom, data, refresh) {
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
	var commonTemp = function(tempName, data) {
		var templateCache = app.storage.val('templateCache') || {};
		if (!$.isPlainObject(data)) {
			data = {};
		}
		if (templateCache[tempName + JSON.stringify(data)]) {
			return templateCache[tempName + JSON.stringify(data)];
		}
		var etplEngine = new etpl.Engine();
		var template = api.readFile({
			sync: true,
			path: 'widget://res/temp/template.txt'
		});
		etplEngine.compile(template);
		var Render = etplEngine.getRenderer(tempName);
		if (Render) {
			var html = Render(data);
			templateCache[tempName + JSON.stringify(data)] = html;
			app.storage.val('templateCache', templateCache);
			return html;
		} else {
			console.log('找不到指定模板：' + tempName);
		}
	};

	var cacheImg = function(element, callback) {
		var remoteEle;
		var cacheCount = 0;
		var setImg = function(ele, url){
			if (ele.tagName.toLowerCase() === 'img') {
				ele.setAttribute('src', url);
			} else {
				ele.style.backgroundImage = "url(" + url + ")";
			}
			ele.removeAttribute('data-remote');
			cacheCount++;
			if (cacheCount === remoteEle.length) {
				typeof callback === 'function' && callback();
			}
		};
		if ($(element)[0].getAttribute('data-remote')) {
			remoteEle = $(element);
		} else {
			remoteEle = $(element)[0].querySelectorAll('[data-remote]');
		}
		app.ready(function() {
			$.each(remoteEle, function(i, ele) {
				var remote = ele.getAttribute('data-remote');
				if(remote){
					api.imageCache({
						url: remote
					}, function(ret, err) {
						setImg(ele, ret.url);
					});
				}else{
					setImg(ele, remote);
				}
			});
		});
		return remoteEle;
	};

	module.exports = {
		logout: logout,
		initUser: initUser,
		getUser: getUser,
		push: push,
		preGet: preGet,
		source: source,
		getDate: getDate,
		checkUpdate: checkUpdate,
		openBaiduMap: openBaiduMap,
		commonTemp: commonTemp,
		getAddrByLoc: getAddrByLoc,
		getLocation: getLocation,
		cacheImg: cacheImg
	};
});