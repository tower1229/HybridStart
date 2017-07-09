seajs.root = '/docs';//'/HybridStart/docs';
seajs.config({
	base: "http://static-zt.oss-cn-qingdao.aliyuncs.com/modules",
	paths: {
		"lib": seajs.root + "/lib"
	},
	alias: {
		"audio"		     : "audio/audio",
		"copy"		     : "copy/ZeroClipboard",
		"flv"		     : "flv/flv",
		"hook"	 	     : "hook/hook",
		"jquery" 	     : "jquery/1/jquery.js",
		"validform"      : "validform/validform",
		"My97DatePicker" : "My97DatePicker/WdatePicker",
		"raty"		     : "raty/raty",
		"upload"         : "upload/upload",
		"makethumb"      : "upload/makethumb",
		"localResizeIMG" : "upload/localResizeIMG",
		"video"		     : "video/video",
		// localstorage缓存
		"seajs-localcache" : "seajs/seajs-localcache",
		// debug
		"seajs-debug" : "seajs/seajs-debug"
	}
});