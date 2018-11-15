/**
 * member
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var $ = app.util;
	
	//拉取个人信息
	window.update = function(reload) {
		var userData = comm.getUser();
		if(userData){
			if(userData.headImg){
				$('#avat')[0].src = userData.headImg;
			}
			$('#usern')[0].innerText = (userData.nickName);
			$('#score')[0].innerText = (userData.nowScore);
		}

	};
	$('#avat')[0].addEventListener('touchend',function(){
		app.openView(null,'member','setPersonal');
	});



});
