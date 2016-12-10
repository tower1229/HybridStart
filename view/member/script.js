/**
 * member
 */
define(function(require) {
	var comm = require('sdk/server');require('sdk/common');
	var userData = comm.getUser();
	//拉取个人信息
	var showUser = function(reload) {
		if (reload) {
			userData = comm.getUser();
		}
		if(userData.headImg){
			$('#avat').data('remote', userData.headImg);
		}
		
		$('#usern').text(userData.nickName);
		$('#score').text(userData.nowScore);
	};
	$('#avat').on('click',function(){
		app.openView(null,'member','setPersonal');
	});
	//订单flag
	var $orderList = $('#orderFlagList');
	$orderList.on('click','li',function(){
		var flag = $(this).data('flag');
		app.ls.val('orderFlag',flag);
		setTimeout(function(){
			app.openView(null,'shop','orderList');
		},0);
	});
	
	app.ready(function() {
		showUser();

		app.window.resume(function(){
			app.ls.remove('orderFlag');
			app.ls.remove('orderInitPageName');
			//刷新个人信息
			showUser(true);
		});
		//新消息提醒
		app.window.subscribe('newmsg', function(data) {
			if (data) {
				//alert(smSideCont.find('#toMsgList span').length)
				$('#mymsg span').addClass('reddot');
			} else {
				$('#mymsg span').removeClass('reddot');
			}
		});
		

	});
});