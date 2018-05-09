/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');require('sdk/common');
    var $ = app.util;
    var extParam = app.getParam();
    if(!extParam){
        return console.log('参数错误');
    }
    var mark;
    var choosenItem = {data:[]};
    if(extParam && extParam.mark){
        mark = extParam.mark;
        choosenItem.mark = mark;
    }
    // render
    var render = require('render');
    var doRend = render({
        el: '#storeList',
        callback: function(){
            app.window.evaluate({
                script: 'app.loading.hide()'
            });
        }
    });

    var dataRender = function(data, getMore) {
        $.each(data.data,function(i,e){
            if(e.sublist && e.sublist.length){
                e.hasSub = 1;
            }
            e.multi = !!extParam.multi;
        });
        extParam = data;
        //console.log(JSON.stringify(extParam));
        doRend.data(data);
    };

    var getData = function(getMore) {
        app.ajax({
            url: extParam.url,
            data: extParam,
            cache :true,
            success: function(res) {    
                if (res.status === 'Y') {
                    dataRender(res, getMore);
                } else {
                	app.window.evaluate({
                        script: 'app.loading.hide()'
                    });
                    $('#storeList')[0].innerHTML = '';
                    app.toast(res.msg, {
                        color: 'danger',
                        delay: 2000
                    });
                }
            },
            error:function(){
                app.toast('网络异常，请重试');
                app.window.evaluate({
                    script: 'app.loading.hide()'
                });
            }
        });
    };
    //匹配下一级array
    var getListById = function(id,oArray){
        var _;
        if($.isArray(oArray)){
            $.each(oArray,function(i,e){
                if(e.id==id){
                    if(e.sublist){
                        return (_ = e.sublist);
                    }else{
                        return (_ = e);
                    }
                }
            });
        }
        return _;
    };
    var init = function(){
        if(extParam && extParam.url){
            getData();
        }else{
            dataRender(extParam);
        }
    };
    //点选
    $('#storeList').on('touchstart', '.chooseListHook', function() {
        //单选
        $(this).data('acting',true);
    }).on('touchmove', '.chooseListHook',function(){
        $(this).data('acting',false);
    }).on('touchcancel', '.chooseListHook',function(){
        $(this).data('acting',false);
    }).on('touchend', '.chooseListHook',function(){
        if($(this).data('acting')){
            var thisObj = getListById($(this).data('id'), extParam.data);
            $.extend(choosenItem, thisObj);
            app.storage.val('choosenItem',JSON.stringify(choosenItem));
        }
    }).on('touchstart','.chooseListHookMulti',function(){
        //多选
        $(this).data('acting',true);
    }).on('touchmove', '.chooseListHookMulti',function(){
        $(this).data('acting',false);
    }).on('touchcancel', '.chooseListHookMulti',function(){
        $(this).data('acting',false);
    }).on('touchend', '.chooseListHookMulti',function(){
        if($(this).data('acting')){
            if(this.querySelector('input:checked')){
                var _catchData = choosenItem.data, 
                    _catchId = $(this).data('id');
                $.each(_catchData,function(i,e){
                    if(e.id==_catchId){
                        _catchData.splice(i,1);
                        return false;
                    }
                });
                choosenItem.data = _catchData;
            }else{
                choosenItem.data.push({
                    id:$(this).data('id')
                });
            }
            
            app.storage.val('choosenItem',JSON.stringify(choosenItem));
        }
    }).on('click','.item-icon-right',function(){
        //下级
        var subList = getListById($(this).data('id'), extParam.data);
        extParam.data  = subList;
        init();
    });

	app.ready(function() {
		init();

	});
});