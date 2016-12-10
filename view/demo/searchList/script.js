/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');

	//关闭搜索
	$('#goBack').on('click', function() {
		app.window.close('parts_search',0);
		app.ls.remove('partsFilter');
	});
	//存放排序和筛选
	var otherParam = {};
	var sendChange = function(){
		app.ls.val('partsFilter',JSON.stringify(otherParam));
		app.window.evaluatePopoverScript('','popView','change()');
	};

	//排序
	$('.sortBar').on('click', '.sort', function() {
		if ($(this).hasClass('cur')) {
			return null;
		}
		$(this).addClass('cur').siblings().removeClass('cur');
		otherParam.order_by = $(this).data('code');
		$('#partsList').empty();
		sendChange();
	});
	
	//筛选类别
	$('#catList').on('touchend','li',function(){
		var that = $(this),
			catval = that.data('val') || '';
		
		syncStatus();

		that.addClass('cur').siblings().removeClass('cur');
		$('#openSearch').removeClass('active');
		otherParam.cat = catval;
		otherParam.cattext=that.text();
		sendChange();
	});
	
	//搜索
	$('#openSearch').on('click',function(){
		app.openView({
			anim:11
		},'demo','search');
	});
	//渲染配件类别
	var catRender = function(callback) {
		var partcat = app.ls.val('partcat');
		var dataTemp = $('#catListTemp').val();
		var render = etpl.compile(dataTemp);
		var handle = function(){
			if(!partcat){
				partcat = app.ls.val('partcat');
			}
			var data = JSON.parse(partcat);
			var html = render({
				data: data
			});
			$('#catList').append(html);
			typeof(callback)==='function' && callback()
		};
		if(!partcat){
			comm.preGet(handle);
		}else{
			handle();
		}
	};
	//同步状态
	var syncStatus = function(){
		var param = app.ls.val('partsFilter');
		if(param){
			param = JSON.parse(param);
		}else{
			param = {};
		}
		otherParam = param;
		//app.ls.remove('partsFilter');
		$('#catList li').each(function(i,e){
			if($(e).data('val')==param['cat']){
				$(e).addClass('cur');
			}else{
				$(e).removeClass('cur');
			}
		});
		//标识隐含条件
		if(otherParam.keywords || otherParam.vin || otherParam.no){
			$('#openSearch').addClass('active');
		}else{
			$('#openSearch').removeClass('active');
		}
	};
		
	app.ready(function() {

		catRender(function(){
			syncStatus();
			app.window.popoverElement({
				id: 'mainCont',
				name: 'popView',
				url: 'content.html'
			});
		});

		//搜索回调
		app.window.subscribe('partsearch', function(msg){
			if (msg) {
				syncStatus();
				sendChange();
			}
			
		});

	});
});