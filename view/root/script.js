/*
 * root
 */
define(function(require) {
	var comm = require('sdk/server');
	
	var startApp = function() {
		app.loading.show();
		//预取数据
		comm.preGet(function(){
			app.loading.hide();
			app.openView({
				anim: 'none'
			}, 'demo', 'index');
		});
	};
	
	app.ready(function() {
		//极光推送
		var ajpush = api.require('ajpush');
		var pushable;
		if (app.storage.val('pushable') === null) {
			app.storage.val('pushable', '1');
		}
		pushable = app.storage.val('pushable') === '1';
		if (ajpush) {
			var catchPush = function(json) {
				var id = json.id;
				var content = json.content;
				var extras = json.extras ? json.extras : {};
				alert("推送内容:"+content);
			};
			var pushFunc = function() {
				//app内拦截自定义消息
				ajpush.setListener(function(ret) {
					catchPush(ret);
				});
				//点击标题栏消息
				var platform = api.systemType;
				if (platform === 'android') {
					api.addEventListener({
						name: 'appintent'
					}, function(ret, err) {
						if (ret && ret.appParam.ajpush) {
							var ajpush = ret.appParam.ajpush;
							catchPush(ajpush);
						}
					});
				} else {
					api.addEventListener({
						name: 'noticeclicked'
					}, function(ret, err) {
						if (ret && ret.value) {
							var ajpush = ret.value;
							catchPush(ajpush);
						}
					});
				}

				if (!pushable) {
					comm.push.close();
				}
			};
			ajpush.init(function(ret) {
				if (ret && ret.status) {
					pushFunc();
				}else{
					console.log(JSON.stringify(ret));
				}
			});
		}

		//app启动&恢复事件
		app.on('resume', function() {
			ajpush.onResume();
			comm.getLocation();
		});

		app.on('pause', function() {
			ajpush.onPause();
		});

		startApp();
		
	});
});