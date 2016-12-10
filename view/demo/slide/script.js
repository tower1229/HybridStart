/*
 * layout
 */
define(function(require) {
	var comm = require('sdk/server');
	require('sdk/common');

	var dataImg = [{
				content: 'http://temp.im/600x300/'
			}, {
				content: 'http://temp.im/600x300/'
			}, {
				content: 'http://temp.im/600x300/'
			}],
			partSlide,
			slideFunc = function() {
				partSlide = new iSlider({
					dom: document.getElementById('banner'),
					data: dataImg,
					isLooping: true,
					isAutoplay: false,
					plugins: ['dot']
				});
			};

		if (dataImg.length) {
			$('#slideWrap').removeClass('hide');
			$.each(dataImg, function(i, e) {
				e.content = comm.source(e.content);
			});
			if (window.iSlider) {
				slideFunc();
			} else {
				app.getScript('lib/islider', function() {
					slideFunc();
				}, {
					css: true
				});
			}
		} else {
			$('#slideWrap').addClass('hide');
		}
		
	app.ready(function() {
		

	});
});