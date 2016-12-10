/**
 * address
 */
define(function(require) {
	var comm = require('sdk/server');require('sdk/common');
	require('box');
	var userData = comm.getUser();
	//全局数据
	var addressData;
	var checkStatus = function(){
		var crossParam = app.ls.val('crossParam');;
		if(crossParam=="changeAddr"){
			//$('#addAddr').hide();
			$('#listview').addClass('chooselist');
			app.ls.remove('crossParam');
		}
	};
	checkStatus();
	//添加地址是否自动设为默认	
	var addAddrByDefault;
	//原默认地址
	var oDefautl;
	var render = etpl.compile($('#addrTemp').val());
	var renderAddr = function(addrList) {
		var htm = render({
			data: addrList
		});
		if(addrList.length){
			addAddrByDefault = false;
		}else{
			addAddrByDefault = true;
		};
		$('#listview').html(htm);
		oDefautl = $('#listview').find('input[checked]');
	}
	var getAddrList = function(reload) {
		app.loading.show('加载中',{
			wrap:'#listview'
		});
		//获取数据
		app.ajax({
			url: appcfg.host.control + '/member/address.jsp',
			data: {
				method: 'getMemberAddr',
				sid: appcfg.project.sid,
				member_id: userData.id
			},
			offline:!reload,
			success: function(res) {
				app.loading.hide();
				if (res.status === 'Y') {
					app.ls.val('address',res.data);
					addressData = res.data;
					renderAddr(addressData);
				}else if(res.status==='N'){
					$.box.msg(res.message,{
						delay:3000,
						color:'warning'
					});
				}
			}
		});
	};
	//更换地址事件
	$('body').on('click','.chooselist .list',function(){
		var that = $(this),
			choosen = JSON.stringify(addressData[that.index()]);
		that.find('.item').addClass('active');
		app.ls.val('changeaddr',choosen);
		setTimeout(function(){
			that.find('.item').removeClass('active');
			that = choosen = null;
			app.window.close();
		},100);
	});
	//设为默认
	$('#listview').on('change', '.toggle', function() {
		var inp = $(this).find('input[type=checkbox]'),
			addrID = $(this).parents('.list').data('id');
		if (inp.prop('checked') == false) {
			return inp.prop('checked', true);
		}
		inp.prop('checked', true).parents('.list').siblings('.list')
			.find('input[type=checkbox]').prop('checked', false);
		$.ajax({
			url: appcfg.host.control + '/member/updateDefaultMemberAddr.jsp',
			data: {
				member_id: userData.id,
				addr_id: addrID
			},
			dataType: 'json',
			success: function(res) {
				if (res.status === 'N') {
					oDefautl.prop('checked', true);
					inp.prop('checked', false);
					return $.box.msg('设为默认地址失败', {
						color: 'danger',
						delay: 2000
					});
				} else {
					setLocalDefaultAddr(res.data);
				}
				oDefautl = inp;
				app.publish("defaultAddr", "change");
			}
		});
	});
	//编辑地址
	var getAddrById = function(id){
		var addr = JSON.parse(app.ls.val('address')),
			result;
		$.each(addr,function(i,e){
			if(e.id==id){
				result = e;
				return;
			}
		});
		return result;
	}
	var setLocalDefaultAddr = function(id){
		var addr = JSON.parse(app.ls.val('address'));
		$.each(addr,function(i,e){
			if(e.id==id){
				addr[i].isDefault = 1;
			} else {
				addr[i].isDefault = 0;
			}
		});
		app.ls.val('address',JSON.stringify(addr));
	}
	$('#listview').on('click', '._edit', function() {
		var curAddr = $(this).parents('.list'),
			id = curAddr.data('id'),
			curAddrData = getAddrById(id);
		app.openView({
			param:curAddrData
		},"member","addAddr");
	});
	//删除地址
	$('#listview').on('click', '._delete', function() {
		var that = this;
		$.box.confirm('确定删除此地址吗？',function(){
			$.box.hide();
			app.loading.show('操作中...');
			var curAddr = $(that).parents('.list');
			app.ajax({
				url: appcfg.host.control+'/member/deleteMemberAddr.jsp',
				data: {
                    member_id: userData.id,
					addr_id: curAddr.data('id')
				},
				success: function(res) {
					app.loading.hide();
					if (res.status === 'Y') {
						curAddr.remove();
					} else {
						return $.box.msg(res.message, {
							color: 'danger',
							delay: 2000
						});
					}
				}
			});
		});
	});
	//添加地址
	$('#addAddr').on('click', function() {
		app.openView(null, "member", "addAddr");
		if(addAddrByDefault){
			app.ls.val('addAddrByDefault','yes');
		}else{
			app.ls.remove('addAddrByDefault');
		}
	});

	app.ready(function() {
		getAddrList();
		//返回刷新
		app.window.resume(function(){
			checkStatus();
			getAddrList(true);
		});

	});
});