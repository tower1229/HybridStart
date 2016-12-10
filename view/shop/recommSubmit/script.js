/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var userData = comm.getUser();
	var recommID = app.ls.val('crossParam');;
	var wid,subOrderDetailDatas,order_id;
	if (!recommID) {
		return console.log('缺少发货方no');
	}
	require('raty');
	//获取订单数据并渲染
	var dataTemp = $('#storeTemp').text();
	var dataRender = function(data) {
		var render = etpl.compile(dataTemp);
		var data = data.data[0].subOrderDatas[0];
		console.log(data)
		wid = data.wid;
		subOrderDetailDatas = data.subOrderDetailDatas;
		order_id = data.order_id;
		var html = render({
			store: data
		});
		$('#view').html(html).find('.stars').each(function(i, e) {
			$(e).raty({
				targetScore: $(e).parent().find('input[type="hidden"]')
			});
		});
		app.loading.hide();
	}

	var getData = function() {
		app.loading.show();
		app.ajax({
			url: appcfg.host.control + '/core/service/app/wcm/eshop/order/detail/control.jsp',
			data: {
				method: "subOrderDetail",
				suborderno: recommID,
				sid: appcfg.project.sid
			},
			success: function(res) {
				if (res.status === 'Y') {
					dataRender(res);
				} else {
					app.loading.hide();
				}
			}
		});
	}

	require('validform');
	var vf = $('#recommForm').Validform({
		ajaxPost: true,
		beforeSubmit:function(){
			var comboData = [];
			$.each(subOrderDetailDatas,function(i,e){
				var dom = $('#goods'+e.goods_id);
				if(dom.length){
					comboData.push({
						content: dom.find('textarea').val(),
						order_id: order_id,
						goods_id: e.goods_id,
						product_id: e.product_id,
						order_detail_id: e.order_detail_id,
						score: [{
							type: 'charge',
							score: dom.find('input[name="charge"]').val()
						}, {
							type: 'timely',
							score: dom.find('input[name="timely"]').val()
						}, {
							type: 'exact',
							score: dom.find('input[name="exact"]').val()
						}, {
							type: 'true',
							score: dom.find('input[name="true"]').val()
						}]
					})
				}
			});
			//console.log(comboData);
			comboData = JSON.stringify(comboData);
			//console.log(comboData);
			app.loading.show('正在提交...');
			app.ajax({
				url: appcfg.host.control + '/core/service/app/wcm/eshop/member/comment/control.jsp',
				data:{
					method: "submitComment",
					sid: appcfg.project.sid,
					wid: wid,
					jr_member_id: userData.id,
					datas: comboData
				},
				success:function(res){
					app.loading.hide();
					if(res.status==='Y'){
						$.box.msg('评价成功', {
							delay:1000,
							onclose: function(){
								app.window.close();
							}
						});
					}else if(res.status==='N'){
						$.box.msg(res.message, {
							delay:2000,
							color:'danger'
						});
					}
				}
			});
			return false;
		}
	});

	app.ready(function() {
		getData();

	});
});