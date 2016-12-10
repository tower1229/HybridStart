/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	require('box');

	var userData = app.ls.val('user');
	if (userData) {
		userData = JSON.parse(userData);
	}
	var mobile='';
	//取得手机号
	if (userData['mobile']) {
		mobile = userData['mobile'];
		$('#secMobile').text(comm.secMobile(mobile));
	}
	//获取验证码
	$('#getCode').on('click', function() {
		if ($(this).hasClass('unable')) {
			return;
		}
		comm.sendMsg(mobile, 'verify');
	});
	//下一步
	$('#goChangePw2').on('click', function() {
		var inputCode = $('#inputCode').val();
		if (inputCode && inputCode.split && inputCode.length == 4) {
			//验证短信码
			$.ajax({
				url: appcfg.host.control + '/core/service/app/wcm/common/member/control.jsp',
				data: {
					method: 'validMobile',
					param: inputCode,
					sid: appcfg.project.sid,
					usern: mobile
				},
				dataType: 'json',
				success: function(res) {
					if (res.status === 'Y') {
						app.openView({
							closeself:true
						}, 'member', 'changePw2');
					} else if (res.status === 'N') {
						if (res.message) {
							$.box.msg(res.message, {
								delay: 2000
							});
						}
					}
				}
			})
		} else {
			return $.box.msg('请填写四位验证码！', {
				delay: 2000,
				color: 'danger',
				onclose: function() {
					$('#inputCode').val('').focus();
				}
			});
		}
	});

	app.ready(function() {

	});
});