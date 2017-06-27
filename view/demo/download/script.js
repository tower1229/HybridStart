/*
 * layout
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');

	var download = require('download');
	var testurl = "http://static-zt.oss-cn-qingdao.aliyuncs.com/mock/notice2.zip";
	var downloadHandle;

	$('#downbtn').on('click', function(){
		downloadHandle && downloadHandle.abort();

		downloadHandle = download(testurl, {
			name: 'download-test.zip',
			success: function(savePath, fileSize){
				app.openToast('下载完成：' + savePath);
			}
		});
	});

	app.ready(function() {
		

	});
});