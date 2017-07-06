/*
 * name: paging-load.js
 * version: v0.1.0
 * update: load()支持回调
 * date: 2017-05-10
 */
define('paging-load', function(require, exports, module) {
	"use strict";
	var $ = app.util,
		def = {
			url: null,
			size: 6,
			data: {},
			success: null,
			nomore: null,
			error: null
		},
		loadProcess = [],
		newGetPage = function() {
			var loadPage = 0,
				func = function(pullback) {
					if (pullback) {
						return --loadPage;
					}
					return ++loadPage;
				};
			return func;
		},
		pagingLoad = function(option) {
			var opt = $.extend({}, def, option || {}),
				sendParam = $.extend(true, {}, opt.data),
				trueUrl;
			if (!opt.url) {
				return console.warn('toload()参数缺少url');
			}
			trueUrl = opt.url + '?' + (function(string){
				var param = [];
				$.each(string, function(i, e){
					param.push(i + '=' + e);
				});
				return param.join('&');
			})(opt.data);
			var init = function() {
				var i = 0,
					n = loadProcess.length,
					getPage;
				for (; i < n; ++i) {
					if (loadProcess[i].url == trueUrl) {
						getPage = loadProcess[i].getPage;
						break;
					}
				}
				if (!getPage) {
					getPage = newGetPage();
					loadProcess.push({
						url: trueUrl,
						getPage: getPage
					});
				}
				return getPage;
			};

			return {
				load: function(cb) {
					var Ajax = app.ajax;
					sendParam.page_index = init()();
					sendParam.page_size = opt.size;
					Ajax({
						url: opt.url,
						data: sendParam,
						dataType: opt.dataType || 'json',
						success: function(res) {
							if ($.isPlainObject(res) && res.status === 'Y' || (res && opt.dataType != 'json')) {
								typeof(opt.success) === 'function' && opt.success(res);
								if ($.isPlainObject(res) && res.data && res.count) {
									var listLength = res.data.split ? JSON.parse(res.data).length : res.data.length;
									if (listLength + sendParam.page_size * (sendParam.page_index - 1) >= parseInt(res.count)) {
										typeof(opt.nomore) === 'function' && opt.nomore();
									}
								}
							} else {
								console.log('数据异常页码回退');
								getPage(true);
								typeof(opt.success) === 'function' && opt.success(res);
							}
							typeof(cb) === 'function' && cb();
						}
					});
				},
				reload: function(hold) {
					var i = 0,
						n = loadProcess.length,
						thisProcessIndex;
					for (; i < n; ++i) {
						if (loadProcess[i].url == trueUrl) {
							thisProcessIndex = i;
							break;
						}
					}
					if (thisProcessIndex !== void 0) {
						loadProcess.splice(thisProcessIndex, 1);
					} else if (hold) {
						console.warn('reload():找不到paging-load进程');
					}
					if (!hold) {
						this.load();
					}
				},
				destroy: function() {
					this.reload(true);
					delete this.load;
					delete this.reload;
					delete this.destroy;
				}
			};
		};

	module.exports = pagingLoad;
});