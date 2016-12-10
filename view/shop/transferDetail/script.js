/**
 * artical
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var userData = comm.getUser();
	var orderNO = app.ls.val('crossParam');;
	var dataTemp = $('#artDetailTemp').val();
	var dataRender = function(data) {
		// alert(data.data);
		var render = etpl.compile(dataTemp);

		var data = data.data[0];
		// console.log(data)
		if(data.routes){
			data.routes = data.routes.reverse();
		}
		var html = render({
			logi: data
		});
		$('#mainCont').html(html);
		app.loading.hide();
	}
	var getData = function() {
		app.loading.show('',{
			wrap:'#mainCont'
		});
		app.ajax({
			url: appcfg.host.control + '/core/service/app/wcm/eshop/order/logistics/control.jsp',
			data: {
				method: 'getLogisticsInfo',
				sid: appcfg.project.sid,
				jr_member_id: userData.id,
				no: orderNO
			},
			success: function(res) {
				if (res.status === 'Y') {
					// console.log(res)
					dataRender(res);
				} else if(res.status==='N'){
					app.loading.hide();
					$.box.msg(res.message, {
						color: 'danger',
						delay: 2000
					});
				}
			}
		});
	}
	
	app.ready(function() {
		getData();
		
	});
});