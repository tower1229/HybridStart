/**
 * reg
 */
define(function(require) {
	var comm = require('sdk/server');require('sdk/common');
	require('validform');
	require('box');
	var referrer = app.ls.val('referrer');
	//去登录
	$('#toLog').on('click', function() {
		app.openView({
			anim: 12
		}, "member", "login");
	});
	
	app.ready(function() {
		//验证
		var vf = $('#regForm').Validform({
			url: appcfg.host.control + '/core/service/app/wcm/common/member/control.jsp',
			ajaxPost: true,
			ajaxData: {
				"method": "userRegister",
				"obj.sid": appcfg.project.sid
			},
			beforeSubmit:function(){
				if(!$('#agree').prop('checked')){
					$.box.msg('请阅读并同意用户协议',{
						delay:3000,
						color:'danger'
					});
					return false;
				}
				app.loading.show();
			},
			callback: function(res) {
				app.loading.hide();
				if (res.status === 'Y') {
					app.ls.remove('xieyi');
					var userData = res.data[0];
					comm.initUser(userData);
					$.box.msg(res.message, {
						delay: 2000,
						color: 'success',
						onclose: function() {
							app.openView(null,'home');
						}
					});
					comm.uploadifyLocation();

				} else if (res.status === 'N') {
					$.box.msg(res.message, {
						delay: 2000,
						color: 'danger'
					});
				}
			}
		});
		$('#getCode').on('click', function() {
			if ($(this).hasClass('unable')) {
				return
			}
			var mobile = $('#usern').val();
			if (vf.check(false, '#usern')) {
				comm.sendMsg(mobile,'regSendMsg');
			}
		});
		//返回重新获取地址
		app.window.resume(function(){
			var xieyi =app.ls.val('xieyi');
			if(xieyi&&xieyi=='1') {
				$('#agree').prop('checked',true);
			}
		});
	});
});