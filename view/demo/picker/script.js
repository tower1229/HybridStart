/*
 * layout
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;
	var MultiPicker = require('multi-picker');
	var $city = require('lib/city');

	new MultiPicker({
		input: 'multiPickerInput', //点击触发插件的input框的id
		container: 'pickerCont', //插件插入的容器id
		jsonData: $city,
		success: function(arr) {
			var addr = '';
			arr.forEach(function(e,i){
				addr += (e.value + ' ');
			});
			$('#multiPickerInput')[0].value = addr;
		}
	});

	
});