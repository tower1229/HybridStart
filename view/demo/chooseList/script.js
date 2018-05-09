/*
 */
define(function(require) {
	require('sdk/common');
	var $ = app.util;

	var data = [{
		"id": "1",
		"name": 'name 1',
		"note": "the note",
		"sublist": [{
			"id": "2",
			"name": "subname 1",
			"note": "the note"
		}, {
			"id": "3",
			"name": "subname 2",
			"note": "the note"
		}]
	}, {
		"id": "4",
		"name": 'name 2',
		"note": "the note",
		"sublist": [{
			"id": "5",
			"name": "subname 1",
			"note": "the note"
		}, {
			"id": "6",
			"name": "subname 2",
			"note": "the note"
		}, {
			"id": "7",
			"name": "subname 3",
			"note": "the note"
		}]
	}, {
		"id": "8",
		"name": 'name 3',
		"note": "the note",
		"sublist": [{
			"id": "9",
			"name": "subname 1",
			"note": "the note"
		}, {
			"id": "10",
			"name": "subname 2",
			"note": "the note"
		}, {
			"id": "11",
			"name": "subname 3",
			"note": "the note"
		}, {
			"id": "12",
			"name": "subname 4",
			"note": "the note"
		}]
	}];
	//多级选择/单选
	$('#select').on('click', function() {
		app.openView({
			param: {
				data: data
			}
		}, 'common', 'chooseList');
	});

	//多级选择/多选
	$('#selectMulti').on('click', function() {
		app.openView({
			param: {
				data: data,
				multi: true
			}
		}, 'common', 'chooseList');
	});
	//接收返回事件
	app.subscribe('choosenItem',function(choosenItem){
		console.log(choosenItem)
	});

	
});