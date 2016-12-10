/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');require('sdk/common');
	require('box');
	require('validform');
	var userData = comm.getUser();
	var usreId=userData.id;

	var crossParam = app.ls.val('crossParam');;
	if (crossParam && crossParam != 'is_default') {
		crossParam = JSON.parse(crossParam);
	}
	var sendUrl = appcfg.host.control+'/member/addMemberAddr.jsp',
		isDefault = 0,
		sendData = {},
		addAddrByDefault = app.ls.val('addAddrByDefault');
	if(!!addAddrByDefault){
		sendData.is_default = 1;
	};
	if ($.isPlainObject(crossParam)) {
		sendUrl = appcfg.host.control+'/member/modifyMemberAddr.jsp';
		sendData.id = crossParam.id;
		//初始编辑数据
		$('#addAddrForm').find('input[name="name"]').val(crossParam.name).end()
			.find('input[name="mobile"]').val(crossParam.mobile).end()
			.find('input[name="province"]').val(crossParam.province).end()
			.find('input[name="city"]').val(crossParam.city).end()
			.find('input[name="area"]').val(crossParam.area).end()
			.find('input[name="address"]').val(crossParam.address).end()
			.find('input[name="zip"]').val(crossParam.zip).end()
			.find('#addrShow').text(crossParam.province+crossParam.city+crossParam.area);
			if(crossParam) {
				isDefault=crossParam.isDefault;
			}
	}

	var addAddrForm = $('#addAddrForm').Validform({
		url:sendUrl,
		ajaxData: $.extend(sendData,{
			is_default: isDefault,
			member_id: usreId
		}),
		callback: function(res) {
		    if (res.status === 'Y') {
		        $.box.msg(res.message, {
                    color: 'danger',
                    delay: 2000
                });
                app.window.close();
            } else {
                return $.box.msg(res.message, {
                    color: 'danger',
                    delay: 2000
                });
            }
		}
	});
	//保存
	$('#save').on('click', function() {
		addAddrForm.ajaxPost(false, true);
	});
	
	app.ready(function() {
		//选择省市
		if (window.uexAreaPickerView) {
			$('#pickArea').on('click', function(e) {
				e.preventDefault();
				uexAreaPickerView.open();
			});
			uexAreaPickerView.onConfirmClick = function(json) {
				var areaStr = $.isPlainObject(json) ? json.city : JSON.parse(json).city,
					areaArr = areaStr.split(' ');
				//处理两位地址
				if(areaArr[2]==""){
					areaArr[2] = areaArr[1];
					areaArr[1] = areaArr[0];
				}
				$('#addrShow').text(areaStr).removeClass('placeholder');
				$('#province').val(areaArr[0]);
				$('#city').val(areaArr[1]);
				$('#area').val(areaArr[2]);
				uexAreaPickerView.close();
			}
		} 

	});
});