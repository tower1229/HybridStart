/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var userData = comm.getUser();
	require('scrollLoad');
	//模板
	require('box');
	var dataTemp = $('#jifenListTemp').val();
	var dataRender = function(data, getMore) {
		var render = etpl.compile(dataTemp);
		data = data.data;
		//积分正负
		$.each(data,function(i,e){
			if(e.realScore>=0){
				e.realScore = '+'+e.realScore;
			}
		});
		var html = render({
			data: data
		});
		if (getMore) {
			$('#jifenList').append(html);
		} else {
			app.loading.hide();
			$('#jifenList').html(html);
		}
		app.loading.hide();
	};
	var getData = function(getMore) {
		app.loading.show();
		app.ajax({
			url: appcfg.host.control+'/core/service/app/wcm/common/score/log/control.jsp',
			data: {method:'getScoreList',jr_member_id:userData.id},
			success: function(res) {
				app.loading.hide();
				if (res.status === 'Y') {
					dataRender(res, getMore);
				} else if(res.status==='N'){
					app.loading.hide();
					$('#jifenList').empty();
					$.box.msg(res.message, {
						color: 'danger',
						delay: 2000
					});
				}
			}
		});
	};
	
	app.ready(function() {
		getData();

	});
});