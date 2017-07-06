/**
 * member
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var $ = app.util;

	var userData = comm.getUser();
	//拉取个人信息
	var showUser = function(reload) {
		if (reload) {
			userData = comm.getUser();
		}
		if(userData.headImg){
			$('#avat')[0].src = userData.headImg;
		}
		
		$('#usern')[0].innerText = (userData.nickName);
		$('#score')[0].innerText = (userData.nowScore);
	};
	$('#avat')[0].addEventListener('touchend',function(){
		app.openView(null,'member','setPersonal');
	});
	
	showUser();
	
	app.ready(function() {
		

	});
});