/*
 * name: lazyload.js
 * version: v2.1.2
 * update: 匹配 base._loadimg()
 * date: 2017-08-03
 */
define('lazyload', function(require, exports, module) {
	'use strict';
	var $ = window.$ || require('jquery'),
		base = require('base'),
		opt = {
			attr: 'data-lazy',
			everyCount: 3, // 每次加载
			distance: 100 // 进入视野距离
		},
		target,
		lazyimgs,
		loadimg = function(lazyimgs, count) {
			var i = 0;
			for (; i < count; i++) {
				if (i < lazyimgs.length) {
					lazyimgs.eq(i)._loadimg(opt.attr);
				}
			}
			init();
		},
		init = base.throttle(function(initImgs) {
			if (initImgs && initImgs.length) {
				lazyimgs = initImgs.filter(function() {
					if ($(this).attr(opt.attr)) {
						return this;
					}
				});
			} else {
				lazyimgs = lazyimgs.filter(function() {
					if ($(this).attr(opt.attr)) {
						return this;
					}
				});
			}
			if (!lazyimgs.length) {
				target.unbind({
					'scroll': init,
					'resize': init
				});
				return console.log('lazyload() is all done!');
			}
			var $win = $(window);
			if (lazyimgs.eq(0).offset().top < ($win.height() + $win.scrollTop() + opt.distance)) {
				loadimg(lazyimgs, opt.everyCount);
			}
		});
		
	var LazyLoad = function(config){
		$.extend(opt, config || {});
		var $this = $(opt.el).eq(0),
			lazyimgs = $this.is($(window)) ? $('['+opt.attr+']') : $this.find('['+opt.attr+']');
		if (!lazyimgs.length) {
			console.log('no ' + '['+opt.attr+']' + ' for lazyload()!');
			return $this;
		}
		if($this.data('lazyloadinit')){
			return $this;
		}
		if($this.get(0).scrollHeight){
			target = $this;
		}else{
			target = $(window);
		}
		//初始加载绑定事件
		init(lazyimgs);
		target.bind({
			'scroll': init,
			'resize': init
		});
		$this.data('lazyloadinit',true);
	};
	$.fn.lazyload = function(config) {
		return LazyLoad($.extend({
			el: this
		}, config || {}));
	};

	module.exports = LazyLoad;
});