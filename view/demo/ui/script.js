/*
 * layout
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;

	$('#picControl').on('click', '._adder', function() {
		app.actionSheet({
			title: '选择图片',
			buttons: ['拍摄', '选择图片']
		}, function(index) {
			app.toast('选择了第' + index + '项');
			
		});
	});

	$('.loading')[0].addEventListener('touchend', function(){
		app.loading.show();
		setTimeout(function(){
			app.loading.hide();
		}, 1500);
	});
	$('.alert')[0].addEventListener('touchend', function(){
		app.alert('hello  HybridStart!');
	});
	$('.confirm')[0].addEventListener('touchend', function(){
		app.confirm('Are you ok?', function(){
			app.toast('good!');
		}, function(){
			app.toast('sad~');
		});
	});
	$('.prompt')[0].addEventListener('touchend', function(){
		app.prompt( function(text){
			app.toast('你写的是 ' + text);
		}, null, {
			title: '写点什么'
		});
	});

	
});