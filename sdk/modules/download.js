/*
 * name: download.js
 * version: v0.0.1
 * update: build
 * date: 2015-10-22
 */
define('download', function(require, exports, module) {
	'use strict';
	var def = {
		path: "widget://myspace/down/",
		name: "",
		onCreate: function() {
			app.window.openToast('正在下载', '2000');
		},
		onCreateError: function() {
			app.window.openToast('创建下载失败', '2000');
		},
		onStatus: function(percent) {
			app.window.openToast('正在下载:' + percent + '%', '2000');
		},
		success: function(filePath) {

		},
		error: function() {
			app.window.openToast('下载失败', '2000');
		}
	};

	var download = function(remotePath, option) {
		var randOpId = Math.floor(Math.random() * (1000 + 1)),
			opt = $.extend(def, option || {}),
			filePath;
		if (!opt.name) {
			opt.name = randOpId
		};
		filePath = opt.path + opt.name;
		opt.onCreate();
		api.download({
			url: remotePath,
			savePath: filePath,
			report: true,
			cache: true,
			allowResume: true
		}, function(ret, err) {
			if (ret) {
				switch (ret.state) {
					case 0:
						opt.onStatus(ret.percent);
						break;
					case 1:
						api.cancelDownload({
							url: remotePath
						});
						opt.success(ret.savePath, ret.fileSize);
						break;
					case 2:
						api.cancelDownload({
							url: remotePath
						});
						opt.error();
						break;
					default:
						opt.error()
						break;
				}
			} else {
				opt.onCreateError()
			}

		});
	};

	module.exports = download;
});