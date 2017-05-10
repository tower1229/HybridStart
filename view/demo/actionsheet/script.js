/*
 * layout
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var box = require('box');

	$('#picControl').on('click', '._adder', function() {
		require.async('actionSheet', function(actionSheet) {
			actionSheet({
				titleText: '选择图片',
				buttons: ['拍摄','选择图片'],
				cancelText: '取消',
				buttonClicked: function(index) {
					box.msg('选择了第'+index+'项');
					switch (index) {
						case 1:
							
							break;
						case 2:
							
							break;
					}
				}
			});
		});
	});


	app.ready(function() {
		

	});
});