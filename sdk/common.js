/*
 * name: common
 * version: 0.3.3
 * update: date过滤器分钟显示bug
 * date: 2015-11-11
 */

define(function(require, exports, module) {
	"use strict";
	var $ = app.util;
	var $body = $('#body').length ? $('#body') : $('body');
	//页面关闭按钮
	$body.on('touchstart', '#goBack', function(e) {
		app.window.close();
		//销毁百度地图实例
		try{
			var map = api.require('bMap');
			map.close();
		}catch(e){
			console.log(e.message)
		}
	});

	//按钮效果
	$body.on('touchstart', '.btn', function(e) {
		$(e.target)[0].classList.add('active');
	}).on('touchcancel', '.btn', function(e) {
		$(e.target)[0].classList.remove('active');
	}).on('touchmove', '.btn', function(e) {
		$(e.target)[0].classList.remove('active');
	}).on('touchend', '.btn', function(e) {
		$(e.target)[0].classList.remove('active');
	});
	//批量绑定active
	$body.on('touchstart', '[active]', function(e) {
		var target = e.target;
		target.classList.remove('active');
		var activeHandle = document.createElement('div');
		activeHandle.classList.add('active-handle');
		var targetOffset = e.touches;
		var eleOffset = target.getBoundingClientRect();
		if(targetOffset && eleOffset){
			activeHandle.style.left = targetOffset.clientX - eleOffset.left - 200 + 'px';
			activeHandle.style.top = targetOffset.clientY - eleOffset.top - 200 + 'px';
			target.normalize();
			var lastNode = target.lastChild;
			if(lastNode){
				if(lastNode.nodeName==='#text' && !lastNode.nodeValue.trim()){
					lastNode = lastNode.previousSibling;
				}
				target.insertBefore(activeHandle, lastNode);
			}else{
				target.appendChild(activeHandle);
			}
			setTimeout(function(){
				target.classList.add('active');
			},0);
		}
		
		target.setAttribute('data-touch', 1);
		
	}).on('touchcancel', '[active]', function(e) {
		var target = e.target;
		target.classList.remove('active');
		target.removeAttribute('data-touch');
	}).on('touchmove', '[active]', function(e) {
		var target = e.target;
		target.classList.remove('active');
		target.removeAttribute('data-touch');
	}).on('touchend', '[active]', function(e) {
		var target = e.target;
		var v = target.getAttribute('active');
		setTimeout(function(){
			var oldNode = target.querySelector('.active-handle');
			if(oldNode){
				target.removeChild(oldNode);
			}
			target = v = null;
		}, appcfg.set.animateDuration * 2);
		if (v) {
			if (target.getAttribute('data-touch')) {
				target.removeAttribute('data-touch');
				var openParam = v.split(',');
				try{
					openParam[0] = JSON.parse(openParam[0]);
				}catch(e){
					console.log('try JSON.parse():' + e.message);
				}
				app.openView.apply(app, openParam);
			}
		}
	});
	
	// 键盘状态
	$.each($('input'), function(i, ele) {
		ele.addEventListener('focus', function() {
			//输入状态
			$body[0].classList.add("onKeyboard");
		});
		ele.addEventListener('blur', function() {
			$body[0].classList.remove("onKeyboard");
		});
	});
	

	app.ready(function() {
		var platform = api.systemType;
		var version = api.systemVersion;
		//系统兼容
		if (platform === 'android') {
			//item-radio强制重绘
			if (parseFloat(version) < 4.3) {
				$body.on('click', '.item-radio', function() {
					var $view = $(this).parent();
					$view.css('visibility', 'hidden');
					setTimeout(function() {
						$view.css('visibility', 'visible');
					}, 0);
				});
			}
		}
		
		//自动加载data-src
		app.window.on('resume', function(){
			$.each($('[data-src]'), function(i, ele){
				var url = $(ele).data('src');
				if (ele.tagName.toLowerCase() === 'img') {
					ele.setAttribute('src', url);
				} else {
					ele.style.backgroundImage = "url(" + url + ")";
				}
				ele.removeAttribute('data-remote');
			});
		});
		//沉浸式状态栏
		let safeTop = api.safeArea.top;
		if(safeTop && safeTop>24){
			document.querySelector('.head') && (document.querySelector('.head').style.paddingTop = safeTop + 'px')
		}

	});
});