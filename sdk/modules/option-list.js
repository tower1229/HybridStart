/*
 * name: optionList
 * version: v1.0.1
 * update: 样式微调
 * date: 2017-05-10

//demo
 var demo = optionList({
    selector:'#View',
    data:[
        {
            item:'这是一个列表',
            className:'first'
        },{
            item:'这是一个列表'
        }
    ],
    buttons:[
        {
            text:'编辑'
        },{
            className:'btn-danger',
            text:'删除'
        }
    ],
    onClick:function(button, itemIndex, itemLength){
        var optionIndex = $(button).index();
        if(optionIndex==0){
            console.log('编辑')
        }else if(optionIndex==1){
            demo.delete(itemIndex)
        }
    }
})
 */
define('option-list', function(require, exports, module) {
    'use strict';
    seajs.importStyle('.item-right-options{padding:0}\
.item-content{position:relative;z-index:2;padding:16px;border:none;background-color:#fff;box-shadow:0 2px 4px rgba(0,0,0,.2)}\
.item-options{position:absolute;z-index:1;top:0;right:0;height:100%}\
.item-options .btn{display:-webkit-inline-box;display:-webkit-inline-flex;display:-moz-inline-flex;display:-ms-inline-flexbox;display:inline-flex;box-sizing:border-box;height:100%;border:none;border-radius:0;-webkit-box-align:center;-ms-flex-align:center;-webkit-align-items:center;-moz-align-items:center;align-items:center}', module.uri);
    var $ = require('jquery'),
        etpl = require('etpl');

    var item_temp = '<li class="item item-right-options scrollSelectItem ${className}">\
            <div class="item-content scrollSelectContent"> ${item|raw} </div>\
        </li>',
        button_temp = '<div class="item-options scrollSelectOptions">\
            <!-- for: ${buttons} as ${btn}, ${index} --><div class="btn ${btn.className}" data-index="${index}"> ${btn.text} </div><!-- /for -->\
        </div>',
        item_render = etpl.compile(item_temp),
        button_render = etpl.compile(button_temp);
    var OptionListView = function(option) {
        var self = this;
        self.option = $.extend({
            selector: "body",
            multiShow: false,
            duration: "300ms",
            touchClass: "active"
        }, option, true);
        self.ele = $(self.option.selector);
        //method
        self.delete = OptionListView.prototype.delete;
        self.add = OptionListView.prototype.add;

        if (self.option.data) {
            return self.set(self.option.data);
        }
        return self;
    };
    //返回角度
    function angle(start, end) {
        var diff_x = end.x - start.x,
            diff_y = end.y - start.y;
        return 360 * Math.atan(diff_y / diff_x) / (2 * Math.PI);
    };

    OptionListView.prototype = {
        buildListview: function(newData) {
            var container;
            var self = this;
            if($.isArray(newData)){
                container = "<ul class='list'>";
                newData.forEach(function(d){
                    container += item_render(d);
                });
                container += '</ul>';
            }else{
                container = item_render(newData);
            }
            if (!self.init) {
                var startX = 0,
                    startY = 0,
                    moveX = 0,
                    moveY = 0,
                    delWidth = $(".scrollRight").width(),
                    startMarginLeft = 0,
                    scrollEnable = true,
                    flag = 0; //是否已经计算过角度

                self.ele.get(0).addEventListener('touchstart', function(evt) {
                    var that = evt.target,
                        $btns;
                    if ($(that).parents('.scrollSelectContent').length) {
                        that = $(that).parents('.scrollSelectContent').get(0);
                    };
                    $btns = $(that).siblings(".scrollSelectOptions");
                    if (!$btns.length) {
                        $btns = $(button_render(self.option));
                        $(that).parents('.scrollSelectItem').append($btns);
                    };
                    $(that).parents('.scrollSelectItem').addClass('showOption');
                    if ($(that).hasClass('scrollSelectContent')) {
                        $(that).addClass(self.option.touchClass);

                        if (!self.option.multiShow) {
                            $(that).parents('.scrollSelectItem').siblings().find('.scrollSelectContent').each(function(i, e) {
                                e.style.transitionDuration = "100ms";
                                e.style.left = "0px";
                            });
                        };
                        scrollEnable = true;
                        flag = 0; //是否已经计算角度标记
                        var touch = evt.touches[0];
                        startX = touch.pageX; //起始x坐标
                        startY = touch.pageY; //起始Y坐标
                        moveX = touch.pageX; //移动X坐标
                        moveY = touch.pageY; //移动Y坐标
                        startMarginLeft = parseInt($(that)[0].style.marginLeft); //起始marginLeft
                        delWidth = $btns.width() || 0; //
                        $(".item-content").get(0).style.transitionDuration = "0ms";
                    }
                }, false);
                self.ele.get(0).addEventListener('touchmove', function(evt) {
                    var that = evt.target;
                    //滑动区域
                    if ($(that).parents('.scrollSelectContent').length) {
                        that = $(that).parents('.scrollSelectContent').get(0);
                    }
                    if ($(that).hasClass('scrollSelectContent')) {
                        if (scrollEnable == false) {
                            return;
                        } else {
                            var touch = evt.touches[0];
                            moveX = touch.pageX;
                            moveY = touch.pageY;
                            if (isNaN(startMarginLeft)) {
                                startMarginLeft = 0;
                            }
                            var marginLeft = startMarginLeft + moveX - startX;
                            marginLeft > 0 && (marginLeft = 0); //不能滑动到右边界外
                            if (marginLeft < -delWidth) {
                                //滑倒位置即刻停止
                                marginLeft = -delWidth;
                                $(that).removeClass(self.option.touchClass);

                            }
                            if (flag == 0) {
                                var startPoint = {
                                    x: startX,
                                    y: startY
                                };
                                var movePoint = {
                                    x: moveX,
                                    y: moveY
                                };
                                var angles = angle(startPoint, movePoint);
                                flag = 1;
                                if (parseInt(angles) < -30 || parseInt(angles) > 30) {

                                    scrollEnable = false;
                                } else {
                                    if (parseInt($(that)[0].style.marginLeft) > 0) {
                                        return;
                                    }
                                    that.style.transitionDuration = "0ms";
                                    that.style.left = marginLeft + "px";
                                    evt.preventDefault();
                                }
                            } else {
                                if (scrollEnable == false) {
                                    return;
                                }
                                if (parseInt($(that)[0].style.marginLeft) > 0) {
                                    return;
                                }
                                that.style.transitionDuration = "0ms";
                                that.style.left = marginLeft + "px";
                            }
                        }
                    };

                }, false);
                self.ele.get(0).addEventListener('touchend', function(evt) {
                    var that = evt.target,
                        _cont = $(that).parents('.scrollSelectItem').find('.scrollSelectContent');
                    if ($(that).parents('.scrollSelectContent').length) {
                        that = $(that).parents('.scrollSelectContent').get(0);
                    }
                    if ($(that).hasClass('scrollSelectContent')) {

                        _cont.removeClass(self.option.touchClass);

                        if (!scrollEnable) {
                            return;
                        }
                        _cont.get(0).style.transitionDuration = self.option.duration;
                        if ((startX - moveX) > delWidth / 2) {
                            _cont.get(0).style.left = -delWidth + "px";
                            $(that).parents('.scrollSelectItem').addClass('showOption');
                        } else {
                            _cont.get(0).style.left = "0px";
                            $(that).parents('.scrollSelectItem').removeClass('showOption');
                        }
                    };
                    //选项事件
                    if ($(that).parents('.scrollSelectOptions').length) {
                        var itemIndex = $(that).parents('.scrollSelectItem').data("index");
                        var optionIndex = $(that).index();
                        var itemLength = self.ele.find(".scrollSelectItem").length;
                        _cont.get(0).style.left = "0px";
                        if (typeof self.option.onClick == "function") {
                            self.option.onClick(that, itemIndex, itemLength);
                        }
                    }
                }, true);
                self.init = true;
            }

            return $(container);
        },
        add: function(newData, dir) {
            var self = this;
            var data = self.data;
            var container = self.buildListview(newData);
            if (dir) {
                self.ele.children('.list').prepend(container);
                data.unshift(newData);
                self.data = data;
            } else {
                self.ele.children('.list').append(container);
                data.push(newData);
                self.data = data;
            }
            return self.sort();
        },
        set: function(data) {
            var self = this;
            var container = self.buildListview(data);
            self.ele.html(container);
            self.data = $.extend(true, [], data);
            return self.sort();
        },
        delete: function(itemIndex) {
            var self = this;
            var data = self.data;
            var delnode = self.ele.find(".scrollSelectItem")[itemIndex];
            delnode.parentNode.removeChild(delnode);
            data.splice(itemIndex, 1);
            self.data = data;
            self.sort();
        },
        sort: function() {
            var self = this;
            self.ele.find('.scrollSelectItem').each(function(i, e) {
                $(e).data('index', i);
            });
            return self;
        }
    };

    module.exports = function(option) {
        return new OptionListView(option);
    };
});