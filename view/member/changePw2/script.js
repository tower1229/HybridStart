/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');require('sdk/common');
	require('validform');
	var userData = comm.getUser();

	var vf = $('#resetPwForm').Validform({
		url: appcfg.host.control + '/core/service/app/wcm/common/member/control.jsp',
		ajaxPost: true,
		ajaxData: {
			"method": "s_mem_pwd",
			"sid": appcfg.project.sid,
			"usern": userData.usern
		},
		callback: function(res) {
			if (res.status === 'Y') {
				var data = res.data;
				userData.password = data[0].password;
				comm.initUser(userData);
				$.box.msg('密码修改成功！', {
					delay: 1000,
					onclose:function(){
						app.window.close();
					}
				});
			} else if (res.status === 'N') {
				//验证失败
				$.box.msg('密码修改失败，请重试！', {
					color: 'danger',
					delay: 2000
				});
			}
		}
	});



});