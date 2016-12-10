/*
 * name: tip.js
 * version: v1.2.2
 * update: 遮罩层级bug
 * date: 2015-08-29
 */
define('tip',function(require, exports, module) {
	seajs.importStyle('#boxBlank{position:fixed;z-index:98;left:0;top:0;width:100%;height:0;background:#000}.tip-box{display:none;position:absolute;z-index:99}.tip-title{background:#eee;padding:5px 10px;border:1px solid #ccc;border-bottom:0;border-radius:4px 4px 0 0}.tip-content{background:#fff;color:#000;line-height:1.5em;padding:8px 20px;border:1px solid #ccc}.tip-withContent .tip-object{display:none}.tip-withObject .tip-content{display:none}.tip-noTitle .tip-content{border-radius:4px;box-shadow:rgba(0,0,0,.3)}.tip-noTitle .tip-title{display:none}.tip-withTitle .tip-content{border-radius:0 0 4px 4px}.tip-arr,.tip-arr-cell{position:absolute;width:0;height:0;overflow:hidden;border:6px solid transparent}.tip-left .tip-arr{border-left-color:#ccc;right:-12px;top:50%;margin-top:-6px}.tip-left .tip-arr-cell{border-left-color:#fff;right:-11px;top:50%;margin-top:-6px}.tip-right .tip-arr{border-right-color:#ccc;left:-12px;top:50%;margin-top:-6px}.tip-right .tip-arr-cell{border-right-color:#fff;left:-11px;top:50%;margin-top:-6px}.tip-top .tip-arr{border-top-color:#ccc;bottom:-12px;left:50%;margin-left:-6px}.tip-top .tip-arr-cell{border-top-color:#fff;bottom:-11px;left:50%;margin-left:-6px}.tip-bottom .tip-arr{border-bottom-color:#ccc;top:-12px;left:50%;margin-left:-6px}.tip-bottom .tip-arr-cell{border-bottom-color:#fff;top:-11px;left:50%;margin-left:-6px}'
		,module.uri);
	var def = {
			act: 'mouseenter', 				// mouseenter | click
			place: 'left-center', 			// [posi]-[posi]-[in or null]，前两项必须，表示位置，第三项表示从内部定位，可省
			title: false, 					// title text | false
			hasarr: true, 					// 有无箭头
			offset: 0, 						// 提示框与元素间距，默认0
			type: 'auto',					// 可选"content"，dom元素也将包裹外边框
			modal: false,					// 模态，会增加一个半透明背景
			opacity: 0.5,					// 背景透明度
			hook: null,						// 自定义class钩子
			show: false,					// 立即显示，不会添加opt.act事件绑定
			onshow: function($this) {},
			onclose: function(){}
		},
		wrap = $('<div class="tip-box" id="tip-box">\
						<div class="tip-title" id="tip-title"></div>\
						<div class="tip-content" id="tip-content"></div>\
						<div class="tip-object" id="tip-object"></div>\
						<i class="tip-arr" id="tip-arr"></i><i class="tip-arr-cell" id="tip-arr-cell"></i>\
					</div>');

	$.fn.tip = function(tip, config) {
		var opt = $.extend({}, def, config || {}),
			$blank;
		!$("#boxBlank").length && $('<div id="boxBlank" onselectstart="return false" />').appendTo('body');
		$blank = $('#boxBlank').css('opacity',opt.opacity);

		$(this).each(function(i, e) {
			var $this = $(e),
				place = opt.place.split('-'),
				show, hide, offArr;
				
			!$('#tip-box').length && $('body').append(wrap);

			offArr = (opt.hasarr ? parseInt($('#tip-arr').css('border-top-width')) : 0) + opt.offset;
			hide = function(){
				$('#tip-box').stop(1).fadeOut(160);
				$this.removeClass('showTip');
				$blank.hide();
				if (typeof(opt.onclose) === 'function') opt.onclose();
			}
			show = function() {
				var _tipLeft,
					_tipTop,
					_offX,
					_offY,
					_getLeft,
					_getTop,
					_classCatch = '',
					_tipConent = '',
					_tipObj = '',
					_title = '';
				opt.hook && (_classCatch+=($.trim(opt.hook)+' '));

				if (typeof(tip) === 'object' && tip.length || ($.parseHTML($.trim(tip + ''))[0].nodeType === 1)) {
					//现有dom或dom字符串
					if(opt.type=='content'){
						_classCatch += 'tip-withContent ';
					}else{
						_classCatch += 'tip-withObject ';
					}
					_tipObj = $(tip).show();
				} else {
					//字符串或数字
					_classCatch += 'tip-withContent ';
					_tipConent = tip;
				};

				if (opt.title) {
					_classCatch += 'tip-withTitle ';
					_title = opt.title;
				} else {
					_classCatch += 'tip-noTitle ';
				};

				if (opt.hasarr) {
					_classCatch += 'tip-' + place[0]
				};

				$('#tip-box')
				.removeClass('tip-withContent tip-withObject tip-withTitle tip-noTitle tip-left tip-top tip-right tip-bottom')
				.addClass(_classCatch)
				.find('#tip-object').html(_tipObj).end()
				.find('#tip-content').text(_tipConent).end()
				.find('#tip-title').text(_title);

				if(_tipObj!='' && opt.type=='content'){
					$('#tip-box').find('#tip-object').empty().end()
						.find('#tip-content').html(_tipObj);
				}

				_offX = $('#tip-box').outerWidth() > $this.outerWidth() ? -Math.abs($this.outerWidth() - $('#tip-box').outerWidth()) / 2 : Math.abs($this.outerWidth() - $('#tip-box').outerWidth()) / 2;
				_offY = $('#tip-box').outerHeight() > $this.outerHeight() ? -Math.abs($this.outerHeight() - $('#tip-box').outerHeight()) / 2 : Math.abs($this.outerHeight() - $('#tip-box').outerHeight()) / 2;
				_getLeft = function() {
					switch (place[1]) {
						case 'center':
							_tipLeft = $this.offset().left + _offX;
							break;
						case 'left':
							_tipLeft = $this.offset().left;
							break;
						case 'right':
							_tipLeft = $this.offset().left + $this.outerWidth() - $('#tip-box').outerWidth();
							break;
						default:
							place[2] = place[1];
					}

				};
				_getTop = function() {
					switch (place[1]) {
						case 'center':
							_tipTop = $this.offset().top + _offY;
							break;
						case 'top':
							_tipTop = $this.offset().top;
							break;
						case 'bottom':
							_tipTop = $this.offset().top + $this.outerHeight() - $('#tip-box').outerHeight();
							break;
						default:
							place[2] = place[1];
					}
				};

				switch (place[0]) {
					case 'top':
						_getLeft();
						_tipTop = $this.offset().top - $('#tip-box').outerHeight() - offArr;
						if (place[2] === 'in') {
							_tipTop = _tipTop + $this.outerHeight();
						}
						break;
					case 'bottom':
						_getLeft();
						_tipTop = $this.offset().top + offArr;
						if (place[2] !== 'in') {
							_tipTop = _tipTop + $this.outerHeight();
						}
						break;
					case 'right':
						_getTop();
						_tipLeft = $this.offset().left + offArr;
						if (place[2] !== 'in') {
							_tipLeft = _tipLeft + $this.outerWidth();
						}
						break;
					case 'left':
						_getTop();
						_tipLeft = $this.offset().left - $('#tip-box').outerWidth() - offArr;

						if (place[2] === 'in') {
							_tipLeft = _tipLeft + $this.outerWidth();
						}
						break;
				}

				$('#tip-box')
				.css({
						'left': _tipLeft,
						'top': _tipTop
					})
				.stop(1).fadeIn(160);

				$this.addClass('showTip');
				opt.modal && opt.act=='click' && $blank.height($(window).height()).show();
				typeof(opt.onshow) === 'function' && opt.onshow($this);
			};
			if(opt.show){
				show();
			}else{
				if (opt.act === 'mouseenter') {
					$this.on('mouseenter', function() {
						show();
						if (place[1] === 'in') {
							$('#tip-box').on('mouseleave', function() {
								hide();
							});
						}
					});
					if (place[1] !== 'in') {
						$this.on('mouseleave', function() {
							hide();
						});
					}
				} else if (opt.act === 'click') {
					$('#tip-box').unbind();
					$('body').on('click', function(e) {
						if ($this.is(e.target) || $this.has(e.target).length) {
							e.preventDefault();
							if(!$('#tip-box:visible').length){
								setTimeout(function() {
									show();
								},0)
							}else{
								hide();
							}	
						} else if(!$('#tip-box').has(e.target).length){
							hide();
						}
					});
				}
			}
		});
		return {
			hide:function(){
				$('#tip-box').stop(1).fadeOut(160);
				$(this).removeClass('showTip');
				$("#boxBlank").hide();
				if (typeof(opt.onclose) === 'function') opt.onclose();
			}
		}
	}
});