/*
 * layout
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');

	var dataImg = [{
			content: 'http://7xnt8z.com1.z0.glb.clouddn.com/view0.jpg'
		}, {
			content: 'http://7xnt8z.com1.z0.glb.clouddn.com/view1.jpg'
		}, {
			content: 'http://7xnt8z.com1.z0.glb.clouddn.com/view2.jpg'
		}];

	app.ready(function() {
		if (dataImg.length) {
			$('#slideWrap').removeClass('hide');
			$.each(dataImg, function(i, e) {
				e.content = comm.source(e.content);
			});
			app.getScript('lib/islider', function() {
				new iSlider({
					dom: document.getElementById('banner'),
					data: dataImg,
					isLooping: true,
					isAutoplay: false,
					plugins: ['dot']
				});
			}, {
				css: true
			});
		}

	});
});