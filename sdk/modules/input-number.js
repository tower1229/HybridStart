/*
 * name: input-number.js
 * version: v0.2.1
 * update: countstep传入字符串容错
 * date: 2018-04-23
 */
define("input-number", function(require, exports, module) {
	"use strict";
	seajs.importStyle('.pro_counter_val{ min-width:2em;text-align: center;}\
		.pro_counter_btn{cursor:pointer;user-select:none;}\
		.pro_counter_btn:hover{color:#000;}\
		.pro_counter_btn.disabled{background:#ddd;cursor: not-allowed;}\
		.counter_default{position: relative;display: inline-block;vertical-align: middle; padding:0 30px 0 0; white-space: nowrap;}\
		.counter_default .pro_counter_val{height:38px;line-height:38px;border-radius:4px 0 0 4px;}\
		.counter_default .pro_counter_btn{position: absolute; right:0; width:29px;height:18px; line-height: 18px; margin:0;padding:0;\
		background: #f8f8f8; border:1px solid #e8e9eb;border-left:0;text-align:center; outline: none}\
		.counter_default .pro_counter_btn:hover{background:#eee;}\
		.counter_default .pro_counter_reduce{bottom:0;border-top:0;border-bottom-right-radius:4px;}\
		.counter_default .pro_counter_add{top:0;border-bottom:0;border-top-right-radius:4px;}', module.uri);
	require('input');
	var $ = window.$ || require('jquery'),
		def = {
			el: null,
			val: null,
			countstep: 1,
			min: 0,
			max: Number.POSITIVE_INFINITY,
			style: 'default'
		},
		syncButtonStatus = function(_val, _opt, _reduce, _plus){
			if (_val < (_opt.min + _opt.countstep)) {
				_reduce.addClass('disabled');
			} else {
				_reduce.removeClass('disabled');
			}
			if (_val <= (_opt.max - _opt.countstep)) {
				_plus.removeClass('disabled');
			} else {
				_plus.addClass('disabled');
			}
		},
		catchClickEvent = function(e) {
			var target = $(e.target),
				_input,
				_reduce,
				_plus,
				_opt,
				_val;
			//计数器减
			if (target.is('.pro_counter_reduce') || target.parents('.pro_counter_reduce').length) {
				e.preventDefault();
				if (target.parents('.pro_counter_reduce').length) {
					target = target.parents('.pro_counter_reduce');
				}
				_input = target.parent().find('.pro_counter_val');
				if (target.hasClass('disabled') || _input.prop('disabled') || _input.prop('readonly')) {
					return null;
				}
				_opt = _input.data('opt');
				_reduce = target;
				_plus = target.parent().find('.pro_counter_add');
				_val = parseFloat(_input.val());
				if (_val < (_opt.min + _opt.countstep)) {
					_input.val(_opt.min);
					_reduce.addClass('disabled');
				} else {
					_input.val(_val <= _opt.max ? (_val - _opt.countstep) : _opt.max);
					_reduce.removeClass('disabled');
				}
				_input.trigger('change');
			}
			//计数器增加
			if (target.is('.pro_counter_add') || target.parents('.pro_counter_add').length) {
				e.preventDefault();
				if (target.parents('.pro_counter_add').length) {
					target = target.parents('.pro_counter_add');
				}
				_input = target.parent().find('.pro_counter_val');
				if (target.hasClass('disabled') || _input.prop('disabled') || _input.prop('readonly')) {
					return null;
				}
				_opt = _input.data('opt');
				_reduce = target.parent().find('.pro_counter_reduce');
				_plus = target;
				_val = parseFloat(_input.val());
				if (_val <= (_opt.max - _opt.countstep)) {
					_input.val(_val + _opt.countstep);
					_plus.removeClass('disabled');
				} else {
					_input.val(_opt.max);
					_plus.addClass('disabled');
				}
				_input.trigger('change');
			}
			//更新按钮状态
			if(_input){
				_val = parseFloat(_input.val());
				syncButtonStatus(_val, _opt, _reduce, _plus);
			}
		},
		catchBlurEvent = function(e) {
			var target = $(e.target),
				_input,
				_opt,
				_reduce,
				_plus,
				_val;
			_input = target;
			_opt = _input.data('opt');
			_reduce = target.parent().find('.pro_counter_reduce');
			_plus = target.parent().find('.pro_counter_add');
			_val = _input.val(); //校验原始值合法性
			if (isNaN(_val)) {
				_val = isNaN(parseFloat(_val.replace(/\D/g, ""))) ? 0 : parseFloat(_val.replace(/\D/g, ""));
				setTimeout(function() {
					_input.trigger('change');
				}, 0);
			}
			_input.val(_val);
			if (_val < _opt.min) {
				_input.val(_opt.min);
				setTimeout(function() {
					_input.trigger('change');
				}, 0);
			} else if (_val > _opt.max) {
				_input.val(_opt.max);
				setTimeout(function() {
					_input.trigger('change');
				}, 0);
			}
			syncButtonStatus(_val, _opt, _reduce, _plus);
		},
		inputNumber = function(config) {
			var opt = $.extend({}, def, config || {}),
				template,
				inputObject,
				$this = $(opt.el);
			if (!$this.length) {
				return null;
			}
			$.extend(opt, $.isPlainObject($this.data('options')) ? $this.data('options') : {});
			//countstep传入字符串容错
			opt.countstep = parseFloat(opt.countstep);
			switch ($.trim(opt.style)) {
				case "inline":
					template = '<${wrapTag} data-input-init="true" class="counter_wrap counter_inline input-group${color}<!-- if: ${className} --> ${className}<!-- /if -->"<!-- if: ${width} --> style="width:${width}px"<!-- /if -->>\
	    <div class="pro_counter_btn pro_counter_reduce input-group-addon">-</div>\
	    <input type="${type}" id="${id}" placeholder="${holder}" value="${val}" class="form-control pro_counter_val"<!-- if: ${disable} --> disabled<!-- /if --><!-- if: ${readonly} --> readonly<!-- /if -->><div class="pro_counter_btn pro_counter_add input-group-addon">+</div>\
	</${wrapTag}>';
					break;
				default:
					template = '<${wrapTag} data-input-init="true" class="counter_wrap counter_default${color}<!-- if: ${className} --> ${className}<!-- /if -->"<!-- if: ${width} --> style="width:${width}px"<!-- /if -->>\
	    <div class="pro_counter_btn pro_counter_reduce">-</div>\
	    <input type="${type}" id="${id}" placeholder="${holder}" value="${val}" class="form-control pro_counter_val"<!-- if: ${disable} --> disabled<!-- /if --><!-- if: ${readonly} --> readonly<!-- /if -->><div class="pro_counter_btn pro_counter_add">+</div>\
	</${wrapTag}>';
			}
			opt.template = template;

			inputObject = $this.input(opt);
			setTimeout(function() {
				$.each(inputObject.renderDom, function(i, e) {
					$(e).on('click', catchClickEvent);

				});
				$.each(inputObject.shadowInput, function(i, e) {
					$(e).on('blur', catchBlurEvent);
				});
			}, 0);
			return inputObject;
		};

	$.fn.inputNumber = function(config) {
        return inputNumber($.extend({
            el: this
        }, config || {}));
    };

	//自动初始化
	$('.flow-ui-input-number').inputNumber();
	module.exports = inputNumber;
});