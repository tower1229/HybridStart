/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var user = comm.getUser();
	require('box');
	//全局订单数据
	var orderData = [];
	//模板
	var orderListRender = etpl.compile($('#orderListTemp').val());
	var orderFlag;
	var controlHash = {
			"付款": "pay",
			"取消订单": "cancelOrder",
			"确认收货": "confirmPack",
			"查看物流": "transing",
			"评价订单": "evalOrder"
		},
		dataTrans = function(oData) {
			var controlWrap = [];
			if (!oData) {
				return controlWrap
			}
			if (oData.indexOf(',') == 0) {
				oData = oData.substr(1)
			}
			oData = oData.split(',');
			if (oData) {
				$.each(oData, function(i, e) {
					var _cell = {};
					_cell.text = e;
					_cell.class = controlHash[e] || "";
					controlWrap.push(_cell);
				});
			}
			return controlWrap;
		};
	var dataRender = function(data, reload) {
		var data = data.data,
			html,
			orderControls,
			goodsControls;
		orderData = orderData.concat(data);
		// console.log(data)
		//订单状态数据处理
		$.each(data, function(i, e) {
			switch (e.mainOrderStatus) {
				case "1": //等待买家付款
					orderControls = '取消订单,付款';
					break;
				case "2": //买家已付款
					orderControls = '';
					break;
				case "3": //卖家已发货
					orderControls = '';
					break;
				case "4": //交易关闭
					orderControls = '';
					break;
				case "5": //交易完成
					orderControls = '';
					break;
				case "6": //交易异常
					orderControls = '';
					break;
			}
			e.orderControls = dataTrans(orderControls);
			if (!e.orderControls.length) {
				e.orderControls = false;
			}
		});
		//debug
		//console.log(data)
		html = orderListRender({
			data: data
		});

		if (reload) {
			$('body').html(html).scrollLoad(getData);
		} else {
			$('body').append(html).scrollLoad(getData);
		};

		app.loading.hide();
	};

	var getData = function(flag, reload) {
		app.loading.show();

		if (flag === void(0) || flag === false || flag === null) {
			orderFlag = app.ls.val('orderFlag') ? app.ls.val('orderFlag') : '0';
		} else {
			orderFlag = flag;
		}
		app.toload({
			url: appcfg.host.control + '/shop/getOrderList.jsp',
			size: 5,
			reload: reload,
			data: {
				sid: appcfg.project.sid,
				flag: orderFlag,
				jr_member_id: user.id
			},
			success: function(res) {
				app.push.stop();
				if (res.status === 'Y') {
					dataRender(res, reload);
				} else if (res.status === 'N') {
					app.loading.hide();
					var emptyhtml = comm.commonTemp('listPlaceholder',{
						text:'您还没有相关订单'
					});
					$('body').html(emptyhtml);
				}
			}
		});
	}
	window.change = getData;
	//订单详细页
	$('body').on('click', '.orderGoodsIntro', function() {
		var no = $(this).parents('.orderRecord').data('no');
		app.openView(no, 'shop', 'orderDetail');
	});
	//订单动作
	var orderActiveCallback;
	$('body').on('click', '.orderTotal button', function() {
		var action = $(this).data('action'),
			orderID = $(this).parents('.orderList').data('id'),
			subOrderData;
		$.each(orderData, function(i, e) {
			if (e.id == orderID) {
				subOrderData = e;
				return
			}
		});
		orderActiveCallback = null;
		//console.log(subOrderData)
		if (subOrderData) {
			switch (action) {
				case "pay":
					app.loading.show();
					app.ajax({
						url: appcfg.host.control + '/core/service/app/wcm/eshop/order/control.jsp',
						data: {
							method: 'rePay',
							sid: appcfg.project.sid,
							order_no: subOrderData.no,
							jr_member_id: user.id
						},
						success: function(res) {
							app.loading.hide();
							if (res.status === 'Y') {
								var confirmData = res.data[0];
								if(confirmData.buy_fast) {
									app.ls.val('buy_fast',confirmData.buy_fast);
								}
								if(subOrderData.no) {
									app.ls.val('paynum',subOrderData.no);
								}
								if(confirmData.pmt_amount) {
									app.ls.val('pmt_amount',confirmData.pmt_amount);
								}
								//console.log(confirmData.buy_products)
								app.openView(JSON.stringify(confirmData.buy_products), 'shop', 'orderConfirm');
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
						url: '/core/service/app/wcm/common/param/control.jsp',
						method: 'getCommonParam',
						no: '100028'
					}
					app.openView({
						param: cancelReasonParam
					}, 'common', 'chooseList');

					orderActiveCallback = function(choosen) {
						app.globalEval(function() {
							$.box.confirm('确定取消该订单吗?', function() {
								$.box.hide();
								app.globalHide();
							}, function() {
								app.globalHide(true);
							}, {
								bgclose: false
							});
						}, function() {
							app.ajax({
								url: appcfg.host.control + '/core/service/app/wcm/eshop/order/control.jsp',
								data: {
									method: 'cancelOrder',
									cancle_reason: choosen.id,
									order_no: subOrderData.no,
									jr_member_id: user.id,
									sid: appcfg.project.sid
								},
								success: function(res) {
									if (res.status === 'Y') {
										getData(false, true);
									} else if (res.status === 'N') {
										$.box.msg(res.message, {
											delay: 2000,
											color: 'danger'
										});
									}
								}
							});
						});
					};
					break;
				case "confirmPack":

					break;
				case "transing":

					break;
				case "evalOrder":

					break;
			}
		}
	});

	app.ready(function() {
		app.push.init(function(){
			getData(true);
		});

		getData();

		//后续操作
		app.window.subscribe('choosenItem', function(msg) {
			var choosenItem = JSON.parse(app.ls.val('choosenItem'));
			choosenItem && typeof(orderActiveCallback) === 'function' && orderActiveCallback(choosenItem);
		});

	});
});