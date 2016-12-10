/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var userData = comm.getUser();

	var dataRender = function(data) {
		var data = data.data[0];
		if(data && data.code){
			$('#yaoqingma').text(data.code);
		};
		app.loading.hide();
	}
	var getData = function() {
		app.loading.show('正在获取邀请码',{
			wrap:"#View"
		});
		app.ajax({
			url: appcfg.host.control + '/core/createMemberInvite.jsp',
			data: {
				sid: appcfg.project.sid,
				jr_member_id: userData.id
			},
			success: function(res) {
				if (res.status === 'Y') {
					dataRender(res);
				} else if (res.status === 'N') {
					app.loading.hide();
					$.box.msg(res.message, {
						color: 'danger',
						delay: 2000
					});
				}
			}
		});
	}
	//点击复制
	$('#yaoqingma').on('click',function(){
		var text = $(this).text();
		uexClipboard.copy(text);
		app.window.openToast('复制成功，快发送给好友吧！',1000);
		text = null;
	});

	app.ready(function() {
		getData();
		

	});
});