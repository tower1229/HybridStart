/*
 * name: scroll-col.js
 * version: v4.2.4
 * update: 微信浏览器内无法滑动bug
 * date: 2016-04-01
 */
define('scroll-col', function(require, exports, module) {
	seajs.importStyle('.scroll{position:relative;overflow:hidden}\
		.scroll_wrap{position:relative;width:100%;height:100%;}\
		.scroll_c{float:left;top:0;left:0;height:100%;z-index:1}.scroll_nav{position:absolute;z-index:8}\
		.arrs{position:absolute;cursor:pointer;z-index:9;-webkit-user-select:none;user-select:none}\
		.arrs.unable{cursor:default}', module.uri);
	require('easing');
	var $ = window.$ || require('jquery');
	var def = {
		direct: 'left', // 自动播放方向，可选left | right
		mode: '', // 特殊模式，可选 hero(全屏三图滚动) | unloop（不循环）
		num: 99, // 显示个数
		auto: true, // 自动播放
		interval: 5e3, // 自动播放间隔
		animate: 'swing', // 滚动效果，来自jquery.easing
		duration: 640, // 滚动速度
		step: 1, // 每次滚动个数
		wrap: 'ul', // 滚动包裹元素
		cell: 'li', // 滚动元素
		prev: null, // 向左按钮，默认添加 '.arr_prev'
		next: null, // 向右按钮，默认添加 '.arr_next' 
		handletouch: false, //是否屏蔽元素的触屏默认事件
		callback: function(a) {}, // 回调 @param (nowStep)
		ext: function(a, b, c) {} // 扩展 @param (this, showNumber, allStep)
	};

	$.fn.scrollCol = function(config) {
		//FireFox有时会把window传进来
		if ($.isWindow($(this).get(0))) return;
		return $(this).each(function(i, e) {
			var $this = $(e).addClass('scroll').fadeIn(160),
				opt = $.extend({}, def, config || {}),
				wrap = $this.find(opt.wrap).addClass('scroll_wrap'),
				cells = wrap.find(opt.cell).addClass('scroll_c').width($this.find(opt.cell).width()),
				cellWidth = cells.outerWidth(),
				maxShow = Math.floor($this.width() / cellWidth),
				showNumber = opt.num > maxShow ? maxShow : opt.num,
				marginRight = (showNumber === 1) ? $this.width() - cellWidth : (Math.floor(($this.width() - cellWidth * showNumber) / (showNumber - 1) * 10) / 10),
				cellOuterWidth = cellWidth + marginRight,
				wrapLeft = 0,
				wrapWidth,
				scrollCore,
				goNext,
				goPrev,
				allStep,
				nowStep = 1,
				onTouch,
				$arrs,
				$navs,
				timer;
			//已经初始化
			if ($this.data('scrollinit')) {
				return;
			}
			//滚不开
			if (!showNumber) {
				return console.log('滚动元素宽度超过容器宽度，无法滚动');
			}
			//处理步幅
			if (opt.step > showNumber) {
				opt.step = showNumber;
				console.log('步幅(setp)达到上限，已调整为' + showNumber);
			}
			//添加按钮
			if ($(opt.prev).length || $(opt.next).length) {
				$arrs = $(opt.prev).add(opt.next);
			} else {
				if (!$this.children('.arr_prev').length && !$this.children('.arr_next').length) {
					$this.append('<a href="###" class="arrs arr_prev" /><a href="###" class="arrs arr_next" />');
				}
				opt.prev = '.arr_prev';
				opt.next = '.arr_next';

				$arrs = $this.children('.arrs');
			}
			//预处理
			switch (opt.mode) {
				case 'unloop':
					wrapWidth = cellOuterWidth * cells.length;
					break;
				case 'hero':
					opt.step = 1;
					showNumber = 3;
					marginRight = 0;
					cellOuterWidth = cellWidth;
					wrapLeft = ($this.width() - cellWidth * 3) / 2;
					wrapWidth = cellOuterWidth * (showNumber + opt.step);
					break;
				default:
					wrapWidth = cellOuterWidth * (showNumber + opt.step);
			}
			//触屏事件
			var movedStart, 
				moveDistance,
				_startX,
                _startY,
                _moveX,
                _moveY,
				moveEnd = function(event) {
					var e = event.originalEvent.touches[0];
					onTouch = false;
					wrap.css('transform', 'translate3d(0,0,0)');
					e = null;
				};
			wrap.bind({
				'touchstart': function(event) {
					var e = event.originalEvent.touches[0];
					_startX = e.pageX;
                    _startY = e.pageY;
					if ($this.find(':animated').length) {
						return;
					}
					onTouch = true;
					movedStart = e.pageX;
					e = null;
				},
				'touchmove': function(event) {
					var e = event.originalEvent.touches[0],
						_isDirect;
					_moveX = Math.abs(e.pageX - _startX);
                    _moveY = Math.abs(e.pageY - _startY);
                    if(_isDirect === void(0)){
                        _isDirect = _moveY < _moveX;
                    };
					if(opt.handletouch || _isDirect){
                        event.preventDefault();
                    };
					moved = (e.pageX - movedStart) / 2;
					wrap.css('transform', 'translate3d(' + moved + 'px,0,0)');
					if (Math.abs(moved) > $this.width() / 5) {
						onTouch = false;
						wrap.css({
							'transform': 'translate3d(0,0,0)',
							'left': moved + 'px'
						});
						moved > 0 ? goPrev() : goNext();
					}
				},
				'touchend': moveEnd,
				'touchcancel': moveEnd
			});
			//初始样式
			cells.css('margin-right', marginRight)
				.each(function(i, e) {
					i >= showNumber && (opt.mode !== 'unloop') && $(e).hide();
				});
			wrap.css({
				'left': wrapLeft,
				'width': wrapWidth
			});
			//总步数和当前步数
			if (opt.mode === 'unloop') {
				allStep = Math.ceil(cells.length - showNumber) / opt.step + 1;
			} else {
				allStep = Math.ceil((cells.length) / opt.step);
			}
			//添加导航
			(function() {
				var _links = '';
				for (i = 0; i < allStep; i++) {
					_links += ("<a" + (!!i ? "" : " class='on '") + ">" + (i + 1) + "</a>");
				}
				$this.children('.scroll_nav').remove()
					.end().append('<div class="scroll_nav">' + _links + '</div>');
				$navs = $this.find('.scroll_nav').children('a');
				_links = null;
			})();
			//运行条件检测
			if (cells.length < showNumber + opt.step) {
				$arrs.addClass('unable');
				typeof(opt.ext) === 'function' && opt.ext($this, showNumber, allStep);
				console.log('$("' + $this.attr('class') + '") has no enough cells to scroll.');
				return $this;
			}
			/*
			 * @ opt.step
			 * @ unloop模式
			 */
			scrollCore = function(i, unloop) {
				$navs.eq(nowStep - 1).addClass('on').siblings().removeClass('on');
				if (unloop) {
					$this.children(opt.wrap).stop(1).animate({
						left: -Math.abs(i) * (nowStep - 1) * cellOuterWidth
					}, {
						duration: opt.duration,
						easing: opt.animate
					});
				} else {
					if (i > 0) {
						for (var o = 0; o < i; o++) {
							$this.find(opt.wrap).find(opt.cell).eq(showNumber + o).show();
						}

						wrap.stop(1).animate({
							left: -cellOuterWidth * i + wrapLeft
						}, {
							duration: opt.duration,
							easing: opt.animate,
							complete: function() {
								for (var o = 0,absI = Math.abs(i); o < absI; o++) {
									$this.find(opt.wrap).find(opt.cell).eq(0).hide().appendTo($this.children(opt.wrap))
								}
								$this.children(opt.wrap).css('left', wrapLeft);
							}
						});
					} else if (i < 0) {
						for (var o = 0, absI = Math.abs(i); o < absI; o++) {
							$this.find(opt.wrap).find(opt.cell).eq(-1).show().prependTo($this.children(opt.wrap))
						}

						wrap.css('left', cellOuterWidth * i + wrapLeft).stop(1).animate({
							left: wrapLeft
						}, {
							duration: opt.duration,
							easing: opt.animate,
							complete: function() {
								for (var o = 0, absI = Math.abs(i); o < absI; o++) {
									$this.find(opt.wrap).find(opt.cell).eq(showNumber + o).hide();
								}
							}
						});
					}
				}
				typeof(opt.callback) === 'function' && opt.callback(nowStep);
			};
			goNext = function() {
				if ($this.find(':animated').length || onTouch) {
					return;
				}
				nowStep < allStep ? ++nowStep : nowStep = 1;
				scrollCore(opt.step, opt.mode == 'unloop');
			};
			goPrev = function() {
				if ($this.find(':animated').length || onTouch) {
					return;
				}
				nowStep > 1 ? --nowStep : nowStep = allStep;
				scrollCore(-opt.step, opt.mode == 'unloop');
			};
			//绑定事件
			$arrs.on('click', function(e) {
				e.preventDefault();
				if ($(this).is(opt.next)) {
					goNext();
				}
				if ($(this).is(opt.prev)) {
					goPrev();
				}
			});

			$navs.on('click', function(e) {
				e.preventDefault();
				if ($this.find(':animated').length || onTouch) {
					return;
				}
				/* 实现滚动最短寻址
				 * _direct：目标方向
				 * _forwardStep: 直线距离
				 * _backStep：绕行距离
				 * _solutionDirect：方案方向，直线1绕行-1
				 * _newStep：最短步数
				 */
				var _direct = $(this).index() + 1 > nowStep ? 1 : -1;
				var _forwardStep = Math.abs($(this).index() + 1 - nowStep);
				var _backStep = nowStep - (($(this).index() + 1) - cells.length);
				if (_direct < 0) {
					_backStep = ($(this).index() + 1) - (nowStep - cells.length);
				}
				var _solutionDirect = _forwardStep > _backStep ? -1 : 1;
				var _newStep = _solutionDirect > 0 ? _solutionDirect * _direct * _forwardStep : _solutionDirect * _direct * _backStep;

				nowStep = $(this).index() + 1;
				scrollCore(_newStep * opt.step, opt.mode == 'unloop');
				_direct = _forwardStep = _backStep = _solutionDirect = _newStep = null;
			});
			//标记
			$this.data('scrollinit', true).parent().on('DOMNodeRemoved',function(e){
				if($(e.target).is($this)){
					//DOM移除后释放全局变量
					timer && clearInterval(timer);
				}
			});
			//执行扩展
			typeof(opt.ext) === 'function' && opt.ext($this, showNumber, allStep);
			//自动播放
			if (opt.auto) {
				timer = setInterval(function() {
					(opt.direct == 'left') ? goNext(): goPrev()
				}, opt.interval);

				$this.hover(function() {
					window.clearInterval(timer);
				}, function() {
					window.clearInterval(timer);
					timer = window.setInterval(function() {
						(opt.direct == 'left') ? goNext(): goPrev()
					}, opt.interval);
				});
			}
		});
	};
});