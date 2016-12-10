/*
 * app config
 * v1.0.3
 * 
 * 2016-04-08
 */
window.appcfg = {};
//product
appcfg.product = false;
//catchError
window.onerror = function (msg, url, lineNo, columnNo, error) {
	if(!msg.split){
		return alert(JSON.stringify(msg));
	}
    var string = msg.toLowerCase();
    var substring = "script error";
    if (string.indexOf(substring) > -1){
        alert('Script Error: See Browser Console for Detail');
    } else {
        var message = [
            'Message: ' + msg,
            'URL: ' + url,
            'Line: ' + lineNo,
            'Column: ' + columnNo,
            'Error object: ' + JSON.stringify(error)
        ].join(' - ');
        if(!appcfg.product){
        	alert(message);
        }
    }
    return false;
};

//host
appcfg.host = {
	control: appcfg.product ? 'http://rap.taobao.org/mockjsdata/1201' : 'http://rap.taobao.org/mockjsdata/1201',
	source: appcfg.product ? 'http://source.ememsp.com' : 'http://source.ememsp.com',
	upload: appcfg.product ? 'http://upload.ememsp.com' : 'http://upload.ememsp.com',
	frontend: appcfg.product ? 'http://o2o.xxx.com' : 'http://192.168.129.147:8081',
	backend: appcfg.product ? 'http://admin.xxx.com' : 'http://192.168.129.147:88'
};
//set
appcfg.set = {
	version: "0.0.1",
	outime: 15000,
	longtime: 25000,
	windowAnimate: "push",
	animateDuration: 300,	//ms
	safeStorage: "user,appInit,rights"
};
//ajax
appcfg.ajax={
	crypto : {
		enable: false,
		secret: "acloudjereiacloudjerei1234",
		key: "abc123",
		url: appcfg.host.control + "/core/service/app/api.jsp"
	},
	combo: {
		url: appcfg.host.control + "/test/combo.php",
		dataName: "paramArray"
	}
};

//log
appcfg.log = {
	path: "fs://appcloudlog.txt"
};
//project
appcfg.project = {
	sid: "0001",
	hasAlbum: false
};
//theme
appcfg.defaultTheme = {
	body_bg: '#f0f0f0',
	primary: '#f08300',
	sub_primary: '#fda100',
	heav_primary: '#ff9800',
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
	radius: '2px'
};
//plugin
appcfg.plugin = {
	bdmap: {	//web地图
		key: "D1DX6yGc5HGh28jtaAwNzcBi",
		zoomLeval: 18
	}
};
