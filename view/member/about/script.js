/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');require('sdk/common');
	var dataTemp = $('#artDetailTemp').val();
	var dataRender = function(data){
		// alert(data.data);
		var render = etpl.compile(dataTemp);		
		var cont = data.data[0].content;
		// console.log(cont)
		var html = render({
			data:cont
		});
		$('#artDetail').html(html);
		app.loading.hide();
	};
	var getData = function() {
		app.loading.show();
		app.ajax({
			url: appcfg.host.control+'/core/getAboutUS.jsp',
			data: {
				sid:appcfg.project.sid
			},
			success: function(res) {
				if(res.status==='Y'){
					dataRender(res);
				}else if(res.status==='N'){
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