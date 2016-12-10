/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');require('sdk/common');
	var userData = comm.getUser();
	var orderNO = app.ls.val('crossParam');;
	if(!orderNO){
		return console.warn("orderNO参数缺失");
	};
	var orderData;
	var orderControls,partControls,goodsControls;
	var dataTemp = $('#orderDetailTemp').val();
	var controlHash = {
			"付款": "pay",
			"取消订单": "cancelOrder",
			"确认收货": "confirmPack",
			"查看物流": "transing",
			"评价订单": "evalOrder",
			"退款": "refund",
			"退货": "return",
			"投诉申请": "complain",
			"退款审核中": "refunding",
			"退款处理中": "refunding",
			"退款完成": "refunding",
			"退款拒绝": "refunding",
			"退款取消": "refunding",
			"退货审核中": "returning",
			"退货处理中": "returning",
			"退货完成": "returning",
			"退货拒绝": "returning",
			"退货取消": "returning",
			"投诉审核中": "complaining",
			"投诉处理中": "complaining",
			"投诉处理完成": "complaining",
			"投诉拒绝": "complaining",
			"投诉取消": "complaining"
		},
		dataTrans = function(oData) {
			var controlWrap = [];
			if(!oData){
				return controlWrap
			}
			if(oData.indexOf(',')==0){
				oData = oData.substr(1);
			}
			oData = oData.split(',');
			if(oData.length){
				$.each(oData, function(i, e) {
					var _cell = {};
					_cell.text = e;
					_cell.class = controlHash[e] || "";
					controlWrap.push(_cell);
				});
			}
			return controlWrap;
		},
		getLastDate = function(goodsList,key){
			var last_ship_date;
			$.each(goodsList, function(i,e){
				var ship_date = e[key];
				if (!last_ship_date) {
					last_ship_date = ship_date;
				}
				var last =parseInt(last_ship_date);
				var ship =parseInt(ship_date);
				if (ship>last) {
					last_ship_date = ship_date;
				}
			});
			return last_ship_date;
		};

	var dataRender = function(res) {
		var render = etpl.compile(dataTemp);
		var data = res.data[0];
		orderData = data;
		// console.log(orderData)
		//订单按钮
		switch (data.mainOrderStatus) {
			case "1"://等待买家付款
				orderControls = '取消订单,付款';
				break;
			case "2"://买家已付款
				orderControls = '';
				break;
			case "3"://卖家已发货
				orderControls = '';
				break;
			case "4"://交易关闭
				orderControls = '';
				break;
			case "5"://交易完成
				orderControls = '';
				break;
			case "6"://交易异常
				orderControls = '';
				break;
		};
		//插入订单操作按钮
		var orderControlHtml = '';
		$.each(dataTrans(orderControls), function(i,e){
			orderControlHtml+=('<button class="btn btn-ghost btn-'+e.class+'" data-action="'+e.class+'">'+e.text+'</button> ')
		});

		setTimeout(function(){
			$('#orderControlBar').html(orderControlHtml);
		},0);

		//发货方发货时间
		data.last_ship_date = getLastDate(data.subOrderDatas,"ship_date");

		$.each(data.subOrderDatas, function(i,e){
			var subOrderStatus = e.sub_order_status;
			//发货方按钮
			switch (e.sub_order_status) {
				case "1"://等待买家付款
					partControls = '';
					break;
				case "2"://买家已付款
					partControls = '';
					break;
				case "3"://卖家已发货
					partControls = '查看物流,确认收货';
					break;
				case "4"://交易关闭
					partControls = '';
					break;
				case "5"://交易完成
					if(e.is_comment&&e.is_comment=='1') {
						partControls = '评价订单';
					}else{
						partControls = '';
					}
					break;
				case "6"://交易异常
					partControls = '';
					break;
			}
			e.partControls = dataTrans(partControls);
			if(!e.partControls.length){
				e.partControls = false;
			}
			//单品收货时间
			data.last_receipt_date = getLastDate(e.subOrderDetailDatas,"receipt_date");
			$.each(e.subOrderDetailDatas,function(i,e){
				//单品总价用于退款
				e.value = e.amount*e.price;
				//单品按钮
				goodsControls = "";
				if(e.part_opt_app['requestComplaintAPP']){
					goodsControls+=",投诉申请";
				}
				if(e.part_opt_app['requestRefundsAPP']){
					goodsControls+=",退款";
				}
				if(e.part_opt_app['requestRefundsBackProductsAPP']){
					goodsControls+=",退货";
				}
				if(e.part_opt_app['requestServiceStatusAPP']){
					//退款处理中
					if(subOrderStatus=='2') {
						goodsControls+=","+e.part_opt_app['requestServiceStatusView'];
					} else {
						goodsControls+=","+e.part_opt_app['requestServiceStatusView'];
					}
				}
				if(e.part_opt_app['requestComplaintStatusAPP']){
					//投诉申请中
					goodsControls+=","+e.part_opt_app['requestComplaintStatusView'];
				}
				//console.log(goodsControls)
				e.goodsControls = dataTrans(goodsControls);
			});
			
		});
		//console.log(data)
		//显示标题
		//$('#headTitle').text(data.statusName);
		var html = render({
			data:data
		});
		
		$('#orderDetail').html(html);
		app.loading.hide();
	}
	var getOrderDetail = function(){
		app.loading.show();
		app.ajax({
			url: appcfg.host.control + '/shop/orderDetail.jsp',
			data: {
				sid: appcfg.project.sid,
				jr_member_id: userData.id,
				order: orderNO
			},
			success:function(res){
				if(res.status==='Y'){
					dataRender(res);
				}else if(res.status==='N'){
					app.loading.hide();
					$.box.msg(res.message,{
						delay:2000,
						color:'danger'
					})
				}
			}
		});
	};

	//商品动作
	$('body').on('click','.goodsActions .btn',function(){
		var action = $(this).data('action'),
			pid= $(this).parents('.goodsActions').data('pid'),
			orderNO = orderData.no,
			orderID = orderData.id,
			goodsValue = $(this).parents('.goodsActions').data('value');
		if(action && orderNO && orderID){
			switch(action){
				case "refund":
					app.openView({
						param:{
							orderNO:orderNO,
							pid:pid,
							goodsValue:goodsValue
						}
					},'shop','orderRefund');
					break;
				case "complain":
					app.openView({
						param:{
							orderNO:orderNO,
							pid:pid
						}
					},'shop','orderComplain');
					break;
				case "return":
					app.openView({
						param:{
							orderNO:orderNO,
							pid:pid,
							goodsValue:goodsValue
						}
					},'shop','orderReturn');
					break;
				case "refunding":
					app.ajax({
						url:appcfg.host.control+"/core/service/app/wcm/eshop/order/handle/control.jsp",
						data:{
							method:'serviceDetail',
							orderId:orderID,
							sid:appcfg.project.sid,
							proId:pid,
							jr_member_id:userData.id
						},
						success:function(res){
							if(res.status==="Y"){
								var data = res.data[0];
								if(data.status=='审核中') {
									app.openView({
										param:{
											orderNO:orderNO,
											pid:pid,
											goodsValue:goodsValue,
											serviceid:data.id
										}
									},'shop','orderRefund');
								} else {
									app.openView({
										param:{
											method:'serviceDetail',
											orderId:orderID,
											sid:appcfg.project.sid,
											proId:pid,
											jr_member_id:userData.id
										}
									},'shop','orderRefundDetail');
								}
							}else if(res.status==="N"){
								app.openView({
									param:{
										method:'serviceDetail',
										orderId:orderID,
										sid:appcfg.project.sid,
										proId:pid,
										jr_member_id:userData.id
									}
								},'shop','orderRefundDetail');
							}
						}
					});
					
					break;
				case "returning":
					app.ajax({
						url:appcfg.host.control+"/core/service/app/wcm/eshop/order/handle/control.jsp",
						data:{
							method:'serviceDetail',
							orderId:orderID,
							sid:appcfg.project.sid,
							proId:pid,
							jr_member_id:userData.id
						},
						success:function(res){
							if(res.status==="Y"){
								var data = res.data[0];
								if(data.status=='审核中') {
									app.openView({
										param:{
											orderNO:orderNO,
											pid:pid,
											goodsValue:goodsValue,
											serviceid:data.id
										}
									},'shop','orderReturn');
								} else {
									app.openView({
										param:{
											method:'serviceDetail',
											orderId:orderID,
											sid:appcfg.project.sid,
											proId:pid,
											jr_member_id:userData.id
										}
									},'shop','orderReturnDetail');
								}
							}else if(res.status==="N"){
								app.openView({
									param:{
										method:'serviceDetail',
										orderId:orderID,
										sid:appcfg.project.sid,
										proId:pid,
										jr_member_id:userData.id
									}
								},'shop','orderReturnDetail');
							}
						}
					});
					
					break;
				case "complaining":
					//投诉
					app.openView({
						param:{
							method:'complaintDetail',
							orderId:orderID,
							sid:appcfg.project.sid,
							proId:pid,
							jr_member_id:userData.id
						}
					},'shop','orderComplainDetail');
					break;
				
			}
		}
	}).on('click','.storeActions .btn',function(){
		//发货方操作
		var action = $(this).data('action'),
			no = $(this).parents('.storeActions').data('no');
		switch(action){
			case "transing":
				app.openView(no,'shop','transferDetail');
				break;
			case "confirmPack":
				$.box.confirm('确认收货吗?',function(){
					$.box.hide();
					app.loading.show();
					app.ajax({
						url: appcfg.host.control + '/core/service/app/wcm/eshop/order/handle/control.jsp',
						data:{
							method:'confirmGoods',
							orderno:no,
							jr_member_id:userData.id,
							sid:appcfg.project.sid
						},
						success:function(res){
							app.loading.hide();
							if(res.status==='Y'){
								app.openView(no,'shop','confirmPack');
							}else if(res.status==='N'){
								$.box.msg(res.message,{
									delay:2000,
									color:'danger'
								});
							}
						}
					});
				});
				break;
			case "evalOrder":
				app.openView(no,'shop','recommSubmit');
				break;
		}
	});
	//订单动作
	var orderActiveCallback;
	$('#orderControlBar').on('click','.btn',function(){
		var action = $(this).data('action');
		orderActiveCallback = null;
		switch(action){
			case "pay":
				app.loading.show();
				app.ajax({
					url: appcfg.host.control + '/shop/rePay.jsp',
					data: {
						sid: appcfg.project.sid,
						order_no: orderData.no,
						jr_member_id: userData.id
					},
					success: function(res) {
						app.loading.hide();
						if (res.status === 'Y') {
							var confirmData = res.data || {};
							if(confirmData['buy_fast']) {
								app.ls.val('buy_fast',confirmData.buy_fast);
							}
							if(orderData['no']) {
								app.ls.val('paynum',orderData.no);
							}
							if(confirmData['pmt_amount']) {
								app.ls.val('pmt_amount',confirmData.pmt_amount);
							}
							// console.log(confirmData)
							app.openView(confirmData['buy_products'], 'shop', 'orderConfirm');
						} else if (res.status === 'N') {
							$.box.msg(res.message, {
								color: 'danger',
								delay: 2000
							});
						}
					}
				});
				break;
			case "cancelOrder":
				var cancelReasonParam = {
					url: '/core/getRefundParam.jsp'
				};
				app.openView({
					param: cancelReasonParam
				}, 'common', 'chooseList');
				orderActiveCallback = function(choosen){
					app.globalEval(function(){
						$.box.confirm('确定取消该订单吗?',function(){
							$.box.hide();
							app.globalHide();
						},function(){
							app.globalHide(true);
						},{
							bgclose:false
						});
					},function(){
						app.ajax({
							url: appcfg.host.control + '/shop/cancelOrder.jsp',
							data:{
								cancle_reason:choosen.id,
								order_no:orderData.no,
								jr_member_id:userData.id,
								sid:appcfg.project.sid
							},
							success:function(res){
								if(res.status==='Y'){
									getOrderDetail();
								}else if(res.status==='N'){
									$.box.msg(res.message,{
										delay:2000,
										color:'danger'
									});
								}
							}
						});
					});
				};
				break;
		}

	});

	app.ready(function(){
		getOrderDetail();
		
		app.window.resume(function(){
			getOrderDetail();
		});
		app.window.subscribe('choosenItem',function(msg){
			var choosenItem = JSON.parse(app.ls.val('choosenItem'));
			choosenItem && typeof(orderActiveCallback)==='function' && orderActiveCallback(choosenItem);
		});
	});
});