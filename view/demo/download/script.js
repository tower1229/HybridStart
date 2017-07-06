/*
 * layout
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;

	var download = require('download');
	var testurl = "http://static-zt.oss-cn-qingdao.aliyuncs.com/mock/notice2.zip";
	var downloadHandle;

	$('#downbtn')[0].addEventListener('touchend', function() {
		downloadHandle && downloadHandle.abort();

		downloadHandle = download(testurl, {
			name: 'download-test.zip',
			success: function(savePath, fileSize) {
				app.toast('下载完成：' + savePath);
			}
		});
	});

	app.ready(function() {


	});
});