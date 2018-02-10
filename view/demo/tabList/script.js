/**
 * member
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;


	app.window.popoverElement({
		id: 'view',
		url: './content.html',
		bounce: true,
	});


	var setData = function(status) {
		app.window.evaluate(null, 'view', 'getData("'+status+'")');
	};

	//tab
	$('.label-tab-head').tap('.flex-1', function(e) {
		if (e.target.classList.contains('cur')) {
			return null;
		}
		$('.label-tab-head .cur')[0].classList.remove('cur');
		e.target.classList.add('cur');
		setData(e.target.dataset.status);
	});


	setTimeout(function() {
		setData("1");
	}, 300);


});