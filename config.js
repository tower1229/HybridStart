/*
 * app config
 * v1.0.3
 * 
 * 2016-04-08
 */
var product = false;
window.appcfg = {
	host: {
		control: product ? '' : 'http://rap.taobao.org/mockjsdata/1201',
		source: product ? '' : 'http://app.xxx.com',
		upload: product ? '' : 'http://upload.xxx.com'
	},
	set: {
		version: "0.0.1",
		outime: 10000,
		longtime: 20000,
		windowAnimate: "push",
		animateDuration: 210, //ms
		safeStorage: "user,appInit,rights"
	},
	ajax: {
		crypto: {
			enable: false,
			secret: "acloudjereiacloudjerei1234",
			key: "abc123",
			url: ""
		}
	},
	log: {
		path: "fs://appcloudlog.txt"
	},
	defaultTheme: {
		body_bg: '#f0f0f0',
		primary: '#38adff',
		sub_primary: '#52b7fd',
		heav_primary: '#3399cc',
		success: '#29b6f6',
		sub_success: '#43afe0',
		heav_success: '#269ed4',
		info: '#777',
		sub_info: '#86bad4',
		heav_info: '#31b0d5',
		warning: '#f08400',
		sub_warning: '#e99329',
		heav_warning: '#ec971f',
		danger: '#d33835',
		sub_danger: '#d0524f',
		heav_danger: '#c9302c',
		reverse: '#fff',
		radius: '4px'
	},
	plugin: {
		bdmap: { //web地图
			key: "D1DX6yGc5HGh28jtaAwNzcBi",
			zoomLeval: 18
		}
	},
	project: {
		sid: 1
	}
};
//应用接口
window.appcfg.api = {
	login: appcfg.host.control + '/member/login.jsp',
	getPack: appcfg.host.control + '/package/get/',
	sendPack: appcfg.host.control + '/package/send/',
	donePack: appcfg.host.control + '/package/done/',
	gotPack: 'http://rapapi.org/mockjsdata/9195/common/getYes/',
	confirmSend: 'http://rapapi.org/mockjsdata/9195/common/getYes/',
	uploadifyLocation: appcfg.host.control + '/member/modifyUserInfo.jsp',
	loginLog: appcfg.host.control + '/member/loginLog.jsp',
	websiteConfig: appcfg.host.control + '/core/websiteConfig.jsp'
};
