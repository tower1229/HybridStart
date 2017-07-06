/*
 * name: slide.js
 * version: v4.3.0
 * update: bug fix
 * date: 2017-07-04
 */
define('slide', function(require, exports, module) {
    "use strict";
    seajs.importStyle('.slide{position:relative;overflow:hidden;}\
        .slide_wrap{position:relative;width:100%}\
        .slide_wrap img{max-width: none;}\
        .slide_c{position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;display:none}\
        .slide_effect_toggle .active{display:block}\
        .slide_effect_slide .active{position:relative;display:block;margin:auto}\
        .slide_effect_slide .slide_prev{left:0;display:block}\
        .slide_effect_slide .slide_next{left:auto;right:0;display:block}\
        .slide_nav{position:absolute;left:0;bottom:0;width:100%;z-index:8;text-align:center}\
        .slide_nav a{display:inline-block;width:0.8em;height:0.8em;border-radius:0.4em;overflow:hidden;text-indent:-99px;background:#fff;margin:0 0.5em 1em;cursor:pointer}\
        .slide_nav .on{background:#999;}\
        .slide .arrs{position:absolute;cursor:pointer;z-index:9;-webkit-user-select:none;user-select:none}\
        .arrs.unable{cursor:default}', module.uri);
    require('base');
    var $ = require('jquery'),
        def = {
            el: null,
            data: null,
            wrap: 'ul',
            cell: 'li',
            effect: 'slide', //切换 slide | fade | toggle
            direction: 'x', //slide方向
            animate: 'ease',
            duration: 300,
            start: 0,
            auto: true,
            pause: true, // true | false | (jquery selector)
            interval: 5e3,
            act: "click",
            prevHtml: "",
            nextHtml: "",
            prev: null,
            next: null,
            navs: null,
            imgattr: 'slide-src',
            handletouch: false,
            onSlide: null,
            onReady: null
        },
        getPrev = function(number, _step, count) {
            _step = _step || 1;
            number = number <= 0 ? count - _step : number - _step;
            return number;
        },
        getNext = function(number, _step, count) {
            _step = _step || 1;
            number = number >= count - _step ? 0 : number + _step;
            return number;
        },
        setNavs = function($navs, count, current, step) {
            var _step = step || 1,
                _prev = getPrev(current, _step, count),
                _next = getNext(current, _step, count);

            $navs.removeClass('on nav_prev nav_next')
                .eq(current).addClass('on')
                .end().eq(_prev).addClass("nav_prev")
                .end().eq(_next).addClass("nav_next");
        };
    
    var Slide = function(config) {
        var opt = $.extend({}, def, config || {}),
            $this = $(opt.el),
            $wrap,
            $cell,
            count,
            timer,
            $navs,
            $arrs,
            origin = 0,
            width = 0,
            H,
            efftct,
            init,
            windowLock = false;
        if (!$this.length || $this.data('slide-init')) {
            return $this;
        }
        if ($this.css('height').indexOf('%') > 0) {
            H = parseInt($this.parent().css('height')) * ($this.css('height').split('%')[0] / 100);
        } else {
            H = parseInt($this.outerHeight());
        }
        //应用数据
        if($.isArray(opt.data)){
            $.extend(opt, {
                wrap: 'ul',
                cell: 'li'
            });
            var slideNode = '<ul>';
            $.each(opt.data, function(i, e){
                slideNode += ('<li><a href="'+ (e.link || 'javascript:;') +'"><img src="' + (e.src || '') + '" alt="'+ (e.alt || '') +'"></a></li>')
            });
            slideNode += '</ul>';
            $this.prepend(slideNode);
        }
        //运行条件检测
        $wrap = $this.find(opt.wrap).eq(0);
        $cell = $wrap.find(opt.cell);
        count = $cell.length;
        if (count <= 1) {
            $this.addClass('unable');
            $wrap.css({
                'height': H
            }).addClass('slide_wrap');
            $cell.unbind().addClass('slide_c')._loadimg(opt.imgattr).show();
            typeof(opt.onReady) === 'function' && opt.onReady($this, $cell, count);
            return $this;
        }

        $this.addClass('slide slide_effect_' + opt.effect);
        //初始化
        (function() {
            var _Target, _Direction, _Distance, _touchAction;
            init = function() {
                if (opt.effect === 'slide') {
                    var touchStart,
                        _distance,
                        _startX,
                        _startY,
                        _moveX,
                        _moveY,
                        _isDirect,
                        moveEnd = function(event) {
                            var e = event.originalEvent.touches[0];
                            $this.removeClass('ontouch');
                            _isDirect = void(0);
                            if (windowLock || $this.data('moveTrigger')) {
                                return;
                            }
                            if (Math.abs(_distance) > _Distance / 4 || (_touchAction && _touchAction.split)) {
                                if (_distance < 0 || _touchAction == 'next') {
                                    efftct(getNext(origin, 1, count), 1);
                                } else if (_distance > 0 || _touchAction == 'prev') {
                                    efftct(getPrev(origin, 0, count), 0);
                                }
                                _touchAction = null;
                            } else {
                                $wrap.css('transition', 'all ' + opt.duration / 2 + 'ms ' + opt.animate)._css(_Direction, -_Distance + 'px');
                                setTimeout(function() {
                                    $wrap.css('transition', 'all 0s');
                                }, opt.duration);
                            }
                        },
                        _wrapcss = {};
                    if (opt.direction === 'y') {
                        _Target = 'height';
                        _Direction = 'top';
                        _Distance = H;
                    } else {
                        _Target = 'width';
                        _Direction = 'left';
                        if ($this.css(_Target).indexOf('%') > 0) {
                            _Distance = parseInt($this.parent().css(_Target)) * ($this.css('width').split('%')[0] / 100);
                        } else {
                            _Distance = parseInt($this.css(_Target));
                        }
                    }
                    _wrapcss.height = H;
                    _wrapcss[_Target] = _Distance * 3 + 'px';
                    $cell.css(_Target, _Distance + 'px').addClass('slide_c');
                    $wrap._css(_Direction, -_Distance + 'px')
                        .css(_wrapcss)
                        .addClass('slide_wrap')
                        .bind({
                            'touchstart': function(event) {
                                var e = event.originalEvent.touches[0];
                                _startX = e.pageX;
                                _startY = e.pageY;
                                if (opt.direction === 'y') {
                                    touchStart = _startY;
                                } else {
                                    touchStart = _startX;
                                }
                                opt.auto && clearInterval(timer);
                                $this.addClass('ontouch').data('moveTrigger', true);
                            },
                            'touchmove': function(event) {
                                var e = event.originalEvent.touches[0];
                                _moveX = Math.abs(e.pageX - _startX);
                                _moveY = Math.abs(e.pageY - _startY);
                                if (_isDirect === void(0)) {
                                    if (opt.direction === 'y') {
                                        _isDirect = _moveY > _moveX;
                                    } else {
                                        _isDirect = _moveY < _moveX;
                                    }
                                    if (opt.handletouch || _isDirect) {
                                        event.preventDefault();
                                    }
                                    return $this.data('moveTrigger', false);
                                }
                                if (opt.handletouch || _isDirect) {
                                    event.preventDefault();
                                }
                                if (windowLock) {
                                    return $this.data('moveTrigger', false);
                                }
                                if (opt.direction === 'y') {
                                    _distance = e.pageY - touchStart;
                                } else {
                                    _distance = e.pageX - touchStart;
                                }
                                $wrap._css(_Direction, -_Distance + _distance + 'px');
                                if (_distance < 0) {
                                    $cell.eq(getNext(origin, 1, count))._loadimg(opt.imgattr);
                                }
                                if (_distance > 0) {
                                    $cell.eq(getPrev(origin, 1, count))._loadimg(opt.imgattr);
                                }
                            },
                            'touchend': moveEnd,
                            'touchcancel': moveEnd
                        });
                } else {
                    $wrap.css({
                        'height': H
                    }).addClass('slide_wrap');
                    $cell.addClass('slide_c');
                }
            };
            //核心方法
            efftct = function(current, direct, step, isInit) {
                var _step = step ? step : 1,
                    _prev = getPrev(current, _step, count),
                    _next = getNext(current, _step, count),
                    toggleCellClass = function() {
                        $cell.removeClass('active slide_prev slide_next').eq(current)._loadimg(opt.imgattr).addClass('active');
                        $cell.eq(_prev).addClass('slide_prev');
                        $cell.eq(_next).addClass('slide_next');
                    };
                windowLock = true;
                setNavs($navs, count, current, step);
                switch (opt.effect) {
                    case 'fade':
                        toggleCellClass();
                        if (isInit) {
                            $cell.eq(current)._loadimg(opt.imgattr).addClass('active').show();
                        } else {
                            $cell.fadeOut(opt.duration)
                                .eq(current)._loadimg(opt.imgattr).fadeIn(opt.duration * 1.5, function() {
                                    $(this).addClass('active');
                                });
                        }
                        break;
                    case 'toggle':
                        toggleCellClass();
                        break;
                    case 'slide':
                        direct == void(0) && (direct = true);
                        var wrap_move = direct ? -_Distance * 2 : 0;
                        if (isInit) {
                            toggleCellClass();
                        } else {
                            $wrap.css('transition', 'all ' + opt.duration + 'ms ' + opt.animate)._css(_Direction, wrap_move + 'px');
                            setTimeout(function() {
                                $wrap.css('transition', 'all 0s')._css(_Direction, -_Distance + 'px');
                                toggleCellClass();
                            }, opt.duration);
                        }
                        break;
                    default:
                        console.warn('slide()：effect参数不合法！');
                        break;
                }
                origin = current;
                $this.data('play', origin);
                setTimeout(function() {
                    typeof(opt.onSlide) === 'function' && opt.onSlide($this, $cell, origin);
                    windowLock = false;
                }, opt.duration);
            };
        })();
        init();
        //添加导航
        (function() {
            var appendNav = function() {
                    var _links = '';
                    for (var i = 0; i < count; i++) {
                        _links += ("<a>" + (i + 1) + "</a>");
                    }
                    $navs.empty().append(_links);
                },
                navIllegal = function() {
                    if ($navs.children('a').length !== count) {
                        console.log('指定的"slide_navs"数量不匹配,将自动生成"slide_navs".');
                        return true;
                    } else {
                        return false;
                    }
                };
            if (opt.navs) {
                if ($(opt.navs).length === 1) {
                    $navs = $(opt.navs);
                    if ($navs.attr('custom') == void(0) || ($navs.attr('custom') != void(0) && navIllegal())) {
                        appendNav();
                    }
                } else {
                    console.log('只能指定唯一的slide_navs容器');
                    return;
                }
            } else if ($this.children(".slide_nav").length) {
                $navs = $this.children(".slide_nav").eq(0);
                if (navIllegal()) {
                    appendNav();
                }
            } else {
                $navs = $('<div class="slide_nav"></div>');
                appendNav();
                $this.append($navs);
            }
            $navs = $navs.children('a');
        })();
        //添加左右按钮
        if ($(opt.prev).length || $(opt.next).length) {
            $arrs = $(opt.prev).addClass('arr_prev').add($(opt.next).addClass('arr_next'));
        } else {
            $this.find(opt.prev).remove()
                .end().find(opt.next).remove()
                .end().append('<a href="###" class="arrs arr_prev" /><a href="###" class="arrs arr_next" />');
            $arrs = $this.children('.arrs');
        }
        if (opt.prevHtml && opt.prevHtml.split) {
            $arrs.filter('.arr_prev').html(opt.prevHtml);
        }
        if (opt.nextHtml && opt.nextHtml.split) {
            $arrs.filter('.arr_next').html(opt.nextHtml);
        }
        //初始化导航
        setNavs($navs, count, opt.start);
        //事件绑定
        if ($navs.length) {
            $navs.on(opt.act, function(e) {
                e.preventDefault();
                e.stopPropagation();
                var index = $(this).index(),
                    _dir, _step;
                if (windowLock || $this.hasClass('ontouch') || index >= count || $(this).hasClass("on")) {
                    return null;
                }
                //初始加载
                if (index === origin) {
                    origin = count - 1;
                    _dir = 1;
                    efftct(index, _dir);
                    return null;
                }
                _dir = index > origin ? true : false;
                efftct(index, _dir);
            });
        }
        if ($arrs.length) {
            $arrs.on('click', function(e) {
                e.preventDefault();
                if (windowLock || $this.hasClass('ontouch')) {
                    return null;
                }
                if ($(this).hasClass('arr_prev')) {
                    efftct(getPrev(origin, 0, count), 0);
                }
                if ($(this).hasClass('arr_next')) {
                    efftct(getNext(origin, 1, count), 1);
                }
            });
        }
        //自动 & 暂停
        if (opt.auto) {
            timer = setInterval(function() {
                efftct(getNext(origin, 1, count), 1);
            }, opt.interval);
            if (opt.pause === true) {
                $this.on({
                    'mouseenter': function() {
                        clearInterval(timer);
                    },
                    'mouseleave': function() {
                        clearInterval(timer);
                        timer = setInterval(function() {
                            efftct(getNext(origin, 1, count), 1);
                        }, opt.interval);
                    }
                });
            } else if (opt.pause.split && $(opt.pause).length) {
                $(opt.pause).on('click', function(e) {
                    e.preventDefault();
                    if ($this.data('slidepause')) {
                        $this.data('slidepause', false);
                        $(this).removeClass('pause');
                        clearInterval(timer);
                        timer = setInterval(function() {
                            efftct(getNext(origin, 1, count), 1);
                        }, opt.interval);
                    } else {
                        $this.data('slidepause', true);
                        $(this).addClass('pause');
                        clearInterval(timer);
                    }
                });
            }
        }
        $this.data('slide-init', 1).fadeIn(300)
            .parent().on('DOMNodeRemoved', function(e) {
                if ($(e.target).is($this)) {
                    //DOM移除后释放全局变量
                    timer && clearInterval(timer);
                }
            });
        //开始
        if ($this.data('play')) {
            $navs.eq($this.data('play')).trigger(opt.act);
        } else {
            efftct(opt.start, true, 1, true);
        }
        //响应式
        $(window).bind("orientationchange, resize", function(event) {
            if (windowLock) {
                return null;
            }
            windowLock = true;
            init();
            efftct($this.data('play'), true, 1, true);
            setTimeout(function() {
                windowLock = false;
            }, 0);
        });
        typeof(opt.onReady) === 'function' && opt.onReady($this, $cell, count);
    };

    $.fn.slide = function(config) {
        return Slide($.extend({
            el: this
        }, config || {}));
    };
    module.exports = Slide;
});