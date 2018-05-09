/*
* name: validform.js
* version: v2.5.11
* update: ajaxPost默认true
* data: 2018-04-26
*/
define('validform', function(require, exports, module) {
	"use strict";
	
	seajs.importStyle('.Validform_right{color:#71b83d}.Validform_wrong{color:red;white-space:nowrap}.Validform_loading{padding-left:20px}.Validform_error{background-color:#ffe7e7}.passwordStrength{display:block;height:18px;line-height:16px;clear:both;overflow:hidden;margin-bottom:5px}.passwordStrength b{font-weight:normal}.passwordStrength b,.passwordStrength span{display:inline-block;vertical-align:middle;line-height:16px;height:16px}.passwordStrength span{width:63px;text-align:center;background-color:#d0d0d0;border-right:1px solid #fff}.passwordStrength .last{border-right:0;width:61px}.passwordStrength .bgStrength{color:#fff;background-color:#71b83d}'
		,module.uri);
	var $ = require('jquery');
	var ajaxRequest = app.ajax;
	
	var win = window;
	var undef = void 0;
	var errorobj = null,
		tipmsg = {
			tit: "提示信息",
			w: {
				"*": "不能为空！",
				"*4-16": "请填写4到16位任意字符！",
				"n": "请填写数字！",
				"n4-16": "请填写4到16位数字！",
				"f": "请填写数字！",
				"s": "不能输入特殊字符！",
				"s4-16": "请填写4到16位字符！",
				"p": "请填写邮政编码！",
				"m": "请填写手机号码！",
				"tel": "请填写电话号码！",
				"phone": "请填写手机/座机号码！",
				"e": "邮箱地址格式不对！",
				"url": "请填写网址！"
			},
			def: "请填写正确信息！",
			undef: "datatype未定义！",
			reck: "两次输入的内容不一致！",
			r: "通过信息验证！",
			c: "正在检测信息…",
			s: "请{填写|选择}{0|信息}！",
			v: "所填信息没有经过验证，请稍后…",
			p: "正在提交数据…"
		},
		defaults = {
			tiptype: 1,
			tipSweep: true,
			postonce: false,
			ajaxPost: true,
			checkTime: 100 //验证延时
		};
	var Validform = function(forms, settings, inited) {
		forms = $(forms);
		settings = $.extend({}, defaults, settings);
		settings.datatype && $.extend(Validform.util.dataType, settings.datatype);
		var brothers = this;
		brothers.tipmsg = {
			w: {}
		};
		brothers.forms = forms;
		brothers.objects = [];
		if (inited === true) {
			return false;
		}
		forms.each(function() {
			if (this.validform_inited === "inited") {
				return true;
			}
			this.validform_inited = "inited";
			this.handle = brothers;
			var curform = this;
			var $this = $(curform);
			curform.settings = $.extend({}, settings);
			curform.validform_status = "normal";
			$this.data("tipmsg", brothers.tipmsg)
				.on( "blur", "[datatype]", function() {
					if(curform.settings.tipSweep){
						return null;
					}
					var subpost = arguments[1];
					var that = this;
					setTimeout(function(){
						Validform.util.check.call(that, $this, subpost);
					}, curform.settings.checkTime);
				})
				.on('submit',function(event){
					event.preventDefault();
					var subflag = Validform.util.submitForm.call($this, curform.settings);
					subflag === undef && (subflag = true);
					return subflag;
				})
				.on("keypress", function(event) {
					if (event.keyCode == 13) {
						event.preventDefault();
						$this.trigger('submit');
					}
				});
			Validform.util.enhance.call($this, curform.settings.tiptype, curform.settings.usePlugin, curform.settings.tipSweep);
			if(curform.settings.btnSubmit){
				$this.find(curform.settings.btnSubmit).bind("click", function() {
					$this.trigger("submit");
					return false;
				});
			}
			$this.find("[type='reset']").add($this.find(curform.settings.btnReset))
				.bind("click", function() {
					Validform.util.resetForm.call($this);
				});
		});
	};
	
	Validform.util = {
		dataType: {
			"*": /[\w\W]+/,
			"*4-16": /^[\w\W]{4,16}$/,
			"n": /^\d+$/,
			"n4-16": /^\d{4,16}$/,
			"f": /^((\d+)?)(\.\d+)?$/,
			"s": /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]+$/,
			"s4-16": /^[\u4E00-\u9FA5\uf900-\ufa2d\w\.\s]{4,16}$/,
			"p": /^[0-9]{6}$/,
			"m": /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/,
			"tel": /^(\d{3,4}-)?\d{7,8}$/,
			"phone": /(^(\d{3,4}-)?\d{7,8})$|(13[0-9]{9})/,
			"e": /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
			"url": /^(\w+:\/\/)?\w+(\.\w+)+.*$/
		},
		toString: Object.prototype.toString,
		isEmpty: function(val) {
			return val === "" || val === $.trim(this.attr("tip"));
		},
		getValue: function(obj) {
			var inputval, curform = this;
			if (obj.is(":radio")) {
				inputval = curform.find(":radio[name='" + obj.attr("name") + "']:checked").val();
			} else if (obj.is(":checkbox")) {
				inputval = "";
				curform.find(":checkbox[name='" + obj.attr("name") + "']:checked").each(function() {
					inputval += $(this).val() + ',';
				});
			} else {
				inputval = obj.val();
			}
			inputval = inputval === undef ? "" : $.trim(inputval);
			return Validform.util.isEmpty.call(obj, inputval) ? "" : inputval;
		},
		enhance: function(tiptype, usePlugin, tipSweep, addRule) {
			var curform = this;
			curform.find("[datatype]").each(function(i,e) {
				var that = this;
				if (tiptype!==1 && !$(that).siblings(".Validform_checktip").length) {
					$(that).parent().append("<span class='Validform_checktip' />");
				}
				if($(that).is(':checkbox') || $(that).is(':radio')){
					if (that.validform_inited == "inited") {
						return true;
					}
					that.validform_inited = "inited";
					var name = $(that).attr("name");
					curform.find("[name='" + name + "']").filter(":checkbox,:radio")
						.bind("click", function() {
							setTimeout(function() {
								$(that).trigger("blur");
							}, 0);
						});
				}
				if($(that).is('select[multiple]')){
					setTimeout(function() {
						$(that).trigger("blur");
					}, 0);
				}
			})
			.end().find("input[recheck]").each(function() {
				if (this.validform_inited == "inited") {
					return true;
				}
				this.validform_inited = "inited";
				var _this = $(this);
				var recheckinput = curform.find("input[name='" + $(this).attr("recheck") + "']");
				recheckinput.bind("keyup", function() {
					if (recheckinput.val() == _this.val() && recheckinput.val() != "") {
						if (recheckinput.attr("tip") && recheckinput.attr("tip") == recheckinput.val()) {
							return false;
						}
						_this.trigger("blur");
					}
				}).bind("blur", function() {
					if (recheckinput.val() != _this.val() && _this.val() != "") {
						if (_this.attr("tip") && _this.attr("tip") == _this.val()) {
							return false;
						}
						_this.trigger("blur");
					}
				});
			});

			Validform.util.usePlugin.call(curform, usePlugin, tiptype, tipSweep, addRule);
		},
		usePlugin: function(plugin, tiptype, tipSweep, addRule) {
			var curform = this;
			plugin = plugin || {};
			//密码强度验证
			if (curform.find("input[plugin='passwordStrength']").length) {
				require.async('./passwordStrength', function() {
					plugin.passwordstrength = {};
					plugin.passwordstrength.showmsg = function(obj, msg, type) {
						Validform.util.showmsg.call(curform, msg, tiptype, {
							obj: obj,
							type: type,
							sweep: tipSweep
						});
					};
					curform.find("input[plugin='passwordStrength']").each(function() {
						if (this.validform_inited == "inited") {
							return true;
						}
						this.validform_inited = "inited";
						$(this).passwordStrength(plugin.passwordstrength);
					});
				});
			}
		},
		getNullmsg: function(curform) {
			var obj = this;
			var reg = /[\u4E00-\u9FA5\uf900-\ufa2da-zA-Z\s]+/g;
			var nullmsg;
			var label = curform[0].settings.label || ".Validform_label";
			label = obj.siblings(label).eq(0).text() || obj.siblings().find(label).eq(0).text() || obj.parent().siblings(label).eq(0).text() || obj.parent().siblings().find(label).eq(0).text();
			label = label.replace(/\s(?![a-zA-Z])/g, "").match(reg);
			label = label ? label.join("") : [""];
			reg = /\{(.+)\|(.+)\}/;
			nullmsg = curform.data("tipmsg").s || tipmsg.s;
			if (label !== "") {
				nullmsg = nullmsg.replace(/\{0\|(.+)\}/, label);
				if (obj.attr("recheck")) {
					nullmsg = nullmsg.replace(/\{(.+)\}/, "");
					obj.attr("nullmsg", nullmsg);
					return nullmsg;
				}
			} else {
				nullmsg = obj.is(":checkbox,:radio,select") ? nullmsg.replace(/\{0\|(.+)\}/, "") : nullmsg.replace(/\{0\|(.+)\}/, "$1");
			}
			nullmsg = obj.is(":checkbox,:radio,select") ? nullmsg.replace(reg, "$2") : nullmsg.replace(reg, "$1");
			obj.attr("nullmsg", nullmsg);
			return nullmsg;
		},
		getErrormsg: function(curform, datatype, recheck) {
			var regxp = /^(.+?)((\d+)-(\d+))?$/,
				regxp2 = /^(.+?)(\d+)-(\d+)$/,
				regxp3 = /(.*?)\d+(.+?)\d+(.*)/,
				mac = datatype.match(regxp),
				temp, str;
			if(!curform.data("tipmsg")){
				return null;
			}
			if (recheck == "recheck") {
				str = curform.data("tipmsg").reck || tipmsg.reck;
				return str;
			}
			var tipmsg_w_ex = $.extend({}, tipmsg.w, curform.data("tipmsg").w);
			if (mac[0] in tipmsg_w_ex) {
				return curform.data("tipmsg").w[mac[0]] || tipmsg.w[mac[0]];
			}
			for (var name in tipmsg_w_ex) {
				if (name.indexOf(mac[1]) != -1 && regxp2.test(name)) {
					str = (curform.data("tipmsg").w[name] || tipmsg.w[name]).replace(regxp3, "$1" + mac[3] + "$2" + mac[4] + "$3");
					curform.data("tipmsg").w[mac[0]] = str;
					return str;
				}
			}
			return curform.data("tipmsg").def || tipmsg.def;
		},
		_regcheck: function(datatype, gets, obj, curform) {
			var info = null,
				passed = false,
				reg = /\/.+\//g,
				regex = /^(.+?)(\d+)-(\d+)$/,
				type = 3;

			if (reg.test(datatype)) {
				var regstr = datatype.match(reg)[0].slice(1, -1);
				var param = datatype.replace(reg, "");
				var rexp = RegExp(regstr, param);
				passed = rexp.test(gets);
			} else if (Validform.util.toString.call(Validform.util.dataType[datatype]) == "[object Function]") {
				passed = Validform.util.dataType[datatype](gets, obj, curform, Validform.util.dataType);
				if (passed === true || passed === undef) {
					passed = true;
				} else {
					info = passed;
					passed = false;
				}
			} else {
				if (!(datatype in Validform.util.dataType)) {
					var mac = datatype.match(regex),
						temp;
					if (!mac) {
						passed = false;
						info = curform.data("tipmsg").undef || tipmsg.undef;
					} else {
						for (var name in Validform.util.dataType) {
							temp = name.match(regex);
							if (!temp) {
								continue;
							}
							if (mac[1] === temp[1]) {
								var str = Validform.util.dataType[name].toString(),
									param = str.match(/\/[mgi]*/g)[1].replace("\/", ""),
									regxp = new RegExp("\\{" + temp[2] + "," + temp[3] + "\\}", "g");
								str = str.replace(/\/[mgi]*/g, "\/").replace(regxp, "{" + mac[2] + "," + mac[3] + "}").replace(/^\//, "").replace(/\/$/, "");
								Validform.util.dataType[datatype] = new RegExp(str, param);
								break;
							}
						}
					}
				}
				if (Validform.util.toString.call(Validform.util.dataType[datatype]) == "[object RegExp]") {
					passed = Validform.util.dataType[datatype].test(gets);
				}
			}
			if (passed) {
				type = 2;
				info = obj.attr("sucmsg") || curform.data("tipmsg").r || tipmsg.r;
				if (obj.attr("recheck")) {
					var theother = curform.find("input[name='" + obj.attr("recheck") + "']:first");
					if (gets != theother.val()) {
						passed = false;
						type = 3;
						info = obj.attr("errormsg") || Validform.util.getErrormsg.call(obj, curform, datatype, "recheck");
					}
				}
			} else {
				info = info || obj.attr("errormsg") || Validform.util.getErrormsg.call(obj, curform, datatype);
				if (Validform.util.isEmpty.call(obj, gets)) {
					info = obj.attr("nullmsg") || Validform.util.getNullmsg.call(obj, curform);
				}
			}
			return {
				passed: passed,
				type: type,
				info: info
			};
		},
		regcheck: function(datatype, gets, obj) {
			var curform = this,
				info = null,
				passed = false,
				type = 3;
			if(!curform.data("tipmsg")){
				return null;
			}
			if (obj.attr("ignore") === "ignore" && Validform.util.isEmpty.call(obj, gets)) {
				if (obj.data("cked")) {
					info = "";
				}
				return {
					passed: true,
					type: 4,
					info: info
				};
			}
			obj.data("cked", "cked");
			var dtype = Validform.util.parseDatatype(datatype);
			var res;
			for (var eithor = 0; eithor < dtype.length; eithor++) {
				for (var dtp = 0; dtp < dtype[eithor].length; dtp++) {
					res = Validform.util._regcheck(dtype[eithor][dtp], gets, obj, curform);
					if (!res.passed) {
						break;
					}
				}
				if (res.passed) {
					break;
				}
			}
			return res;
		},
		parseDatatype: function(datatype) {
			var reg = /\/.+?\/[mgi]*(?=(,|$|\||\s))|[\w\*-]+/g,
				dtype = datatype.match(reg),
				sepor = datatype.replace(reg, "").replace(/\s*/g, "").split(""),
				arr = [],
				m = 0;
			arr[0] = [];
			arr[0].push(dtype[0]);
			for (var n = 0; n < sepor.length; n++) {
				if (sepor[n] == "|") {
					m++;
					arr[m] = [];
				}
				arr[m].push(dtype[n + 1]);
			}
			return arr;
		},
		showmsg: function(msg, type, o) {
			msg = $.trim(msg);
			var color;
			switch(o.type){
				case 1:
					color = 'info';
				break;
				case 2:
					color = 'success';
				break;
				default:
					color = 'warning';
			}
			if(o.type===2 && type!=1){
				o.obj.siblings(".Validform_checktip").removeClass('Validform_wrong').addClass('Validform_right').empty();
				return null;
			}
			if (msg === undef || msg === '') {
				return null;
			}
			$.extend(o, {
				curform: this
			});
			if (typeof type == "function") {
				type(msg, o, Validform.util.cssctl);
				return;
			}
			if (type == 1) {
				if(o.type===1 || o.type===2){
					return null;
				}
				app.toast(msg);
			} else {
				o.obj.siblings(".Validform_checktip").html(msg);
				Validform.util.cssctl(o.obj.siblings(".Validform_checktip"));
			}
		},
		cssctl: function(obj) {
			obj.removeClass("Validform_right Validform_loading").addClass("Validform_checktip Validform_wrong");
		},
		check: function(curform, subpost, bool, force) {
			if(!curform.data("tipmsg")){
				return null;
			}
			var settings = curform[0].settings;
			subpost = subpost || "";
			var inputval = Validform.util.getValue.call(curform, $(this));
			if (settings.ignoreHidden && $(this).is(":hidden") || ($(this).data("dataIgnore") === "dataIgnore" && !force)) {
				return true;
			}

			if (settings.dragonfly && !$(this).data("cked") && Validform.util.isEmpty.call($(this), inputval) && $(this).attr("ignore") != "ignore") {
				return false;
			}
			var flag = Validform.util.regcheck.call(curform, $(this).attr("datatype"), inputval, $(this));
			if (inputval === this.validform_lastval && !$(this).attr("recheck") && subpost === "" && settings.tiptype!==1) {
				return flag.passed ? true : false;
			}
			this.validform_lastval = inputval;
			var _this;
			errorobj = _this = $(this);
			if (!flag.passed) {
				Validform.util.abort.call(_this[0]);
				if (!bool) {
					!settings.tipSweep && _this.addClass("Validform_error");
					Validform.util.showmsg.call(curform, flag.info, settings.tiptype, {
						obj: $(this),
						type: flag.type,
						sweep: settings.tipSweep
					}, "bycheck");
					
				}
				return false;
			}
			var ajaxurl = $(this).attr("ajaxurl");
			if (ajaxurl && !Validform.util.isEmpty.call($(this), inputval) && !bool) {
				var inputobj = $(this);
				if (subpost == "postform") {
					inputobj[0].validform_subpost = "postform";
				} else {
					inputobj[0].validform_subpost = "";
				}
				if (inputobj[0].validform_valid === "posting" && inputval == inputobj[0].validform_ckvalue) {
					return "ajax";
				}
				inputobj[0].validform_valid = "posting";
				inputobj[0].validform_ckvalue = inputval;
				Validform.util.showmsg.call(curform, curform.data("tipmsg").c || tipmsg.c, settings.tiptype, {
					obj: inputobj,
					type: 1,
					sweep: settings.tipSweep
				}, "bycheck");
				Validform.util.abort.call(_this[0]);
				var ajaxsetup = $.extend(true, {}, settings.ajaxurl || {});
				var localconfig = {
					cache: false,
					url: ajaxurl,
					data: "param=" + encodeURIComponent(inputval) + "&name=" + encodeURIComponent($(this).attr("name")),
					dataType: 'json',
					success: function(data) {
						if ($.trim(data.status) === "y") {
							inputobj[0].validform_valid = "true";
							data.info && inputobj.attr("sucmsg", data.info);
							_this.removeClass("Validform_error");
							Validform.util.showmsg.call(curform, inputobj.attr("sucmsg") || curform.data("tipmsg").r || tipmsg.r, settings.tiptype, {
								obj: inputobj,
								type: 2
							}, "bycheck");
							
							errorobj = null;
							if (inputobj[0].validform_subpost == "postform") {
								curform.trigger("submit");
							}
						} else {
							inputobj[0].validform_valid = data.info;
							_this.addClass("Validform_error");
							Validform.util.showmsg.call(curform, data.info, settings.tiptype, {
								obj: inputobj
							});
							
						}
						_this[0].validform_ajax = null;
					},
					error: function(data) {
						if (data.status == "200") {
							if (data.responseText == "y") {
								ajaxsetup.success({
									"status": "y"
								});
							} else {
								ajaxsetup.success({
									"status": "n",
									"info": data.responseText
								});
							}
							return false;
						}
						if (data.statusText !== "abort") {
							var msg = "status: " + data.status + "; statusText: " + data.statusText;
							Validform.util.showmsg.call(curform, msg, settings.tiptype, {
								obj: inputobj,
								type: 3,
								sweep: settings.tipSweep
							});
							_this.addClass("Validform_error");
						}
						inputobj[0].validform_valid = data.statusText;
						_this[0].validform_ajax = null;
						return true;
					}
				};
				if (ajaxsetup.callback) {
					var temp_suc = ajaxsetup.callback;
					ajaxsetup.success = function(data) {
						localconfig.success(data);
						temp_suc(data, inputobj);
					};
				}
				if (ajaxsetup.error) {
					var temp_err = ajaxsetup.error;
					ajaxsetup.error = function(data) {
						localconfig.error(data) && temp_err(data, inputobj);
					};
				}
				ajaxsetup = $.extend({}, localconfig, ajaxsetup);
				_this[0].validform_ajax = ajaxRequest(ajaxsetup);
				return "ajax";
			} else if (ajaxurl && Validform.util.isEmpty.call($(this), inputval)) {
				Validform.util.abort.call(_this[0]);
				_this[0].validform_valid = "true";
			}
			if (!bool) {
				_this.removeClass("Validform_error");
				Validform.util.showmsg.call(curform, flag.info, settings.tiptype, {
					obj: $(this),
					type: flag.type,
					sweep: settings.tipSweep
				}, "bycheck");
				
			}
			errorobj = null;
			return true;
		},
		submitForm: function(settings, flg, url, ajaxPost, sync) {
			var curform = this,
				beforeCheck;
			if (curform[0].validform_status === "posting") {
				return false;
			}
			if (settings.postonce && curform[0].validform_status === "posted") {
				return false;
			}
			
			try{
				beforeCheck = !settings.beforeCheck || ($.isFunction(settings.beforeCheck) && settings.beforeCheck(curform));
			}catch(e){
				alert(e.message);
			}
			if (beforeCheck === false) {
				return false;
			}
			var flag = true,
				inflag;
			curform.find("[datatype]").each(function() {
				if (flg) {
					return false;
				}
				if (settings.ignoreHidden && $(this).is(":hidden") || $(this).data("dataIgnore") === "dataIgnore") {
					return true;
				}
				var inputval = Validform.util.getValue.call(curform, $(this)),
					_this;
				errorobj = _this = $(this);
				inflag = Validform.util.regcheck.call(curform, $(this).attr("datatype"), inputval, $(this));
				if (!inflag.passed) {
					_this.addClass("Validform_error");
					Validform.util.showmsg.call(curform, inflag.info, settings.tiptype, {
						obj: $(this),
						type: inflag.type,
						sweep: settings.tipSweep
					});
					if (!settings.showAllError) {
						_this.focus();
						flag = false;
						return false;
					}
					flag && (flag = false);
					return true;
				}
				if ($(this).attr("ajaxurl") && !Validform.util.isEmpty.call($(this), inputval)) {
					if (this.validform_valid !== "true") {
						var thisobj = $(this);
						Validform.util.showmsg.call(curform, curform.data("tipmsg").v || tipmsg.v, settings.tiptype, {
							obj: thisobj,
							type: 2,
							sweep: settings.tipSweep
						});
						_this.addClass("Validform_error");
						thisobj.trigger("blur", ["postform"]);
						if (!settings.showAllError) {
							flag = false;
							return false;
						}
						flag && (flag = false);
						return true;
					}
				} else if ($(this).attr("ajaxurl") && Validform.util.isEmpty.call($(this), inputval)) {
					Validform.util.abort.call(this);
					this.validform_valid = "true";
				}
				Validform.util.showmsg.call(curform, inflag.info, settings.tiptype, {
					obj: $(this),
					type: inflag.type,
					sweep: settings.tipSweep
				});
				_this.removeClass("Validform_error");
				errorobj = null;
			});

			if (flag) {
				if(!flg){
					var beforeSubmit;
					try{
						beforeSubmit = !settings.beforeSubmit || ($.isFunction(settings.beforeSubmit) && settings.beforeSubmit(curform));
					}catch(e){
						alert(e.message);
					}
					if (!beforeSubmit) {
						return false;
					}
				}
				curform[0].validform_status = "posting";
				if (settings.ajaxPost || ajaxPost === "ajaxPost") {
					var ajaxsetup = $.extend(true, {}, settings);
					ajaxsetup.url = url || ajaxsetup.url || settings.url || curform.attr("action");
					Validform.util.showmsg.call(curform, curform.data("tipmsg").p || tipmsg.p, settings.tiptype, {
						obj: curform,
						type: 1,
						sweep: settings.tipSweep
					}, "byajax");

					if (ajaxsetup.callback) {
						var temp_suc = ajaxsetup.callback;
						ajaxsetup.success = function(data) {
							settings.callback && settings.callback(data);
							curform[0].validform_ajax = null;
							if ($.trim(data.status) === "y") {
								curform[0].validform_status = "posted";
							} else {
								curform[0].validform_status = "normal";
							}
							temp_suc(data, curform);
						};
					}
					if (ajaxsetup.error) {
						var temp_err = ajaxsetup.error;
						ajaxsetup.error = function(data) {
							settings.callback && settings.callback(data);
							curform[0].validform_status = "normal";
							curform[0].validform_ajax = null;
							temp_err(data, curform);
						};
					}
					var _sendData = {},
						_formData = curform.serializeArray();
					if(settings.allable){
						curform.find(':disabled').each(function(i,e){
							$(e).prop('disabled',false);
							_formData.push({
								name: $(e).attr('name'),
								value: $(e).val()
							});
						});
					}
					$.each(_formData, function(i,e){
						if(_sendData[e.name] === void 0){
							_sendData[e.name] = e.value;
						}else {
							if(!$.isArray(_sendData[e.name])){
								_sendData[e.name] = [_sendData[e.name]];
							}
							_sendData[e.name].push(e.value);
						}
					});
					var dynamicAjaxData;
					if(typeof settings.ajaxData=='function'){
						dynamicAjaxData=settings.ajaxData();
					}else{
						dynamicAjaxData=settings.ajaxData||{};
					}
					$.extend(_sendData,  dynamicAjaxData);

					var localconfig = {
						type: "POST",
						data: _sendData, //$.extend(_sendData, settings.ajaxData || {}),
						dataType: settings.dataType || 'json',
						success: function(data) {
							if (data) {
								curform[0].validform_status = "posted";
							} else {
								curform[0].validform_status = "normal";
							}
							Validform.util.showmsg.call(curform, data.info, settings.tiptype, {
								obj: curform,
								type: 2,
								sweep: settings.tipSweep
							}, "byajax");
							settings.callback && settings.callback(data);
							curform[0].validform_ajax = null;
						},
						error: function(err) {
							console.warn(err.msg);
							curform[0].validform_status = "normal";
							curform[0].validform_ajax = null;
						}
					};
					ajaxsetup = $.extend({}, localconfig, ajaxsetup);
					try{
						curform[0].validform_ajax = ajaxRequest(ajaxsetup);
					}catch(e){
						//ios报错兼容
						console.log('validform.js:' + e.message);
						curform[0].validform_ajax = {abort:null};
					}
					return null;
				} else {
					if (!settings.postonce) {
						curform[0].validform_status = "normal";
					}
					url = url || settings.url;
					if (url) {
						curform.attr("action", url);
					}
					return settings.callback && settings.callback(curform);
				}
			}
			return false;
		},
		resetForm: function() {
			var brothers = this;
			brothers.each(function() {
				this.reset && this.reset();
				this.validform_status = "normal";
			});
			brothers.find(".Validform_right").text("");
			brothers.find(".passwordStrength").children().removeClass("bgStrength");
			brothers.find(".Validform_checktip").removeClass("Validform_wrong Validform_right Validform_loading")
			.text("");
			brothers.find(".Validform_error").removeClass("Validform_error");
			brothers.find("[datatype]").removeData("cked").removeData("dataIgnore").each(function() {
				this.validform_lastval = null;
			});
			brothers.eq(0).find("input:first").focus();
		},
		abort: function() {
			if (this.validform_ajax) {
				this.validform_ajax.abort();
			}
		}
	};
	//$.Datatype = Validform.util.dataType;
	Validform.prototype = {
		dataType: Validform.util.dataType,
		eq: function(n) {
			var obj = this;
			if (n >= obj.forms.length) {
				return null;
			}
			if (!(n in obj.objects)) {
				obj.objects[n] = new Validform($(obj.forms[n]).get(), {}, true);
			}
			return obj.objects[n];
		},
		resetStatus: function() {
			var obj = this;
			$(obj.forms).each(function() {
				this.validform_status = "normal";
			});
			return this;
		},
		setStatus: function(status) {
			var obj = this;
			$(obj.forms).each(function() {
				this.validform_status = status || "posting";
			});
			return this;
		},
		getStatus: function() {
			var obj = this;
			var status = $(obj.forms)[0].validform_status;
			return status;
		},
		ignore: function(selector) {
			var obj = this;
			selector = selector || "[datatype]";
			$(obj.forms).find(selector).each(function() {
				$(this).data("dataIgnore", "dataIgnore").removeClass("Validform_error");
			});
			return this;
		},
		unignore: function(selector) {
			var obj = this;
			selector = selector || "[datatype]";
			$(obj.forms).find(selector).each(function() {
				$(this).removeData("dataIgnore");
			});
			return this;
		},
		addRule: function(rule) {
			var obj = this;
			rule = rule || [];
			for (var index = 0; index < rule.length; index++) {
				var o = $(obj.forms).find(rule[index].ele);
				for (var attr in rule[index]) {
					attr !== "ele" && o.attr(attr, rule[index][attr]);
				}
			}
			$(obj.forms).each(function() {
				var $this = $(this);
				Validform.util.enhance.call($this, this.settings.tiptype, this.settings.usePlugin, this.settings.tipSweep, "addRule");
			});
			return this;
		},
		ajaxPost: function(flag, sync, url) {
			var obj = this;
			$(obj.forms).each(function() {
				Validform.util.submitForm.call($(obj.forms[0]), this.settings, flag, url, "ajaxPost", sync);
			});
			return this;
		},
		submitForm: function(flag, url) {
			var obj = this;
			$(obj.forms).each(function() {
				var subflag = Validform.util.submitForm.call($(this), this.settings, flag, url);
				subflag === undef && (subflag = true);
				if (subflag === true) {
					this.submit();
				}
			});
			return this;
		},
		resetForm: function() {
			var obj = this;
			Validform.util.resetForm.call($(obj.forms));
			return this;
		},
		abort: function() {
			var obj = this;
			$(obj.forms).each(function() {
				Validform.util.abort.call(this);
			});
			return this;
		},
		check: function(bool, selector) {
			var obj = this,
				curform = $(obj.forms),
				flag = true;
			selector = selector || "[datatype]";
			curform.find(selector).each(function() {
				Validform.util.check.call(this, curform, "", bool, true) || (flag = false);
			});
			return flag;
		},
		config: function(setup) {
			var obj = this;
			setup = setup || {};
			$(obj.forms).each(function() {
				var $this = $(this);
				this.settings = $.extend(true, this.settings, setup);
				Validform.util.enhance.call($this, this.settings.tiptype, this.settings.usePlugin, this.settings.tipSweep);
			});
			return this;
		}
	};
	$.fn.Validform = function(settings) {
		return new Validform(this, settings);
	};
	module.exports = function(forms, settings, inited){
		return new Validform(forms, settings, inited);
	};
});