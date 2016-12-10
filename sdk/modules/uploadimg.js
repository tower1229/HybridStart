/*
 * name: uploadimg.js
 * version: v0.4.0
 * update: url必传
 * date: 2016-04-14
 */
define('uploadimg', function(require, exports, module) {
	var def = {
		url: '',
		onCreate:function(opCode){
			app.window.openToast('正在上传...', '1000');
		},
		onCreateError:function(){
			app.window.openToast('创建上传失败', '2000');
		}, 
		onStatus:function(percent){
			app.window.openToast('正在上传:'+percent+'%', '2000');
		},
		success:function(remoteUrl){

		},
		cancel:function(cancel){
			app.window.openToast('取消上传', '2000');
		},
		error:function(){
			app.window.openToast('上传失败', '2000');
		}
	};
	var uploadImg = function(localImgPath, option) {
		var opt = $.extend(def, option || {}),
			uploadHost = opt.url,
			randOpId = app.getUUID();
		if(!uploadHost){
			return null;
		}
		opt.onCreate(randOpId);
		//注入header
		var header = {};
		if(app.ls.val('user')){
			var _user = JSON.parse(app.ls.val('user'));
			header = {
				id: _user.id,
				password: _user.password
			};
		}
		api.ajax({
			tag: randOpId,
		    url: uploadHost,
		    method: 'post',
		    timeout: appcfg.set.longtime/1000, //s
		    data: {
		        files: {
		            file: localImgPath
		        }
		    },
		    report:true,
		    headers: header
		}, function(ret, err) {
		    if (ret) {
		    	switch(ret.status){
		    		case 0:
		    			opt.onStatus(ret.progress);
		    			break;
		    		case 1:
		    			try{
		    				opt.success(ret.body.data[0].path);
		    			}catch(e){
		    				console.log(ret.body);
		    			}
		    			break;
		    		case 2:
		    			opt.error();
		    			break;
		    		default:
		    			opt.onCreateError();
		    			break;
		    	}
		    } else if(err) {
		    	switch(err.cade){
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
	};

	module.exports = uploadImg;
});