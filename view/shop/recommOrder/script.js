/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var userData = comm.getUser();
	//星星
	require('raty');
	//筛选
	var timeParam = window.time_week;
	$('#recommFilter').on('click','div',function(){
		if($(this).hasClass('cur')){
			return
		};
		$(this).addClass('cur').siblings().removeClass('cur');
		$('.nomore').remove();
		timeParam =$(this).index();
		$('#mainCont').scrollTop(0);
		//发送
		getData();
	});
	var dataTemp = $('#commentListTemp').val();
	var dataRender = function(data, getMore) {
		var render = etpl.compile(dataTemp);
		var html = render(data);
		if (getMore) {
			$('#commentList').append(html);
		} else {
			$('#commentList').html(html);
		};
		$('._raty ._score').each(function(i, e) {
			var score = parseFloat($(e).text());
			$(e).parent().find('._stars').raty({
				score: score,
				readOnly: true
			});
		});
		$('#mainCont').scrollLoad(function() {
			getData(true)
		});
		app.loading.hide();
	}
	var getData = function(getMore) {
		app.loading.show();
		app.toload({
            url: appcfg.host.control+'/shop/getMemberCommentList.jsp',
            reload: !getMore,
            size:5,
            data: {
				jr_member_id:userData.id,
				sid:appcfg.project.sid,
				time:timeParam
            },
            success: function(res) {
				if (res.status === 'Y') {
					dataRender(res, false);
				} else {
					app.loading.hide();
					$('#commentList').empty();
					$.box.msg(res.message, {
						color: 'danger',
						delay: 2000
					});
				}
            },
            nomore:function(){
            	$('#mainCont').append('<div class="btn btn-block btn-link nomore">没有更多了</div>').scrollLoad(false);
            }
        });
	};
	
	app.ready(function(){
		getData();

	});
});