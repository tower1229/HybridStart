/*
 * layout
 */
define(function(require) {
	var $ = app.util;

	app.ready(function() {
		app.pull.init(function(){
			setTimeout(function(){
				$('#list')[0].innerHTML = ('refreshed at: '+new Date());
				app.pull.stop();
			},1000);
		});

	});
});