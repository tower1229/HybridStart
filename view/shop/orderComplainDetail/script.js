/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');require('sdk/common');
	var sendData = app.ls.val('crossParam');;
	if(sendData){
		sendData = JSON.parse(sendData);
	}else{
		return console.warn('参数不正确');
	}
	//模板
	var dataTemp = $('#detailTemp').val();
	var dataRender = function(data) {
		var render = etpl.compile(dataTemp);
		var data = data.data[0];
		console.log(data)
		var html = render(data);
		$('#mainCont').html(html);
		app.loading.hide();
	}
	
	var getData = function() {
		app.loading.show();
		app.ajax({
			url:appcfg.host.control+"/core/service/app/wcm/eshop/order/handle/control.jsp",
			data: sendData,
			success:function(res){
				if(res.status==="Y"){
					dataRender(res);
				}else if(res.status==="N"){
					app.loading.hide();
					$.box.msg(res.message,{
						delay:2000,
						color:'danger'
					});
				}
			}
		});
	}


	app.ready(function(){
		getData();

	});
});