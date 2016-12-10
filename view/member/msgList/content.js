/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var userData = comm.getUser();
	require('scrollLoad');
	require('box');

	var dataTemp = $('#msgTemp').val();

	//取消息
	var getData = function(reload, cb) {
		app.loading.show('正在读取消息');
		app.toload({
			url: appcfg.host.control + '/member/listMessage.jsp',
			data: {},
			reload: reload,
			success: function(res) {
				app.push.stop();
				if (res.status === 'Y') {
					app.render(dataTemp, res, '#View', reload);
				} else if (res.status === 'N') {
					app.loading.hide();
					$.box.msg(res.message, {
						color: 'danger',
						delay: 2000
					});
				}
				if (typeof cb === 'function') {
					cb();
				}
			}
		});
	};

	window.change = getData;
	//按钮
	$('#View').on('click', '.type_msg', function() {
		var that = this,
			cla = $(that).attr('class'),
			data = $(that).data('id'),
			msgid = $(that).data('msgid');
		//已读
		app.ajax({
			url: appcfg.host.control + '/core/service/app/wcm/common/message/app/control.jsp',
			data: {
				method: 'readMessage',
				sid: appcfg.project.sid,
				member_id: userData.id,
				msg_id: msgid,
				alias: 'user_' + userData.id,
				tag: 'user'
			},
			success: function(res) {
				
			}
		});
		if (cla.indexOf('content') > -1) {
			//内容消息
			app.openView(msgid, 'member', 'msgdetail');
		} else if (cla.indexOf('link') > -1) {
			//外链消息
			app.openView(null, data);
		} else if (cla.indexOf('news') > -1) {
			//新闻消息
			app.openView(data, 'news', 'artDetail');
		} else if (cla.indexOf('goods') > -1) {
			//商品促销消息
			app.openView({
				param: {
					id: data
				}
			}, 'parts', 'detail');
		} else if (cla.indexOf('serveform') > -1) {
			//服务单消息
			alert('服务单消息');
		} else if (cla.indexOf('order') > -1) {
			//订单消息
			app.openView(data, 'shop', 'orderDetail');
		} else if (cla.indexOf('paper') > -1) {
			//问卷消息
			app.openView(data, 'common', 'paper');
		}

	});

	app.ready(function() {
		app.push.init(function() {
			getData(true);
		});

		$('body').scrollLoad(function($wrap, $loading) {
			getData(false, function() {
				$loading.remove();
			});
		});

		getData(true);


	});
});