/*
 * layout
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');

	//js
	require('validform');
	var loginForm = $('#reg_form').Validform({
		ajaxPost: true,
		url: 'http://host.refined-x.com/test/ajax.php',
		callback: function(res) {
			app.openToast(res);
		}
	});

	app.ready(function() {


	});
});