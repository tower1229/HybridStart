/*
 * layout
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;

	var listData = [{
			item: '左滑操作列表0',
			className: 'first'
		}, {
			item: '左滑操作列表1'
		}, {
			item: '左滑操作列表2'
		}];
	//侧滑操作列表
	require.async('option-list', function(optionList) {
		var demo = optionList({
			selector: '#controlList',
			data: listData,
			buttons: [{
				text: '编辑'
			}, {
				text: '添加'
			}, {
				className: 'btn-danger',
				text: '删除'
			}],
			onClick: function(button, itemIndex, itemLength) {
				var optionIndex = $(button).data('index');
				switch(optionIndex){
					case "0":
						app.toast(demo.data[itemIndex].item);
						break;
					case "1":
						demo.add({
							item: '左滑操作列表' + demo.data.length
						});
						break;
					case "2":
						demo.delete(itemIndex);
						break;
					default:
						console.log('optionlist:error');
				}
				
			}
		});
	});

	
});