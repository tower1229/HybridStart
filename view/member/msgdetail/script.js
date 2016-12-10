/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');require('sdk/common');
	var userData = comm.getUser();
	require('box');

	var msgid = app.ls.val('crossParam');;
	if(!msgid){
		return $.box.alert('消息数据错误！');
	}

	var dataRender  =function(data){
		var msg = data.data[0];
		//console.log(msg)
		var msgcont = comm.xss(msg.description);
		$('#artDetail').html(comm.richMedia(msgcont));
	}
	var getData = function(){
		app.ajax({
			url: appcfg.host.control + '/core/service/app/wcm/common/message/app/control.jsp',
			data:{
				method:'detailMessage',
				member_id:userData.id,
				sid:appcfg.project.sid,
				msg_id:msgid
			},
			success:function(res){
				if(res.status==='Y'){
					dataRender(res);
				}else if(res.status==='N'){
					$.box.msg(res.message,{
						color:'danger',
						delay:2000
					});
				}
			}
		});
	};

	app.ready(function() {
		getData();

	});
});