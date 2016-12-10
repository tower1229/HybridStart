/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');require('sdk/common');
	//初始页面
	var orderFlag = app.ls.val('orderFlag') || 0;

	var goChannel = function(index,open){
		$('#scrollSelectTarget').removeClass('channel0 channel1 channel2 channel3 channel4').addClass('channel'+index);
		//存栏目标识
		app.ls.val('orderFlag',index);
		//打开模板
		if(open){
			app.window.popoverElement({
				id: 'multiView',
				name: 'popView',
				url: 'content.html',
				top: $('#multiView').offset().top
			});
		}else{
			app.window.evaluatePopoverScript('','popView','change('+index+',true)');
		}
	}
	//点击切换
	$('#scrollSelectTarget').on('click', '._item', function() {
		var i = $(this).index();
		if ($('#scrollSelectTarget').hasClass('channel' + i)) {
			return
		}
		goChannel(i);
	});

	app.ready(function() {
		goChannel(orderFlag,true);
		
		app.window.on('close',function(){
			app.ls.remove('orderFlag');
		});

	});
});