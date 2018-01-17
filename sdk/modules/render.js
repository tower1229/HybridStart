/*
 * name: render
 * version: 0.2.0
 * update: callback param change
 * date: 2017-09-30
 */
define('render', function(require, exports, module) {
	'use strict';
	var $ = require('jquery'),
		etpl = require('etpl');

	var DEFAULT = {
		el: '',
		template: '',
		data: null,
		reload: true,
		callback: null,
		etplConfig: null
	};

	module.exports = function(config) {
		var opt = $.extend({}, DEFAULT, config || {});
		var $el = $(opt.el);
		if (!$el.length) {
			return console.warn('Render: ${config.el} is necessary!');
		}
		//etpl config
		if($.isPlainObject(opt.etplConfig)){
			etpl.config(opt.etplConfig);
		}
		var template = opt.template;
		if (!template) {
			if ($el.find('[template]').length) {
				template = $.trim($el.find('[template]').val() || $el.find('[template]').html());
			} else {
				template = $.trim($el.html());
			}
		}

		var data = opt.data;
		if (!template || !template.split) {
			return console.warn('Render: ${config.template} Error!');
		}
		var tRender = etpl.compile(template);
		var rend = function(userData) {
			var tHtml = tRender(userData);
			if(opt.reload){
				$el.html(tHtml);
			}else{
				$el.append(tHtml);
			}
			$el.find('.block-holder').removeClass('block-holder');
			if (typeof opt.callback === 'function') {
				opt.callback($el.get(0), userData);
			}
		};
		//init
		if ($.isPlainObject(data)) {
			rend(data);
		}
		return {
			set: function(config){
				$.extend(opt, config || {});
				return this;
			},
			data: function(setData) {
				if (setData === void 0) {
					return data;
				} else {
					data = $.extend(data || {}, setData);
					rend(data);
				}
			},
			push: function(node, array) {
				if (node && node.split && $.isArray(array)) {
					if (!$.isPlainObject(data)) {
						data = {};
					}
					if (!$.isArray(data[node])) {
						data[node] = [];
					}
					data[node] = data[node].concat(array);
					rend(data);
				}
			},
			destroy: function() {
				$el.remove();
				$el = opt = template = data = tRender = null;
				delete this.set;
				delete this.data;
				delete this.push;
				delete this.destroy;
			}
		};
	};
});