/**
 * doc
 */
define(function(require) {
	var $ = require('jquery');
	var base = require('base');
	/*生成目录*/

	var $nav = $('#nav'),
		$section = $('section.wrap'),
		_nav;
	_nav = '<ul>';
	$section.each(function(i, e) {
		_nav += '<li><a href="#' + $(e).attr('id') + '">' + $(e).find('h2').eq(0).text() + '</a>' + '<ul>' + (function() {
			var _h3 = '';
			for (var i2 = 0; i2 < $(e).find('h3').length; i2++) {
				_h3 += '<li><a href="#' + $(e).find('h3').eq(i2).attr("id") + '">' + $(e).find('h3').eq(i2).text() + '</a></li>';
			}
			return _h3;
		})() + '</ul>' + '</li>';
	});
	_nav += '</ul>';
	$nav.html(_nav);

	/*生成模块目录*/
	var createNavfromTable = function(nav, table) {
		var $modMenu = nav,
			$modItems = table,
			_mod;
		_mod = '<ul class="full-row">';
		$modItems.find('dt[id]').each(function(i, e) {
			var _modName = $(e).attr('id'),
				_cont = $(e).next('dd');
			_mod += '<li class="span-4 smal-6"><a href="#' + encodeURI(_modName) + '" class="el">' + _modName + '</a></li>';
			//代码预览
			if (_cont.length && _cont.find('pre').length > 1) {
				_cont.append('<p><a href="javascript:;" target="_blank" class="LiveDemo"><i class="ion">&#xe668;</i> LiveDemo </a></p>');
			}
		}).end().on('click', '.LiveDemo', function(e) {
			e.preventDefault();
			window.DemoTitle = $(this).parents('dd').prev('dt[id]').text();
			window.DemoHtml = $(this).parents('dd').find('pre').eq(-2).text();
			window.DemoJs = $(this).parents('dd').find('pre').eq(-1).text();
			window.open('run.html?page=' + window.DemoTitle);
		});
		_mod += '</ul>';
		$modMenu.html(_mod);
	};

	createNavfromTable($('#component_index'), $('#component_list'));
	createNavfromTable($('#modules_index'), $('#modules_list'));
	createNavfromTable($('#widgets_index'), $('#widgets_list'));

	/*代码着色*/
	require('copy');
	require('box');
	var copybtn = $('<div id="d_clip_button"><i class="ion">&#xe6b5;</i> Copy</div>').appendTo('body');
	var copyCode = '';
	copybtn.css({
		position: 'absolute',
		padding: '3px 14px',
		top: '-999px',
		zIndex: 999,
		color:'#61ce3c',
		border:'1px solid #61ce3c',
		borderRadius:'2px'
	});
	var showCopyBtn = function(e) {
		var pre = $(e.target).is('pre') ? $(e.target) : $(e.target).parents('pre');
		if (!pre.data('oncopy')) {
			copyCode = pre.data('code');
			copybtn.css({
				left: pre.offset().left + (pre.outerWidth(true) - copybtn.outerWidth(true)),
				top: pre.offset().top
			}).show().zclip('remove').zclip({
				copy: copyCode,
				afterCopy: function() {
					$.box.msg('复制成功', {
						delay: 1000
					});
				}
			});
			$('pre').data('oncopy', false);
			pre.data('oncopy', true);
		}
	};

	if (!base.browser.isMobile) {
		if (base.browser.ie && base.browser.ie < 9) {
			$.box.msg('您的浏览器版本太低，无法启用代码高亮和demo演示，建议使用chrome或360浏览器。', {
				color: "danger",
				delay: 3000
			});
		} else {
			require.async('lib/highlight/highlight.pack', function(hl) {
				$('pre').each(function(i, e) {
					if ($(e).find('code').length) {
						$(e).data('code', $(e).text())
							.find('code').each(function(i, e) {
								hl.highlightBlock(e);
							});
					}
				});
				$('body').on('mouseenter', 'pre', showCopyBtn);
			});
		}
	}else{
		//移动端
		$('pre code').css('display', 'block');
		$('body').addClass('Mobile');
	}

	if (window.console) {
		var cons = console;
		if (cons) {
			cons.log("%c\n	", "font-size:130px;background:url('http://g.hiphotos.bdimg.com/album/s%3D1100%3Bq%3D90/sign=51698e337d3e6709ba0041fe0bf7a44c/08f790529822720efa1c90ee79cb0a46f31fabd0.jpg') no-repeat");
			cons.log("hello, u");
		}
	}

});