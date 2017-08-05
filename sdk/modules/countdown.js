/*
 * name: countdown.js
 * version: v1.1.1
 * update: ie8 日期格式兼容
 * data: 2017-01-10
 */
define('countdown', function(require, exports, module) {
	'use strict';
	var $ = window.$ || require('jquery'),
		leadingZeros = function(num, length) {
			length = length || 2;
			num = String(num);
			if (num.length >= length) {
				return num;
			}
			return (Array(length).join('0') + num).substr(-length);
		},
		startLocal,
		fromISO= function(s){
	        var day, tz,
	        rx=/^(\d{4}\-\d\d\-\d\d([tT ][\d:\.]*)?)([zZ]|([+\-])(\d\d):(\d\d))?$/,
	        p= rx.exec(s) || [];
	        if(p[1]){
	            day= p[1].split(/\D/);
	            for(var i= 0, L= day.length; i<L; i++){
	                day[i]= parseInt(day[i], 10) || 0;
	            }
	            day[1]-= 1;
	            day= new Date(Date.UTC.apply(Date, day));
	            if(!day.getDate()) return NaN;
	            if(p[5]){
	                tz= (parseInt(p[5], 10)*60);
	                if(p[6]) tz+= parseInt(p[6], 10);
	                if(p[4]== '+') tz*= -1;
	                if(tz) day.setUTCMinutes(day.getUTCMinutes()+ tz);
	            }
	            return day;
	        }
	        return NaN;
	    },
		getDiffDate = function(startDate, endDate, offset, noDiff) {
			var _startServer = new Date(startDate).getTime(),
				_endServer = new Date(endDate).getTime(),
				diff,
				dateData = {
					years: 0,
					days: 0,
					hours: 0,
					min: 0,
					sec: 0,
					millisec: 0
				};
			if(isNaN(_startServer)){
				if(startDate.indexOf(' ')){
					startDate = startDate.replace(' ','T');
				}
				_startServer = fromISO(startDate).getTime();
			}
			if(isNaN(_endServer)){
				if(endDate.indexOf(' ')){
					endDate = endDate.replace(' ','T');
				}
				_endServer = fromISO(endDate).getTime();
			}
			diff = (_endServer - (_startServer + new Date().getTime() - startLocal) + parseInt(offset)) / 1000;
			if (diff <= 0) {
				typeof(noDiff) === 'function' && noDiff();
				dateData.hours = leadingZeros(dateData.hours);
				dateData.min = leadingZeros(dateData.min);
				dateData.sec = leadingZeros(dateData.sec);
				return dateData;
			}
			if (diff >= (365.25 * 86400)) {
				dateData.years = Math.floor(diff / (365.25 * 86400));
				diff -= dateData.years * 365.25 * 86400;
			}
			if (diff >= 86400) {
				dateData.days = Math.floor(diff / 86400);
				diff -= dateData.days * 86400;
			}
			if (diff >= 3600) {
				dateData.hours = Math.floor(diff / 3600);
				diff -= dateData.hours * 3600;
			}
			if (diff >= 60) {
				dateData.min = Math.floor(diff / 60);
				diff -= dateData.min * 60;
			}
			dateData.sec = Math.round(diff);
			dateData.millisec = diff % 1 * 1000;
			dateData.hours = leadingZeros(dateData.hours);
			dateData.min = leadingZeros(dateData.min);
			dateData.sec = leadingZeros(dateData.sec);
			return dateData;
		},
		def = {
			begin: null,
			date: null,
			refresh: 1000,
			offset: 0,
			onEnd: null,
			render: function(dom, date) {
				dom.html(date.years + " 年, " +
					date.days + " 天, " +
					date.hours + " 时, " +
					date.min + " 分 " +
					date.sec + " 秒"
				);
			}
		};
	$.fn.Countdown = function(options) {
		var $this = $(this),
			opt = $.extend({}, def, options || {});
		if (!opt.date) {
			return console.warn("Countdown()参数错误");
		}
		if (!opt.begin) {
			opt.begin = new Date();
		}
		if ($this.length > 1) {
			$this = $this.eq(0);
			console.log("Countdown()不支持多元素同时应用");
		}

		// start
		var countDownMethod = {
				stop: function() {
					clearInterval(countDownMethod.interval);
					delete countDownMethod.interval;
				}
			},
			init = function(opt) {
				var lock = false;
				if (countDownMethod.interval) {
					countDownMethod.stop();
				}
				startLocal = new Date().getTime();
				opt.render($this, getDiffDate(opt.begin, opt.date, opt.offset, function() {
					lock = true;
				}));
				if (opt.refresh && !lock) {
					countDownMethod.interval = setInterval(function() {
						opt.render($this, getDiffDate(opt.begin, opt.date, opt.offset, function() {
							countDownMethod.stop();
							setTimeout(function() {
								typeof(opt.onEnd) === 'function' && opt.onEnd($this);
							}, 0);
						}));
					}, opt.refresh);
				} else {
					setTimeout(function() {
						typeof(opt.onEnd) === 'function' && opt.onEnd($this);
					}, 0);
				}
			};
		init(opt);
		countDownMethod.update = function(newOptions) {
			if ($.isPlainObject(newOptions)) {
				var newOpt = $.extend({}, opt, newOptions);
				init(newOpt);
			}
		};
		return countDownMethod;
	};
});