/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');require('sdk/common');
	var user = comm.getUser();
	require('box');
	require('raty');
	//切换栏目
	var flag, controlUrl;
	//模板
	var partsFavRender = etpl.compile($('#partsFavTemp').val()),
		serverFavRender = etpl.compile($('#serverFavRender').val());

	var dataRender = function(data, getMore) {
		var html;
		//console.log(data)
		switch (flag) {
			case 'parts':
				html = partsFavRender(data);
				break;
			default:
				html = serverFavRender(data);
				break;
		}
		if (getMore) {
			$('body').append(html);
		} else {
			$('body').html(html);
		}
		
		$('.servState ._score').each(function(i, e) {
			var score = parseFloat($(e).text());
			$(e).parent().find('._stars').raty({
				score: score,
				readOnly: true
			});
		});
		$('body').scrollLoad(function() {
			getData(true)
		},'forceScroll');
		app.loading.hide();
	};
	var getData = function(getMore) {
		app.loading.show();
		flag = app.ls.val('crossParam');;

		var sendParam = {
			sid: appcfg.project.sid,
			member_id: user.id
		};
		switch (flag) {
			case 'parts':
				controlUrl = '/member/getGoodsCollect.jsp';
				break;
			default:
				controlUrl = '/member/getShopCollect.jsp';
				break;
		};

		app.toload({
			url: appcfg.host.control + controlUrl,
			size: 5,
			reload: !getMore,
			data: sendParam,
			success: function(res) {
				if (res.status === 'Y') {
					dataRender(res, getMore);
				} else {
					app.loading.hide();
					$('body').empty();
					$.box.msg(res.message, {
						color: 'danger',
						delay: 2000
					});
				}
			},
			nomore: function() {
				$('body').append('<div class="btn btn-block btn-link">没有更多了</div>').scrollLoad(false);
			}
		});
	};
	window.change = getData;
	window.showEdit = function() {
		$('body').addClass('editing');
	}
	window.hideEdit = function() {
		$('body').removeClass('editing');
	};

	//删除收藏
	$('body').on('click', '._delete', function(e) {
		e.stopPropagation();
		var $item = $(this).parents('[data-id]');
		var sendData = {
			sid:appcfg.project.sid,
			member_id:user.id,
			id:$item.data('id')
		};
		app.globalEval(function() {
			$.box.confirm('要删除该收藏吗?', function() {
				app.loading.show();
				$.box.hide();
				app.globalHide();
			}, function() {
				app.globalHide(true);
			}, {
				bgclose: false
			});
		}, function() {
			switch (flag) {
				case 'parts':
					sendData.method = "deleteFaverGoods";
					break;
				default:
					sendData.method = "deleteFaverShop";
					break;
			};
			//发送删除请求
			app.ajax({
				url: appcfg.host.control + "/shop/deleteFaver.jsp",
				data: sendData,
				success: function(res) {
					app.loading.hide();
					if (res.status === 'Y') {
						$item.remove();
						app.window.openToast(res.message,1000);
					} else {
						$.box.msg(res.message, {
							delay: 2000,
							color: 'warning'
						});
					}
				}
			});
		});
	});
	//详细页
	$('body').on('click', '[data-id]', function() {
		var id = $(this).data('id'),
			title = $(this).data('title');
		switch (flag) {
			case 'parts':
				app.openView({
					param: {
						id: id,
						title: title
					}
				}, 'parts', 'detail');
				break;
			default:
				alert(id)
				//app.openView(id, 'service', 'detail');
				break;
		}
	});

	app.ready(function() {
		app.window.enableBounce();
		getData();

	});
});