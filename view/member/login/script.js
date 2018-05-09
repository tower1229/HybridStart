/**
 * login
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var $ = app.util;
	var crossParam = app.getParam();

	//登录验证
	var Validform = require('validform');
	var vf = Validform('#logForm', {
		url: "http://rapapi.org/mockjsdata/9195/common/getYes/",
		ajaxPost: true,
		beforeCheck: function() {
			if ($('#usern')[0].value == "9527") {
				app.openView(null, 'x');
				return false;
			}
			return true;
		},
		beforeSubmit: function() {
			$('#logForm input').each(function(i, input) {
				input.blur();
			});
			app.loading.show();
			return true;
		},
		callback: function(res) {
			app.loading.hide();
			if (res.status === 'Y') {
				//初始化用户数据
				comm.initUser({
					tag: 'tag1',
					id: 123,
					nowScore: 100,
					nickName: '斑斑',
					headImg: "../../../res/img/avat.jpg"
				});
				setTimeout(function() {
					app.openView({
						closeself: true
					}, 'demo', 'index');
				}, 0);
			} else {
				app.toast(res.msg || '登录失败');
			}
		}
	});
	

	app.ready(function() {
		//检测状态
		if (crossParam == 'changeuser') {
			//关闭后台页面
			app.publish('closeback', 'closeback');
		}
		//返回拦截
		app.key('keyback', function() {
			setTimeout(function() {
				app.exit();
			}, 0);
		});


	});
});