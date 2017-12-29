/*
 * name: download.js
 * version: v0.2.0
 * update: 主持所有apicloud配置项
 * date: 2017-12-28
 */
define('download', function(require, exports, module) {
	'use strict';
	var $ = app.util,
		def = {
			path: "fs://Download/",
			name: "",
			onCreate: function() {
				app.loading.show('正在下载');
			},
			onCreateError: function(err) {
				app.loading.hide();
				app.toast('创建下载失败：' + err.msg);
			},
			onStatus: function(percent) {
				app.loading.show('正在下载:' + percent + '%');
			},
			success: function(savePath, fileSize) {
				app.loading.hide();
			},
			error: function(status) {
				app.loading.hide();
				if (status === 2) {
					app.toast('下载失败');
				} else {
					app.toast('下载异常，status:' + status);
				}
			}
		};

	var download = function(remotePath, option) {
		var randOpId = Math.floor(Math.random() * (1000 + 1)),
			opt = $.extend({}, def, option || {}),
			filePath,
			cancel = function(){
				app.loading.hide();
				api.cancelDownload({
					url: remotePath
				});
			},
			timer = setTimeout(function() {
				cancel();
				app.toast('下载超时');
			}, opt.outime || appcfg.set.longtime);
		if (!remotePath || !remotePath.split) {
			return;
		}
		if (!opt.name) {
			opt.name = randOpId;
		}
		filePath = opt.path + opt.name;
		opt.onCreate();

		api.download({
			url: remotePath,
			savePath: filePath,
			report: opt.report || true,
			cache: opt.cache || true,
			allowResume: opt.allowResume || true
		}, function(ret, err) {
			if (ret) {
				switch (ret.state) {
					case 0:
						opt.onStatus(ret.percent);
						break;
					case 1:
						clearTimeout(timer);
						opt.success(ret.savePath, ret.fileSize);
						break;
					case 2:
						clearTimeout(timer);
						opt.error(2);
						break;
					default:
						clearTimeout(timer);
						opt.error(ret.state);
				}
			} else {
				clearTimeout(timer);
				opt.onCreateError(err);
			}
		});
		return {
			abort: function() {
				cancel();
				clearTimeout(timer);
			}
		};
	};

	module.exports = download;
});