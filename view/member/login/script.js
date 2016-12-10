/**
 * login
 */
define(function(require) {
	var comm = require('sdk/server');require('sdk/common');
	require('validform');
	require('box');
	

	//去注册
	$('#toReg').on('click', function() {
		app.openView({
			anim: 12
		}, "member", "reg");
	});
	//访客模式
	$('#asGuest').on('click', function(e) {
		e.preventDefault();
		app.openView({
			anim: 12
		}, 'member', 'guest');
	});
	//忘记密码
	$('#forgetPw').on('click', function() {
		app.openView({
			param: {
				title:'忘记密码',
				mobile:$('#usern').val()
			}
		}, 'member', 'validMobile');
	});

	app.ready(function() {
		var crossParam = app.ls.val('crossParam');
		//检测状态
		if(crossParam=='changeuser'){
			app.ls.remove('crossParam');
			//关闭后台页面
			app.window.publish('closeback','closeback');
		}
		//登录验证
		var vf = $('#logForm').Validform({
			url: appcfg.host.control + '/member/login.jsp',
			ajaxPost: true,
			ajaxData: {},
			beforeCheck:function(){
				if($('#usern').val()=="9527"){
					app.openView(null,'x');
					return false;
				}
				return true;
			},
			beforeSubmit:function(){
				app.loading.show();
				$('#logForm input').blur();
			},
			callback: function(res) {
				app.loading.hide();
				if (res.status === 'Y') {
					var userData = res.data[0];
					comm.initUser(userData);
					setTimeout(function(){
						app.openView({
							closeself:true
						},'member');
					},0);
					//登陆同时注册的用户更新地址位置
					if(res.code==1){
						comm.uploadifyLocation();
					}
				} else if (res.status === 'N') {
					comm.sendMsg();
					$('#getCode').removeClass('unable').text('获取验证码');
					$.box.msg(res.message, {
						delay: 2000,
						color: 'danger'
					});
				}
			}
		});
		//登录方式
		$('input[name="login_type"]').on('change', function() {
			if ($(this).val() == 1) {
				vf.addRule([{
					ele: "#password",
					datatype: "n4-6",
					nullmsg: "请输入短信验证码！"
				}]);
				$('#password').val('');
				$('#getCode').show();
				$('#password').prop('placeholder', '请输入验证码').attr('type','number');
			} else {
				vf.addRule([{
					ele: "#password",
					datatype: "*6-16",
					nullmsg: "请输入密码！"
				}]);
				$('#password').val('');
				$('#getCode').hide();
				$('#password').prop('placeholder', '请输入密码').attr('type','password');
			}
		});
		//短信验证码
		$('#getCode').on('click', function() {
			if ($(this).hasClass('unable')) {
				return null;
			}
			var mobile = $('#usern').val();
			if (vf.check(false, '#usern')) {
				comm.sendMsg(mobile, 'logSendMsg');
			}
		});

	});
});