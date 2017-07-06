/*
 * name: album.js
 * version: v3.0.0
 * update: 移动端适配
 * date: 2017-07-04
 */
define('album', function(require, exports, module) {
	'use strict';
	seajs.importStyle('.album_default, .album_wrap{width:100%;height:100%}\
		.album_wrap{position:fixed!important;left:0;top:0;z-index:98;background:rgba(0,0,0,.8);opacity:0;transition: opacity .3s ease;\
			filter:progid:DXImageTransform.Microsoft.gradient(startColorstr="#99000000", endColorstr="#99000000")}\
		.album_default .slide_c{text-align:center}\
		.album_default .slide_c img{vertical-align:middle;max-width:100%;max-height:100%}\
		.album_default .slide_c p{position:absolute;left:0;bottom:80px;width:100%;line-height:22px;color:#fff;}\
		.album_default .album_btns { position:absolute;z-index:99;user-select:none;-webkit-user-select:none}\
		.album_default .album_btns:hover{filter:alpha(opacity=80);opacity:0.8;}\
		.album_default .album_prev,.album_default .album_next { width:10%;height:5em;line-height:5em;top:50%;margin-top:-3em;font-size:4em;text-align:center;color:#fff;cursor:pointer;}\
		.album_default .album_prev { left:10%;}\
		.album_default .album_next{right:10%;}\
		.album_default .album_close{width:2em;height:2em;line-height:38px;margin:0;text-align:center;cursor:pointer;color:#fff;font-size:20px;right:0;top:0;}\
		.album_default .slide_nav,.album_default.unable .album_next,.album_default.unable .album_prev{display:none}\
		.album_default .album_pages{position:absolute;top:10px;left:0;width:100%; color:#fff;line-height:38px;text-align:center}\
		.album-show{opacity:1}\
		@media screen and (max-width:768px){\
			.album_default{background:#000}\
			.album_default .album_prev, .album_default .album_next{width:20%;}\
			.album_default .album_prev {left:0;}\
			.album_default .album_next{right:0;}\
		}\
		@media screen and (max-width:480px){\
			.album_default .album_prev,.album_default .album_next {display:none}\
			.album_default .slide_c p{bottom:4em}', module.uri);
	require('slide');
	var $ = require('jquery'),
		base = require('base'),
		def = {
			blankclose: true,
			title: null,
			cell: 'li',
			trigger: null,
			type: 1,
			hook: '',
			effect: 'slide', //slide, fade, toggle
			animate: 'ease',
			duration: 480,
			imgattr: null,
			prevHtml: '<i class="ion">&#xe62d;</i>',
			nextHtml: '<i class="ion">&#xe610;</i>',
			onSlide: null,
			onReady: null
		},
		Album = function(config) {
			var opt = $.extend({}, def, config || {}),
				$this = $(opt.el),
				trigger = opt.trigger || opt.cell,
				albumNode = $('<div class="album_wrap ' + opt.hook + '"><div class="slide_node"><ul></ul></div></div>');
			if(!$this.length){
				return;
			}
			(function() {
				//获取数据
				var thisCell = '';
				$this.find(opt.cell).each(function(i, e) {
					var img = '<img ' + (opt.imgattr && $(e).find('img').attr(opt.imgattr) ? opt.imgattr + '="' + $(e).find('img').attr(opt.imgattr) + '"' : 'src="' + $(e).find('img').attr('src') + '"') + ' />',
						title = opt.title && $(e).find(opt.title).length ? '<p>' + $(e).find(opt.title).text() + '</p>' : '';
					thisCell += ('<li>' + img + title + '</li>');
					//设置索引
					e.albumIndex = i;
				});
				albumNode.find('ul').append(thisCell);
				//预处理
				albumNode.children('.slide_node').addClass('album_default')
					.append('<div class="album_pages">\
							<span class="album_page_now" /> / <span class="album_page_all" />\
						</div>\
						<div class="album_btns_bar">\
						<span class="album_btns album_prev" />\
						<span class="album_btns album_next" />\
						<span class="album_btns album_close"><i class="ion">&#xe7de;</i></span>\
				</div>');
				if(opt.blankclose){
					albumNode.find('.album_close').css('display', 'none');
				}
				thisCell = null;
			})();
			if ($this.data('albuminit')) return;

			$this.on('click', trigger, function(e) {
				e.preventDefault();
				var winheight = $(window).height();
				var Start = opt.trigger ? $(this).parents(opt.cell).get(0).albumIndex : $(this).get(0).albumIndex;
				var new_slide = albumNode.clone();
				new_slide.css({
						'height': winheight + 1,
						'zIndex': base.getIndex()
					})
					.appendTo('body')
					.children('.slide_node').css({
						'line-height': winheight - 50 + 'px'
					})
					.slide({
						act: 'click',
						effect: opt.effect,
						animate: opt.animate,
						duration: opt.duration,
						prev: '.album_prev',
						next: '.album_next',
						prevHtml: opt.prevHtml,
						nextHtml: opt.nextHtml,
						start: Start,
						imgattr: opt.imgattr,
						auto: false,
						onSlide: function(o, b, now) {
							if (o.find('.album_page_now').length) {
								o.find('.album_page_now').text(now + 1);
							}
							typeof(opt.onSlide) === 'function' && opt.onSlide(o, b, now);
						},
						onReady: function(o, b, count) {
							//点空白关闭
							if (opt.blankclose) {
								o.on('click', function(e) {
									if (!$(e.target).is('.album_btns')) {
										o.find('.album_close').trigger('click');
									}
								});
							}
							o.on('click', '.album_close', function() {
								new_slide.removeClass('album-show');
								setTimeout(function(){
									new_slide.remove();
								},300);
							});
							if (o.find('.album_page_all').length) {
								o.find('.album_page_all').text(count);
							}
							o.find('.slide_nav a').each(function(i, e) {
								setTimeout(function() {
									$(e).animate({
										opacity: 0.7
									}, 320);
								}, i * 160);
							});
							typeof(opt.onReady) === 'function' && opt.onReady(o, b, count);
						}
					});
					new_slide.addClass('album-show');
			});
			return $this.data('albuminit', true);
		};

		$.fn.album = function(config) {
	        return Album($.extend({
	            el: this
	        }, config || {}));
	    };
		module.exports = Album;
});