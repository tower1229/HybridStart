/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');require('sdk/common');
	var userData = comm.getUser();
	var param = app.ls.val('crossParam');;
	if(param){
		param = JSON.parse(param);
	}else{
		return console.log('参数不正确');
	}
	var goodsValue = param.goodsValue;
	$('#maxRefund').data('max',goodsValue).text(goodsValue);

	//选择金额
	require('popEditer');
	var refundMax = parseInt($('#maxRefund').data('max')),
		refundPlaceholder = refundMax/2;
	$('#chooseValue').on('click',function(){
		$.popEditer(refundPlaceholder, function(rangeVal){
			refundPlaceholder = rangeVal;
			$('#refundVal').html(rangeVal);
			$('#refundValue').val(rangeVal);
		},{
			tag:'range',
			min:0,
			max:refundMax
		});
	});
	//选择退款原因
	$('#chooseSource').on('click',function(){
		var cancelReasonParam = {
			url: '/core/service/app/wcm/common/param/control.jsp',
			method: 'getCommonParam',
			no: '100015',
			mark:'source'
		};
		app.openView({
			param: cancelReasonParam
		}, 'common', 'chooseList');
	});
	//表单
	require('validform');
	var vf = $('#refundForm').Validform({
		url: appcfg.host.control +'/core/service/app/wcm/eshop/order/handle/control.jsp',
		ajaxData:{
			method: 'applyRepair',
			jr_member_id: userData.id,
			sid: appcfg.project.sid,
			orderno: param.orderNO,
			product_id: param.pid,
			service_type:68,
			serviceid:param.serviceid
		},
		ajaxPost:true,
		beforeSubmit:function(){
			app.loading.show('正在提交...');
		},
		callback:function(res){
			app.loading.hide();
			if(res.status==='Y'){
				$.box.msg('申请退款成功！',{
					delay:1000,
					onclose:function(){
						app.window.close();
					}
				});
			}else if(res.status==="N"){
				$.box.msg(res.message,{
					delay:2000,
					color:'danger'
				});
			}
		}
	});

	app.ready(function(){
		
		app.window.resume(function(){
			var choosenItem = app.ls.val('choosenItem');
			if(choosenItem){
				choosenItem = JSON.parse(choosenItem);
				//更新退款原因
				if (choosenItem['mark']=='source') {
	                $('#chooseSource').find('.item-note').text(choosenItem.name);
	                $('#source').val(choosenItem.id);
	            }

			}
			//清理无用数据
			setTimeout(function(){
				app.ls.remove('choosenItem');
			},0);
		});
	});
});