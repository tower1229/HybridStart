/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');require('sdk/common');
	require('box');
	//计数器
	comm.proCounter();
	var userData = app.ls.val('user');
	if (userData) {
		userData = JSON.parse(userData);
	};
	var confirmCart =[];
	//编辑
	$('#edit').on('click',function(){
		if($(this).hasClass('cartSave')){
			$(this).removeClass('cartSave');
			$('#cartList').removeClass('editing');
			//操作提交的数据
			var changeJson=[];
			//显示新数据
			if(!$('#cartList').children('.list').length){
				return
			}
			$('#cartList').children('.list').each(function(i,e){
				var _num = $(e).find('.pro_counter_val').val(),
					_bz = $(e).find('._bz').val();
				$(e).find('._countShow').text(_num);
				$(e).find('._colorShow').text(_bz);
				if ($(this).data('need')=='true'&&$(this).data('value')=='') {
				    $.box.msg('请输入备注',{
                        delay:2000,
                        color:_color
                    });
                    return
				}else{
				    var cart ={};
                    cart.goodsid=$(this).data('goodsid'),
                    cart.proId=$(this).data('proid'),
                    cart.amount=_num;
                    cart.remark="{'fields':[{'name':'"+$(this).data('name')
                    +"','type':'"+$(this).data('type')
                    +"','need':"+$(this).data('need')
                    +",'value':'"+$(this).data('value')
                    +"','data':'"+$(this).data('data')+"'}]}";
                    changeJson.push(cart);
				}
			});
			changeCartCount(changeJson);
			sumAll();
		}else{
			$(this).addClass('cartSave');
			$('#cartList').addClass('editing');
			
		}
	});
	//删除
	$('#cartList').on('click','._delete',function(){
		var item = $(this).parents('.list'),
			id = item.data('id');
		$.box.confirm('确定删除此商品吗',function(){
			$.box.hide();
			app.ajax({
				url:appcfg.host.control + '/shop/deleteCart.jsp',
				data:{
					jr_member_id:userData.id,
					id:id
				},
				success:function(res) {
					var _color='warning';
					if(res.status==='Y'){
						_color = 'success';
						item.remove();
						sumAll();
					};
					$.box.msg(res.message,{
						delay:2000,
						color:_color
					});
				}
			});
		});
	});
	//修改购物车商品购买数量
	var changeCartCount = function(changeJson){
	    //需要修改的数据
        app.ajax({
            url:appcfg.host.control + '/shop/changeCart.jsp',
            data:{
                jr_member_id:userData.id,
                json:JSON.stringify(changeJson)
            },
            success:function(res){
                if(res.status==='N'){
                   $.box.msg(res.message,{
                        delay:2000,
                        color:'warning'
                    });
                } 
            }
        });
	};
	//全选
	$('#selectAll').on('click',function(){
		var isSelect = $(this).find('input[type="checkbox"]').prop('checked');
		$('#cartList').find('._shopCheckbox').prop('checked',isSelect);
		sumAll();
	});
	//单选
	$('#cartList').on('click', '.checkbox', function(){
		sumAll();
	});
	//合计
	var sumAll = function(){
		var allList = $('#cartList').children('.list'),
			_totalPrice = 0,
			hasSelected = 0;
		
		confirmCart=[];
		allList.each(function(i,e){
			var checkbox = $(this).find('._shopCheckbox');
			if(checkbox.prop('checked')){
				var _pri = parseFloat(checkbox.data('pri')),
					_num = parseFloat(checkbox.data('num')),
					_total = _pri*_num;
				_totalPrice+=_total;
				hasSelected++;
				
				var cart={};
				cart.cart_id=checkbox.data('id');
				cart.pri=_pri;
				cart.amount=_num;
				cart.img=checkbox.data('img');
				cart.product_id=checkbox.data('proid');
				cart.goods_id = checkbox.data('goodsid');
				cart.no = checkbox.data('no');
				cart.unit = checkbox.data('unit');
				cart.wid = checkbox.data('wid');
				cart.min=checkbox.data('min');
				cart.name=checkbox.data('name');
				cart.value = checkbox.data('value');
				cart.pname=checkbox.data('pname');
				var exist=false;
				for (var i = 0; i < confirmCart.length; i++) {
					var checkCart = confirmCart[i];
					if (checkCart.cart_id===cart.cart_id) {
						exist=true;
					}
				};
				if (!exist) {
					confirmCart.push(cart);
				};
			};
			//同步勾选状态
			if(hasSelected){
				$('#pay').removeClass('disabled');
				if(hasSelected>=allList.length){
					$('#selectAll input[type="checkbox"]').prop('checked',true);
				}else{
					$('#selectAll input[type="checkbox"]').prop('checked',false);
				}
			}else{
				$('#pay').addClass('disabled');
			}
		});
		$('#totalPri').text(parseFloat(_totalPrice).toFixed(2));
	};
	//结算
	$('#pay').on('click',function(){
		if($(this).hasClass('disabled')){
			return app.window.openToast('您未选中商品！',1000);
		}
		//收集选中商品，带到确认订单
		app.loading.show();
		app.ajax({
			url: appcfg.host.control + '/shop/settlement.jsp',
			data: {
				jr_member_id: userData.id,
				datas:JSON.stringify(confirmCart)
			},
			success: function(res) {
				app.loading.hide();
				if (res.status === 'Y') {
					app.ls.remove('paynum');
					app.ls.remove('buy_fast');
					app.ls.remove('pmt_amount');
					app.openView(JSON.stringify(confirmCart),'shop','orderConfirm');
				} else if(res.status==='N') {
					$.box.msg(res.message, {
						color: 'danger',
						delay: 2000
					});
				};
			}
		});
	});
	//模板
	var dataTemp = $('#cartTemp').val();
	var dataRender = function(data, getMore) {
		if(data.split){
			data = JSON.parse(data);
		};
		var render = etpl.compile(dataTemp);
		var cartData = data.data;
		var html;
		if(cartData.length){
			
			html = render({
				data: cartData
			});
		}else{
			html = comm.commonTemp('cart');
		};
		
		$('#cartList').html(html);
		app.loading.hide();
		sumAll();
	};
	var getData = function(getMore) {
		app.loading.show();
		$('.cartBar').hide();
		$('#selectAll input[type="checkbox"]').prop('checked',false);
		app.ajax({
			url: appcfg.host.control + '/shop/cart.jsp',
			data: {},
			success: function(res) {
				if (res.status === 'Y') {
					$('.cartBar').show();
					dataRender(res, getMore);
				} else if(res.status==='N'){
					app.loading.hide();
					var html = comm.commonTemp('cart');
					$('#cartList').html(html);
				}
			}
		});
	};

	app.ready(function() {
		getData();
		//返回重取数据
		app.window.resume(function(){
			$('#cartList').empty();
			getData();
		});
		
	});
});