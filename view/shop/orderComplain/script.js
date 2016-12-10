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

	//选择投诉类型
	$('#chooseSource').on('click',function(){
		var cancelReasonParam = {
			url: '/core/service/app/wcm/common/param/control.jsp',
			method: 'getCommonParam',
			no: '100033',
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
			method: 'applyComplaint',
			jr_member_id: userData.id,
			sid: appcfg.project.sid,
			orderno: param.orderNO,
			product_id: param.pid
		},
		ajaxPost:true,
		callback:function(res){
			if(res.status==='Y'){
				$.box.msg('投诉申请已提交！',{
					delay:1000,
					onclose:function(){
						app.window.close();
					}
				});
			}else if(res.status==='N'){
				$.box.msg(res.message,{
					delay:2000
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