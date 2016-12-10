/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');require('sdk/common');
	var no = app.ls.val('crossParam');;
	//模板
	var dataTemp = $('#guessTemp').val();
	var dataRender = function(data, reload) {
		var render = etpl.compile(dataTemp);
		var data = data.data;
		$.each(data, function(i, e) {
			e.extendInfo = JSON.parse(e.extendInfo);
		});
		//console.log(data)
		var html = render({
			data: data
		});
		
		$('#guessList').html(html);
		app.loading.hide();
	}
	
	var getData = function(reload) {

		app.ajax({
			url: appcfg.host.control + '/core/service/app/wcm/eshop/goods/like/control.jsp',
			data: {
				method: "getLikeList",
				sid: appcfg.project.sid
			},
			success: function(res) {
				if (res.status === 'Y') {
					dataRender(res, reload);
				} else {
					app.loading.hide();
					$.box.msg(res.message, {
						color: 'danger',
						delay: 2000
					});
				}
			}
		});
	}
	//订单动作
	$('body').on('click','._actions .btn',function(){
		var act = $(this).data('action');
		switch(act){
			case "confirm":
				app.openView({
					closeself:true
				},'parts','confirm');
				break;
			case "eval":
				if(!no){
					return app.window.openToast('参数错误~',2000);
				}
				app.openView({
					param:no,
					closeself:true
				},'shop','orderDetail');
				break;
		}
	});
	//推荐动作
	$('#guessList').on('click', function(e) {
		e.preventDefault();
		var $target = $(e.target);
		//添加到购物车
		if ($target.is('.addToCart')) {
			var id = $target.data('id'),
				title = $target.data('name'),
				need = $target.data('need'),
				stand = $target.data('stand'),
				remark = $target.data('remark');
			return app.openView({
					param: {
						id: id,
						title: title,
						remark: 1
					}
				}, 'parts', 'detail');
		} else if ($target.parents('._item').length) {
			//配件详细
			var id = $target.parents('._item').data('id'),
				title = $target.parents('._item').find('h3').text();
			if (id) {
				app.openView({
					param: {
						id: id,
						title: title
					}
				}, 'parts', 'detail');
			}
		}
	});
	
	app.ready(function(){
		getData();
		

	});
});