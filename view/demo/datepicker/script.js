/*
 * layout
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;
	var DateSelector = require('datepicker');

	new DateSelector({
        input: 'demo1',
        container: 'targetContainer1',
        type: 0,
        param: [1, 1, 1, 0, 0],
        beginTime: [2000,1,1],
        endTime: [2020,2,5],
        recentTime: [],
        success: function (arr) {
            $('#demo1')[0].value = arr.join(' ');
        }
    });

    new DateSelector({
        input: 'demo2',
        container: 'targetContainer2',
        type: 0,
        param: [1, 1, 1, 1, 1],
        beginTime: [],
        endTime: [],
        recentTime: [],
        success: function (arr) {
            $('#demo2')[0].value = arr.join(' ');
        }
    });

    new DateSelector({
        input: 'demo3',
        container: 'targetContainer3',
        type: 0,
        param: [1, 1, 0, 0, 0],
        beginTime: [2000,1],
        endTime: [2020,2],
        recentTime: [],
        success: function (arr) {
            $('#demo3')[0].value = arr.join(' ');
        }
    });

    new DateSelector({
        input: 'demo4',
        container: 'targetContainer4',
        type: 0,
        param: [0, 0, 0, 1, 1],
        beginTime: [],
        endTime: [],
        recentTime: [],
        success: function (arr) {
            $('#demo4')[0].value = arr.join(' ');
        }
    });


	
});