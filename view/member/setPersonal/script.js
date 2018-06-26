/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var $ = app.util;
	var userData = comm.getUser();
	var Validform = require('validform');

	var vf = Validform('#setPersForm', {
		url: "http://rap2api.taobao.org/app/mock/3567/return/Yes",
		ajaxPost: true,
		ajaxData: {
			"method": "modifyUserInfo",
			"sid": appcfg.project.sid,
			"obj.id": userData.id
		},
		beforeSubmit: function() {
			app.loading.show();
		},
		callback: function(res) {
			app.loading.hide();
			if (res.status === 'Y') {
				//成功存本地

				//跳转到个人中心
				setTimeout(function() {
					app.openView({
						closeself: true
					}, 'member');
				}, 0);
			} else if (res.status === 'N') {
				app.toast(res.msg);
			}
		}
	});
	//提交个人信息
	var sendUser = function() {
		var hasChange = false;
		$('#setPersForm input').each(function(i, e) {
			var o = $(e).data('origin'),
				v = e.value;
			if (o !== v) {
				hasChange = true;
				return false;
			}
		});
		if (hasChange) {
			$('#setPersForm')[0].submit();
		} else {
			app.window.close();
		}
	};

	var $avat = $('#avat')[0];
	var $avatImg = $('#avatImg')[0];
	var $nickName = $('#nickName')[0];
	var $realName = $('#realName')[0];
	var $mobile = $('#mobile')[0];

	var getUserInfo = function(reload) {
		if (reload) {
			userData = comm.getUser();
		}
		if (userData.headImg) {
			$avat.src = userData.headImg;
		} else {
			$avat.src = seajs.root + '/res/img/avat.jpg';
		}
		$avatImg.value = (userData.headImg);
		$nickName.value = (userData.nickName);
		$realName.value = (userData.realName);
		$mobile.innerText = (userData.mobile);
		//保存表单原值
		$('#setPersForm input[name]').each(function(i, e) {
			$(e).data('origin', e.value);
		});
	};

	var setLocalAvat = function(avatsrc) {
		$avat.attr('src', avatsrc);
		//上传头像
		require.async('upload', function(uploadImg) {
			uploadImg(avatsrc, {
				url: appcfg.host.backend + "/core/upload/",
				onCreate: function() {
					app.toast("正在上传");
				},
				success: function(newAvat) {
					var realPic = comm.source(newAvat);
					$avat.src = realPic;
					$avatImg.value = newAvat;
					app.toast('上传成功', 1000);
				},
				cancel: function() {
					$avat.attr('src', $avatImg.value);
				},
				error: function() {
					$avat.attr('src', $avatImg.value);
					app.toast('上传失败，请重试', 2000);
				}
			});
		});
	};
	//选择头像
	var getPicBtns = ['拍摄', '选择图片'];
	$('#editAvat')[0].addEventListener('touchend', function() {
		app.actionSheet({
			title: '更换头像',
			buttons: getPicBtns
		}, function(index) {
			var txt = getPicBtns[index - 1];
			app.toast(txt);
		});

	});

	// 保存
	$('#save')[0].addEventListener('touchend', function() {
		sendUser();
	});

	getUserInfo();

	app.ready(function() {
		


	});
});