/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');require('sdk/common');

	var goChannel = function(index,open){
		var target = $('#shopChannel').find('._item').eq(index);
		$('#shopChannel').removeClass('channel0 channel1 channel2').addClass('channel'+index);
		//存栏目标识
		app.ls.val('crossParam',target.data('view'));
		//打开模板
		if(open){
			app.window.popoverElement({
				id: 'view',
				name: 'popView',
				url: 'content.html',
				top: $('#view').offset().top
			});
		}else{
			//app.window.evaluateScript('member_favor_view','change()');
			app.window.evaluatePopoverScript('','popView','change()');
		}
	}
	//编辑模式
	$('#edit').on('click',function(){
		if($(this).hasClass('cartSave')){
			$(this).removeClass('cartSave');
			app.window.evaluatePopoverScript('','popView','hideEdit()');
		}else{
			$(this).addClass('cartSave');
			app.window.evaluatePopoverScript('','popView','showEdit()');
		}
	});
	//选择类别
	$('#shopChannel').on('click','._item',function(){
		var i = $(this).index();
		if($('#edit').hasClass('cartSave')){
			$('#edit').trigger('click');
		}
		if($('#shopChannel').hasClass('channel'+i)){
			return
		}
		goChannel(i);
	});
	
	app.ready(function(){
		goChannel(0,true);	
		

	});
});