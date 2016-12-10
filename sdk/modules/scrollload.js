/*
 * name: scrollLoad.js
 * version: v0.1.0
 * update: build
 * date: 2015-11-26
 */
define('scrollLoad', function(require, exports, module) {
	//滚动加载

	$.fn.scrollLoad = function(callback, force) {
		var $wrap = $(this),
			running, $loading,
			safeDistance = 70;
		if ($wrap.find('#scrollLoadSpinning').length) {
			$loading = $wrap.find('#scrollLoadSpinning').hide();
		} else {
			$loading = $('<div class="scrollLoadSpinning" id="scrollLoadSpinning"><span class="_spin rotation"></span></div>');
		}

		if (!force) {
			if (callback === false) {
				$wrap.data('scroll-end-init', 0);
				return $wrap;
			}
			if ($wrap.data('scroll-end-init')) {
				return $wrap;
			}
		}

		if (!$wrap.data('scroll-end-init')) {
			$wrap.data('scroll-end-init', 1);
			api.addEventListener({
				name: 'scrolltobottom',
				extra: {
					threshold: safeDistance
				}
			}, function(ret, err) {
				if ($wrap.attr('nomore')) {
					return null;
				}
				running = true;
				//插入加载提示
				$wrap.append($loading.show()).scrollTop($wrap.scrollTop() + $loading.outerHeight(true) + safeDistance);
				if (typeof(callback) === 'function') {
					callback($wrap, $loading);
				}
				setTimeout(function() {
					running = null;
				}, 200);
			});
		}
		return $wrap;
	};

});