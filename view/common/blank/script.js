/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');

	app.ready(function(){
		require.async('optionList',function(optionList){
			var demo = optionList({
				selector:'#View',
				data:[
					{
						item:'这是一个列表',
						className:'first'
					},{
						item:'这是一个列表'
					}
				],
				buttons:[
					{
						text:'编辑'
					},{
						className:'btn-danger',
						text:'删除'
					}
				],
				onClick:function(button, itemIndex, itemLength){
					var optionIndex = $(button).index();
					if(optionIndex==0){
						console.log('编辑')
					}else if(optionIndex==1){
						demo.delete(itemIndex)
					}
				}
			})
		});

	});
});