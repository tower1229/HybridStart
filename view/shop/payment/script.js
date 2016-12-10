/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	require('box');

	var userData = comm.getUser();
	var orderNO = app.ls.val('paynum'),
		payNum,
		websiteConfig = app.ls.val('websiteConfig');
	if(websiteConfig){
		websiteConfig = JSON.parse(websiteConfig);
	}else{
		return alert('缺少websiteConfig信息');
	}
	$('#goBack').on('click', function() {
		app.ls.remove('paynum');
	});
	//微信key
	var wxappid = websiteConfig.weixinAppid;
	function payByWeixin() {
		var params = {
			appid: wxappid, //(必选)
			mch_id: "1218553301", //(必选)
			device_info: "013467007045764", //(可选)
			nonce_str: "weradfdgdvccfexs1", //(必选)
			body: "appcan支付测试", //(必选)
			detail: "detail", //(可选)
			attach: "attach", //(可选)
			out_trade_no: "1217752501201405033233356018", //(必选)
			fee_type: "CNY", //(可选)
			total_fee: "1", //(必选)
			spbill_create_ip: "127.0.0.1", //(必选)
			time_start: "20150503152510", //(可选)
			time_expire: "20150703152510", //(可选)
			goods_tag: "WXG", //(可选)
			notify_url: "http://www.baidu.com/", //(必选)
			trade_type: "APP", //(必选)
			product_id: "12235413214070356458058", //(可选)
			//openid:"oUpF8uMuAJO_M2pxb1Q9zNjWeS6o",//(可选)
			sign: "748F903B8E3F2C0B2CC6B287B9A28078" //(必选)
		};
		var data = JSON.stringify(params);
		try{
			uexWeiXin.getPrepayId(data);
		}catch(e){
			alert(e.message)
		}
		
	}

	var payByYinlian = function() {
		var url = appcfg.host.frontend + '/core/control/thirdparty/unionpay/wap/control.jsp?no='+orderNO+'&txnAmt='+comm.accMul(payNum,100)
		//alert(url);
		app.openView({
			title:'银联支付',
			closeself:true
		},url);
		
	}

	var dataRender = function(res){
		payNum = res.data;
		if(payNum){
			if(payNum.split){
				payNum = parseFloat(payNum);
			}
		}else{
			return alert('没有订单金额!');
		}
		$('#payNum').text('￥'+payNum.toFixed(2));
		//选择支付
		$('#payList').on('click', 'li', function() {
			var payment = $(this).data('payment');
			switch (payment) {
				case "yinlian":
					payByYinlian();
					break;
				case "weixin":
					testPay();
					break;
				case "zhifubao":
					testPay();
					break;
				default:
					testPay();
					break;
			}
		})
		app.loading.hide();
	};
	//测试支付方法
	var testPay = function() {
		app.ajax({
			url: appcfg.host.control + '/shop/testPay.jsp',
			data: {
				orderNo: orderNO
			},
			success:function(res){
				// console.log(res)
				if(res.status==='Y'){
					app.openView({
						param:orderNO,
						closeself:true
					}, 'shop', 'paydone');
				}
			}
		});
	};

	app.ready(function() {
		//获取订单金额
		if (orderNO) {
			app.ls.remove('paynum');
			app.loading.show('获取订单详情...',{
				wrap:'#View'
			});
			app.ajax({
				url: appcfg.host.control+'/shop/getOrderByNo.jsp',
	            data: {
		            sid: appcfg.project.sid,
		            jr_member_id:userData.id,
		            no:orderNO
		        },
				success:function(res){
					if(res.status==='Y'){
						dataRender(res);
					}else if(res.status==='N'){
						app.loading.hide();
						$.box.msg(res.message,{
							delay:2000,
							color:'danger'
						});
					}
				}
			});
		}
		//注册微信
		uexWeiXin.registerApp(wxappid);
		//检测微信支持
		//uexWeiXin.isWXAppInstalled();
		//检测微信相关回调
		uexWeiXin.cbIsWXAppInstalled = function(opCode, dataType, data) {
			if (data == "1") {
				alert('微信未安装');
			} else {
				uexWeiXin.isWXAppSupportApi();
			}
		}
		uexWeiXin.cbIsWXAppSupportApi = function() {
			if (data == "1") {
				alert('微信API不支持');
			} else {
				uexWeiXin.isSupportPay()
			}
		}
		uexWeiXin.cbIsSupportPay = function(opId, dataType, data) {
			if (data == "1") {
				alert('不支持微信支付');
			} else {
				alert('该设备支持微信支付');
			}
		}
		//微信支付相关回调
		uexWeiXin.cbGetPrepayId = function cbGetPrepayId(info) {
			var prepayId = JSON.parse(info).prepay_id;
			alert(prepayId);
			var params = {
				appid: wxappid, //(必选) 微信分配的AppID
				partnerid: "1218553301", //(必选) 微信支付分配的商户号
				prepayid: prepayId, //(必选)
				package: "Sign=WXPay", //(必选)
				noncestr: "weradfdgdvccfexs", //(必选)
				timestamp: "1412000000", //(必选)
				sign: "137AE3E0FA57EF7401774049DFE999EE" //(必选)
			};
			var data = JSON.stringify(params);
			uexWeiXin.startPay(data);
		};
		uexWeiXin.cbStartPay = function cbStartPay(info) {
			console.log(info);
			alert(info);
		};
	});
});