/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');require('sdk/common');
	var userData = comm.getUser();

	require('validform');
	require('box');
	$('#mobile').val(userData.mobile);
	//添加图片
	var maxPicLen = 5;
	$('#picStor').text(maxPicLen);
	$('#picControl').on('click', '._adder', function() {
		require.async('actionSheet', function(actionSheet) {
			actionSheet({
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
	var setLocalAvat = function(avatsrc) {
		var adder = $('#picControl').find('._adder');
		var newImg = $('<div class="_pic"><div class="_del"><i class="ion">&#xe632;</i></div><img data-src="' + avatsrc + '" class="ableOpenImg"></div>');
		$('#picControl').append(newImg);
		adder.appendTo($('#picControl'));
		var has = $('#picControl ._pic').length;
		$('#picStor').text(maxPicLen - has);
		if (has >= maxPicLen) {
			$('#picControl').find('._adder').hide();
		}
		//上传图片 
		$('#sendBaoxiu').prop('disabled',true);
		require.async('uploadimg', function(uploadImg) {
			uploadImg(avatsrc, {
				url: appcfg.host.backend + "/core/upload/",
				onCreate:function(upId){
					newImg.data('upid', upId).append('<div class="_state"></div>');
				},
				onStatus:function(percent){
					newImg.find('._state').text(percent+'%');
				},
				success: function(newAvat) {
					$('#sendBaoxiu').prop('disabled',false);
					var realPic = comm.source(newAvat);
					newImg.data('remote', realPic).find('._state').text('上传成功');
					var picCollecter = $('#picCollecter').val();
					picCollecter += (realPic + ',');
					$('#picCollecter').val(picCollecter);
					setTimeout(function(){
						newImg.find('._state').remove();
					},0);
				},
				cancel:function(upId){
					$('#picControl ._pic').each(function(i,e){
						if( $(e).data('upid')==upId ){
							$(e).find('._del').trigger('click');
						}
					});
				},
				error: function() {
					$('#sendBaoxiu').prop('disabled',false);
					newImg.remove();
					app.window.openToast('上传失败',2000);
					var has = $('#picControl ._pic').length;
					$('#picStor').text(maxPicLen - has);
					if (has < maxPicLen) {
						$('#picControl').find('._adder').show();
					}
				}
			});
		});
	};
	//删除图片
	$('#picControl').on('click', '._del', function() {
		var theNode = $(this).parent('._pic');
		uexUploaderMgr.closeUploader(theNode.data('upid'));
		var picCollecter = $('#picCollecter').val();
		picCollecter = picCollecter.replace(theNode.data('remote')+',','');
		$('#picCollecter').val(picCollecter);
		theNode.remove();
		//更新图片数据
		var has = $('#picControl ._pic').length;
		$('#picStor').text(maxPicLen - has);
		if (has < maxPicLen) {
			$('#picControl').find('._adder').show();
		}
	});

	//表单验证
	var vf = $('#feedbackForm').Validform({
		url: appcfg.host.control + '/core/feedback.jsp',
		ajaxPost: true,
		ajaxData: {
			member_id:userData.id
		},
		beforeSubmit: function(form) {
			app.loading.show('正在提交...');
		},
		callback: function(res) {
			app.loading.hide();
			if (res.status === 'Y') {
				$.box.msg('您的反馈已收到，谢谢！',{
					delay:2000,
					onclose:function(){
						app.window.close();
					}
				});
			} else if (res.status === 'N') {
				$.box.msg(res.message, {
					delay: 2000,
					color: 'danger'
				});
			}
		}
	});

	app.ready(function() {
		$('#content').focus();
	
	});
});