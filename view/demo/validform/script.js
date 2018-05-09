/*
 * layout
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;
	//js
	var Validform = require('validform');
	var loginForm = Validform('#form', {
		ajaxPost: true,
		url: 'http://rap2api.taobao.org/app/mock/3567/return/Yes',
		callback: function(res) {
			app.toast("注册成功", {
				global:true
			});
			app.window.close();
		}
	});


});