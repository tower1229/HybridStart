/*
 *
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;

	$('#test')[0].addEventListener('touchend', function() {
		var CryptoJS = app.crypto;
		var cryptocfg = {
			mode: CryptoJS.mode.ECB,
			padding: CryptoJS.pad.Pkcs7
		};
		var keyHex = CryptoJS.enc.Utf8.parse(api.loadSecureValue({
		    sync: true,
		    key: 'secret'
		}));
		//加密参数
		var paramDataStr = "hello";
		var secureData = CryptoJS.TripleDES.encrypt(paramDataStr, keyHex, cryptocfg);
		var secureDataStr = secureData.ciphertext.toString();
		app.alert(paramDataStr + '=>3DES：' + secureDataStr);
	});

	$('#openblank')[0].addEventListener('touchend', function(){
		var now = new Date().getTime();
		app.window.open({
			url:'./blank/temp.html',
			param: now
		});
	});
	$('#openblanknojs')[0].addEventListener('touchend', function(){
		var now = new Date().getTime();
		app.window.open({
			url:'./blank-nojs/temp.html',
			param: now
		});
	});
	
	$('#devicePixelRatio')[0].innerText = window.devicePixelRatio;
	
});