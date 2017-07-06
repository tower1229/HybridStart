/*
 * root
 */
define(function(require) {
	var comm = require('sdk/server');
	
	var startApp = function() {
		app.openView({
			anim: 'none'
		}, 'demo', 'index');
	};

	app.ready(function() {
		//推送
		var ajpush = api.require('ajpush');
		var pushable;
		if (app.storage.val('pushable') === null) {
			app.storage.val('pushable', '1');
		}
		pushable = app.storage.val('pushable') === '1';
		if (ajpush) {
			var catchPush = function(json) {
				alert(JSON.stringify(json));
				var id = json.id;
				var title = json.title;
				var content = json.content;
				var extras = json.extras ? json.extras : {};
			};
			var pushFunc = function() {
				//前台接收通知
				ajpush.setListener(function(ret) {
					catchPush(ret);
				});
				//点击消息
				if (window.platform === 'android') {
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
				}
			});
		}

		//预取数据
		comm.checkPreget();

		//检查更新
		comm.checkUpdate(api.systemType, true);

		//app启动&恢复事件
		app.on('resume', function() {
			ajpush.onResume();
			comm.getLocation();
			comm.collection();
		});

		app.on('pause', function() {
			ajpush.onPause();
		});

		startApp();

	});
});