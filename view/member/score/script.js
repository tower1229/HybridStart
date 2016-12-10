/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var userData = app.ls.val('user');
	if(userData){
		userData = JSON.parse(userData);
	}
	app.ready(function(){
		$('#score').text(userData.nowScore) ;
	});
	

});