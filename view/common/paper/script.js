/**
 * 
 */
define(function(require) {
	var comm = require('sdk/server');require('sdk/common');
	var paperId = app.ls.val('crossParam');;
	var userData = comm.getUser();
	require('validform');
	require('box');
	if(!paperId){
		return $.box.alert('问卷参数错误！');
	}
	var getData = function(id){
		app.loading.show('正在获取问卷',{
			wrap:'#View'
		});
		app.ajax({
			url:appcfg.host.control + '/core/service/app/wcm/cms/survey/control.jsp',
			data:{
				method:'getSurveyDetail',
				sid:appcfg.project.sid,
				id:id
			},
			success:function(res){
				if(res.status==='Y'){
					dataRender(res);
				}else if(res.status==='N'){
					app.loading.hide();
					$.box.msg(res.message,{
						color:'danger',
						delay:1000
					});
				}
			}
		})
	}
	var dataTemp = $('#paperTemp').html();
	var dataRender = function(data){
		var paperData = data.data[0];
		//console.log(paperData)
		if(paperData['name']){
			$('#paperName').text(paperData['name']);
		}
		if(paperData['summary']){
			$('#paperDescription').html(comm.xss(paperData['summary']));
		}
		var render = etpl.compile(dataTemp);
        var html = render(paperData);
        $('#paperForm').html(html);
        vf();
        app.loading.hide();
	}
	//paperForm
	var vf = function(){
		$('#paperForm').Validform({
			url: appcfg.host.control + '/core/control/wcm_cms_survey/control.jsp',
			ajaxPost: true,
			ajaxData: {
				"method": "submit",
				"sid": appcfg.project.sid,
				"jr_member_id":userData.id,
				"survey_id":paperId
			},
			dataType:'html',
			callback:function(res){
				if($.trim(res)=='ok'){
					$.box.msg('问卷已提交，谢谢',{
						delay:1000,
						onclose:function(){
							app.window.close();
						}
					});
				}else if($.trim(res)=='repeat'){
					$.box.msg('请不要重复提交',{
						delay:1000,
						onclose:function(){
							app.window.close();
						}
					});
				}else{
					$.box.msg('提交失败，请稍后再试',{
						delay:1000
					});
				}
			}
		});
	}

	app.ready(function(){
		getData(paperId);

	});
});