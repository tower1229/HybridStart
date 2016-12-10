/*
 * name: actionSheet.js
 * version: v0.2.0
 * update: 支持按钮icon定义
 * date: 2015-11-26
 * param:
 var actData = {
	titleText: 'Modify your album',
	buttons: ['拍摄','选择图片'],
	destructiveText: '删除',
	cancelText: '取消',
	buttonClicked: function(buttenIndex) {
		console.log('choose ' + buttenIndex);
	}
}
 */
define('actionSheet', function(require, exports, module) {

	var actionSheet = function(data) {
		if(!$.isPlainObject(data) || !$.isArray(data.buttons) || !data.buttons.length){
			return console.warn('actionSheet参数错误');
		};
		var actData = {
			titleText: '',
			buttons: [],
			destructiveText: '',
			cancelText: '',
			buttonClicked: function(index) {}
		};
		var opt = $.extend(actData,data);
		api.actionSheet({
		    title: opt.titleText,
		    buttons: opt.buttons,
		    cancelTitle: opt.cancelText,
		    destructiveTitle: opt.destructiveText,
		    style:{
		    	layerColor:'rgba(0,0,0,0.6)'
		    }
		}, function(ret, err) {
		    opt.buttonClicked(ret.buttonIndex);
		});
		
	};
	module.exports = actionSheet;
});