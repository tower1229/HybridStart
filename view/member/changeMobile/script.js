/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');
	var userData = comm.getUser();
	require('sdk/common');
	require('validform');
	require('box');

	var crossparam = JSON.parse(app.ls.val('crossParam'););
	if (crossparam) {
		$('#mobile').val(crossparam['mobile']);
		$('#headTitle').text(crossparam['title']);
	}
	//验证
	var vf = $('#validMobileForm').Validform({
		url: appcfg.host.control + '/core/service/app/wcm/common/member/control.jsp',
		ajaxPost: true,
		ajaxData: {
			"method": "changeMobile",
			"sid": appcfg.project.sid,
			"jr_member_id":userData.id
		},
		beforeSubmit: function() {
			app.loading.show('提交中...');
		},
		callback: function(res) {
			app.loading.hide();
			if (res.status === 'Y') {
				userData.usern = $('#mobile').val();
				app.ls.val('user', JSON.stringify(userData));
				app.window.close();
			} else if (res.status === 'N') {
				$.box.msg('验证码不正确！', {
					delay: 2000,
					color: 'danger'
				})
			}
		}
	});

	//短信验证码
	$('#getCode').on('click', function() {
		if ($(this).hasClass('unable')) {
			return
		}
		var mobile = $('#mobile').val();
		if (vf.check(false, '#mobile')) {
			$('#goNext').removeClass('disabled');
			comm.sendMsg(mobile, 'changeMobileSendMsg');
		}
	});

	app.ready(function() {

	});
});