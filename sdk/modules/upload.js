/*
 * name: upload.js
 * version: v0.5.2
 * update: success接收服务端数据；error接收异常信息
 * date: 2019-03-21
 */
define('upload', function(require, exports, module) {
	'use strict';
	var $ = app.util,
		base = require('base');
	var def = {
		url: '',
		data: {},
		onCreate: function(opCode) {
			app.toast('正在上传...');
		},
		onCreateError: function() {
			app.toast('创建上传失败');
		},
		onStatus: function(percent) {
			app.toast('正在上传:' + percent + '%');
		},
		success: function(remoteUrl) {

		},
		error: function() {
			app.toast('上传失败');
		}
	};
	var Upload = function(localImgPath, option) {
		var opt = $.extend({}, def, option || {}),
			uploadHost = opt.url,
			randOpId = base.getUUID();
		if (!localImgPath || !uploadHost) {
			return console.log('参数异常');
		}
		opt.onCreate(randOpId);

		api.ajax({
			tag: randOpId,
			url: uploadHost,
			method: 'post',
			timeout: appcfg.set.longtime / 1000, //s
			data: {
				values: opt.data,
				files: {
					file: localImgPath
				}
			},
			report: true,
			headers: opt.headers
		}, function(ret, err) {
			if (ret) {
				switch (ret.status) {
					case 0:
						opt.onStatus(ret.progress);
						break;
					case 1:
						try {
							opt.success(ret.body);
						} catch (e) {
							console.log(JSON.stringify(ret.body));
						}
						break;
					case 2:
						opt.error(ret);
						break;
					default:
						opt.onCreateError(ret, err);
						break;
				}
			} else if (err) {
				switch (err.cade) {
					case 0:
						api.alert({
							title: '上传',
							msg: '连接错误！',
						});
						break;
					case 1:
						api.alert({
							title: '上传',
							msg: '上传超时，请重试！',
						});
						break;
					case 2:
						api.alert({
							title: '上传',
							msg: '授权错误！',
						});
						break;
					case 3:
						api.alert({
							title: '上传',
							msg: '数据类型错误！',
						});
						break;
					default:
						opt.error();
						api.alert({
							title: '上传',
							msg: '未知错误！',
						});
						break;
				}
			}
		});
		return {
			abort: function() {
				api.cancelAjax({
				    tag: randOpId
				});
			}
		};
	};

	module.exports = Upload;
});