/*
 * name: server
 * version: 0.5.0
 * update: bug fix/ add openSelecter
 * date: 2017-04-28
 */

define(function(require, exports, module) {
	"use strict";
	require('box');
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
	//xss过滤
	etpl.addFilter('xss', function(source) {
		return _xss(source);
	});
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

	etpl.addFilter('richMedia', function(source, replace) {
		return _richMedia(source, replace);
	});
	//xss过滤
	var _xss = function(source) {
		var ignoreStyle = ['text-align: center;', 'text-indent: 2em;'];
		return filterXSS(source, {
			onIgnoreTagAttr: function(tag, name, value, isWhiteAttr) {
				var result = '';
				if (tag == 'table' && name == 'class') {
					result += ('class="' + value + ' table-bordered"');
				}
				if (name == 'style') {
					var _styleStr = '';
					$.each(ignoreStyle, function(i, e) {
						if (value.indexOf(e) > -1) {
							_styleStr += e;
						}
					});
					if ($.trim(_styleStr)) {
						result += (' style="' + _styleStr + '"');
					}
				}
				return result;
			}
		});
	};
	//富媒体消息解析
	var _richMedia = function(source, replace) {
		var checkImg = function(source) {
			var dom = $.parseHTML(source),
				result = "";
			$(dom).find('img').addClass('ableOpenImg');
			$(dom).each(function(i, e) {
				if ($.trim(e.innerHTML)) {
					result += e.outerHTML;
				}
			});
			//console.log(result)
			return result;
		};
		var checkLink = function(source) {
			var dom = $.parseHTML(source),
				result = "";
			$(dom).find('a[href]').each(function(i, e) {
				var url = $(e).attr('href');
				if (url.indexOf('http') === 0) {
					$(e).removeAttr('href').addClass('openView').attr('data-view', '2,' + url);
				}

			});
			$(dom).each(function(i, e) {
				if ($.trim(e.innerHTML)) {
					result += e.outerHTML;
				}
			});
			//console.log(result)
			return result;
		};
		var checkTel = function(source) {
			if (replace) {
				replace = '【电话】';
			}
			var img = /\[tel\](.*?)\[tel\]/,
				res,
				check = function() {
					if (img.test(source)) {
						res = img.exec(source);
						source = source.replace(res[0], replace ? replace : '<a href="tel:' + res[1] + '" class="btn btn-link">' + res[1] + '</a>');
						check(source);
					}
				};
			check(source);
			return source;
		};
		var _;
		_ = checkImg(source);
		_ = checkLink(_);
		_ = checkTel(source);
		return _;
	};

	//退出登录
	var _logout = function() {
		app.ls.remove('user');
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
			return box.msg('初始化用户信息失败');
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
		app.ls.val('user', JSON.stringify(userData));
		//app初始化
		app.ls.val('appInit', 1);
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
		var _user = app.ls.val('user');
		if (_user) {
			_user = JSON.parse(_user);
		} else if (!hold) {
			app.ready(function() {
				box.alert('请先登录！', function() {
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
			app.openToast('检索超时，请重试', 2000);
		}, appcfg.set.longtime);
		if (!lat || !lng) {
			return app.openToast('检索错误');
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
				return app.log('百度坐标反查:' + baiduerrmap[err.code]);
			}
			if (ret.status) {
				opt.callback(ret);
			} else {
				app.openToast('百度地图API错误', 2000);
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
						app.log('回传用户地理位置返回异常：' + res.msg);
					}
				},
				error: function(o) {
					app.log('回传用户地理位置发生错误');
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
		var oldInfo = JSON.parse(app.ls.val('DeviceInfo')) || {},
			newInfo = {},
			send = function(extraParam) {
				var userData = JSON.parse(app.ls.val('user')),
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
					app.ls.val('DeviceInfo', JSON.stringify(extraParam));
					var data = $.extend({
						member_id: userData.id
					}, extraParam);
					app.ajax({
						url: appcfg.api.loginLog,
						data: data,
						success: function(res) {

						},
						error: function() {
							app.log('回传设备信息时发生错误');
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
						app.ls.val(e.key, JSON.stringify(data));
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
			if (!app.ls.val(e.key)) {
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
		var box = require('box');
		mam.checkUpdate(function(ret, err) {
			if (ret) {
				var result = ret.result;
				if (result.update === true && result.closed === false) {
					var uploadbox = box.confirm(ret.updateTip, function() {
						box.hide(uploadbox);
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
									app.openToast("正在下载:" + ret.percent + "%", 1000);
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
				} else if(!silence){
					box.alert("暂无更新");
				}
			} else if(!silence){
				box.alert(err.msg);
			}
		});
	};
	//获取地理位置
	var _getLocation = function(callback, errcb) {
		var bMap = api.require('bMap');
		var chaoshi = setTimeout(function() {
			app.loading.hide();
			bMap.stopLocation();
			if (app.ls.val('gps')) {
				var gpsCache = JSON.parse(app.ls.val('gps'));
				if (typeof(callback) === 'function') {
					callback(gpsCache.lat, gpsCache.lng);
				}
			} else {
				if (errcb && typeof(errcb) === 'function') {
					errcb();
				} else {
					app.openToast('GPS定位超时！', 1000);
				}
			}
		}, appcfg.set.outime);
		bMap.getLocation({
			accuracy: '100m',
			autoStop: true,
			filter: 1
		}, function(ret, err) {
			if (ret) {
				clearTimeout(chaoshi);
				chaoshi = null;
				app.ls.val('gps', JSON.stringify({
					lat: ret.lat,
					lng: ret.lon
				}));
				app.loading.hide();
				bMap.stopLocation();
				if (typeof(callback) === 'function') {
					callback(ret.lat, ret.lon);
				}
			} else {
				app.log('getLocation()定位失败');
			}
		});
	};
	//指定DOM打开地图
	var _openBaiduMap = function(dom, data, refresh) {
		if (!$.isPlainObject(data) || !data.longitude || !data.latitude) {
			return app.openToast('参数缺失，无法打开地图');
		}
		var bdMapParam = {
			lat: data.latitude,
			lng: data.longitude
		};
		app.ls.val('bdMapData', JSON.stringify(bdMapParam));
		if (refresh) {
			app.window.evaluatePopoverScript('', 'bdMapView', 'refresh()');
		} else {
			setTimeout(function() {
				app.window.popoverElement({
					id: dom,
					name: 'bdMapView',
					url: seajs.root + '/view/common/baiduMap/temp.html',
					top: parseInt(window.selfTop) + $("#" + dom).offset().top,
					bounce: false
				});
			}, 0);
		}
	};
	//公用模板
	var _commonTemp = function(tempName, data) {
		if (!data) {
			data = {};
		}
		var etplEngine = new etpl.Engine();
		var template = $.trim(app.ls.val('template'));
		if (!template) {
			template = api.readFile({
				sync: true,
				path: seajs.root + '/res/temp/template.html'
			});
			app.ls.val('template', template);
		}
		etplEngine.compile(template);
		var Render = etplEngine.getRenderer(tempName);
		var Html = Render(data);
		return Html;
	};

	//日期天数计算:timeCalculator(new Date(),-15);
	var timeCalculator = function(date, day) {
		var nowms = Date.parse(date.toString());
		var dayms = day * 1000 * 60 * 60 * 24;
		var result = new Date(nowms + dayms);
		//console.log(result)
		return result;
	};

	//浮点数乘法
	function _accMul(arg1, arg2) {
		var m = 0,
			s1 = arg1.toString(),
			s2 = arg2.toString();
		try {
			m += s1.split(".")[1].length;
		} catch (e) {}
		try {
			m += s2.split(".")[1].length;
		} catch (e) {}
		return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
	}
	//封装选择器
	var openSelector = function(items, onSelect) {
		app.ready(function() {
			var UIMultiSelector = api.require('UIMultiSelector');
			UIMultiSelector.open({
				rect: {
					h: Math.min(items.length * 51 + 2, 300)
				},
				text: {
					leftBtn: '', //取消
					rightBtn: '' //完成
				},
				singleSelection: true,
				styles: {
					mask: 'rgba(0,0,0,0)',
					leftButton: {
						bg: '#f08300',
						w: 80,
						h: 32,
						marginT: 5,
						marginL: 8,
						color: '#ffffff',
						size: 14
					},
					rightButton: {
						bg: '#f08300',
						w: 80,
						h: 32,
						marginT: 5,
						marginR: 8,
						color: '#ffffff',
						size: 14
					},
					title: {
						h: 2,
						bg: "#38adff"
					},
					item: {
						active: "38adff",
						bgActive: '#ddd',
						lineColor: '#ccc',
						bgHighlight: '#eee',
						h: 50,
						size: 16,
						color: "#555"
					}
				},
				animation: false,
				items: items
			}, function(ret, err) {
				if (ret) {
					switch (ret.eventType) {
						case 'clickLeft':
							UIMultiSelector.close();
							break;
						case 'clickRight':
							UIMultiSelector.close();
							break;
						case 'clickItem':
							var _theitem = ret.items[0];
							if (typeof onSelect === 'function') {
								onSelect(_theitem);
							}

							UIMultiSelector.close();
							break;
						default:

					}
				} else {
					alert(JSON.stringify(err));
				}
			});
		});
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
		richMedia: _richMedia,
		xss: _xss,
		uploadifyLocation: _uploadifyLocation,
		openBaiduMap: _openBaiduMap,
		commonTemp: _commonTemp,
		getAddrByLoc: _getAddrByLoc,
		getLocation: _getLocation,
		collection: _collection,
		accMul: _accMul,
		openSelector: openSelector
	};
});