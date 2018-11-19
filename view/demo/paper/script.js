/**
 * 
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;
	var Validform = require('validform');
	
	
	var getData = function() {
		app.loading.show('正在加载问卷');
		app.ajax({
			url: appcfg.host.control + '/getPaper',
			data: {
				paper_id: '1',
				member_id: '0000'
			},
			success: function(res) {
				if (res.status === 'Y') {
					dataRender(res);
				} else {
					app.loading.hide();
					app.toast(res.msg || '当前没有可用问卷', {
						color: 'danger',
						delay: 1000
					});
				}
			}
		});
	};

	var render = require('render');
	var renderHandle = render({
		el: '#paperForm',
		callback: function($form) {
			app.loading.hide();
			Validform($form, {
				url: 'http://rap2api.taobao.org/app/mock/3567/return/Yes',
				ajaxPost: true,
				callback: function(res) {
					if (res.status === 'Y') {
						app.toast('问卷已提交，谢谢', {
							delay: 1000,
							onclose: function() {
								app.window.close();
							}
						});
					} else {
						app.toast(res.msg || '提交失败', {
							delay: 1000,
							onclose: function() {
								app.window.close();
							}
						});
					}
				}
			});
		}
	});
	var dataRender = function(data) {
		var paperData = data.data;
		//console.log(paperData)
		if (paperData.name) {
			$('#paperName')[0].innerText = (paperData.name);
		}
		if (paperData.summary) {
			$('#paperDescription')[0].innerHTML = (paperData.summary);
		}
		renderHandle.data(paperData);
	};

	app.ready(function() {
		getData();

	});
});