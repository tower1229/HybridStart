/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	require('validform');
	require('box');
	var userData = comm.getUser();
	//配送方式
	var shipType;
	//总运费
	var carriage = 0;
	//区域编号
	var areaId;
	//收货地址编号
	var addrId;
	//商铺信息
	var shop = [];

	//从付款页面跳转过来的订单编号
	var orderNo = app.ls.val('paynum');
	//从付款页面跳转过来的商品数量
	var pmt_amount = app.ls.val('pmt_amount');
	var confirmCart = app.ls.val('crossParam');;
	if (!confirmCart) {
		return console.warn('没有订单数据！');
	};
	//选中的购物车数据
	var confirmCart;
	(function() {
		var parseString = function() {
			if (confirmCart.split) {
				confirmCart = JSON.parse(confirmCart);
				parseString();
			}
		}
		parseString();
	})();

	//console.log(confirmCart)
	var shipTemp = $('#shipListTemp').val();
	var shipRender = function(data) {
		var render = etpl.compile(shipTemp);
		var data = data.data[0].shipTypes;
		var html = render({
			data: data
		});
		$('#shipList').html(html);
		shipType = '1';
	};
	var taxRender = function(data) {
		var tax_data = data.data[0].taxData;
		if (tax_data.data) {
			$('#tax_name').val(tax_data.data.tax_name);
			$('#tax_bank').val(tax_data.data.tax_bank);
			$('#tax_address').val(tax_data.data.tax_address);
			$('#tax_no').val(tax_data.data.tax_no);
			$('#tax_num').val(tax_data.data.tax_num);
			$('#tax_tel').val(tax_data.data.tax_tel);
			if (orderNo) {
				$('#kaifapiao').prop('checked', true);
			}
		}
	};
	//获取发票和运输信息
	var getLastTaxInfo = function() {
		app.ajax({
			url: appcfg.host.control + '/shop/getLastTaxInfo.jsp',
			data: {
				jr_member_id: userData.id,
				no: orderNo
			},
			success: function(res) {
				// console.log(res.data)
				if (res.status === 'Y') {
					// console.log(orderNo)
					shipRender(res);
					taxRender(res);
				}
			}
		});
	};
	//合计
	var sumAll = function() {
		var _totalPrice = 0;
		for (var i = 0; i < confirmCart.length; i++) {
			_totalPrice += confirmCart[i].pri * confirmCart[i].amount;
		}
		if (shipType != '2') {
			_totalPrice = _totalPrice + parseFloat(carriage);
		}
		if (pmt_amount) {
			_totalPrice = _totalPrice - parseFloat(pmt_amount);
		}
		//console.log(_totalPrice)
		_totalPrice = _totalPrice.toFixed(2);
		$('#totalPri').text(_totalPrice);
		$('#totalCount').text("共" + confirmCart.length + "件");
	};
	//选择
	$('#shipList').on('click', '.item-radio', function() {
		shipType = '';
		shipType = $(this).data('id');
		if (shipType == '2') {
			$('#mainCont .eshop').removeClass('hide');
			$('#carriage').text('0.00');
			sumAll();
		} else {
			$('#mainCont .eshop').addClass('hide');
			$('#carriage').text(parseFloat(carriage).toFixed(2));
			sumAll();
		}
	});
	//创建订单参数格式
	var createOrderParam = {
			"addrId": '',
			"jr_member_id": userData.id,
			"shop": '',
			"is_tax": 0,
			"order_no": orderNo,
			"data": JSON.stringify(confirmCart)
		},
		getDefaultAddr = function() {
			app.loading.show('正在获取您的地址', {
				wrap: '#mainCont'
			});
			var changeAddr = app.ls.val('changeaddr');
			if (changeAddr) {
				//修改收货地址
				changeAddr = JSON.parse(changeAddr);
				app.ls.remove('changeaddr');
				return getDistributeOrder(changeAddr);
			};
			app.ajax({
				url: appcfg.host.control + '/member/address.jsp',
				data: {
					member_id: userData.id,
					sid: appcfg.project.sid
				},
				success: function(res) {
					if (res.status === 'Y') {
						var addrList = res.data;
						if (addrList.length) {
							var addr = res.data[0];
							getDistributeOrder(addr);
						} else {
							app.loading.hide();
							$.box.confirm('请先添加收货地址', function() {
								$.box.hide();
								app.openView(null, 'member', 'addAddr');
							}, function() {
								app.window.close();
							}, {
								bgclose: false
							});
						}
					} else {
						app.loading.hide();
						$.box.msg(res.message, {
							delay: 2000,
							color: 'danger'
						});
					}
				}
			});
		},
		dataTemp = $('#orderListTemp').val(),
		dataRender = function(data) {
			var render = etpl.compile(dataTemp);
			carriage = data.data[0].totalShipCost;
			createOrderParam.totalShipCost = carriage;
			$('#carriage').text(parseFloat(carriage).toFixed(2));
			var html = render(data);
			$('#orderList').html(html);
			$('#confirm').removeClass('disabled');
			$('#mainCont');
			sumAll();
			app.loading.hide();
		},
		getDistributeOrder = function(addr) {
			app.loading.show('正在分派订单', {
				wrap: '#mainCont'
			});
			//订单拆分
			$('#linkMan').text("收货人：" + addr.name + addr.mobile);
			$('#address').text(addr.province + addr.city + addr.area + addr.address);
			areaId = addr.areaId;
			createOrderParam.addrId = addr.id;
			app.ajax({
				url: appcfg.host.control + '/shop/distributeOrder.jsp',
				data: {
					jr_member_id: userData.id,
					area_id: areaId,
					datas: JSON.stringify(confirmCart)
				},
				timeout: appcfg.set.longtime,
				success: function(res) {
					if (res.status === 'Y') {
						dataRender(res);
					} else {
						app.loading.hide();
						$.box.msg(res.message, {
							color: 'danger',
							delay: 2000
						});
					}
				}
			});
		};
	//修改收货地址
	$('#changeAddr').on('click', function() {
		app.openView('changeAddr', 'member', 'address');
	});

	app.ready(function() {
		//获取默认收货地址
		getDefaultAddr();
		//获取最近一条发票信息
		getLastTaxInfo();
		//发票以外的信息扩展到extendParam中
		var vf = $('#orderConfirmForm').Validform({
			url: appcfg.host.control + '/shop/createOrder.jsp',
			ajaxPost: true,
			ajaxData: createOrderParam,
			beforeSubmit: function() {
				//检查发票
				var fpitem = $('#tax_num').add($(('#tax_address'))).add($(('#tax_tel')))
					.add($(('#tax_no'))).add($(('#tax_bank')));
				var emptyLength = 0;
				fpitem.each(function(i, e) {
					if (!e.value) {
						emptyLength++;
					}
				});
				//console.log(emptyLength)
				if (emptyLength) {
					if (emptyLength >= fpitem.length) {
						createOrderParam.type = 0;
						createOrderParam.ship_type = 0;
					} else {
						console.log('开具普通发票只需填写姓名一项，开具增值税发票需全部填写！');
						return false;
					}
				} else {
					createOrderParam.type = 1;
					createOrderParam.ship_type = 1;
				}
				//is_tax
				if (createOrderParam.is_tax >= 1) {
					createOrderParam.is_tax = 1
				} else {
					createOrderParam.is_tax = 0
				}

				app.loading.show('创建订单中...');
				var sp = {
					id: "",
					ship: shipType,
					prot: false
				};
				shop.push(sp);
				createOrderParam.shop = JSON.stringify(shop);
			},
			callback: function(res) {
				if (res.status === 'Y') {
					app.loading.hide();
					app.ls.val('paynum', res.data);
					app.openView({
						closeself: true
					}, 'shop', 'payment');
				} else if (res.status === 'N') {
					app.loading.hide();
					$.box.msg(res.message, {
						color: 'danger',
						delay: 2000,
						onclose: function() {
							app.window.close();
						}
					});
				}
			}
		});
		$('#confirm').on('click', function() {
			vf.ajaxPost();
		});
		//开配件发票
		vf.ignore('#tax_name');
		vf.ignore('#tax_num');
		vf.ignore('#tax_address');
		vf.ignore('#tax_tel');
		vf.ignore('#tax_no');
		vf.ignore('#tax_bank');
		$('#kaifapiao').on('change', function() {
			var bool = $(this).prop('checked');
			if (bool) {
				$('#fapiaoInp').show();
				vf.unignore('#tax_name');
				createOrderParam.is_tax++;
			} else {
				$('#fapiaoInp').hide();
				vf.ignore('#tax_name');
				createOrderParam.is_tax--;
			}
		});

		//返回重新获取地址
		app.window.resume( function() {
			getDefaultAddr();
		});

	});
});