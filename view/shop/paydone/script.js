/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');require('sdk/common');
	var orderNO = app.ls.val('crossParam');;
	//查看订单
	if(orderNO){
		$('#servDetail').on('click',function(){
			app.openView({
				param:orderNO,
				closeself:true
			}, 'shop', 'orderDetail');
		});
	}
	app.ready(function(){


	});
});