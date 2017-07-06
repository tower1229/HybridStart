/*
 * app config
 * v1.0.3
 * add appcfg.pull
 * 2017-07-03
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
		animateSubType: 'from_right',
		animateDuration: 300,
		safeStorage: "user,appInit,rights",
		temporary: "templateCache,gps"
	},
	ajax: {
		type: 'get',
		crypto: {
			enable: false,
			key: "abc123",
			url: ""
		}
	},
	loading: {
		text: "正在加载",
		title: "",
		anim: "fade"
	},
	pull: {
		bgColor: '#C0C0C0',
		loadAnimInterval: 200,
		isScale: true,
		image: {
			// pull: [
			//     'widget://res/img/refresh/dropdown0.png',
			//     'widget://res/img/refresh/dropdown1.png',
			//     'widget://res/img/refresh/dropdown2.png',
			//     'widget://res/img/refresh/dropdown3.png',
			//     'widget://res/img/refresh/dropdown4.png',
			//     'widget://res/img/refresh/dropdown5.png',
			//     'widget://res/img/refresh/dropdown6.png'
			// ],
			// load: [
			//     'widget://res/img/refresh/loading0.png',
			//     'widget://res/img/refresh/loading1.png',
			//     'widget://res/img/refresh/loading2.png',
			//     'widget://res/img/refresh/loading3.png',
			//     'widget://res/img/refresh/loading4.png'
			// ]
		}
	},
	theme: {
		//基础色
		black: '#000',
		light: '#fff',
		grayDarker: '#222',
		grayDark: '#333',
		gray: '#555',
		grayLight: '#dbdbdb',
		grayLighter: '#eee',
		placeholder: '#aaa',
		border: '#e8e9eb',
		body_bg: '#f0f0f0',
		//请景色
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
//接口列表
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