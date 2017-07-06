/*
 * layout
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;

	//侧滑操作列表
	require.async('option-list', function(optionList) {
		var demo = optionList({
			selector: '#controlList',
			data: [{
				item: '左滑操作',
				className: 'first'
			}, {
				item: '这是一个列表'
			}],
			buttons: [{
				text: '编辑'
			}, {
				className: 'btn-danger',
				text: '删除'
			}],
			onClick: function(button, itemIndex, itemLength) {
				var optionIndex = $(button).data('index');
				if (optionIndex == 0) {
					console.log('编辑')
				} else if (optionIndex == 1) {
					demo.delete(itemIndex);
				}
			}
		});
	});

	app.ready(function() {
		

	});
});