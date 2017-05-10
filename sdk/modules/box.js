/*
 * name: box.js
 * version: v5.0.0
 * update: bug fix
 * date: 2017-04-28
 */
define('box', function(require, exports, module) {
	'use strict';
	var def = {
			bg: '#fff',
			title: undefined,
			oktext: '确认',
			canceltext: '取消',
			bgclose: true,
			width: 300,
			delay: 2000,
			toastPosi: 'middle',
			btnbg: '#fff',
			textSize: 14,
			titleSize: 16,
			textColor: '#666',
			corner: 4,
			btncolor: '#000',
			btnWidth: 130,
			btnHeight: 40,
			onclose: function() {}
		},
		box = {};

	$.extend(box, {
		alert: function(msg, sure, config) {
			app.ready(function() {
				var dialogBox = api.require('dialogBox');
				var opt = $.extend({}, def, config || {});
				dialogBox.alert({
					texts: {
						title: opt.title,
						content: msg,
						leftBtnTitle: opt.oktext
					},
					styles: {
						bg: opt.bg,
						w: opt.width,
						corner: opt.corner,
						title: {
							marginT: 20,
							titleSize: opt.titleSize,
							titleColor: '#000'
						},
						content: {
							marginT: 20,
							color: opt.textColor,
							size: opt.textSize
						},
						left: {
							marginB: 10,
							marginL: (opt.width - opt.btnWidth) / 2,
							w: opt.btnWidth,
							h: opt.btnHeight,
							corner: opt.corner,
							bg: opt.btnbg,
							color: opt.btncolor,
							size: opt.textSize
						}
					},
					tapClose: opt.bgclose
				}, function(ret) {
					if (ret.eventType == 'left') {
						dialogBox.close({
							dialogName: 'alert'
						});
						typeof sure === 'function' && sure();
					}
				});
			});
			return 'alert';
		},
		confirm: function(msg, sure, cancel, config) {
			app.ready(function() {
				var dialogBox = api.require('dialogBox');
				var opt = $.extend({}, def, config || {});
				dialogBox.alert({
					texts: {
						title: opt.title,
						content: msg,
						leftBtnTitle: opt.oktext,
						rightBtnTitle: opt.canceltext
					},
					styles: {
						bg: opt.bg,
						w: opt.width,
						corner: opt.corner,
						title: {
							marginT: 20,
							titleSize: opt.titleSize,
							titleColor: '#000'
						},
						content: {
							marginT: 20,
							color: opt.textColor,
							size: opt.textSize
						},
						left: {
							marginB: 10,
							marginL: 20,
							w: opt.btnWidth,
							h: opt.btnHeight,
							corner: opt.corner,
							bg: opt.btnbg,
							color: opt.btncolor,
							size: opt.titleSize
						},
						right: {
							marginB: 10,
							marginL: 10,
							w: opt.btnWidth,
							h: opt.btnHeight,
							corner: opt.corner,
							bg: opt.btnbg,
							color: opt.btncolor,
							size: opt.titleSize
						}
					},
					tapClose: opt.bgclose
				}, function(ret) {
					if (ret.eventType == 'left') {
						dialogBox.close({
							dialogName: 'alert'
						});
						typeof sure === 'function' && sure()
					} else if (ret.eventType == 'right') {
						dialogBox.close({
							dialogName: 'alert'
						});
						typeof cancel === 'function' && cancel()
					}
				});
			});
			return 'confirm';
		},
		msg: function(msg, config) {
			app.ready(function() {
				var dialogBox = api.require('dialogBox');
				var opt = $.extend({}, def, config || {});
				app.window.openToast(msg, opt.delay, opt.position);
				if (typeof(opt.onclose) === 'function') {
					setTimeout(function() {
						opt.onclose();
					}, opt.delay);
				}
			});
			return 'msg';
		},
		amount: function(num, cb, config) {
			app.ready(function() {
				var dialogBox = api.require('dialogBox');
				var opt = $.extend({}, def, config || {});
				dialogBox.amount({
					texts: {
						title: '选择数量',
						default: num || '1',
						leftBtnTitle: opt.oktext,
						rightBtnTitle: opt.canceltext
					},
					styles: {
						bg: opt.bg,
						corner: opt.corner,
						w: opt.width,
						h: 160,
						title: {
							marginT: 20,
							size: opt.titleSize,
							color: '#000'
						},
						input: {
							w: 150,
							h: 40,
							marginT: 15,
							size: opt.textSize,
							color: opt.textColor
						},
						dividingLine: {
							marginT: 10,
							width: 0.5,
							color: '#696969'
						},
						left: {
							marginL: 10,
							w: opt.btnWidth,
							h: opt.btnHeight,
							bg: opt.btnbg,
							color: opt.btncolor,
							size: opt.titleSize
						},
						right: {
							marginR: 10,
							w: opt.btnWidth,
							h: opt.btnHeight,
							bg: opt.btnbg,
							color: opt.btncolor,
							size: opt.titleSize
						}
					},
					tapClose: opt.bgclose
				}, function(ret) {
					if (ret.eventType == 'left') {
						dialogBox.close({
							dialogName: 'amount'
						});
						typeof cb === 'function' && cb(ret.amount);
					} else if (ret.eventType == 'right') {
						dialogBox.close({
							dialogName: 'amount'
						});
					}
				});
			});
			return 'amount';
		},
		input: function(placeholder, cb, config) {
			app.ready(function() {
				var dialogBox = api.require('dialogBox');
				var opt = $.extend({}, def, config || {});
				var styleObject = {
					bg: opt.bg,
					corner: 0,
					w: opt.width,
					h: 140,
					input: {
						h: 60,
						marginT: 0,
						textSize: opt.textSize,
						textColor: opt.textColor
					},
					dividingLine: {
						width: 0,
						color: '#fff'
					},
					left: {
						bg: opt.btnbg,
						h: 50,
						color: opt.btncolor,
						size: opt.titleSize
					},
					right: {
						bg: opt.btnbg,
						h: 50,
						color: opt.btncolor,
						size: opt.titleSize
					}
				};
				if (opt.title) {
					styleObject.h = 160;
					styleObject.title = {
						height: 50,
						alignment: 'center',
						size: opt.titleSize,
						color: '#000'
					};
				}
				dialogBox.input({
					keyboardType: 'default',
					texts: {
						title: opt.title,
						placeholder: placeholder,
						leftBtnTitle: opt.oktext,
						rightBtnTitle: opt.canceltext
					},
					styles: styleObject
				}, function(ret) {
					if (ret.eventType == 'left') {
						dialogBox.close({
							dialogName: 'input'
						});
						typeof cb === 'function' && cb(ret.text);
					} else if (ret.eventType == 'right') {
						dialogBox.close({
							dialogName: 'input'
						});
					}
				});
			});
			return 'input';
		},
		hide: function(name) {
			app.ready(function() {
				var dialogBox = api.require('dialogBox');
				dialogBox.close({
					dialogName: name || 'alert'
				});
			});
		}
	});

	module.exports = box;
});