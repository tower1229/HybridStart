/*
 * name: base
 * version: 3.3.2
 * update: url.set() bug
 * date: 2017-04-20
 */
define('base', function(require, exports, module) {
	'use strict';
	var $ = require('jquery');

	var getUID = function() {
		var maxId = 65536;
		var uid = 0;
		return function() {
			uid = (uid + 1) % maxId;
			return uid;
		};
	}();

	var getUUID = function(len) {
		len = len || 6;
		len = parseInt(len, 10);
		len = isNaN(len) ? 6 : len;
		var seed = "0123456789abcdefghijklmnopqrstubwxyzABCEDFGHIJKLMNOPQRSTUVWXYZ";
		var seedLen = seed.length - 1;
		var uuid = "";
		while (len--) {
			uuid += seed[Math.round(Math.random() * seedLen)];
		}
		return uuid;
	};

	var getIndex = function() {
		return 99 + getUID();
	};

	var deepcopy = function(source) {
		var sourceCopy = source instanceof Array ? [] : {};
		for (var item in source) {
			sourceCopy[item] = typeof source[item] === 'object' ? deepcopy(source[item]) : source[item];
		}
		return sourceCopy;
	};

	/*
	 * 函数节流
	 * @method: 函数体; @delay: 过滤执行间隔; @duration: 至少执行一次的间隔
	 */
	var _throttle = function throttle(method, delay, duration) {
		var timer = null,
			begin = new Date();
		delay = delay ? delay : 64;
		duration = duration ? duration : 640;
		return function() {
			var context = this,
				args = arguments,
				current = new Date();
			clearTimeout(timer);
			if (current - begin >= duration) {
				method.apply(context, args);
				begin = current;
			} else {
				timer = setTimeout(function() {
					method.apply(context, args);
				}, delay);
			}
		};
	};
	var support3d = function() {
		var el = document.createElement('p'),
			has3d,
			transforms = {
				'webkitTransform': '-webkit-transform',
				'OTransform': '-o-transform',
				'msTransform': '-ms-transform',
				'MozTransform': '-moz-transform',
				'transform': 'transform'
			};
		// Add it to the body to get the computed style.
		document.body.insertBefore(el, null);
		for (var t in transforms) {
			if (el.style[t] !== undefined) {
				el.style[t] = "translate3d(1px,1px,1px)";
				has3d = window.getComputedStyle(el).getPropertyValue(transforms[t]);
			}
		}
		document.body.removeChild(el);
		return (has3d !== undefined && has3d.length > 0 && has3d !== "none");
	};
	//getScript
	var _getScript = function(road, callback, option) {
		if (road && road.split || ($.isArray(road) && road.length)) {
			var def = {
					css: false,
					rely: false,
					beforeLoad: null
				},
				opt = $.extend({}, def, $.isPlainObject(callback) ? callback : option || {}),
				cssLoaded = false,
				loadScript = function(road, hold) {
					/*
					@road:请求url
					@hold:是否阻断默认回调，为function将阻断默认回调并执行自身
					*/
					var file = seajs.resolve(road),
						headNode = document.getElementsByTagName('head')[0],
						script = document.createElement("script"),
						scriptError = function(xhr, settings, exception) {
							headNode.removeChild(script);
							script = document.createElement("script");
							console.warn(settings.url + '加载失败，正在重试~');
							load(function() {
								console.warn(settings.url + '加载失败了!');
							});
						},
						scriptOnload = function(data, status) {
							if (!data) {
								data = status = null;
							}
							if (hold) {
								if (typeof(hold) === 'function') {
									hold();
								}
							} else if (typeof(callback) === 'function') {
								setTimeout(callback, 0);
							}
						},
						load = function(errorCallback) {
							errorCallback = errorCallback || scriptError;
							if (typeof opt.beforeLoad === 'function') {
								opt.beforeLoad();
							}
							script.type = "text/javascript";
							if (script.addEventListener) {
								script.addEventListener("load", scriptOnload, false);
							} else if (script.readyState) {
								script.onreadystatechange = function() {
									if (script.readyState == "loaded" || script.readyState == "complete") {
										script.onreadystatechange = null;
										scriptOnload();
									}
								};
							} else {
								script.onload = scriptOnload;
							}
							script.onerror = errorCallback;
							script.src = file;
							headNode.appendChild(script);
						};
					if (opt.css && !cssLoaded) {
						var cssfile = '',
							appendCss = function(href) {
								href = seajs.resolve(href).replace(/\.css\.js$/, ".css").replace(/\.js$/, ".css");
								var _css = document.createElement('link');
								_css.rel = "stylesheet";
								_css.onerror = function(e) {
									headNode.removeChild(_css);
									_css = null;
									return null;
								};
								_css.href = href;
								headNode.appendChild(_css);
							};
						if (opt.css.split) {
							cssfile = opt.css;
							appendCss(cssfile);
							cssLoaded = true;
						} else if ($.isArray(opt.css)) {
							$.each(opt.css, function(i, href) {
								appendCss(href);
							});
							cssLoaded = true;
						} else {
							appendCss(file);
						}
					}
					load();
				};
			if (road.split) {
				loadScript(road);
			} else if ($.isArray(road)) {
				var scriptsLength = road.length,
					scriptsCount = 0;
				if (opt.rely) {
					//线性依赖
					var getNext = function(isLast) {
						var hold;
						if (!isLast) {
							hold = function() {
								scriptsCount++;
								getNext(scriptsCount >= (scriptsLength - 1));
							};
						}
						loadScript(road[scriptsCount], hold);
					};
					getNext();
				} else {
					//同时发起
					var scriptRoad;
					while (scriptsCount < scriptsLength) {
						scriptRoad = road[scriptsCount];
						scriptsCount++;
						loadScript(scriptRoad, scriptsLength > scriptsCount);
					}
				}
			}
		} else {
			return console.warn('getScript()参数错误！');
		}
	};
	// 兼容css3位移
	!$.fn._css && ($.fn._css = function(LeftOrTop, number) {
		var hasTrans = (LeftOrTop == 'left' || LeftOrTop == 'top') ? true : false,
			theTrans = LeftOrTop == 'left' ? 'translateX' : 'translateY',
			matrixPosi = hasTrans ? (LeftOrTop == 'left' ? 4 : 5) : null;
		if (number != void(0)) {
			//赋值
			if (hasTrans) {
				number = parseFloat(number) + 'px';
				$(this).get(0).style.transform = ('translateZ(0) ' + theTrans + '(' + number + ')');
			} else {
				$(this).css(LeftOrTop, number);
			}
			return $(this);
		} else {
			//取值
			if (hasTrans && $(this).get(0).style.transform !== 'none') {
				var transData = $(this).get(0).style.transform.match(/\((.*\,?\s?){6}\)$/)[0].substr(1).split(',');
				return parseFloat(transData[matrixPosi]);
			} else {
				return $(this).css(LeftOrTop);
			}
		}
	});
	// 加载指定属性的图片
	!$.fn._loadimg && ($.fn._loadimg = function(imgattr) {
		var $this = $(this),
			lazyImg;
		if (!imgattr) {
			return $this;
		}
		if ($this.attr(imgattr)) {
			lazyImg = $this;
		} else if ($(this).find('img[' + imgattr + ']').length) {
			lazyImg = $(this).find('img[' + imgattr + ']');
		} else {
			return $this;
		}
		if (lazyImg.length) {
			var _theSrc;
			lazyImg.each(function(i, e) {
				_theSrc = $.trim($(e).attr(imgattr));
				if (_theSrc && _theSrc != 'loaded') {
					if (e.tagName.toLowerCase() === 'img') {
						$(e).attr('src', _theSrc).attr(imgattr, 'loaded').addClass('loaded');
					} else {
						$(e).css("background-image", "url(" + _theSrc + ")").attr(imgattr, 'loaded').addClass('loaded');
					}
				}
			});
			_theSrc = null;
		}
		return $(this);
	});

	/*
	 * 输出
	 */
	module.exports = {
		getUID: getUID,
		getUUID: getUUID,
		getIndex: getIndex,
		deepcopy: deepcopy,
		throttle: _throttle,
		getScript: _getScript
	};
});