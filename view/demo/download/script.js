/*
 * layout
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;

	var download = require('download');
	var testurl = "https://static-zt.oss-cn-qingdao.aliyuncs.com/mock/plugin-test.zip";
	var downloadHandle;

	$('#downbtn')[0].addEventListener('touchend', function() {
		downloadHandle && downloadHandle.abort();

		downloadHandle = download(testurl, {
			name: 'download-test.zip',
			success: function(savePath, fileSize) {
				app.loading.hide();
				app.toast('下载完成：' + savePath);
			}
		});
	});

	
});