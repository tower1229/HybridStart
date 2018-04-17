/*
 * name: scroll-load
 * version: 1.0.5
 * updata: bug fix
 * data: 2018-04-17
 */
define('scroll-load', function(require, exports, module) {
    "use strict";
    seajs.importStyle('.scrollLoadSpinning{text-align: center;background:#fff;padding:.3em}\
        .scrollLoadSpinning ._spin{display: block;margin:auto;width:2.5em;height: 2.5em;background-size: contain !important;\
        -webkit-animation: rotation  0.8s infinite linear; animation: rotation  0.8s infinite linear;\
        background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUU0ODg3QjVDQkI5MTFFNTlBODNBQzlERjBCRkNEOEQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUU0ODg3QjZDQkI5MTFFNTlBODNBQzlERjBCRkNEOEQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1RTQ4ODdCM0NCQjkxMUU1OUE4M0FDOURGMEJGQ0Q4RCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1RTQ4ODdCNENCQjkxMUU1OUE4M0FDOURGMEJGQ0Q4RCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pi7H17IAAAgrSURBVHja7FlrbFRF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) center no-repeat;}\
        @-webkit-keyframes rotation { 0% { -webkit-transform: rotateZ(0deg);}\
        100% { -webkit-transform: rotateZ(360deg);}}\
        @keyframes rotation { 0% { transform: rotateZ(0deg);}\
        100% { transform: rotateZ(360deg);}}', module.uri);
    var $ = window.jQuery || require('jquery'),
        base = require('base'),
        def = {
            el: null,
            callback: null,
            force: false,
            distance: 70,
            loadingTemplate: '<div class="scrollLoadSpinning"><span class="_spin"></span></div>'
        },
        scrollLoad = function(config) {
            var opt = $.extend({}, def, config || {}),
                $wrap = $(opt.el).eq(0),
                loadingId,
                scrollDom, 
                viewH, 
                contHeight, 
                scrollCB, 
                running, 
                $loading, 
                destroy;
            if (!$wrap.length) {
                console.warn(opt.el + '不存在');
                return null;
            }
            loadingId = $wrap.data('scroll-load-id') || base.getUUID();
            if ($wrap.is('body')) {
                scrollDom = $(window);
                contHeight = function() {
                    return $(document).height();
                };
            } else {
                scrollDom = $wrap;
                if (!$wrap.find('.scrollLoadCont').length) {
                    $wrap.wrapInner('<div class="scrollLoadCont" />');
                }
                contHeight = function() {
                    return $wrap.children('.scrollLoadCont').height();
                };
            }
            if ($wrap.find('#' + loadingId).length) {
                $loading = $wrap.find('#' + loadingId).css('display','none');
            } else if (opt.loadingTemplate && opt.loadingTemplate.split) {
                $loading = $(opt.loadingTemplate).attr('id', loadingId).css('display','none');
            }
            destroy = function() {
                $wrap.data('scroll-load-id', null);
                $('#' + loadingId).remove();
                scrollDom.unbind('scroll', scrollCB);
                return null;
            };
            if (opt.force) {
                destroy();
            } else {
                if (window.nomore) {
                    return destroy();
                }
                if ($wrap.data('scroll-load-id')) {
                    return null;
                }
            }
            viewH = function() {
                return scrollDom.height();
            };
            scrollCB = function() {
                if (running) {
                    return $wrap;
                }
                var contentH = contHeight(),
                    scrollTop = $(this).scrollTop();
                if (contentH - viewH() - scrollTop < opt.distance) {
                    running = true;
                    //插入加载提示
                    if ($loading.length) {
                        $wrap.append($loading.css('display','block')).scrollTop($wrap.scrollTop() + $loading.outerHeight(true) + opt.distance);
                    } else {
                        $wrap.scrollTop($wrap.height());
                    }

                    if (typeof(opt.callback) === 'function') {
                        opt.callback(function() {
                            $loading && $loading.css('display','none');
                            running = null;
                        });
                    }
                }
            };
            if (!$wrap.data('scroll-load-id')) {
                $wrap.data('scroll-load-id', loadingId);
                scrollDom.on('scroll', scrollCB);
            }
            return {
                destroy: destroy
            };
        };

    $.fn.scrollLoad = function(config) {
        return scrollLoad($.extend({
            el: this
        }, config || {}));
    };
    module.exports = scrollLoad;
});