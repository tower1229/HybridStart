/*
 * name: lazyload.js
 * version: v1.0.5
 * update: 重构
 * date: 2015-06-09
 */
define('lazyload',function(require, exports, module) {
	var $ = require('jquery');
	var def = {
			showSpeed: 320, // 显示速度
			firstCount: 1, // 初始加载
			everyCount: 1, // 每次加载
			distance: 100 // 进入视野距离
		};
	$.fn.lazyload = function(config) {
		return $(this).each(function(i,e){
			var lazyload,
				loadimg,
				lock = false,
				$this = $(e),
				opt = $.extend({},def, config || {}),
				lazyimgs = $this.is($(window)) ? $('img[data-lazy]') : $this.find('img[data-lazy]');
			if (!lazyimgs.size()) {
				console.log('there has no img[data-lazy]!');
				return $this;
			};
			
			loadimg = function(count){
				for (i = 0; i < count; i++) {
					if (i < lazyimgs.length) {
						var _dataLazy = lazyimgs.eq(i).data('lazy');
						if (_dataLazy != 'finish') {
							lazyimgs.eq(i)
								.attr("src", _dataLazy).
							data('lazy', 'finish').
							fadeIn(opt.showSpeed);
						}
					}
				};
			}
			lazyload = function(init) {
				lazyimgs = lazyimgs.filter(function() {
					if ($(this).data('lazy') != 'finish') {
						return this;
					}
				});
				if (!lazyimgs.length) {
					$(window).unbind({
						'scroll': lazyload,
						'resize': lazyload
					});
					console.log('img[data-lazy] is all done!');
					return;
				};
				if(init){
					loadimg(opt.firstCount);
				}
				if (lazyimgs.eq(0).offset().top < ($(window).height() + $(window).scrollTop() + opt.distance)) {
					loadimg(opt.everyCount);
				};
			};
			//初始加载
			lazyload('init');

			$(window).bind({
				'scroll': lazyload,
				'resize': lazyload
			});
		})
	};
})