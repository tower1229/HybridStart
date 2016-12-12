/*
 * layout
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');

	app.ready(function() {
		$('#picker').on('click', function() {
			api.openPicker({
				type: 'date_time',
				date: '2014-05-01 12:30',
				title: '选择时间'
			}, function(ret, err) {
				if (ret) {
					// {
					// 	year: 2000, //年
					// 	month: 1, //月
					// 	day: 1, //日
					// 	hour: 12, //时
					// 	minute: 00 //分
					// }
					$('#picker').val([ret.year, ret.month, ret.day].join('-') + ' ' + [ret.hour, ret.minute].join(':'));
				} else {
					console.log(JSON.stringify(err));
				}
			});
		});

	});
});