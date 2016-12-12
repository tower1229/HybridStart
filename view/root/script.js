/*
 * land
 */
define(function(require) {
	var comm = require('sdk/server');
	var appInit = app.ls.val('appInit');
	var startApp = function() {
		app.openView({
			anim: 'none'
		}, 'demo', 'index');
	};

	app.ready(function() {
		//监听右滑事件
		api.addEventListener({
			name: 'swiperight'
		}, function(ret, err) {
			return console.log('右滑');
		});
		//推送
		var pushable = app.ls.val('pushable');
		if (pushable === null) {
			app.ls.val('pushable', '1');
			pushable = 1;
		}
		var ajpush = api.require('ajpush');
		var catchPush = function(json) {
			alert(JSON.stringify(json));
			// if (!app.ls.val('user')) {
			// 	return null;
			// }
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

			if (pushable === '0') {
				ajpush.stopPush(function(ret) {
					if (ret && ret.status) {
						console.log('已停止推送');
					}
				});
			}
		};
		ajpush.init(function(ret) {
			if (ret && ret.status) {
				pushFunc();
			}
		});

		//预取数据
		comm.checkPreget();

		//检查更新
		comm.checkUpdate(api.systemType, true);

		//app启动&恢复事件
		app.resume(function() {
			ajpush.onResume();
			comm.getLocation();
			comm.collection();
		});
		app.pause(function() {
			ajpush.onPause();
		});

		startApp();


	});
});