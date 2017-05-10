/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');
	var box = require('box');
	require('scroll-load');
	var pageLoad = require('paging-load');

	var otherParam = app.ls.val('partsFilter');
	if (otherParam && otherParam.split) {
		otherParam = JSON.parse(otherParam);
	} else {
		otherParam = {};
	}

	//模板
	var dataTemp = $('#partListTemp').val();
	var dataRender = function(data, reload) {
		var render = etpl.compile(dataTemp);
		//console.log(data)
		var html = render(data);
		if (!$('#partsList').length) {
			$('body').html('<div class="list partsList" id="partsList"></div>');
		}
		if (reload) {
			$('#partsList').html(html).cacheImg();
		} else {
			$('#partsList').append(html).cacheImg();
		}
		$('body').removeClass('h100').scrollLoad(getData);
		app.loading.hide();
	};

	var getData = function(reload) {
		if (reload) {
			$('body').addClass('h100');
			app.loading.show();
		}
		var finalParam = $.extend({
			method: "getSearchList",
			sid: appcfg.project.sid
		}, otherParam);
		var pageLoadObj = pageLoad({
			url: appcfg.host.control + '/goods/search.jsp',
			data: finalParam,
			size: 5,
			reload: reload,
			success: function(res) {
				api.refreshHeaderLoadDone();
				if (res.status === 'Y') {
					dataRender(res, reload);
				} else {
					app.loading.hide();
					var emptyhtml = comm.commonTemp('parts');
					$('body').addClass('h100').html(emptyhtml);
				}
			}
		});
		pageLoadObj.load();
	};
	
	//更新
	window.change = function() {
		$('body').addClass('h100');
		app.loading.show();
		otherParam = JSON.parse(app.ls.val('partsFilter'));
		getData(true);
	};

	app.ready(function() {
		app.push.init(function() {
			getData(true);
		});

		getData(true);


	});
});