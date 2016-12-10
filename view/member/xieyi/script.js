/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');require('sdk/common');
	var dataTemp = $('#artDetailTemp').val();
	var dataRender = function(data){
		// alert(data.data);
		var render = etpl.compile(dataTemp);
		
		var data = data.data[0];
		
		var params = JSON.parse(data.params);
		var contents = params.content;
		// console.log(contents)
		var html = render({
			data:contents
		});
		$('#artDetail').html(html);
		app.loading.hide();
	}
	var getData = function() {
		app.loading.show();
		app.ajax({
			url: appcfg.host.control+'/core/service/app/wcm/common/page/widgets/control.jsp',
			data: {
				method: 'getRegionAgreement',
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
	//同意
	$('#agree').on('click',function(e){
		e.preventDefault();
		app.ls.val('xieyi','1');
		app.window.close();
	});

	app.ready(function() {
		getData();
	
	});
});