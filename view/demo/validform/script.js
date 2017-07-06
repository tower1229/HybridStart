/*
 * layout
 */
define(function(require) {
	require('sdk/common');
	var $ = require('jquery');
	//js
	var Validform = require('validform');
	var loginForm = Validform($('#reg_form'), {
		ajaxPost: true,
		url: 'http://host.refined-x.com/test/ajax.php',
		callback: function(res) {
			app.toast(res);
		}
	});

	app.ready(function() {


	});
});