/*
 * name: download.js
 * version: v0.1.0
 * update: build
 * date: 2017-06-26
 */
define('download', function(require, exports, module) {
	'use strict';
	var def = {
		path: "fs://Download/",
		name: "",
		onCreate: function() {
			app.openToast('正在下载', appcfg.set.longtime);
		},
		onCreateError: function(err) {
			app.openToast('创建下载失败：' + err.msg, '2000');
		},
		onStatus: function(percent) {
			app.openToast('正在下载:' + percent + '%', '2000');
		},
		success: function(savePath, fileSize) {

		},
		error: function(status) {
			if(status===2){
				app.openToast('下载失败', '2000');
			}else{
				app.openToast('下载异常，status:' + status, '2000');
			}
		}
	};

	var download = function(remotePath, option) {
		var randOpId = Math.floor(Math.random() * (1000 + 1)),
			opt = $.extend(def, option || {}),
			filePath,
			timer = setTimeout(function(){
				api.cancelDownload({
				    url: remotePath
				});
				app.openToast('下载超时', '2000');
			}, opt.outime || appcfg.set.longtime);
		if(!remotePath || !remotePath.split){
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
			abort: function(){
				clearTimeout(timer);
				api.cancelDownload({
				    url: remotePath
				});
			}
		};
	};

	module.exports = download;
});