/**
 * index
 */
define(function(require) {
    var $ = require('jquery');

    var Dropdown = require('dropdown');
    Dropdown({
        el: '.drogdownHandle',
        items: [{
            item: '个人设置',
            data: 'demo1'
        }, {
            item: '数据统计',
            data: 'demo1'
        }, {
            item: '立即更新',
            data: 'demo1'
        }]
    });

    require('select');
    var dataAjax = [{
        "option": "济南",
        "value": "jinan"
    }, {
        "option": "烟台",
        "value": "yantai",
        "selected": true
    }, {
        "option": "青岛",
        "value": "qingdao"
    }];
    $('.selectHandle').select({
    	data: dataAjax,
    });

    require('label');
    var mytag = $('.lableHandle').label({
        data: [{
            text: '标签1',
            name: 'tag1'
        }, {
            text: '标签2',
            name: 'tag2'
        }, {
            text: '标签3',
            name: 'tag3'
        }],
        closable: true
    });

    require('switch');
    $('.switchHandle1').switcher({
        color:'primary',
        value: true
    });
    $('.switchHandle2').switcher({
        color:'success',
        round: true
    });

    var Menu = require('menu');
    var mymenu = Menu({
        el:'#menu',
        //theme: 'dark',
        data: [
            {
                item: '<i class="ion">&#xe64a;</i>首页',
                id: 1
            },{
                item: '订单',
                id: 2
            },{
                item: '会员',
                id: 3,
                sub:[
                    {
                        item: '会员统计',
                        id: 30
                    },{
                        item: '会员群发',
                        id: 31
                    },{
                        item: '会员管理',
                        id: 32
                    }
                ]
            },{
                item: '店铺',
                id: 4
            },{
                item: '系统',
                id: 5
            }
        ],
        key: 'id',
        actived: 1,
        toggle: false
    });
                            
    require('slider');
    $('.sliderHandle').slider({
    	value: 50
    });

    require('page');        
    $('.pageHandle').page({
    	total: 10
    });

    require('datepicker');
    $('.datepickerHandle').datepicker();

    var TimePicker = require('timepicker');
    TimePicker({
        el: '.timepickerHandle'
    });

    $('.datetimeHandle').datepicker({
        needTime: true,
        format:'yyyy/mth/dd hh:mm:ss'
    });
    
    require('input');                  
    var myinput = $('.inputHandle').input({
        buttons: [
            {
                text: '确定'
            },
            {
                text: '清除',
                click:function(val, text){
                    myinput.clear();
                }
            }
        ],
        val:'100',
        holder: '输入金额',
        errormsg: '请输入整数!',
        datatype:'n',
        render:function(val){
            return '$'+val;
        }
    });

    require('input-number');
    $('.inputnumberHandle').inputNumber({
        min:2,
        max:9,
        val: 5,
        style: 'inline'
    });


    var Table = require('table');
    var tableData = [{"product":"I9000","manufacturer":"Samsung","type":"A","size":{"width":61.4,"height":12.6,"length":120.2},"os":"Android 2.1","cpu":"Samsung 1GHz","screen":"4.0","touchScreen":true,"price":3550,"storage":800,"comment":"屏幕大。"},{"product":"iPhone4","manufacturer":"Apple","type":"A","size":{"width":58.6,"height":9.3,"length":115.2},"os":"iPhone iOS 4","cpu":"A4 1GHz","screen":"3.5","touchScreen":true,"price":4999,"storage":0,"comment":"分辨率变大，屏幕效果更出色，主频高。"},{"product":"Milestone","manufacturer":"Motorola","type":"A","size":{"width":60,"height":13.7,"length":115},"os":"Android 2.0","cpu":"MSM 600Mhz","screen":"3.7","touchScreen":true,"price":2550,"storage":50,"comment":"外形设计新颖，13.7mm超薄机身。"},{"product":"N86","manufacturer":"Nokia","type":"C","size":{"width":51.4,"height":16.6,"length":103.4},"os":"Symbian S60","cpu":"A4 434MHz","screen":"2.6","touchScreen":false,"price":3360,"storage":120,"comment":"具备800万像素摄像头，外观大气，手感好。"},{"product":"N8","manufacturer":"Nokia","type":"C","size":{"width":59.12,"height":12.9,"length":113.5},"os":"Symbian 3","cpu":"A8 600MHz","screen":"3.5","touchScreen":false,"price":4868,"storage":200,"comment":"1200万像素摄像头，内置HDMI。"},{"product":"S8500","manufacturer":"Samsung","type":"B","size":{"width":56,"height":10.9,"length":118},"os":"Android 2.0","cpu":"Samsung 1GHz","screen":"3.3","touchScreen":true,"price":3380,"storage":20,"comment":"Super AMOLED屏幕，内置Social Hub社交功能。"},{"product":"iPhone3G","manufacturer":"Apple","type":"A","size":{"width":62.1,"height":12.3,"length":115.5},"os":"iPhone iOS X","cpu":"A4 667MHz","screen":"3.5","touchScreen":true,"price":3999,"storage":80,"comment":"内置了GPS芯片，支持AGPS服务。"},{"product":"ME600","manufacturer":"Motorola","type":"B","size":{"width":53,"height":15.3,"length":108},"os":"Android 1.5","cpu":"MSM 528MHz","screen":"3.1","touchScreen":false,"price":2420,"storage":300,"comment":"后空翻设计，键盘宽大。"},{"product":"X6","manufacturer":"Nokia","type":"C","size":{"width":51,"height":13.8,"length":111},"os":"Symbian S60 v5","cpu":"A4 667MHz","screen":"3.2","touchScreen":false,"price":2980,"storage":500,"comment":"内置GPS及诺基亚MAP3.0地图。"}];
    //列配置
    var myColumn = [{
            title:'operation',
            render: function(value, rowData, index, entity){
                if(rowData.storage > 0){
                    return $('<div class="btn btn-primary btn-sm">折扣</div>').on('click', function(e){
                        e.stopPropagation();
                        entity.toggle('price', Math.round(rowData.price * 0.8));
                    });
                }else{
                    return $('<div class="btn btn-primary btn-sm disabled">无货</div>');
                }
            },
            width: 100
        },{
            title: '图片',
            render: function(value, rowData, index){
                var smallImg = $('<img src="http://bsdn.org/projects/dorado7/deploy/sample-center/dorado/res/com/bstek/dorado/sample/data/images/'+rowData.product+'-24.png" alt="data.product" style="max-height:28px" />');
                smallImg.tip('<img src="http://bsdn.org/projects/dorado7/deploy/sample-center/dorado/res/com/bstek/dorado/sample/data/images/'+rowData.product+'-128.png" style="width:128px;" />',{
                    type: 'content'
                });
                return smallImg;
            }
        },{
            title:'产品',
            key:'product',
            width: 125,
            sort: {
                mehtod: true
            },
            validateMethod: function(value){
                if(value && value.split && value.length < 10){
                    return true;
                }
                require.async('notice', function(Notice){
                    Notice({
                        title: '请输入长度小于10的字符串！',
                        color:'warning',
                        delay: 2000
                    });
                });
            },
            editable: function(rowIndex, key, value){
                console.log(rowIndex, key, value);
            }
        },{
            title:'制造商',
            key:'manufacturer',
            filters: [
                {
                    label: '全部',
                    mehtod: function(value){
                        return true;
                    }
                },
                {
                    label: '三星',
                    mehtod: function(value){
                        return value.indexOf('Samsung')===0;
                    }
                },
                {
                    label: '苹果',
                    mehtod: function(value){
                        return value.indexOf('Apple')===0;
                    }
                },
                {
                    label: '诺基亚',
                    mehtod: function(value){
                        return value.indexOf('Nokia')===0;
                    }
                }
            ],
            editable: function(rowIndex, key, value){
                console.log(rowIndex, key, value);
            }
        },{
            title:'价格',
            key:'price',
            width: 100,
            styler: function(value){
                if(value>3000){
                    return "background: rgb(252, 197, 197)";
                }
            },
            editable: function(rowIndex, key, value){
                console.log(rowIndex, key, value);
            }
        },{
            title:'库存',
            key:'storage',
            align: 'center',
            sort: true,
            styler: function(value){
                if(value<100){
                    return "background: rgb(211, 211, 211); color: red";
                }
            }
        },{
            title:'类型',
            width: 200,
            key: 'type',
            render: function(value, rowData, index, entity){
                var inputArray = [{
                    type:"A",
                    name: '直板'
                },{
                    type:"B",
                    name: '翻盖'
                },{
                    type:"C",
                    name: '滑盖'
                }];
                var inputName = "phonetype"+index;
                var typeControl = '<div style="user-select: none;">';
                $.each(inputArray, function(i, e){
                    typeControl += ('<label class="radio radio-inline"><input type="radio" name="'+inputName+'" value="'+e.type+'"'+(e.type===value ? ' checked' : '')+' />'+e.name+'</label>');
                });
                typeControl += '</div>';

                return $(typeControl).on('change', function(){
                    var newValue = $(this).find('input:checked').val();
                    entity.set('type', newValue);
                });
            }
        },{
            title:'体积（mm）',
            width: 200,
            render: function(value, rowData, index){
                var size = rowData.size;
                if(size){
                    return [size.length, size.width, size.height].join(' x ');
                }
            }
        },{
            title:'comment',
            key: 'comment',
            width: 200,
            editable: function(rowIndex, key, value){
                console.log(rowIndex, key, value);
            }
        }];
    var Tip = require('tip');
    var datagrid = Table({
        el:'.tableHandle',
        data: tableData,
        column: myColumn,
        multi: true,
        index: 'fixed'
    });
    
    require('slide');
    $('.slideHandle').slide();

});
