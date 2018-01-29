/*
 * name: input.js
 * version: v0.1.7
 * update: bug fix
 * date: 2018-01-29
 */
define('input', function(require, exports, module) {
    "use strict";
    seajs.importStyle('.input-widget{display:inline-block;vertical-align:bottom;margin:0;}\
        .icon-left .form-control-feedback{right:auto;left:0;}\
        .input-widget .btn{min-width:0}\
        .input-widget .btn:first{border-left:0}', module.uri);
    var $ = window.$ || require('jquery'),
        base = require('base'),
        etpl = require('etpl'),
        etplEngine = new etpl.Engine(),
        tap = ('ontouchstart' in document) ? 'touchend' : 'click',
        def = {
            el: null,
            color: '',
            id: '',
            width: null,
            buttons: null,
            type: '',
            holder: '',
            val: null,
            text: '',
            icon: '',
            iconPosition: 'right',
            size: '',
            name: '',
            disable: false,
            readonly: false,
            datatype: '',
            errormsg: '',
            nullmsg: '',
            wrapTag: 'div',
            render: null,
            onChange: null
        };

    var Input = function(config) {
        var focusHandle = function(e) {
                var that = e.target,
                    opt = $(that).data('opt'),
                    $this = $(that).data('target');
                if (typeof(opt.render) === 'function') {
                    var cleanval = $(that).data('clean');
                    if (cleanval !== void(0)) {
                        $(that).val(cleanval);
                    } else {
                        $this.val($(this).val());
                    }
                }
            },
            changeHandle = function(e) {
                var that = e.target,
                    opt = $(that).data('opt'),
                    $this = $(that).data('target'),
                    newVal = $(that).val();
                $this.val(newVal);
                if (typeof(opt.onChange) === 'function') {
                    opt.onChange(newVal);
                }
            },
            blurHandle = function(e) {
                var that = e.target,
                    opt = $(that).data('opt'),
                    $this = $(that).data('target'),
                    lastval = $(that).val(),
                    validformHandle = $(that).data('validhandle');
                if ($.trim(lastval) && typeof(opt.render) === 'function') {
                    if (opt.datatype && validformHandle) {
                        if (validformHandle.check(false, '#' + opt.id)) {
                            $(that).data('clean', lastval).val(opt.render(lastval));
                        } else {
                            $(that).data('clean', '');
                            $this.val('');
                        }
                    } else {
                        $(that).data('clean', lastval).val(opt.render(lastval));
                    }
                }
            },
            returnObject = {
                renderDom: [],
                shadowInput: [],
                disabled: function(flag) {
                    $.each(this.shadowInput, function(i, e) {
                        $(e).prop('disabled', !flag);
                        if (flag) {
                            $(e)
                                .on('focus', focusHandle)
                                .on('change', changeHandle)
                                .on('blur', blurHandle);
                        } else {
                            $(e)
                                .unbind('focus', focusHandle)
                                .unbind('change', changeHandle)
                                .unbind('blur', blurHandle);
                        }
                    });
                },
                readonly: function(flag) {
                    $.each(this.shadowInput, function(i, e) {
                        $(e).prop('readonly', !flag);
                        if (flag) {
                            $(e)
                                .on('focus', focusHandle)
                                .on('change', changeHandle)
                                .on('blur', blurHandle);
                        } else {
                            $(e)
                                .unbind('focus', focusHandle)
                                .unbind('change', changeHandle)
                                .unbind('blur', blurHandle);
                        }
                    });
                },
                destroy: function() {
                    $.each(this.renderDom, function(i, e) {
                        $(e).remove();
                    });
                    this.renderDom = [];
                    this.shadowInput = [];
                },
                clear: function() {
                    $.each(this.shadowInput, function(i, e) {
                        $(e).val('').data('clean', '').trigger('change');
                    });
                },
                reset: function() {
                    $.each(this.shadowInput, function(i, e) {
                        var opt = $(e).data('opt');
                        $(e).val(opt.val).trigger('change');
                    });
                },
                text: function(text) {
                    if (text !== void(0)) {
                        text = $.trim(text);
                        $.each(this.shadowInput, function(i, e) {
                            $(e).val(text);
                        });
                    } else {
                        return this.shadowInput[0].val();
                    }
                },
                val: function(val) {
                    if (val !== void(0)) {
                        val = $.trim(val);
                        $.each(this.shadowInput, function(i, e) {
                            $(e).val(val).trigger('change').trigger('blur');
                        });
                    } else {
                        return this.shadowInput[0].data('clean') || '';
                    }
                }
            },
            commonOpt = $.extend({}, def, config || {}),
            $el = $(commonOpt.el);

        if (!$el.length) {
            return null;
        }
        $el.each(function(i, e) {
            var $this = $(e),
                opt = $.extend({}, commonOpt, $this.data('config') || {}),
                render,
                tagname = $this.get(0).tagName.toLowerCase(),
                template = opt.template || ''; //接受自定义模板
            if ($this.data('input-init')) {
                return null;
            }
            //默认使用原始值
            if(opt.val===null){
                opt.val = $this.val() || 0;
            }
            //沿用禁用状态
            if(opt.disable===null){
                opt.disable = $this.prop('disabled');
            }
            
            $.extend(opt, $.isPlainObject($this.data('options')) ? $this.data('options') : {});
            $this.data('input-init', true);
            //数据准备
            if (opt.color && opt.color.split) {
                opt.color = ' has-' + $.trim(opt.color);
            }
            if (!opt.id) {
                opt.id = 'input-' + base.getUUID();
            }
            if (opt.size === 'sm' || opt.size === 'lg') {
                opt.wrapSizeClass = ' form-group-' + opt.size;
                opt.groupSizeClass = ' input-group-' + opt.size;
            } else if (opt.size) {
                console.warn('input():size参数不正确');
            }
            if (!opt.type) {
                opt.type = $this.attr('type') || 'text';
            }
            if (!opt.datatype) {
                opt.datatype = $this.attr('datatype') || '';
                if (!opt.errormsg) {
                    opt.errormsg = $this.attr('errormsg') || '';
                }
                if (!opt.nullmsg) {
                    opt.nullmsg = $this.attr('nullmsg') || '';
                }
            }
            if ($.isArray(opt.buttons) && opt.buttons.length) {
                opt.iconPosition = 'left';
            } else {
                opt.buttons = null;
            }
            opt.className = $.trim($this.attr('class').replace(/flowui-input/g, '').split(' ').join(' '));
            if (!$this.parents('form').length) {
                opt.wrapTag = 'form';
            }
            if (!template) {
                if (tagname === 'textarea') {
                    template = '<${wrapTag} data-input-init="true" class="input-widget form-group${color}${wrapSizeClass}<!-- if: ${className} --> ${className}<!-- /if -->"<!-- if: ${width} --> style="width:${width}px"<!-- /if -->>\
        <textarea class="form-control" id="${id}" placeholder="${holder}" value="${val}"<!-- if: ${disable} --> disabled<!-- /if --><!-- if: ${readonly} --> readonly<!-- /if --><!-- if: ${datatype} --> datatype="${datatype}"<!-- if: ${errormsg} --> errormsg="${errormsg}"<!-- /if --><!-- if: ${nullmsg} --> nullmsg="${nullmsg}"<!-- /if --><!-- /if -->></textarea>\
    </${wrapTag}>';
                } else {
                    template = '<${wrapTag} data-input-init="true" class="input-widget form-group${color}${wrapSizeClass}<!-- if: ${iconPosition} === "left" --> icon-left<!-- /if --><!-- if: ${icon} --> has-feedback<!-- /if --><!-- if: ${className} --> ${className}<!-- /if -->"<!-- if: ${width} --> style="width:${width}px"<!-- /if -->>\
        <!-- if: ${buttons} --><div class="input-group${groupSizeClass}"><!-- /if -->\
        <input type="${type}" class="form-control" id="${id}" placeholder="${holder}" value="${text}"<!-- if: ${disable} --> disabled<!-- /if --><!-- if: ${readonly} --> readonly<!-- /if -->><!-- if: ${buttons} --><!-- for: ${buttons} as ${btn}, ${index} --><span class="input-group-addon btn" data-index="${index}">${btn.text}</span><!-- /for -->\
        </div>\
        <!-- /if -->\
        <!-- if: ${icon} -->\
        <i class="ion form-control-feedback">${icon | raw}</i>\
        <!-- /if -->\
    </${wrapTag}>';
                }
            }
            etplEngine.config({
                variableOpen: '${',
                variableClose: '}'
            });
            render = etplEngine.compile(template);
            var renderDom = $(render(opt)),
                shadowInput = renderDom.find('#' + opt.id),
                validformHandle;

            //生成
            if (tagname === 'textarea' || tagname === 'input') {
                $this.hide().after(renderDom);
                if (opt.name && opt.name.split) {
                    $this.attr('name', opt.name);
                }
                if (opt.val) {
                    $this.val(opt.val);
                }
            } else {
                shadowInput.attr('name', opt.name || opt.id);
                $this.html(renderDom);
            }
            //按钮事件
            if ($.isArray(opt.buttons) && opt.buttons.length) {
                renderDom.on(tap, '.input-group-addon', function() {
                    if (!shadowInput.prop('readonly') && !shadowInput.prop('disabled')) {
                        var clickHandle = opt.buttons[$(this).data('index')].click;
                        if (typeof clickHandle === 'function') {
                            clickHandle(shadowInput.data('clean') || '', shadowInput.val());
                        }
                    }
                });
            }
            //验证
            if (opt.datatype) {
                require.async('validform', function() {
                    //等待可能的其他validform实例化完成
                    setTimeout(function() {
                        if (shadowInput.parents('form').get(0).handle) {
                            validformHandle = shadowInput.parents('form').get(0).handle;
                        } else {
                            validformHandle = shadowInput.parents('form').Validform({
                                checkTime: 0
                            });
                        }
                        if (validformHandle) {
                            validformHandle.addRule([{
                                ele: "#" + opt.id,
                                datatype: opt.datatype,
                                nullmsg: opt.nullmsg,
                                errormsg: opt.errormsg
                            }]).ignore("#" + opt.id);
                        }
                    }, 0);
                });
            }
            //修饰
            if (!shadowInput.prop('readonly') && !shadowInput.prop('disabled')) {
                shadowInput
                    .on('focus', focusHandle)
                    .on('change', changeHandle)
                    .on('blur', blurHandle);
            }
            //返回对象
            setTimeout(function() {
                returnObject.shadowInput.push(shadowInput.data('opt', opt).data('target', $this).data('validhandle', validformHandle));
                returnObject.renderDom.push(renderDom);
            }, 0);
        });
        return returnObject;
    };

    $.fn.input = function(config) {
        return Input($.extend({
            el: this
        }, config || {}));
    };
    //自动初始化
    $('.flow-ui-input').input();
    module.exports = Input;
});