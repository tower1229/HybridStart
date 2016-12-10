/*
 * layout
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');

	require('box');
	$('.box-alert').on('click', function() {
		$.box.alert('hello box!', function() {
			$.box.msg('alert的回调');
		});
	});
	$('.box-confirm').on('click', function() {
		$.box.confirm('hello box!', function() {
			$.box.msg('确定回调');
		}, function() {
			$.box.msg('取消回调');
		});
	});
	$('.box-msg').on('click', function() {
		$.box.msg('注意，这是一条测试信息！', {
			delay: 3000
		});
	});
	$('.box-html').on('click', function() {
		var $dom = '自定义content';
		$.box($dom);
	});
	$('.box-amount').on('click',function(){
		$.box.amount(1,function(num){
			$.box.msg(num);
		});
	});
	$('.box-input').on('click',function(){
		$.box.input('placeholder',function(text){
			$.box.msg(text);
		});
	});


	app.ready(function() {


	});
});