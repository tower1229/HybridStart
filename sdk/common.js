/*
 * name: common
 * version: 0.3.3
 * update: date过滤器分钟显示bug
 * date: 2015-11-11
 */

define(function(require, exports, module) {
	"use strict";

	//头部按钮
	$('#goBack').on('click', function() {
		app.window.close();
	});

	//批量绑定body事件
	$('body').on('touchstart', '[openView]', function(e) {
		//openView
		$(this).addClass('active').data('touch', true);
	}).on('touchcancel', '[openView]', function(e) {
		$(this).removeClass('active').data('touch', false);
	}).on('touchmove', '[openView]', function(e) {
		$(this).removeClass('active').data('touch', false);
	}).on('touchend', '[openView]', function(e) {
		var $this = $(this),
			v = $this.attr('openView'),
			_anim = ['none', 'push', 'push', 'push', 'push'];
		if ($this.data('touch')) {
			$this.data('touch', false);
			$this.removeClass('active');
			$this.removeClass('reddot').find('.reddot').removeClass('reddot');
			if (v) {
				v = v.split(',');
				app.openView({
					anim: _anim[v[0]]
				}, v[1], v[2]);
				$this = v = null;
			}
		}
	}).on('click', '[openShell]', function(e) {
		//壳链接
		e.preventDefault();
		var $this = $(this),
			isPop;
		if ($this.attr('openShell')) {
			app.openView({
				param: {
					url: $this.attr('openShell'),
					title: $this.data('title') || '远程页面',
					show: true
				}
			}, 'common', 'shell');
		}
	}).on('click', 'img.ableOpenImg', function() {
		//看大图
		var imgs = $('body').find('img.ableOpenImg'),
			src = $(this).attr('src'),
			index,
			imgsArr = [];
		$.each(imgs, function(i, e) {
			if ($(e).attr('src')) {
				if ($(e).attr('src') == src) {
					index = i;
				}
				imgsArr.push($(e).attr('src'));
			}
		});
		app.ready(function() {
			var photoBrowser = api.require('photoBrowser');
			photoBrowser.open({
				images: imgsArr,
				activeIndex: index,
				bgColor: '#000'
			}, function(ret) {
				if (ret.eventType === 'click') {
					photoBrowser.close();
				}
			});
		});
		src = imgsArr = imgs = index = null;
	}).on('focus', 'input', function() {
		//输入状态
		$('body').addClass('onKeyboard');
		$('.keyboardHide').hide();
	}).on('blur', 'input', function() {
		$('body').removeClass('onKeyboard');
		$('.keyboardHide').show();
	});

	app.ready(function() {
		//系统兼容
		if (platform === 'android') {
			//item-radio强制重绘
			if (parseFloat(version) < 4.3) {
				$('body').on('click', '.item-radio', function() {
					var $view = $(this).parent();
					$view.css('visibility', 'hidden');
					setTimeout(function() {
						$view.css('visibility', 'visible');
					}, 0);
				});
			}
		}
		if (platform === 'ios') {
			if (parseFloat(version) >= 9) {
				$('body').on('click', '.item-radio', function() {
					var $view = $(this).parent();
					$view.css('visibility', 'hidden');
					setTimeout(function() {
						$view.css('visibility', 'visible');
					}, 0);
				});
			}
		}
		//封装select样式
		var optionsData = [],
			selectDom;
		var UIMultiSelector = api.require('UIMultiSelector');
		var openSelector = function(items) {
			UIMultiSelector.open({
				rect: {
					h: 179
				},
				text: {
					leftBtn: '取消',
					rightBtn: '完成'
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
						bg: '#eee',
						h: 44
					},
					item: {
						bgActive: '#ddd',
						lineColor: '#ccc',
						h: 44
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
							selectDom.find('option').each(function(i, e) {
								if ($(e).text() === _theitem.text) {
									selectDom.val(_theitem.val);
								}
							});
							UIMultiSelector.close();
							break;
						default:

					}
				} else {
					alert(JSON.stringify(err));
				}
			});
		};
		$('select').prop('disabled', false);
		$('body').on('touchstart', 'select', function(e) {
			e.preventDefault();
			selectDom = $(this);
			selectDom.prop('disabled', true);
			optionsData = [];
			$.each(selectDom.find('option'), function(i, e) {
				optionsData.push({
					val: $(e).val(),
					text: $(e).text(),
					status: 'normal'
				});
			});
			openSelector(optionsData);
		}).on('touchend', 'select', function(){
			selectDom.prop('disabled', false);
		}).on('touchcancel', 'select', function(){
			selectDom.prop('disabled', false);
		});


	});
});