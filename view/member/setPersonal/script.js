/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var userData = comm.getUser();
	require('validform');
	require('box');

	var vf = $('#setPersForm').Validform({
		url: appcfg.host.control + '/core/service/app/wcm/common/member/control.jsp',
		ajaxPost: true,
		ajaxData: {
			"method": "modifyUserInfo",
			"sid": appcfg.project.sid,
			"obj.id": userData.id
		},
		beforeSubmit:function(){
			app.loading.show();
		},
		callback: function(res) {
			app.loading.hide();
			if (res.status === 'Y') {
				//成功存本地
				var newUserDate = res.data[0];
				comm.initUser(newUserDate);
				//跳转到个人中心
				setTimeout(function() {
					app.openView({
						closeself:true
					}, 'member');
				}, 0);
			} else if (res.status === 'N') {
				$.box.msg(res.message, {
					color: 'warning',
					delay: 2000
				});
			}
		}
	});
	//提交个人信息
	var sendUser = function() {
		var hasChange = false;
		$('#setPersForm').find('input').each(function(i,e){
			var o = $(e).data('origin'),
				v = $(e).val();
			if(o!==v){
				hasChange = true
				return;
			}
		});
		if(hasChange){
			$('#setPersForm').submit();
		}else{
			app.window.close();
		}
	};

	var getUserInfo = function(reload) {
		if(reload){
			userData = comm.getUser();
		};
		if(userData.headImg){
			$('#avat').data('remote', userData.headImg);
		}else{
			$('#avat').data('remote', seajs.root + '/res/img/avat.jpg');
		};
		$('#avatImg').val(userData.headImg);
		$('#nickName').val(userData.nickName);
		$('#realName').val(userData.realName);
		$('#mobile').text(userData.mobile);
		//保存表单原值
		$('#setPersForm').find('input[name]').each(function(i,e){
			$(e).data('origin',$(e).val());
		});
	}

	var setLocalAvat = function(avatsrc) {
		$('#avat').attr('src', avatsrc);
		//上传头像
		require.async('uploadimg', function(uploadImg) {
			uploadImg(avatsrc, {
				url: appcfg.host.backend + "/core/upload/",
				onCreate:function(){
					$('#avat').after('<div id="avat_state" class="avat_state">正在上传</div>');
				},
				success: function(newAvat) {
					var realPic = comm.source(newAvat);
					$('#avat').data('remote', realPic);
					$('#avatImg').val(newAvat);
					$('#avat_state').remove();
					app.window.openToast('上传成功', 1000);
				},
				cancel:function(){
					$('#avat').attr('src', $('#avatImg').val());
					$('#avat_state').remove();
				},
				error: function() {
					$('#avat').attr('src', $('#avatImg').val());
					$('#avat_state').remove();
					app.window.openToast('上传失败，请重试', 2000);
				}
			});
		});
	};
	//选择头像
	$('#editAvat').on('click', function() {
		require.async('actionSheet', function(actionSheet) {
			actionSheet({
				titleText: '更换头像',
				buttons: [{
					text: '拍摄'
				}, {
					text: '选择图片'
				}],
				cancelText: '取消',
				buttonClicked: function($target) {
					var txt = $.trim($target.text());
					switch (txt) {
						case '选择图片':
							uexImage.onPickerClosed = function(data) {
								var data = JSON.parse(data);
								if(!data.isCancelled){
									setLocalAvat(data.data[0]);
								};
							};
							uexImage.openPicker(JSON.stringify({
								max:1
							}));
							break;
						case '拍摄':
							uexImage.onCropperClosed=function(info){
								var info = JSON.parse(info);
								if(!info.isCancelled){
									setLocalAvat(info.data);
								}
						    };
							uexCamera.cbOpen = function(opCode, dataType, data) {
								uexImage.openCropper(JSON.stringify({
								    src:data
								}));
							};
							uexCamera.open(1);
							break;
					}
					txt = null;
					return true;
				}
			});
		});
	});

	//收货地址管理
	$('#editAddr').on('click', function() {
		app.openView(null, "member", "address");
	});
	// 保存
	$('#save').on('click', function() {
		sendUser();
	});

	app.ready(function() {
		getUserInfo();

		app.window.resume(function(){
			getUserInfo(true);
		});

		//监听默认地址修改
		app.window.subscribe('defaultAddr', function(msg) {
			if (msg == 'change') {
				getUserInfo();
			}
		});

	});
});