/*
app JS SDK
Version：2.1.0
update: remove app.window.pause && app.window.resume,add app.window.on(type,cb);
date：2017-05-09
*
|--扩展：
|
本地日志：app.log
app.ajax：请求前网络状态判断
本地存储：app.ls
跳转窗口：app.openView(param,leval1,[leval2])
关闭窗口：app.window.close([winName, animId, animDuration])
分页加载：app.toload()
loading控制：app.loading，hide()&show()
加载非模块化js：app.getScript()

/*! Sea.js 2.2.1 | seajs.org/LICENSE.md */
!function(a,b){function c(a){return function(b){return{}.toString.call(b)=="[object "+a+"]"}}function d(){return A++}function e(a){return a.match(D)[0]}function f(a){for(a=a.replace(E,"/");a.match(F);)a=a.replace(F,"/");return a=a.replace(G,"$1/")}function g(a){var b=a.length-1,c=a.charAt(b);return"#"===c?a.substring(0,b):".js"===a.substring(b-2)||a.indexOf("?")>0||".css"===a.substring(b-3)||"/"===c?a:a+".js"}function h(a){var b=v.alias;return b&&x(b[a])?b[a]:a}function i(a){var b=v.paths,c;return b&&(c=a.match(H))&&x(b[c[1]])&&(a=b[c[1]]+c[2]),a}function j(a){var b=v.vars;return b&&a.indexOf("{")>-1&&(a=a.replace(I,function(a,c){return x(b[c])?b[c]:a})),a}function k(a){var b=v.map,c=a;if(b)for(var d=0,e=b.length;e>d;d++){var f=b[d];if(c=z(f)?f(a)||a:a.replace(f[0],f[1]),c!==a)break}return c}function l(a,b){var c,d=a.charAt(0);if(J.test(a))c=a;else if("."===d)c=f((b?e(b):v.cwd)+a);else if("/"===d){var g=v.cwd.match(K);c=g?g[0]+a.substring(1):a}else c=v.base+a;return 0===c.indexOf("//")&&(c=location.protocol+c),c}function m(a,b){if(!a)return"";a=h(a),a=i(a),a=j(a),a=g(a);var c=l(a,b);return c=k(c)}function n(a){return a.hasAttribute?a.src:a.getAttribute("src",4)}function o(a,b,c){var d=S.test(a),e=L.createElement(d?"link":"script");if(c){var f=z(c)?c(a):c;f&&(e.charset=f)}p(e,b,d,a),d?(e.rel="stylesheet",e.href=a):(e.async=!0,e.src=a),T=e,R?Q.insertBefore(e,R):Q.appendChild(e),T=null}function p(a,c,d,e){function f(){a.onload=a.onerror=a.onreadystatechange=null,d||v.debug||Q.removeChild(a),a=null,c()}var g="onload"in a;return!d||!V&&g?(g?(a.onload=f,a.onerror=function(){C("error",{uri:e,node:a}),f()}):a.onreadystatechange=function(){/loaded|complete/.test(a.readyState)&&f()},b):(setTimeout(function(){q(a,c)},1),b)}function q(a,b){var c=a.sheet,d;if(V)c&&(d=!0);else if(c)try{c.cssRules&&(d=!0)}catch(e){"NS_ERROR_DOM_SECURITY_ERR"===e.name&&(d=!0)}setTimeout(function(){d?b():q(a,b)},20)}function r(){if(T)return T;if(U&&"interactive"===U.readyState)return U;for(var a=Q.getElementsByTagName("script"),b=a.length-1;b>=0;b--){var c=a[b];if("interactive"===c.readyState)return U=c}}function s(a){var b=[];return a.replace(X,"").replace(W,function(a,c,d){d&&b.push(d)}),b}function t(a,b){this.uri=a,this.dependencies=b||[],this.exports=null,this.status=0,this._waitings={},this._remain=0}if(!a.seajs){var u=a.seajs={version:"2.2.1"},v=u.data={},w=c("Object"),x=c("String"),y=Array.isArray||c("Array"),z=c("Function"),A=0,B=v.events={};u.on=function(a,b){var c=B[a]||(B[a]=[]);return c.push(b),u},u.off=function(a,b){if(!a&&!b)return B=v.events={},u;var c=B[a];if(c)if(b)for(var d=c.length-1;d>=0;d--)c[d]===b&&c.splice(d,1);else delete B[a];return u};var C=u.emit=function(a,b){var c=B[a],d;if(c)for(c=c.slice();d=c.shift();)d(b);return u},D=/[^?#]*\//,E=/\/\.\//g,F=/\/[^/]+\/\.\.\//,G=/([^:/])\/\//g,H=/^([^/:]+)(\/.+)$/,I=/{([^{]+)}/g,J=/^\/\/.|:\//,K=/^.*?\/\/.*?\//,L=document,M=e(L.URL),N=L.scripts,O=L.getElementById("seajsnode")||N[N.length-1],P=e(n(O)||M);u.resolve=m;var Q=L.head||L.getElementsByTagName("head")[0]||L.documentElement,R=Q.getElementsByTagName("base")[0],S=/\.css(?:\?|$)/i,T,U,V=+navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/(\d+).*/,"$1")<536;u.request=o;var W=/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,X=/\\\\/g,Y=u.cache={},Z,$={},_={},ab={},bb=t.STATUS={FETCHING:1,SAVED:2,LOADING:3,LOADED:4,EXECUTING:5,EXECUTED:6};t.prototype.resolve=function(){for(var a=this,b=a.dependencies,c=[],d=0,e=b.length;e>d;d++)c[d]=t.resolve(b[d],a.uri);return c},t.prototype.load=function(){var a=this;if(!(a.status>=bb.LOADING)){a.status=bb.LOADING;var c=a.resolve();C("load",c);for(var d=a._remain=c.length,e,f=0;d>f;f++)e=t.get(c[f]),e.status<bb.LOADED?e._waitings[a.uri]=(e._waitings[a.uri]||0)+1:a._remain--;if(0===a._remain)return a.onload(),b;var g={};for(f=0;d>f;f++)e=Y[c[f]],e.status<bb.FETCHING?e.fetch(g):e.status===bb.SAVED&&e.load();for(var h in g)g.hasOwnProperty(h)&&g[h]()}},t.prototype.onload=function(){var a=this;a.status=bb.LOADED,a.callback&&a.callback();var b=a._waitings,c,d;for(c in b)b.hasOwnProperty(c)&&(d=Y[c],d._remain-=b[c],0===d._remain&&d.onload());delete a._waitings,delete a._remain},t.prototype.fetch=function(a){function c(){u.request(g.requestUri,g.onRequest,g.charset)}function d(){delete $[h],_[h]=!0,Z&&(t.save(f,Z),Z=null);var a,b=ab[h];for(delete ab[h];a=b.shift();)a.load()}var e=this,f=e.uri;e.status=bb.FETCHING;var g={uri:f};C("fetch",g);var h=g.requestUri||f;return!h||_[h]?(e.load(),b):$[h]?(ab[h].push(e),b):($[h]=!0,ab[h]=[e],C("request",g={uri:f,requestUri:h,onRequest:d,charset:v.charset}),g.requested||(a?a[g.requestUri]=c:c()),b)},t.prototype.exec=function(){function a(b){return t.get(a.resolve(b)).exec()}var c=this;if(c.status>=bb.EXECUTING)return c.exports;c.status=bb.EXECUTING;var e=c.uri;a.resolve=function(a){return t.resolve(a,e)},a.async=function(b,c){return t.use(b,c,e+"_async_"+d()),a};var f=c.factory,g=z(f)?f(a,c.exports={},c):f;return g===b&&(g=c.exports),delete c.factory,c.exports=g,c.status=bb.EXECUTED,C("exec",c),g},t.resolve=function(a,b){var c={id:a,refUri:b};return C("resolve",c),c.uri||u.resolve(c.id,b)},t.define=function(a,c,d){var e=arguments.length;1===e?(d=a,a=b):2===e&&(d=c,y(a)?(c=a,a=b):c=b),!y(c)&&z(d)&&(c=s(""+d));var f={id:a,uri:t.resolve(a),deps:c,factory:d};if(!f.uri&&L.attachEvent){var g=r();g&&(f.uri=g.src)}C("define",f),f.uri?t.save(f.uri,f):Z=f},t.save=function(a,b){var c=t.get(a);c.status<bb.SAVED&&(c.id=b.id||a,c.dependencies=b.deps||[],c.factory=b.factory,c.status=bb.SAVED)},t.get=function(a,b){return Y[a]||(Y[a]=new t(a,b))},t.use=function(b,c,d){var e=t.get(d,y(b)?b:[b]);e.callback=function(){for(var b=[],d=e.resolve(),f=0,g=d.length;g>f;f++)b[f]=Y[d[f]].exec();c&&c.apply(a,b),delete e.callback},e.load()},t.preload=function(a){var b=v.preload,c=b.length;c?t.use(b,function(){b.splice(0,c),t.preload(a)},v.cwd+"_preload_"+d()):a()},u.use=function(a,b){return t.preload(function(){t.use(a,b,v.cwd+"_use_"+d())}),u},t.define.cmd={},a.define=t.define,u.Module=t,v.fetchedList=_,v.cid=d,u.require=function(a){var b=t.get(t.resolve(a));return b.status<bb.EXECUTING&&(b.onload(),b.exec()),b.exports};var cb=/^(.+?\/)(\?\?)?(seajs\/)+/;v.base=(P.match(cb)||["",P])[1],v.dir=P,v.cwd=M,v.charset="utf-8",v.preload=function(){var a=[],b=location.search.replace(/(seajs-\w+)(&|$)/g,"$1=1$2");return b+=" "+L.cookie,b.replace(/(seajs-\w+)=1/g,function(b,c){a.push(c)}),a}(),u.config=function(a){for(var b in a){var c=a[b],d=v[b];if(d&&w(d))for(var e in c)d[e]=c[e];else y(d)?c=d.concat(c):"base"===b&&("/"!==c.slice(-1)&&(c+="/"),c=l(c)),v[b]=c}return C("config",a),u}}}(this);
/* Seajs.style.js */
!function(){var a,b=/\W/g,c=document,d=document.getElementsByTagName("head")[0]||document.documentElement;seajs.importStyle=function(e,f){if(!f||(f=f.replace(b,"-"),!c.getElementById(f))){var g;if(!a||f?(g=c.createElement("style"),f&&(g.id=f),d.appendChild(g)):g=a,void 0!==g.styleSheet){if(c.getElementsByTagName("style").length>31)throw new Error("Exceed the maximal count of style tags in IE");g.styleSheet.cssText+=e}else g.appendChild(c.createTextNode(e));f||(a=g)}},define("seajs/seajs-style/1.0.2/seajs-style",[],{})}();
/*! jQuery v2.1.4 | (c) 2005, 2015 jQuery Foundation, Inc. | jquery.org/license */
!function(a,b){"object"==typeof module&&"object"==typeof module.exports?module.exports=a.document?b(a,!0):function(a){if(!a.document)throw new Error("jQuery requires a window with a document");return b(a)}:b(a)}("undefined"!=typeof window?window:this,function(a,b){var c=[],d=c.slice,e=c.concat,f=c.push,g=c.indexOf,h={},i=h.toString,j=h.hasOwnProperty,k={},l=a.document,m="2.1.4",n=function(a,b){return new n.fn.init(a,b)},o=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,p=/^-ms-/,q=/-([\da-z])/gi,r=function(a,b){return b.toUpperCase()};n.fn=n.prototype={jquery:m,constructor:n,selector:"",length:0,toArray:function(){return d.call(this)},get:function(a){return null!=a?0>a?this[a+this.length]:this[a]:d.call(this)},pushStack:function(a){var b=n.merge(this.constructor(),a);return b.prevObject=this,b.context=this.context,b},each:function(a,b){return n.each(this,a,b)},map:function(a){return this.pushStack(n.map(this,function(b,c){return a.call(b,c,b)}))},slice:function(){return this.pushStack(d.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(a){var b=this.length,c=+a+(0>a?b:0);return this.pushStack(c>=0&&b>c?[this[c]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:f,sort:c.sort,splice:c.splice},n.extend=n.fn.extend=function(){var a,b,c,d,e,f,g=arguments[0]||{},h=1,i=arguments.length,j=!1;for("boolean"==typeof g&&(j=g,g=arguments[h]||{},h++),"object"==typeof g||n.isFunction(g)||(g={}),h===i&&(g=this,h--);i>h;h++)if(null!=(a=arguments[h]))for(b in a)c=g[b],d=a[b],g!==d&&(j&&d&&(n.isPlainObject(d)||(e=n.isArray(d)))?(e?(e=!1,f=c&&n.isArray(c)?c:[]):f=c&&n.isPlainObject(c)?c:{},g[b]=n.extend(j,f,d)):void 0!==d&&(g[b]=d));return g},n.extend({expando:"jQuery"+(m+Math.random()).replace(/\D/g,""),isReady:!0,error:function(a){throw new Error(a)},noop:function(){},isFunction:function(a){return"function"===n.type(a)},isArray:Array.isArray,isWindow:function(a){return null!=a&&a===a.window},isNumeric:function(a){return!n.isArray(a)&&a-parseFloat(a)+1>=0},isPlainObject:function(a){return"object"!==n.type(a)||a.nodeType||n.isWindow(a)?!1:a.constructor&&!j.call(a.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(a){var b;for(b in a)return!1;return!0},type:function(a){return null==a?a+"":"object"==typeof a||"function"==typeof a?h[i.call(a)]||"object":typeof a},globalEval:function(a){var b,c=eval;a=n.trim(a),a&&(1===a.indexOf("use strict")?(b=l.createElement("script"),b.text=a,l.head.appendChild(b).parentNode.removeChild(b)):c(a))},camelCase:function(a){return a.replace(p,"ms-").replace(q,r)},nodeName:function(a,b){return a.nodeName&&a.nodeName.toLowerCase()===b.toLowerCase()},each:function(a,b,c){var d,e=0,f=a.length,g=s(a);if(c){if(g){for(;f>e;e++)if(d=b.apply(a[e],c),d===!1)break}else for(e in a)if(d=b.apply(a[e],c),d===!1)break}else if(g){for(;f>e;e++)if(d=b.call(a[e],e,a[e]),d===!1)break}else for(e in a)if(d=b.call(a[e],e,a[e]),d===!1)break;return a},trim:function(a){return null==a?"":(a+"").replace(o,"")},makeArray:function(a,b){var c=b||[];return null!=a&&(s(Object(a))?n.merge(c,"string"==typeof a?[a]:a):f.call(c,a)),c},inArray:function(a,b,c){return null==b?-1:g.call(b,a,c)},merge:function(a,b){for(var c=+b.length,d=0,e=a.length;c>d;d++)a[e++]=b[d];return a.length=e,a},grep:function(a,b,c){for(var d,e=[],f=0,g=a.length,h=!c;g>f;f++)d=!b(a[f],f),d!==h&&e.push(a[f]);return e},map:function(a,b,c){var d,f=0,g=a.length,h=s(a),i=[];if(h)for(;g>f;f++)d=b(a[f],f,c),null!=d&&i.push(d);else for(f in a)d=b(a[f],f,c),null!=d&&i.push(d);return e.apply([],i)},guid:1,proxy:function(a,b){var c,e,f;return"string"==typeof b&&(c=a[b],b=a,a=c),n.isFunction(a)?(e=d.call(arguments,2),f=function(){return a.apply(b||this,e.concat(d.call(arguments)))},f.guid=a.guid=a.guid||n.guid++,f):void 0},now:Date.now,support:k}),n.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(a,b){h["[object "+b+"]"]=b.toLowerCase()});function s(a){var b="length"in a&&a.length,c=n.type(a);return"function"===c||n.isWindow(a)?!1:1===a.nodeType&&b?!0:"array"===c||0===b||"number"==typeof b&&b>0&&b-1 in a}var t=function(a){var b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u="sizzle"+1*new Date,v=a.document,w=0,x=0,y=ha(),z=ha(),A=ha(),B=function(a,b){return a===b&&(l=!0),0},C=1<<31,D={}.hasOwnProperty,E=[],F=E.pop,G=E.push,H=E.push,I=E.slice,J=function(a,b){for(var c=0,d=a.length;d>c;c++)if(a[c]===b)return c;return-1},K="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",L="[\\x20\\t\\r\\n\\f]",M="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",N=M.replace("w","w#"),O="\\["+L+"*("+M+")(?:"+L+"*([*^$|!~]?=)"+L+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+N+"))|)"+L+"*\\]",P=":("+M+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+O+")*)|.*)\\)|)",Q=new RegExp(L+"+","g"),R=new RegExp("^"+L+"+|((?:^|[^\\\\])(?:\\\\.)*)"+L+"+$","g"),S=new RegExp("^"+L+"*,"+L+"*"),T=new RegExp("^"+L+"*([>+~]|"+L+")"+L+"*"),U=new RegExp("="+L+"*([^\\]'\"]*?)"+L+"*\\]","g"),V=new RegExp(P),W=new RegExp("^"+N+"$"),X={ID:new RegExp("^#("+M+")"),CLASS:new RegExp("^\\.("+M+")"),TAG:new RegExp("^("+M.replace("w","w*")+")"),ATTR:new RegExp("^"+O),PSEUDO:new RegExp("^"+P),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+L+"*(even|odd|(([+-]|)(\\d*)n|)"+L+"*(?:([+-]|)"+L+"*(\\d+)|))"+L+"*\\)|)","i"),bool:new RegExp("^(?:"+K+")$","i"),needsContext:new RegExp("^"+L+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+L+"*((?:-\\d)?\\d*)"+L+"*\\)|)(?=[^-]|$)","i")},Y=/^(?:input|select|textarea|button)$/i,Z=/^h\d$/i,$=/^[^{]+\{\s*\[native \w/,_=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,aa=/[+~]/,ba=/'|\\/g,ca=new RegExp("\\\\([\\da-f]{1,6}"+L+"?|("+L+")|.)","ig"),da=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:0>d?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)},ea=function(){m()};try{H.apply(E=I.call(v.childNodes),v.childNodes),E[v.childNodes.length].nodeType}catch(fa){H={apply:E.length?function(a,b){G.apply(a,I.call(b))}:function(a,b){var c=a.length,d=0;while(a[c++]=b[d++]);a.length=c-1}}}function ga(a,b,d,e){var f,h,j,k,l,o,r,s,w,x;if((b?b.ownerDocument||b:v)!==n&&m(b),b=b||n,d=d||[],k=b.nodeType,"string"!=typeof a||!a||1!==k&&9!==k&&11!==k)return d;if(!e&&p){if(11!==k&&(f=_.exec(a)))if(j=f[1]){if(9===k){if(h=b.getElementById(j),!h||!h.parentNode)return d;if(h.id===j)return d.push(h),d}else if(b.ownerDocument&&(h=b.ownerDocument.getElementById(j))&&t(b,h)&&h.id===j)return d.push(h),d}else{if(f[2])return H.apply(d,b.getElementsByTagName(a)),d;if((j=f[3])&&c.getElementsByClassName)return H.apply(d,b.getElementsByClassName(j)),d}if(c.qsa&&(!q||!q.test(a))){if(s=r=u,w=b,x=1!==k&&a,1===k&&"object"!==b.nodeName.toLowerCase()){o=g(a),(r=b.getAttribute("id"))?s=r.replace(ba,"\\$&"):b.setAttribute("id",s),s="[id='"+s+"'] ",l=o.length;while(l--)o[l]=s+ra(o[l]);w=aa.test(a)&&pa(b.parentNode)||b,x=o.join(",")}if(x)try{return H.apply(d,w.querySelectorAll(x)),d}catch(y){}finally{r||b.removeAttribute("id")}}}return i(a.replace(R,"$1"),b,d,e)}function ha(){var a=[];function b(c,e){return a.push(c+" ")>d.cacheLength&&delete b[a.shift()],b[c+" "]=e}return b}function ia(a){return a[u]=!0,a}function ja(a){var b=n.createElement("div");try{return!!a(b)}catch(c){return!1}finally{b.parentNode&&b.parentNode.removeChild(b),b=null}}function ka(a,b){var c=a.split("|"),e=a.length;while(e--)d.attrHandle[c[e]]=b}function la(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||C)-(~a.sourceIndex||C);if(d)return d;if(c)while(c=c.nextSibling)if(c===b)return-1;return a?1:-1}function ma(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function na(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function oa(a){return ia(function(b){return b=+b,ia(function(c,d){var e,f=a([],c.length,b),g=f.length;while(g--)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function pa(a){return a&&"undefined"!=typeof a.getElementsByTagName&&a}c=ga.support={},f=ga.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return b?"HTML"!==b.nodeName:!1},m=ga.setDocument=function(a){var b,e,g=a?a.ownerDocument||a:v;return g!==n&&9===g.nodeType&&g.documentElement?(n=g,o=g.documentElement,e=g.defaultView,e&&e!==e.top&&(e.addEventListener?e.addEventListener("unload",ea,!1):e.attachEvent&&e.attachEvent("onunload",ea)),p=!f(g),c.attributes=ja(function(a){return a.className="i",!a.getAttribute("className")}),c.getElementsByTagName=ja(function(a){return a.appendChild(g.createComment("")),!a.getElementsByTagName("*").length}),c.getElementsByClassName=$.test(g.getElementsByClassName),c.getById=ja(function(a){return o.appendChild(a).id=u,!g.getElementsByName||!g.getElementsByName(u).length}),c.getById?(d.find.ID=function(a,b){if("undefined"!=typeof b.getElementById&&p){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){return a.getAttribute("id")===b}}):(delete d.find.ID,d.filter.ID=function(a){var b=a.replace(ca,da);return function(a){var c="undefined"!=typeof a.getAttributeNode&&a.getAttributeNode("id");return c&&c.value===b}}),d.find.TAG=c.getElementsByTagName?function(a,b){return"undefined"!=typeof b.getElementsByTagName?b.getElementsByTagName(a):c.qsa?b.querySelectorAll(a):void 0}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){while(c=f[e++])1===c.nodeType&&d.push(c);return d}return f},d.find.CLASS=c.getElementsByClassName&&function(a,b){return p?b.getElementsByClassName(a):void 0},r=[],q=[],(c.qsa=$.test(g.querySelectorAll))&&(ja(function(a){o.appendChild(a).innerHTML="<a id='"+u+"'></a><select id='"+u+"-\f]' msallowcapture=''><option selected=''></option></select>",a.querySelectorAll("[msallowcapture^='']").length&&q.push("[*^$]="+L+"*(?:''|\"\")"),a.querySelectorAll("[selected]").length||q.push("\\["+L+"*(?:value|"+K+")"),a.querySelectorAll("[id~="+u+"-]").length||q.push("~="),a.querySelectorAll(":checked").length||q.push(":checked"),a.querySelectorAll("a#"+u+"+*").length||q.push(".#.+[+~]")}),ja(function(a){var b=g.createElement("input");b.setAttribute("type","hidden"),a.appendChild(b).setAttribute("name","D"),a.querySelectorAll("[name=d]").length&&q.push("name"+L+"*[*^$|!~]?="),a.querySelectorAll(":enabled").length||q.push(":enabled",":disabled"),a.querySelectorAll("*,:x"),q.push(",.*:")})),(c.matchesSelector=$.test(s=o.matches||o.webkitMatchesSelector||o.mozMatchesSelector||o.oMatchesSelector||o.msMatchesSelector))&&ja(function(a){c.disconnectedMatch=s.call(a,"div"),s.call(a,"[s!='']:x"),r.push("!=",P)}),q=q.length&&new RegExp(q.join("|")),r=r.length&&new RegExp(r.join("|")),b=$.test(o.compareDocumentPosition),t=b||$.test(o.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)while(b=b.parentNode)if(b===a)return!0;return!1},B=b?function(a,b){if(a===b)return l=!0,0;var d=!a.compareDocumentPosition-!b.compareDocumentPosition;return d?d:(d=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&d||!c.sortDetached&&b.compareDocumentPosition(a)===d?a===g||a.ownerDocument===v&&t(v,a)?-1:b===g||b.ownerDocument===v&&t(v,b)?1:k?J(k,a)-J(k,b):0:4&d?-1:1)}:function(a,b){if(a===b)return l=!0,0;var c,d=0,e=a.parentNode,f=b.parentNode,h=[a],i=[b];if(!e||!f)return a===g?-1:b===g?1:e?-1:f?1:k?J(k,a)-J(k,b):0;if(e===f)return la(a,b);c=a;while(c=c.parentNode)h.unshift(c);c=b;while(c=c.parentNode)i.unshift(c);while(h[d]===i[d])d++;return d?la(h[d],i[d]):h[d]===v?-1:i[d]===v?1:0},g):n},ga.matches=function(a,b){return ga(a,null,null,b)},ga.matchesSelector=function(a,b){if((a.ownerDocument||a)!==n&&m(a),b=b.replace(U,"='$1']"),!(!c.matchesSelector||!p||r&&r.test(b)||q&&q.test(b)))try{var d=s.call(a,b);if(d||c.disconnectedMatch||a.document&&11!==a.document.nodeType)return d}catch(e){}return ga(b,n,null,[a]).length>0},ga.contains=function(a,b){return(a.ownerDocument||a)!==n&&m(a),t(a,b)},ga.attr=function(a,b){(a.ownerDocument||a)!==n&&m(a);var e=d.attrHandle[b.toLowerCase()],f=e&&D.call(d.attrHandle,b.toLowerCase())?e(a,b,!p):void 0;return void 0!==f?f:c.attributes||!p?a.getAttribute(b):(f=a.getAttributeNode(b))&&f.specified?f.value:null},ga.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},ga.uniqueSort=function(a){var b,d=[],e=0,f=0;if(l=!c.detectDuplicates,k=!c.sortStable&&a.slice(0),a.sort(B),l){while(b=a[f++])b===a[f]&&(e=d.push(f));while(e--)a.splice(d[e],1)}return k=null,a},e=ga.getText=function(a){var b,c="",d=0,f=a.nodeType;if(f){if(1===f||9===f||11===f){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=e(a)}else if(3===f||4===f)return a.nodeValue}else while(b=a[d++])c+=e(b);return c},d=ga.selectors={cacheLength:50,createPseudo:ia,match:X,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ca,da),a[3]=(a[3]||a[4]||a[5]||"").replace(ca,da),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(a){return a[1]=a[1].toLowerCase(),"nth"===a[1].slice(0,3)?(a[3]||ga.error(a[0]),a[4]=+(a[4]?a[5]+(a[6]||1):2*("even"===a[3]||"odd"===a[3])),a[5]=+(a[7]+a[8]||"odd"===a[3])):a[3]&&ga.error(a[0]),a},PSEUDO:function(a){var b,c=!a[6]&&a[2];return X.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&V.test(c)&&(b=g(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ca,da).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=y[a+" "];return b||(b=new RegExp("(^|"+L+")"+a+"("+L+"|$)"))&&y(a,function(a){return b.test("string"==typeof a.className&&a.className||"undefined"!=typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){var e=ga.attr(d,a);return null==e?"!="===b:b?(e+="","="===b?e===c:"!="===b?e!==c:"^="===b?c&&0===e.indexOf(c):"*="===b?c&&e.indexOf(c)>-1:"$="===b?c&&e.slice(-c.length)===c:"~="===b?(" "+e.replace(Q," ")+" ").indexOf(c)>-1:"|="===b?e===c||e.slice(0,c.length+1)===c+"-":!1):!0}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){while(p){l=b;while(l=l[p])if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){k=q[u]||(q[u]={}),j=k[a]||[],n=j[0]===w&&j[1],m=j[0]===w&&j[2],l=n&&q.childNodes[n];while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if(1===l.nodeType&&++m&&l===b){k[a]=[w,n,m];break}}else if(s&&(j=(b[u]||(b[u]={}))[a])&&j[0]===w)m=j[1];else while(l=++n&&l&&l[p]||(m=n=0)||o.pop())if((h?l.nodeName.toLowerCase()===r:1===l.nodeType)&&++m&&(s&&((l[u]||(l[u]={}))[a]=[w,m]),l===b))break;return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(a,b){var c,e=d.pseudos[a]||d.setFilters[a.toLowerCase()]||ga.error("unsupported pseudo: "+a);return e[u]?e(b):e.length>1?(c=[a,a,"",b],d.setFilters.hasOwnProperty(a.toLowerCase())?ia(function(a,c){var d,f=e(a,b),g=f.length;while(g--)d=J(a,f[g]),a[d]=!(c[d]=f[g])}):function(a){return e(a,0,c)}):e}},pseudos:{not:ia(function(a){var b=[],c=[],d=h(a.replace(R,"$1"));return d[u]?ia(function(a,b,c,e){var f,g=d(a,null,e,[]),h=a.length;while(h--)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,e,f){return b[0]=a,d(b,null,f,c),b[0]=null,!c.pop()}}),has:ia(function(a){return function(b){return ga(a,b).length>0}}),contains:ia(function(a){return a=a.replace(ca,da),function(b){return(b.textContent||b.innerText||e(b)).indexOf(a)>-1}}),lang:ia(function(a){return W.test(a||"")||ga.error("unsupported lang: "+a),a=a.replace(ca,da).toLowerCase(),function(b){var c;do if(c=p?b.lang:b.getAttribute("xml:lang")||b.getAttribute("lang"))return c=c.toLowerCase(),c===a||0===c.indexOf(a+"-");while((b=b.parentNode)&&1===b.nodeType);return!1}}),target:function(b){var c=a.location&&a.location.hash;return c&&c.slice(1)===b.id},root:function(a){return a===o},focus:function(a){return a===n.activeElement&&(!n.hasFocus||n.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!d.pseudos.empty(a)},header:function(a){return Z.test(a.nodeName)},input:function(a){return Y.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:oa(function(){return[0]}),last:oa(function(a,b){return[b-1]}),eq:oa(function(a,b,c){return[0>c?c+b:c]}),even:oa(function(a,b){for(var c=0;b>c;c+=2)a.push(c);return a}),odd:oa(function(a,b){for(var c=1;b>c;c+=2)a.push(c);return a}),lt:oa(function(a,b,c){for(var d=0>c?c+b:c;--d>=0;)a.push(d);return a}),gt:oa(function(a,b,c){for(var d=0>c?c+b:c;++d<b;)a.push(d);return a})}},d.pseudos.nth=d.pseudos.eq;for(b in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})d.pseudos[b]=ma(b);for(b in{submit:!0,reset:!0})d.pseudos[b]=na(b);function qa(){}qa.prototype=d.filters=d.pseudos,d.setFilters=new qa,g=ga.tokenize=function(a,b){var c,e,f,g,h,i,j,k=z[a+" "];if(k)return b?0:k.slice(0);h=a,i=[],j=d.preFilter;while(h){(!c||(e=S.exec(h)))&&(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),c=!1,(e=T.exec(h))&&(c=e.shift(),f.push({value:c,type:e[0].replace(R," ")}),h=h.slice(c.length));for(g in d.filter)!(e=X[g].exec(h))||j[g]&&!(e=j[g](e))||(c=e.shift(),f.push({value:c,type:g,matches:e}),h=h.slice(c.length));if(!c)break}return b?h.length:h?ga.error(a):z(a,i).slice(0)};function ra(a){for(var b=0,c=a.length,d="";c>b;b++)d+=a[b].value;return d}function sa(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=x++;return b.first?function(b,c,f){while(b=b[d])if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[w,f];if(g){while(b=b[d])if((1===b.nodeType||e)&&a(b,c,g))return!0}else while(b=b[d])if(1===b.nodeType||e){if(i=b[u]||(b[u]={}),(h=i[d])&&h[0]===w&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function ta(a){return a.length>1?function(b,c,d){var e=a.length;while(e--)if(!a[e](b,c,d))return!1;return!0}:a[0]}function ua(a,b,c){for(var d=0,e=b.length;e>d;d++)ga(a,b[d],c);return c}function va(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;i>h;h++)(f=a[h])&&(!c||c(f,d,e))&&(g.push(f),j&&b.push(h));return g}function wa(a,b,c,d,e,f){return d&&!d[u]&&(d=wa(d)),e&&!e[u]&&(e=wa(e,f)),ia(function(f,g,h,i){var j,k,l,m=[],n=[],o=g.length,p=f||ua(b||"*",h.nodeType?[h]:h,[]),q=!a||!f&&b?p:va(p,m,a,h,i),r=c?e||(f?a:o||d)?[]:g:q;if(c&&c(q,r,h,i),d){j=va(r,n),d(j,[],h,i),k=j.length;while(k--)(l=j[k])&&(r[n[k]]=!(q[n[k]]=l))}if(f){if(e||a){if(e){j=[],k=r.length;while(k--)(l=r[k])&&j.push(q[k]=l);e(null,r=[],j,i)}k=r.length;while(k--)(l=r[k])&&(j=e?J(f,l):m[k])>-1&&(f[j]=!(g[j]=l))}}else r=va(r===g?r.splice(o,r.length):r),e?e(null,g,r,i):H.apply(g,r)})}function xa(a){for(var b,c,e,f=a.length,g=d.relative[a[0].type],h=g||d.relative[" "],i=g?1:0,k=sa(function(a){return a===b},h,!0),l=sa(function(a){return J(b,a)>-1},h,!0),m=[function(a,c,d){var e=!g&&(d||c!==j)||((b=c).nodeType?k(a,c,d):l(a,c,d));return b=null,e}];f>i;i++)if(c=d.relative[a[i].type])m=[sa(ta(m),c)];else{if(c=d.filter[a[i].type].apply(null,a[i].matches),c[u]){for(e=++i;f>e;e++)if(d.relative[a[e].type])break;return wa(i>1&&ta(m),i>1&&ra(a.slice(0,i-1).concat({value:" "===a[i-2].type?"*":""})).replace(R,"$1"),c,e>i&&xa(a.slice(i,e)),f>e&&xa(a=a.slice(e)),f>e&&ra(a))}m.push(c)}return ta(m)}function ya(a,b){var c=b.length>0,e=a.length>0,f=function(f,g,h,i,k){var l,m,o,p=0,q="0",r=f&&[],s=[],t=j,u=f||e&&d.find.TAG("*",k),v=w+=null==t?1:Math.random()||.1,x=u.length;for(k&&(j=g!==n&&g);q!==x&&null!=(l=u[q]);q++){if(e&&l){m=0;while(o=a[m++])if(o(l,g,h)){i.push(l);break}k&&(w=v)}c&&((l=!o&&l)&&p--,f&&r.push(l))}if(p+=q,c&&q!==p){m=0;while(o=b[m++])o(r,s,g,h);if(f){if(p>0)while(q--)r[q]||s[q]||(s[q]=F.call(i));s=va(s)}H.apply(i,s),k&&!f&&s.length>0&&p+b.length>1&&ga.uniqueSort(i)}return k&&(w=v,j=t),r};return c?ia(f):f}return h=ga.compile=function(a,b){var c,d=[],e=[],f=A[a+" "];if(!f){b||(b=g(a)),c=b.length;while(c--)f=xa(b[c]),f[u]?d.push(f):e.push(f);f=A(a,ya(e,d)),f.selector=a}return f},i=ga.select=function(a,b,e,f){var i,j,k,l,m,n="function"==typeof a&&a,o=!f&&g(a=n.selector||a);if(e=e||[],1===o.length){if(j=o[0]=o[0].slice(0),j.length>2&&"ID"===(k=j[0]).type&&c.getById&&9===b.nodeType&&p&&d.relative[j[1].type]){if(b=(d.find.ID(k.matches[0].replace(ca,da),b)||[])[0],!b)return e;n&&(b=b.parentNode),a=a.slice(j.shift().value.length)}i=X.needsContext.test(a)?0:j.length;while(i--){if(k=j[i],d.relative[l=k.type])break;if((m=d.find[l])&&(f=m(k.matches[0].replace(ca,da),aa.test(j[0].type)&&pa(b.parentNode)||b))){if(j.splice(i,1),a=f.length&&ra(j),!a)return H.apply(e,f),e;break}}}return(n||h(a,o))(f,b,!p,e,aa.test(a)&&pa(b.parentNode)||b),e},c.sortStable=u.split("").sort(B).join("")===u,c.detectDuplicates=!!l,m(),c.sortDetached=ja(function(a){return 1&a.compareDocumentPosition(n.createElement("div"))}),ja(function(a){return a.innerHTML="<a href='#'></a>","#"===a.firstChild.getAttribute("href")})||ka("type|href|height|width",function(a,b,c){return c?void 0:a.getAttribute(b,"type"===b.toLowerCase()?1:2)}),c.attributes&&ja(function(a){return a.innerHTML="<input/>",a.firstChild.setAttribute("value",""),""===a.firstChild.getAttribute("value")})||ka("value",function(a,b,c){return c||"input"!==a.nodeName.toLowerCase()?void 0:a.defaultValue}),ja(function(a){return null==a.getAttribute("disabled")})||ka(K,function(a,b,c){var d;return c?void 0:a[b]===!0?b.toLowerCase():(d=a.getAttributeNode(b))&&d.specified?d.value:null}),ga}(a);n.find=t,n.expr=t.selectors,n.expr[":"]=n.expr.pseudos,n.unique=t.uniqueSort,n.text=t.getText,n.isXMLDoc=t.isXML,n.contains=t.contains;var u=n.expr.match.needsContext,v=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,w=/^.[^:#\[\.,]*$/;function x(a,b,c){if(n.isFunction(b))return n.grep(a,function(a,d){return!!b.call(a,d,a)!==c});if(b.nodeType)return n.grep(a,function(a){return a===b!==c});if("string"==typeof b){if(w.test(b))return n.filter(b,a,c);b=n.filter(b,a)}return n.grep(a,function(a){return g.call(b,a)>=0!==c})}n.filter=function(a,b,c){var d=b[0];return c&&(a=":not("+a+")"),1===b.length&&1===d.nodeType?n.find.matchesSelector(d,a)?[d]:[]:n.find.matches(a,n.grep(b,function(a){return 1===a.nodeType}))},n.fn.extend({find:function(a){var b,c=this.length,d=[],e=this;if("string"!=typeof a)return this.pushStack(n(a).filter(function(){for(b=0;c>b;b++)if(n.contains(e[b],this))return!0}));for(b=0;c>b;b++)n.find(a,e[b],d);return d=this.pushStack(c>1?n.unique(d):d),d.selector=this.selector?this.selector+" "+a:a,d},filter:function(a){return this.pushStack(x(this,a||[],!1))},not:function(a){return this.pushStack(x(this,a||[],!0))},is:function(a){return!!x(this,"string"==typeof a&&u.test(a)?n(a):a||[],!1).length}});var y,z=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,A=n.fn.init=function(a,b){var c,d;if(!a)return this;if("string"==typeof a){if(c="<"===a[0]&&">"===a[a.length-1]&&a.length>=3?[null,a,null]:z.exec(a),!c||!c[1]&&b)return!b||b.jquery?(b||y).find(a):this.constructor(b).find(a);if(c[1]){if(b=b instanceof n?b[0]:b,n.merge(this,n.parseHTML(c[1],b&&b.nodeType?b.ownerDocument||b:l,!0)),v.test(c[1])&&n.isPlainObject(b))for(c in b)n.isFunction(this[c])?this[c](b[c]):this.attr(c,b[c]);return this}return d=l.getElementById(c[2]),d&&d.parentNode&&(this.length=1,this[0]=d),this.context=l,this.selector=a,this}return a.nodeType?(this.context=this[0]=a,this.length=1,this):n.isFunction(a)?"undefined"!=typeof y.ready?y.ready(a):a(n):(void 0!==a.selector&&(this.selector=a.selector,this.context=a.context),n.makeArray(a,this))};A.prototype=n.fn,y=n(l);var B=/^(?:parents|prev(?:Until|All))/,C={children:!0,contents:!0,next:!0,prev:!0};n.extend({dir:function(a,b,c){var d=[],e=void 0!==c;while((a=a[b])&&9!==a.nodeType)if(1===a.nodeType){if(e&&n(a).is(c))break;d.push(a)}return d},sibling:function(a,b){for(var c=[];a;a=a.nextSibling)1===a.nodeType&&a!==b&&c.push(a);return c}}),n.fn.extend({has:function(a){var b=n(a,this),c=b.length;return this.filter(function(){for(var a=0;c>a;a++)if(n.contains(this,b[a]))return!0})},closest:function(a,b){for(var c,d=0,e=this.length,f=[],g=u.test(a)||"string"!=typeof a?n(a,b||this.context):0;e>d;d++)for(c=this[d];c&&c!==b;c=c.parentNode)if(c.nodeType<11&&(g?g.index(c)>-1:1===c.nodeType&&n.find.matchesSelector(c,a))){f.push(c);break}return this.pushStack(f.length>1?n.unique(f):f)},index:function(a){return a?"string"==typeof a?g.call(n(a),this[0]):g.call(this,a.jquery?a[0]:a):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(a,b){return this.pushStack(n.unique(n.merge(this.get(),n(a,b))))},addBack:function(a){return this.add(null==a?this.prevObject:this.prevObject.filter(a))}});function D(a,b){while((a=a[b])&&1!==a.nodeType);return a}n.each({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return n.dir(a,"parentNode")},parentsUntil:function(a,b,c){return n.dir(a,"parentNode",c)},next:function(a){return D(a,"nextSibling")},prev:function(a){return D(a,"previousSibling")},nextAll:function(a){return n.dir(a,"nextSibling")},prevAll:function(a){return n.dir(a,"previousSibling")},nextUntil:function(a,b,c){return n.dir(a,"nextSibling",c)},prevUntil:function(a,b,c){return n.dir(a,"previousSibling",c)},siblings:function(a){return n.sibling((a.parentNode||{}).firstChild,a)},children:function(a){return n.sibling(a.firstChild)},contents:function(a){return a.contentDocument||n.merge([],a.childNodes)}},function(a,b){n.fn[a]=function(c,d){var e=n.map(this,b,c);return"Until"!==a.slice(-5)&&(d=c),d&&"string"==typeof d&&(e=n.filter(d,e)),this.length>1&&(C[a]||n.unique(e),B.test(a)&&e.reverse()),this.pushStack(e)}});var E=/\S+/g,F={};function G(a){var b=F[a]={};return n.each(a.match(E)||[],function(a,c){b[c]=!0}),b}n.Callbacks=function(a){a="string"==typeof a?F[a]||G(a):n.extend({},a);var b,c,d,e,f,g,h=[],i=!a.once&&[],j=function(l){for(b=a.memory&&l,c=!0,g=e||0,e=0,f=h.length,d=!0;h&&f>g;g++)if(h[g].apply(l[0],l[1])===!1&&a.stopOnFalse){b=!1;break}d=!1,h&&(i?i.length&&j(i.shift()):b?h=[]:k.disable())},k={add:function(){if(h){var c=h.length;!function g(b){n.each(b,function(b,c){var d=n.type(c);"function"===d?a.unique&&k.has(c)||h.push(c):c&&c.length&&"string"!==d&&g(c)})}(arguments),d?f=h.length:b&&(e=c,j(b))}return this},remove:function(){return h&&n.each(arguments,function(a,b){var c;while((c=n.inArray(b,h,c))>-1)h.splice(c,1),d&&(f>=c&&f--,g>=c&&g--)}),this},has:function(a){return a?n.inArray(a,h)>-1:!(!h||!h.length)},empty:function(){return h=[],f=0,this},disable:function(){return h=i=b=void 0,this},disabled:function(){return!h},lock:function(){return i=void 0,b||k.disable(),this},locked:function(){return!i},fireWith:function(a,b){return!h||c&&!i||(b=b||[],b=[a,b.slice?b.slice():b],d?i.push(b):j(b)),this},fire:function(){return k.fireWith(this,arguments),this},fired:function(){return!!c}};return k},n.extend({Deferred:function(a){var b=[["resolve","done",n.Callbacks("once memory"),"resolved"],["reject","fail",n.Callbacks("once memory"),"rejected"],["notify","progress",n.Callbacks("memory")]],c="pending",d={state:function(){return c},always:function(){return e.done(arguments).fail(arguments),this},then:function(){var a=arguments;return n.Deferred(function(c){n.each(b,function(b,f){var g=n.isFunction(a[b])&&a[b];e[f[1]](function(){var a=g&&g.apply(this,arguments);a&&n.isFunction(a.promise)?a.promise().done(c.resolve).fail(c.reject).progress(c.notify):c[f[0]+"With"](this===d?c.promise():this,g?[a]:arguments)})}),a=null}).promise()},promise:function(a){return null!=a?n.extend(a,d):d}},e={};return d.pipe=d.then,n.each(b,function(a,f){var g=f[2],h=f[3];d[f[1]]=g.add,h&&g.add(function(){c=h},b[1^a][2].disable,b[2][2].lock),e[f[0]]=function(){return e[f[0]+"With"](this===e?d:this,arguments),this},e[f[0]+"With"]=g.fireWith}),d.promise(e),a&&a.call(e,e),e},when:function(a){var b=0,c=d.call(arguments),e=c.length,f=1!==e||a&&n.isFunction(a.promise)?e:0,g=1===f?a:n.Deferred(),h=function(a,b,c){return function(e){b[a]=this,c[a]=arguments.length>1?d.call(arguments):e,c===i?g.notifyWith(b,c):--f||g.resolveWith(b,c)}},i,j,k;if(e>1)for(i=new Array(e),j=new Array(e),k=new Array(e);e>b;b++)c[b]&&n.isFunction(c[b].promise)?c[b].promise().done(h(b,k,c)).fail(g.reject).progress(h(b,j,i)):--f;return f||g.resolveWith(k,c),g.promise()}});var H;n.fn.ready=function(a){return n.ready.promise().done(a),this},n.extend({isReady:!1,readyWait:1,holdReady:function(a){a?n.readyWait++:n.ready(!0)},ready:function(a){(a===!0?--n.readyWait:n.isReady)||(n.isReady=!0,a!==!0&&--n.readyWait>0||(H.resolveWith(l,[n]),n.fn.triggerHandler&&(n(l).triggerHandler("ready"),n(l).off("ready"))))}});function I(){l.removeEventListener("DOMContentLoaded",I,!1),a.removeEventListener("load",I,!1),n.ready()}n.ready.promise=function(b){return H||(H=n.Deferred(),"complete"===l.readyState?setTimeout(n.ready):(l.addEventListener("DOMContentLoaded",I,!1),a.addEventListener("load",I,!1))),H.promise(b)},n.ready.promise();var J=n.access=function(a,b,c,d,e,f,g){var h=0,i=a.length,j=null==c;if("object"===n.type(c)){e=!0;for(h in c)n.access(a,b,h,c[h],!0,f,g)}else if(void 0!==d&&(e=!0,n.isFunction(d)||(g=!0),j&&(g?(b.call(a,d),b=null):(j=b,b=function(a,b,c){return j.call(n(a),c)})),b))for(;i>h;h++)b(a[h],c,g?d:d.call(a[h],h,b(a[h],c)));return e?a:j?b.call(a):i?b(a[0],c):f};n.acceptData=function(a){return 1===a.nodeType||9===a.nodeType||!+a.nodeType};function K(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=n.expando+K.uid++}K.uid=1,K.accepts=n.acceptData,K.prototype={key:function(a){if(!K.accepts(a))return 0;var b={},c=a[this.expando];if(!c){c=K.uid++;try{b[this.expando]={value:c},Object.defineProperties(a,b)}catch(d){b[this.expando]=c,n.extend(a,b)}}return this.cache[c]||(this.cache[c]={}),c},set:function(a,b,c){var d,e=this.key(a),f=this.cache[e];if("string"==typeof b)f[b]=c;else if(n.isEmptyObject(f))n.extend(this.cache[e],b);else for(d in b)f[d]=b[d];return f},get:function(a,b){var c=this.cache[this.key(a)];return void 0===b?c:c[b]},access:function(a,b,c){var d;return void 0===b||b&&"string"==typeof b&&void 0===c?(d=this.get(a,b),void 0!==d?d:this.get(a,n.camelCase(b))):(this.set(a,b,c),void 0!==c?c:b)},remove:function(a,b){var c,d,e,f=this.key(a),g=this.cache[f];if(void 0===b)this.cache[f]={};else{n.isArray(b)?d=b.concat(b.map(n.camelCase)):(e=n.camelCase(b),b in g?d=[b,e]:(d=e,d=d in g?[d]:d.match(E)||[])),c=d.length;while(c--)delete g[d[c]]}},hasData:function(a){return!n.isEmptyObject(this.cache[a[this.expando]]||{})},discard:function(a){a[this.expando]&&delete this.cache[a[this.expando]]}};var L=new K,M=new K,N=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,O=/([A-Z])/g;function P(a,b,c){var d;if(void 0===c&&1===a.nodeType)if(d="data-"+b.replace(O,"-$1").toLowerCase(),c=a.getAttribute(d),"string"==typeof c){try{c="true"===c?!0:"false"===c?!1:"null"===c?null:+c+""===c?+c:N.test(c)?n.parseJSON(c):c}catch(e){}M.set(a,b,c)}else c=void 0;return c}n.extend({hasData:function(a){return M.hasData(a)||L.hasData(a)},data:function(a,b,c){
return M.access(a,b,c)},removeData:function(a,b){M.remove(a,b)},_data:function(a,b,c){return L.access(a,b,c)},_removeData:function(a,b){L.remove(a,b)}}),n.fn.extend({data:function(a,b){var c,d,e,f=this[0],g=f&&f.attributes;if(void 0===a){if(this.length&&(e=M.get(f),1===f.nodeType&&!L.get(f,"hasDataAttrs"))){c=g.length;while(c--)g[c]&&(d=g[c].name,0===d.indexOf("data-")&&(d=n.camelCase(d.slice(5)),P(f,d,e[d])));L.set(f,"hasDataAttrs",!0)}return e}return"object"==typeof a?this.each(function(){M.set(this,a)}):J(this,function(b){var c,d=n.camelCase(a);if(f&&void 0===b){if(c=M.get(f,a),void 0!==c)return c;if(c=M.get(f,d),void 0!==c)return c;if(c=P(f,d,void 0),void 0!==c)return c}else this.each(function(){var c=M.get(this,d);M.set(this,d,b),-1!==a.indexOf("-")&&void 0!==c&&M.set(this,a,b)})},null,b,arguments.length>1,null,!0)},removeData:function(a){return this.each(function(){M.remove(this,a)})}}),n.extend({queue:function(a,b,c){var d;return a?(b=(b||"fx")+"queue",d=L.get(a,b),c&&(!d||n.isArray(c)?d=L.access(a,b,n.makeArray(c)):d.push(c)),d||[]):void 0},dequeue:function(a,b){b=b||"fx";var c=n.queue(a,b),d=c.length,e=c.shift(),f=n._queueHooks(a,b),g=function(){n.dequeue(a,b)};"inprogress"===e&&(e=c.shift(),d--),e&&("fx"===b&&c.unshift("inprogress"),delete f.stop,e.call(a,g,f)),!d&&f&&f.empty.fire()},_queueHooks:function(a,b){var c=b+"queueHooks";return L.get(a,c)||L.access(a,c,{empty:n.Callbacks("once memory").add(function(){L.remove(a,[b+"queue",c])})})}}),n.fn.extend({queue:function(a,b){var c=2;return"string"!=typeof a&&(b=a,a="fx",c--),arguments.length<c?n.queue(this[0],a):void 0===b?this:this.each(function(){var c=n.queue(this,a,b);n._queueHooks(this,a),"fx"===a&&"inprogress"!==c[0]&&n.dequeue(this,a)})},dequeue:function(a){return this.each(function(){n.dequeue(this,a)})},clearQueue:function(a){return this.queue(a||"fx",[])},promise:function(a,b){var c,d=1,e=n.Deferred(),f=this,g=this.length,h=function(){--d||e.resolveWith(f,[f])};"string"!=typeof a&&(b=a,a=void 0),a=a||"fx";while(g--)c=L.get(f[g],a+"queueHooks"),c&&c.empty&&(d++,c.empty.add(h));return h(),e.promise(b)}});var Q=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,R=["Top","Right","Bottom","Left"],S=function(a,b){return a=b||a,"none"===n.css(a,"display")||!n.contains(a.ownerDocument,a)},T=/^(?:checkbox|radio)$/i;!function(){var a=l.createDocumentFragment(),b=a.appendChild(l.createElement("div")),c=l.createElement("input");c.setAttribute("type","radio"),c.setAttribute("checked","checked"),c.setAttribute("name","t"),b.appendChild(c),k.checkClone=b.cloneNode(!0).cloneNode(!0).lastChild.checked,b.innerHTML="<textarea>x</textarea>",k.noCloneChecked=!!b.cloneNode(!0).lastChild.defaultValue}();var U="undefined";k.focusinBubbles="onfocusin"in a;var V=/^key/,W=/^(?:mouse|pointer|contextmenu)|click/,X=/^(?:focusinfocus|focusoutblur)$/,Y=/^([^.]*)(?:\.(.+)|)$/;function Z(){return!0}function $(){return!1}function _(){try{return l.activeElement}catch(a){}}n.event={global:{},add:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.get(a);if(r){c.handler&&(f=c,c=f.handler,e=f.selector),c.guid||(c.guid=n.guid++),(i=r.events)||(i=r.events={}),(g=r.handle)||(g=r.handle=function(b){return typeof n!==U&&n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}),b=(b||"").match(E)||[""],j=b.length;while(j--)h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o&&(l=n.event.special[o]||{},o=(e?l.delegateType:l.bindType)||o,l=n.event.special[o]||{},k=n.extend({type:o,origType:q,data:d,handler:c,guid:c.guid,selector:e,needsContext:e&&n.expr.match.needsContext.test(e),namespace:p.join(".")},f),(m=i[o])||(m=i[o]=[],m.delegateCount=0,l.setup&&l.setup.call(a,d,p,g)!==!1||a.addEventListener&&a.addEventListener(o,g,!1)),l.add&&(l.add.call(a,k),k.handler.guid||(k.handler.guid=c.guid)),e?m.splice(m.delegateCount++,0,k):m.push(k),n.event.global[o]=!0)}},remove:function(a,b,c,d,e){var f,g,h,i,j,k,l,m,o,p,q,r=L.hasData(a)&&L.get(a);if(r&&(i=r.events)){b=(b||"").match(E)||[""],j=b.length;while(j--)if(h=Y.exec(b[j])||[],o=q=h[1],p=(h[2]||"").split(".").sort(),o){l=n.event.special[o]||{},o=(d?l.delegateType:l.bindType)||o,m=i[o]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),g=f=m.length;while(f--)k=m[f],!e&&q!==k.origType||c&&c.guid!==k.guid||h&&!h.test(k.namespace)||d&&d!==k.selector&&("**"!==d||!k.selector)||(m.splice(f,1),k.selector&&m.delegateCount--,l.remove&&l.remove.call(a,k));g&&!m.length&&(l.teardown&&l.teardown.call(a,p,r.handle)!==!1||n.removeEvent(a,o,r.handle),delete i[o])}else for(o in i)n.event.remove(a,o+b[j],c,d,!0);n.isEmptyObject(i)&&(delete r.handle,L.remove(a,"events"))}},trigger:function(b,c,d,e){var f,g,h,i,k,m,o,p=[d||l],q=j.call(b,"type")?b.type:b,r=j.call(b,"namespace")?b.namespace.split("."):[];if(g=h=d=d||l,3!==d.nodeType&&8!==d.nodeType&&!X.test(q+n.event.triggered)&&(q.indexOf(".")>=0&&(r=q.split("."),q=r.shift(),r.sort()),k=q.indexOf(":")<0&&"on"+q,b=b[n.expando]?b:new n.Event(q,"object"==typeof b&&b),b.isTrigger=e?2:3,b.namespace=r.join("."),b.namespace_re=b.namespace?new RegExp("(^|\\.)"+r.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,b.result=void 0,b.target||(b.target=d),c=null==c?[b]:n.makeArray(c,[b]),o=n.event.special[q]||{},e||!o.trigger||o.trigger.apply(d,c)!==!1)){if(!e&&!o.noBubble&&!n.isWindow(d)){for(i=o.delegateType||q,X.test(i+q)||(g=g.parentNode);g;g=g.parentNode)p.push(g),h=g;h===(d.ownerDocument||l)&&p.push(h.defaultView||h.parentWindow||a)}f=0;while((g=p[f++])&&!b.isPropagationStopped())b.type=f>1?i:o.bindType||q,m=(L.get(g,"events")||{})[b.type]&&L.get(g,"handle"),m&&m.apply(g,c),m=k&&g[k],m&&m.apply&&n.acceptData(g)&&(b.result=m.apply(g,c),b.result===!1&&b.preventDefault());return b.type=q,e||b.isDefaultPrevented()||o._default&&o._default.apply(p.pop(),c)!==!1||!n.acceptData(d)||k&&n.isFunction(d[q])&&!n.isWindow(d)&&(h=d[k],h&&(d[k]=null),n.event.triggered=q,d[q](),n.event.triggered=void 0,h&&(d[k]=h)),b.result}},dispatch:function(a){a=n.event.fix(a);var b,c,e,f,g,h=[],i=d.call(arguments),j=(L.get(this,"events")||{})[a.type]||[],k=n.event.special[a.type]||{};if(i[0]=a,a.delegateTarget=this,!k.preDispatch||k.preDispatch.call(this,a)!==!1){h=n.event.handlers.call(this,a,j),b=0;while((f=h[b++])&&!a.isPropagationStopped()){a.currentTarget=f.elem,c=0;while((g=f.handlers[c++])&&!a.isImmediatePropagationStopped())(!a.namespace_re||a.namespace_re.test(g.namespace))&&(a.handleObj=g,a.data=g.data,e=((n.event.special[g.origType]||{}).handle||g.handler).apply(f.elem,i),void 0!==e&&(a.result=e)===!1&&(a.preventDefault(),a.stopPropagation()))}return k.postDispatch&&k.postDispatch.call(this,a),a.result}},handlers:function(a,b){var c,d,e,f,g=[],h=b.delegateCount,i=a.target;if(h&&i.nodeType&&(!a.button||"click"!==a.type))for(;i!==this;i=i.parentNode||this)if(i.disabled!==!0||"click"!==a.type){for(d=[],c=0;h>c;c++)f=b[c],e=f.selector+" ",void 0===d[e]&&(d[e]=f.needsContext?n(e,this).index(i)>=0:n.find(e,this,null,[i]).length),d[e]&&d.push(f);d.length&&g.push({elem:i,handlers:d})}return h<b.length&&g.push({elem:this,handlers:b.slice(h)}),g},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(a,b){return null==a.which&&(a.which=null!=b.charCode?b.charCode:b.keyCode),a}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(a,b){var c,d,e,f=b.button;return null==a.pageX&&null!=b.clientX&&(c=a.target.ownerDocument||l,d=c.documentElement,e=c.body,a.pageX=b.clientX+(d&&d.scrollLeft||e&&e.scrollLeft||0)-(d&&d.clientLeft||e&&e.clientLeft||0),a.pageY=b.clientY+(d&&d.scrollTop||e&&e.scrollTop||0)-(d&&d.clientTop||e&&e.clientTop||0)),a.which||void 0===f||(a.which=1&f?1:2&f?3:4&f?2:0),a}},fix:function(a){if(a[n.expando])return a;var b,c,d,e=a.type,f=a,g=this.fixHooks[e];g||(this.fixHooks[e]=g=W.test(e)?this.mouseHooks:V.test(e)?this.keyHooks:{}),d=g.props?this.props.concat(g.props):this.props,a=new n.Event(f),b=d.length;while(b--)c=d[b],a[c]=f[c];return a.target||(a.target=l),3===a.target.nodeType&&(a.target=a.target.parentNode),g.filter?g.filter(a,f):a},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==_()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===_()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&n.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(a){return n.nodeName(a.target,"a")}},beforeunload:{postDispatch:function(a){void 0!==a.result&&a.originalEvent&&(a.originalEvent.returnValue=a.result)}}},simulate:function(a,b,c,d){var e=n.extend(new n.Event,c,{type:a,isSimulated:!0,originalEvent:{}});d?n.event.trigger(e,null,b):n.event.dispatch.call(b,e),e.isDefaultPrevented()&&c.preventDefault()}},n.removeEvent=function(a,b,c){a.removeEventListener&&a.removeEventListener(b,c,!1)},n.Event=function(a,b){return this instanceof n.Event?(a&&a.type?(this.originalEvent=a,this.type=a.type,this.isDefaultPrevented=a.defaultPrevented||void 0===a.defaultPrevented&&a.returnValue===!1?Z:$):this.type=a,b&&n.extend(this,b),this.timeStamp=a&&a.timeStamp||n.now(),void(this[n.expando]=!0)):new n.Event(a,b)},n.Event.prototype={isDefaultPrevented:$,isPropagationStopped:$,isImmediatePropagationStopped:$,preventDefault:function(){var a=this.originalEvent;this.isDefaultPrevented=Z,a&&a.preventDefault&&a.preventDefault()},stopPropagation:function(){var a=this.originalEvent;this.isPropagationStopped=Z,a&&a.stopPropagation&&a.stopPropagation()},stopImmediatePropagation:function(){var a=this.originalEvent;this.isImmediatePropagationStopped=Z,a&&a.stopImmediatePropagation&&a.stopImmediatePropagation(),this.stopPropagation()}},n.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(a,b){n.event.special[a]={delegateType:b,bindType:b,handle:function(a){var c,d=this,e=a.relatedTarget,f=a.handleObj;return(!e||e!==d&&!n.contains(d,e))&&(a.type=f.origType,c=f.handler.apply(this,arguments),a.type=b),c}}}),k.focusinBubbles||n.each({focus:"focusin",blur:"focusout"},function(a,b){var c=function(a){n.event.simulate(b,a.target,n.event.fix(a),!0)};n.event.special[b]={setup:function(){var d=this.ownerDocument||this,e=L.access(d,b);e||d.addEventListener(a,c,!0),L.access(d,b,(e||0)+1)},teardown:function(){var d=this.ownerDocument||this,e=L.access(d,b)-1;e?L.access(d,b,e):(d.removeEventListener(a,c,!0),L.remove(d,b))}}}),n.fn.extend({on:function(a,b,c,d,e){var f,g;if("object"==typeof a){"string"!=typeof b&&(c=c||b,b=void 0);for(g in a)this.on(g,b,c,a[g],e);return this}if(null==c&&null==d?(d=b,c=b=void 0):null==d&&("string"==typeof b?(d=c,c=void 0):(d=c,c=b,b=void 0)),d===!1)d=$;else if(!d)return this;return 1===e&&(f=d,d=function(a){return n().off(a),f.apply(this,arguments)},d.guid=f.guid||(f.guid=n.guid++)),this.each(function(){n.event.add(this,a,d,c,b)})},one:function(a,b,c,d){return this.on(a,b,c,d,1)},off:function(a,b,c){var d,e;if(a&&a.preventDefault&&a.handleObj)return d=a.handleObj,n(a.delegateTarget).off(d.namespace?d.origType+"."+d.namespace:d.origType,d.selector,d.handler),this;if("object"==typeof a){for(e in a)this.off(e,b,a[e]);return this}return(b===!1||"function"==typeof b)&&(c=b,b=void 0),c===!1&&(c=$),this.each(function(){n.event.remove(this,a,c,b)})},trigger:function(a,b){return this.each(function(){n.event.trigger(a,b,this)})},triggerHandler:function(a,b){var c=this[0];return c?n.event.trigger(a,b,c,!0):void 0}});var aa=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,ba=/<([\w:]+)/,ca=/<|&#?\w+;/,da=/<(?:script|style|link)/i,ea=/checked\s*(?:[^=]|=\s*.checked.)/i,fa=/^$|\/(?:java|ecma)script/i,ga=/^true\/(.*)/,ha=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,ia={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};ia.optgroup=ia.option,ia.tbody=ia.tfoot=ia.colgroup=ia.caption=ia.thead,ia.th=ia.td;function ja(a,b){return n.nodeName(a,"table")&&n.nodeName(11!==b.nodeType?b:b.firstChild,"tr")?a.getElementsByTagName("tbody")[0]||a.appendChild(a.ownerDocument.createElement("tbody")):a}function ka(a){return a.type=(null!==a.getAttribute("type"))+"/"+a.type,a}function la(a){var b=ga.exec(a.type);return b?a.type=b[1]:a.removeAttribute("type"),a}function ma(a,b){for(var c=0,d=a.length;d>c;c++)L.set(a[c],"globalEval",!b||L.get(b[c],"globalEval"))}function na(a,b){var c,d,e,f,g,h,i,j;if(1===b.nodeType){if(L.hasData(a)&&(f=L.access(a),g=L.set(b,f),j=f.events)){delete g.handle,g.events={};for(e in j)for(c=0,d=j[e].length;d>c;c++)n.event.add(b,e,j[e][c])}M.hasData(a)&&(h=M.access(a),i=n.extend({},h),M.set(b,i))}}function oa(a,b){var c=a.getElementsByTagName?a.getElementsByTagName(b||"*"):a.querySelectorAll?a.querySelectorAll(b||"*"):[];return void 0===b||b&&n.nodeName(a,b)?n.merge([a],c):c}function pa(a,b){var c=b.nodeName.toLowerCase();"input"===c&&T.test(a.type)?b.checked=a.checked:("input"===c||"textarea"===c)&&(b.defaultValue=a.defaultValue)}n.extend({clone:function(a,b,c){var d,e,f,g,h=a.cloneNode(!0),i=n.contains(a.ownerDocument,a);if(!(k.noCloneChecked||1!==a.nodeType&&11!==a.nodeType||n.isXMLDoc(a)))for(g=oa(h),f=oa(a),d=0,e=f.length;e>d;d++)pa(f[d],g[d]);if(b)if(c)for(f=f||oa(a),g=g||oa(h),d=0,e=f.length;e>d;d++)na(f[d],g[d]);else na(a,h);return g=oa(h,"script"),g.length>0&&ma(g,!i&&oa(a,"script")),h},buildFragment:function(a,b,c,d){for(var e,f,g,h,i,j,k=b.createDocumentFragment(),l=[],m=0,o=a.length;o>m;m++)if(e=a[m],e||0===e)if("object"===n.type(e))n.merge(l,e.nodeType?[e]:e);else if(ca.test(e)){f=f||k.appendChild(b.createElement("div")),g=(ba.exec(e)||["",""])[1].toLowerCase(),h=ia[g]||ia._default,f.innerHTML=h[1]+e.replace(aa,"<$1></$2>")+h[2],j=h[0];while(j--)f=f.lastChild;n.merge(l,f.childNodes),f=k.firstChild,f.textContent=""}else l.push(b.createTextNode(e));k.textContent="",m=0;while(e=l[m++])if((!d||-1===n.inArray(e,d))&&(i=n.contains(e.ownerDocument,e),f=oa(k.appendChild(e),"script"),i&&ma(f),c)){j=0;while(e=f[j++])fa.test(e.type||"")&&c.push(e)}return k},cleanData:function(a){for(var b,c,d,e,f=n.event.special,g=0;void 0!==(c=a[g]);g++){if(n.acceptData(c)&&(e=c[L.expando],e&&(b=L.cache[e]))){if(b.events)for(d in b.events)f[d]?n.event.remove(c,d):n.removeEvent(c,d,b.handle);L.cache[e]&&delete L.cache[e]}delete M.cache[c[M.expando]]}}}),n.fn.extend({text:function(a){return J(this,function(a){return void 0===a?n.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=a)})},null,a,arguments.length)},append:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=ja(this,a);b.appendChild(a)}})},prepend:function(){return this.domManip(arguments,function(a){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var b=ja(this,a);b.insertBefore(a,b.firstChild)}})},before:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this)})},after:function(){return this.domManip(arguments,function(a){this.parentNode&&this.parentNode.insertBefore(a,this.nextSibling)})},remove:function(a,b){for(var c,d=a?n.filter(a,this):this,e=0;null!=(c=d[e]);e++)b||1!==c.nodeType||n.cleanData(oa(c)),c.parentNode&&(b&&n.contains(c.ownerDocument,c)&&ma(oa(c,"script")),c.parentNode.removeChild(c));return this},empty:function(){for(var a,b=0;null!=(a=this[b]);b++)1===a.nodeType&&(n.cleanData(oa(a,!1)),a.textContent="");return this},clone:function(a,b){return a=null==a?!1:a,b=null==b?a:b,this.map(function(){return n.clone(this,a,b)})},html:function(a){return J(this,function(a){var b=this[0]||{},c=0,d=this.length;if(void 0===a&&1===b.nodeType)return b.innerHTML;if("string"==typeof a&&!da.test(a)&&!ia[(ba.exec(a)||["",""])[1].toLowerCase()]){a=a.replace(aa,"<$1></$2>");try{for(;d>c;c++)b=this[c]||{},1===b.nodeType&&(n.cleanData(oa(b,!1)),b.innerHTML=a);b=0}catch(e){}}b&&this.empty().append(a)},null,a,arguments.length)},replaceWith:function(){var a=arguments[0];return this.domManip(arguments,function(b){a=this.parentNode,n.cleanData(oa(this)),a&&a.replaceChild(b,this)}),a&&(a.length||a.nodeType)?this:this.remove()},detach:function(a){return this.remove(a,!0)},domManip:function(a,b){a=e.apply([],a);var c,d,f,g,h,i,j=0,l=this.length,m=this,o=l-1,p=a[0],q=n.isFunction(p);if(q||l>1&&"string"==typeof p&&!k.checkClone&&ea.test(p))return this.each(function(c){var d=m.eq(c);q&&(a[0]=p.call(this,c,d.html())),d.domManip(a,b)});if(l&&(c=n.buildFragment(a,this[0].ownerDocument,!1,this),d=c.firstChild,1===c.childNodes.length&&(c=d),d)){for(f=n.map(oa(c,"script"),ka),g=f.length;l>j;j++)h=c,j!==o&&(h=n.clone(h,!0,!0),g&&n.merge(f,oa(h,"script"))),b.call(this[j],h,j);if(g)for(i=f[f.length-1].ownerDocument,n.map(f,la),j=0;g>j;j++)h=f[j],fa.test(h.type||"")&&!L.access(h,"globalEval")&&n.contains(i,h)&&(h.src?n._evalUrl&&n._evalUrl(h.src):n.globalEval(h.textContent.replace(ha,"")))}return this}}),n.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(a,b){n.fn[a]=function(a){for(var c,d=[],e=n(a),g=e.length-1,h=0;g>=h;h++)c=h===g?this:this.clone(!0),n(e[h])[b](c),f.apply(d,c.get());return this.pushStack(d)}});var qa,ra={};function sa(b,c){var d,e=n(c.createElement(b)).appendTo(c.body),f=a.getDefaultComputedStyle&&(d=a.getDefaultComputedStyle(e[0]))?d.display:n.css(e[0],"display");return e.detach(),f}function ta(a){var b=l,c=ra[a];return c||(c=sa(a,b),"none"!==c&&c||(qa=(qa||n("<iframe frameborder='0' width='0' height='0'/>")).appendTo(b.documentElement),b=qa[0].contentDocument,b.write(),b.close(),c=sa(a,b),qa.detach()),ra[a]=c),c}var ua=/^margin/,va=new RegExp("^("+Q+")(?!px)[a-z%]+$","i"),wa=function(b){return b.ownerDocument.defaultView.opener?b.ownerDocument.defaultView.getComputedStyle(b,null):a.getComputedStyle(b,null)};function xa(a,b,c){var d,e,f,g,h=a.style;return c=c||wa(a),c&&(g=c.getPropertyValue(b)||c[b]),c&&(""!==g||n.contains(a.ownerDocument,a)||(g=n.style(a,b)),va.test(g)&&ua.test(b)&&(d=h.width,e=h.minWidth,f=h.maxWidth,h.minWidth=h.maxWidth=h.width=g,g=c.width,h.width=d,h.minWidth=e,h.maxWidth=f)),void 0!==g?g+"":g}function ya(a,b){return{get:function(){return a()?void delete this.get:(this.get=b).apply(this,arguments)}}}!function(){var b,c,d=l.documentElement,e=l.createElement("div"),f=l.createElement("div");if(f.style){f.style.backgroundClip="content-box",f.cloneNode(!0).style.backgroundClip="",k.clearCloneStyle="content-box"===f.style.backgroundClip,e.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",e.appendChild(f);function g(){f.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",f.innerHTML="",d.appendChild(e);var g=a.getComputedStyle(f,null);b="1%"!==g.top,c="4px"===g.width,d.removeChild(e)}a.getComputedStyle&&n.extend(k,{pixelPosition:function(){return g(),b},boxSizingReliable:function(){return null==c&&g(),c},reliableMarginRight:function(){var b,c=f.appendChild(l.createElement("div"));return c.style.cssText=f.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",c.style.marginRight=c.style.width="0",f.style.width="1px",d.appendChild(e),b=!parseFloat(a.getComputedStyle(c,null).marginRight),d.removeChild(e),f.removeChild(c),b}})}}(),n.swap=function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e};var za=/^(none|table(?!-c[ea]).+)/,Aa=new RegExp("^("+Q+")(.*)$","i"),Ba=new RegExp("^([+-])=("+Q+")","i"),Ca={position:"absolute",visibility:"hidden",display:"block"},Da={letterSpacing:"0",fontWeight:"400"},Ea=["Webkit","O","Moz","ms"];function Fa(a,b){if(b in a)return b;var c=b[0].toUpperCase()+b.slice(1),d=b,e=Ea.length;while(e--)if(b=Ea[e]+c,b in a)return b;return d}function Ga(a,b,c){var d=Aa.exec(b);return d?Math.max(0,d[1]-(c||0))+(d[2]||"px"):b}function Ha(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0;4>f;f+=2)"margin"===c&&(g+=n.css(a,c+R[f],!0,e)),d?("content"===c&&(g-=n.css(a,"padding"+R[f],!0,e)),"margin"!==c&&(g-=n.css(a,"border"+R[f]+"Width",!0,e))):(g+=n.css(a,"padding"+R[f],!0,e),"padding"!==c&&(g+=n.css(a,"border"+R[f]+"Width",!0,e)));return g}function Ia(a,b,c){var d=!0,e="width"===b?a.offsetWidth:a.offsetHeight,f=wa(a),g="border-box"===n.css(a,"boxSizing",!1,f);if(0>=e||null==e){if(e=xa(a,b,f),(0>e||null==e)&&(e=a.style[b]),va.test(e))return e;d=g&&(k.boxSizingReliable()||e===a.style[b]),e=parseFloat(e)||0}return e+Ha(a,b,c||(g?"border":"content"),d,f)+"px"}function Ja(a,b){for(var c,d,e,f=[],g=0,h=a.length;h>g;g++)d=a[g],d.style&&(f[g]=L.get(d,"olddisplay"),c=d.style.display,b?(f[g]||"none"!==c||(d.style.display=""),""===d.style.display&&S(d)&&(f[g]=L.access(d,"olddisplay",ta(d.nodeName)))):(e=S(d),"none"===c&&e||L.set(d,"olddisplay",e?c:n.css(d,"display"))));for(g=0;h>g;g++)d=a[g],d.style&&(b&&"none"!==d.style.display&&""!==d.style.display||(d.style.display=b?f[g]||"":"none"));return a}n.extend({cssHooks:{opacity:{get:function(a,b){if(b){var c=xa(a,"opacity");return""===c?"1":c}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(a,b,c,d){if(a&&3!==a.nodeType&&8!==a.nodeType&&a.style){var e,f,g,h=n.camelCase(b),i=a.style;return b=n.cssProps[h]||(n.cssProps[h]=Fa(i,h)),g=n.cssHooks[b]||n.cssHooks[h],void 0===c?g&&"get"in g&&void 0!==(e=g.get(a,!1,d))?e:i[b]:(f=typeof c,"string"===f&&(e=Ba.exec(c))&&(c=(e[1]+1)*e[2]+parseFloat(n.css(a,b)),f="number"),null!=c&&c===c&&("number"!==f||n.cssNumber[h]||(c+="px"),k.clearCloneStyle||""!==c||0!==b.indexOf("background")||(i[b]="inherit"),g&&"set"in g&&void 0===(c=g.set(a,c,d))||(i[b]=c)),void 0)}},css:function(a,b,c,d){var e,f,g,h=n.camelCase(b);return b=n.cssProps[h]||(n.cssProps[h]=Fa(a.style,h)),g=n.cssHooks[b]||n.cssHooks[h],g&&"get"in g&&(e=g.get(a,!0,c)),void 0===e&&(e=xa(a,b,d)),"normal"===e&&b in Da&&(e=Da[b]),""===c||c?(f=parseFloat(e),c===!0||n.isNumeric(f)?f||0:e):e}}),n.each(["height","width"],function(a,b){n.cssHooks[b]={get:function(a,c,d){return c?za.test(n.css(a,"display"))&&0===a.offsetWidth?n.swap(a,Ca,function(){return Ia(a,b,d)}):Ia(a,b,d):void 0},set:function(a,c,d){var e=d&&wa(a);return Ga(a,c,d?Ha(a,b,d,"border-box"===n.css(a,"boxSizing",!1,e),e):0)}}}),n.cssHooks.marginRight=ya(k.reliableMarginRight,function(a,b){return b?n.swap(a,{display:"inline-block"},xa,[a,"marginRight"]):void 0}),n.each({margin:"",padding:"",border:"Width"},function(a,b){n.cssHooks[a+b]={expand:function(c){for(var d=0,e={},f="string"==typeof c?c.split(" "):[c];4>d;d++)e[a+R[d]+b]=f[d]||f[d-2]||f[0];return e}},ua.test(a)||(n.cssHooks[a+b].set=Ga)}),n.fn.extend({css:function(a,b){return J(this,function(a,b,c){var d,e,f={},g=0;if(n.isArray(b)){for(d=wa(a),e=b.length;e>g;g++)f[b[g]]=n.css(a,b[g],!1,d);return f}return void 0!==c?n.style(a,b,c):n.css(a,b)},a,b,arguments.length>1)},show:function(){return Ja(this,!0)},hide:function(){return Ja(this)},toggle:function(a){return"boolean"==typeof a?a?this.show():this.hide():this.each(function(){S(this)?n(this).show():n(this).hide()})}});function Ka(a,b,c,d,e){return new Ka.prototype.init(a,b,c,d,e)}n.Tween=Ka,Ka.prototype={constructor:Ka,init:function(a,b,c,d,e,f){this.elem=a,this.prop=c,this.easing=e||"swing",this.options=b,this.start=this.now=this.cur(),this.end=d,this.unit=f||(n.cssNumber[c]?"":"px")},cur:function(){var a=Ka.propHooks[this.prop];return a&&a.get?a.get(this):Ka.propHooks._default.get(this)},run:function(a){var b,c=Ka.propHooks[this.prop];return this.options.duration?this.pos=b=n.easing[this.easing](a,this.options.duration*a,0,1,this.options.duration):this.pos=b=a,this.now=(this.end-this.start)*b+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),c&&c.set?c.set(this):Ka.propHooks._default.set(this),this}},Ka.prototype.init.prototype=Ka.prototype,Ka.propHooks={_default:{get:function(a){var b;return null==a.elem[a.prop]||a.elem.style&&null!=a.elem.style[a.prop]?(b=n.css(a.elem,a.prop,""),b&&"auto"!==b?b:0):a.elem[a.prop]},set:function(a){n.fx.step[a.prop]?n.fx.step[a.prop](a):a.elem.style&&(null!=a.elem.style[n.cssProps[a.prop]]||n.cssHooks[a.prop])?n.style(a.elem,a.prop,a.now+a.unit):a.elem[a.prop]=a.now}}},Ka.propHooks.scrollTop=Ka.propHooks.scrollLeft={set:function(a){a.elem.nodeType&&a.elem.parentNode&&(a.elem[a.prop]=a.now)}},n.easing={linear:function(a){return a},swing:function(a){return.5-Math.cos(a*Math.PI)/2}},n.fx=Ka.prototype.init,n.fx.step={};var La,Ma,Na=/^(?:toggle|show|hide)$/,Oa=new RegExp("^(?:([+-])=|)("+Q+")([a-z%]*)$","i"),Pa=/queueHooks$/,Qa=[Va],Ra={"*":[function(a,b){var c=this.createTween(a,b),d=c.cur(),e=Oa.exec(b),f=e&&e[3]||(n.cssNumber[a]?"":"px"),g=(n.cssNumber[a]||"px"!==f&&+d)&&Oa.exec(n.css(c.elem,a)),h=1,i=20;if(g&&g[3]!==f){f=f||g[3],e=e||[],g=+d||1;do h=h||".5",g/=h,n.style(c.elem,a,g+f);while(h!==(h=c.cur()/d)&&1!==h&&--i)}return e&&(g=c.start=+g||+d||0,c.unit=f,c.end=e[1]?g+(e[1]+1)*e[2]:+e[2]),c}]};function Sa(){return setTimeout(function(){La=void 0}),La=n.now()}function Ta(a,b){var c,d=0,e={height:a};for(b=b?1:0;4>d;d+=2-b)c=R[d],e["margin"+c]=e["padding"+c]=a;return b&&(e.opacity=e.width=a),e}function Ua(a,b,c){for(var d,e=(Ra[b]||[]).concat(Ra["*"]),f=0,g=e.length;g>f;f++)if(d=e[f].call(c,b,a))return d}function Va(a,b,c){var d,e,f,g,h,i,j,k,l=this,m={},o=a.style,p=a.nodeType&&S(a),q=L.get(a,"fxshow");c.queue||(h=n._queueHooks(a,"fx"),null==h.unqueued&&(h.unqueued=0,i=h.empty.fire,h.empty.fire=function(){h.unqueued||i()}),h.unqueued++,l.always(function(){l.always(function(){h.unqueued--,n.queue(a,"fx").length||h.empty.fire()})})),1===a.nodeType&&("height"in b||"width"in b)&&(c.overflow=[o.overflow,o.overflowX,o.overflowY],j=n.css(a,"display"),k="none"===j?L.get(a,"olddisplay")||ta(a.nodeName):j,"inline"===k&&"none"===n.css(a,"float")&&(o.display="inline-block")),c.overflow&&(o.overflow="hidden",l.always(function(){o.overflow=c.overflow[0],o.overflowX=c.overflow[1],o.overflowY=c.overflow[2]}));for(d in b)if(e=b[d],Na.exec(e)){if(delete b[d],f=f||"toggle"===e,e===(p?"hide":"show")){if("show"!==e||!q||void 0===q[d])continue;p=!0}m[d]=q&&q[d]||n.style(a,d)}else j=void 0;if(n.isEmptyObject(m))"inline"===("none"===j?ta(a.nodeName):j)&&(o.display=j);else{q?"hidden"in q&&(p=q.hidden):q=L.access(a,"fxshow",{}),f&&(q.hidden=!p),p?n(a).show():l.done(function(){n(a).hide()}),l.done(function(){var b;L.remove(a,"fxshow");for(b in m)n.style(a,b,m[b])});for(d in m)g=Ua(p?q[d]:0,d,l),d in q||(q[d]=g.start,p&&(g.end=g.start,g.start="width"===d||"height"===d?1:0))}}function Wa(a,b){var c,d,e,f,g;for(c in a)if(d=n.camelCase(c),e=b[d],f=a[c],n.isArray(f)&&(e=f[1],f=a[c]=f[0]),c!==d&&(a[d]=f,delete a[c]),g=n.cssHooks[d],g&&"expand"in g){f=g.expand(f),delete a[d];for(c in f)c in a||(a[c]=f[c],b[c]=e)}else b[d]=e}function Xa(a,b,c){var d,e,f=0,g=Qa.length,h=n.Deferred().always(function(){delete i.elem}),i=function(){if(e)return!1;for(var b=La||Sa(),c=Math.max(0,j.startTime+j.duration-b),d=c/j.duration||0,f=1-d,g=0,i=j.tweens.length;i>g;g++)j.tweens[g].run(f);return h.notifyWith(a,[j,f,c]),1>f&&i?c:(h.resolveWith(a,[j]),!1)},j=h.promise({elem:a,props:n.extend({},b),opts:n.extend(!0,{specialEasing:{}},c),originalProperties:b,originalOptions:c,startTime:La||Sa(),duration:c.duration,tweens:[],createTween:function(b,c){var d=n.Tween(a,j.opts,b,c,j.opts.specialEasing[b]||j.opts.easing);return j.tweens.push(d),d},stop:function(b){var c=0,d=b?j.tweens.length:0;if(e)return this;for(e=!0;d>c;c++)j.tweens[c].run(1);return b?h.resolveWith(a,[j,b]):h.rejectWith(a,[j,b]),this}}),k=j.props;for(Wa(k,j.opts.specialEasing);g>f;f++)if(d=Qa[f].call(j,a,k,j.opts))return d;return n.map(k,Ua,j),n.isFunction(j.opts.start)&&j.opts.start.call(a,j),n.fx.timer(n.extend(i,{elem:a,anim:j,queue:j.opts.queue})),j.progress(j.opts.progress).done(j.opts.done,j.opts.complete).fail(j.opts.fail).always(j.opts.always)}n.Animation=n.extend(Xa,{tweener:function(a,b){n.isFunction(a)?(b=a,a=["*"]):a=a.split(" ");for(var c,d=0,e=a.length;e>d;d++)c=a[d],Ra[c]=Ra[c]||[],Ra[c].unshift(b)},prefilter:function(a,b){b?Qa.unshift(a):Qa.push(a)}}),n.speed=function(a,b,c){var d=a&&"object"==typeof a?n.extend({},a):{complete:c||!c&&b||n.isFunction(a)&&a,duration:a,easing:c&&b||b&&!n.isFunction(b)&&b};return d.duration=n.fx.off?0:"number"==typeof d.duration?d.duration:d.duration in n.fx.speeds?n.fx.speeds[d.duration]:n.fx.speeds._default,(null==d.queue||d.queue===!0)&&(d.queue="fx"),d.old=d.complete,d.complete=function(){n.isFunction(d.old)&&d.old.call(this),d.queue&&n.dequeue(this,d.queue)},d},n.fn.extend({fadeTo:function(a,b,c,d){return this.filter(S).css("opacity",0).show().end().animate({opacity:b},a,c,d)},animate:function(a,b,c,d){var e=n.isEmptyObject(a),f=n.speed(b,c,d),g=function(){var b=Xa(this,n.extend({},a),f);(e||L.get(this,"finish"))&&b.stop(!0)};return g.finish=g,e||f.queue===!1?this.each(g):this.queue(f.queue,g)},stop:function(a,b,c){var d=function(a){var b=a.stop;delete a.stop,b(c)};return"string"!=typeof a&&(c=b,b=a,a=void 0),b&&a!==!1&&this.queue(a||"fx",[]),this.each(function(){var b=!0,e=null!=a&&a+"queueHooks",f=n.timers,g=L.get(this);if(e)g[e]&&g[e].stop&&d(g[e]);else for(e in g)g[e]&&g[e].stop&&Pa.test(e)&&d(g[e]);for(e=f.length;e--;)f[e].elem!==this||null!=a&&f[e].queue!==a||(f[e].anim.stop(c),b=!1,f.splice(e,1));(b||!c)&&n.dequeue(this,a)})},finish:function(a){return a!==!1&&(a=a||"fx"),this.each(function(){var b,c=L.get(this),d=c[a+"queue"],e=c[a+"queueHooks"],f=n.timers,g=d?d.length:0;for(c.finish=!0,n.queue(this,a,[]),e&&e.stop&&e.stop.call(this,!0),b=f.length;b--;)f[b].elem===this&&f[b].queue===a&&(f[b].anim.stop(!0),f.splice(b,1));for(b=0;g>b;b++)d[b]&&d[b].finish&&d[b].finish.call(this);delete c.finish})}}),n.each(["toggle","show","hide"],function(a,b){var c=n.fn[b];n.fn[b]=function(a,d,e){return null==a||"boolean"==typeof a?c.apply(this,arguments):this.animate(Ta(b,!0),a,d,e)}}),n.each({slideDown:Ta("show"),slideUp:Ta("hide"),slideToggle:Ta("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(a,b){n.fn[a]=function(a,c,d){return this.animate(b,a,c,d)}}),n.timers=[],n.fx.tick=function(){var a,b=0,c=n.timers;for(La=n.now();b<c.length;b++)a=c[b],a()||c[b]!==a||c.splice(b--,1);c.length||n.fx.stop(),La=void 0},n.fx.timer=function(a){n.timers.push(a),a()?n.fx.start():n.timers.pop()},n.fx.interval=13,n.fx.start=function(){Ma||(Ma=setInterval(n.fx.tick,n.fx.interval))},n.fx.stop=function(){clearInterval(Ma),Ma=null},n.fx.speeds={slow:600,fast:200,_default:400},n.fn.delay=function(a,b){return a=n.fx?n.fx.speeds[a]||a:a,b=b||"fx",this.queue(b,function(b,c){var d=setTimeout(b,a);c.stop=function(){clearTimeout(d)}})},function(){var a=l.createElement("input"),b=l.createElement("select"),c=b.appendChild(l.createElement("option"));a.type="checkbox",k.checkOn=""!==a.value,k.optSelected=c.selected,b.disabled=!0,k.optDisabled=!c.disabled,a=l.createElement("input"),a.value="t",a.type="radio",k.radioValue="t"===a.value}();var Ya,Za,$a=n.expr.attrHandle;n.fn.extend({attr:function(a,b){return J(this,n.attr,a,b,arguments.length>1)},removeAttr:function(a){return this.each(function(){n.removeAttr(this,a)})}}),n.extend({attr:function(a,b,c){var d,e,f=a.nodeType;if(a&&3!==f&&8!==f&&2!==f)return typeof a.getAttribute===U?n.prop(a,b,c):(1===f&&n.isXMLDoc(a)||(b=b.toLowerCase(),d=n.attrHooks[b]||(n.expr.match.bool.test(b)?Za:Ya)),
void 0===c?d&&"get"in d&&null!==(e=d.get(a,b))?e:(e=n.find.attr(a,b),null==e?void 0:e):null!==c?d&&"set"in d&&void 0!==(e=d.set(a,c,b))?e:(a.setAttribute(b,c+""),c):void n.removeAttr(a,b))},removeAttr:function(a,b){var c,d,e=0,f=b&&b.match(E);if(f&&1===a.nodeType)while(c=f[e++])d=n.propFix[c]||c,n.expr.match.bool.test(c)&&(a[d]=!1),a.removeAttribute(c)},attrHooks:{type:{set:function(a,b){if(!k.radioValue&&"radio"===b&&n.nodeName(a,"input")){var c=a.value;return a.setAttribute("type",b),c&&(a.value=c),b}}}}}),Za={set:function(a,b,c){return b===!1?n.removeAttr(a,c):a.setAttribute(c,c),c}},n.each(n.expr.match.bool.source.match(/\w+/g),function(a,b){var c=$a[b]||n.find.attr;$a[b]=function(a,b,d){var e,f;return d||(f=$a[b],$a[b]=e,e=null!=c(a,b,d)?b.toLowerCase():null,$a[b]=f),e}});var _a=/^(?:input|select|textarea|button)$/i;n.fn.extend({prop:function(a,b){return J(this,n.prop,a,b,arguments.length>1)},removeProp:function(a){return this.each(function(){delete this[n.propFix[a]||a]})}}),n.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(a,b,c){var d,e,f,g=a.nodeType;if(a&&3!==g&&8!==g&&2!==g)return f=1!==g||!n.isXMLDoc(a),f&&(b=n.propFix[b]||b,e=n.propHooks[b]),void 0!==c?e&&"set"in e&&void 0!==(d=e.set(a,c,b))?d:a[b]=c:e&&"get"in e&&null!==(d=e.get(a,b))?d:a[b]},propHooks:{tabIndex:{get:function(a){return a.hasAttribute("tabindex")||_a.test(a.nodeName)||a.href?a.tabIndex:-1}}}}),k.optSelected||(n.propHooks.selected={get:function(a){var b=a.parentNode;return b&&b.parentNode&&b.parentNode.selectedIndex,null}}),n.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){n.propFix[this.toLowerCase()]=this});var ab=/[\t\r\n\f]/g;n.fn.extend({addClass:function(a){var b,c,d,e,f,g,h="string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).addClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ab," "):" ")){f=0;while(e=b[f++])d.indexOf(" "+e+" ")<0&&(d+=e+" ");g=n.trim(d),c.className!==g&&(c.className=g)}return this},removeClass:function(a){var b,c,d,e,f,g,h=0===arguments.length||"string"==typeof a&&a,i=0,j=this.length;if(n.isFunction(a))return this.each(function(b){n(this).removeClass(a.call(this,b,this.className))});if(h)for(b=(a||"").match(E)||[];j>i;i++)if(c=this[i],d=1===c.nodeType&&(c.className?(" "+c.className+" ").replace(ab," "):"")){f=0;while(e=b[f++])while(d.indexOf(" "+e+" ")>=0)d=d.replace(" "+e+" "," ");g=a?n.trim(d):"",c.className!==g&&(c.className=g)}return this},toggleClass:function(a,b){var c=typeof a;return"boolean"==typeof b&&"string"===c?b?this.addClass(a):this.removeClass(a):this.each(n.isFunction(a)?function(c){n(this).toggleClass(a.call(this,c,this.className,b),b)}:function(){if("string"===c){var b,d=0,e=n(this),f=a.match(E)||[];while(b=f[d++])e.hasClass(b)?e.removeClass(b):e.addClass(b)}else(c===U||"boolean"===c)&&(this.className&&L.set(this,"__className__",this.className),this.className=this.className||a===!1?"":L.get(this,"__className__")||"")})},hasClass:function(a){for(var b=" "+a+" ",c=0,d=this.length;d>c;c++)if(1===this[c].nodeType&&(" "+this[c].className+" ").replace(ab," ").indexOf(b)>=0)return!0;return!1}});var bb=/\r/g;n.fn.extend({val:function(a){var b,c,d,e=this[0];{if(arguments.length)return d=n.isFunction(a),this.each(function(c){var e;1===this.nodeType&&(e=d?a.call(this,c,n(this).val()):a,null==e?e="":"number"==typeof e?e+="":n.isArray(e)&&(e=n.map(e,function(a){return null==a?"":a+""})),b=n.valHooks[this.type]||n.valHooks[this.nodeName.toLowerCase()],b&&"set"in b&&void 0!==b.set(this,e,"value")||(this.value=e))});if(e)return b=n.valHooks[e.type]||n.valHooks[e.nodeName.toLowerCase()],b&&"get"in b&&void 0!==(c=b.get(e,"value"))?c:(c=e.value,"string"==typeof c?c.replace(bb,""):null==c?"":c)}}}),n.extend({valHooks:{option:{get:function(a){var b=n.find.attr(a,"value");return null!=b?b:n.trim(n.text(a))}},select:{get:function(a){for(var b,c,d=a.options,e=a.selectedIndex,f="select-one"===a.type||0>e,g=f?null:[],h=f?e+1:d.length,i=0>e?h:f?e:0;h>i;i++)if(c=d[i],!(!c.selected&&i!==e||(k.optDisabled?c.disabled:null!==c.getAttribute("disabled"))||c.parentNode.disabled&&n.nodeName(c.parentNode,"optgroup"))){if(b=n(c).val(),f)return b;g.push(b)}return g},set:function(a,b){var c,d,e=a.options,f=n.makeArray(b),g=e.length;while(g--)d=e[g],(d.selected=n.inArray(d.value,f)>=0)&&(c=!0);return c||(a.selectedIndex=-1),f}}}}),n.each(["radio","checkbox"],function(){n.valHooks[this]={set:function(a,b){return n.isArray(b)?a.checked=n.inArray(n(a).val(),b)>=0:void 0}},k.checkOn||(n.valHooks[this].get=function(a){return null===a.getAttribute("value")?"on":a.value})}),n.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(a,b){n.fn[b]=function(a,c){return arguments.length>0?this.on(b,null,a,c):this.trigger(b)}}),n.fn.extend({hover:function(a,b){return this.mouseenter(a).mouseleave(b||a)},bind:function(a,b,c){return this.on(a,null,b,c)},unbind:function(a,b){return this.off(a,null,b)},delegate:function(a,b,c,d){return this.on(b,a,c,d)},undelegate:function(a,b,c){return 1===arguments.length?this.off(a,"**"):this.off(b,a||"**",c)}});var cb=n.now(),db=/\?/;n.parseJSON=function(a){return JSON.parse(a+"")},n.parseXML=function(a){var b,c;if(!a||"string"!=typeof a)return null;try{c=new DOMParser,b=c.parseFromString(a,"text/xml")}catch(d){b=void 0}return(!b||b.getElementsByTagName("parsererror").length)&&n.error("Invalid XML: "+a),b};var eb=/#.*$/,fb=/([?&])_=[^&]*/,gb=/^(.*?):[ \t]*([^\r\n]*)$/gm,hb=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,ib=/^(?:GET|HEAD)$/,jb=/^\/\//,kb=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,lb={},mb={},nb="*/".concat("*"),ob=a.location.href,pb=kb.exec(ob.toLowerCase())||[];function qb(a){return function(b,c){"string"!=typeof b&&(c=b,b="*");var d,e=0,f=b.toLowerCase().match(E)||[];if(n.isFunction(c))while(d=f[e++])"+"===d[0]?(d=d.slice(1)||"*",(a[d]=a[d]||[]).unshift(c)):(a[d]=a[d]||[]).push(c)}}function rb(a,b,c,d){var e={},f=a===mb;function g(h){var i;return e[h]=!0,n.each(a[h]||[],function(a,h){var j=h(b,c,d);return"string"!=typeof j||f||e[j]?f?!(i=j):void 0:(b.dataTypes.unshift(j),g(j),!1)}),i}return g(b.dataTypes[0])||!e["*"]&&g("*")}function sb(a,b){var c,d,e=n.ajaxSettings.flatOptions||{};for(c in b)void 0!==b[c]&&((e[c]?a:d||(d={}))[c]=b[c]);return d&&n.extend(!0,a,d),a}function tb(a,b,c){var d,e,f,g,h=a.contents,i=a.dataTypes;while("*"===i[0])i.shift(),void 0===d&&(d=a.mimeType||b.getResponseHeader("Content-Type"));if(d)for(e in h)if(h[e]&&h[e].test(d)){i.unshift(e);break}if(i[0]in c)f=i[0];else{for(e in c){if(!i[0]||a.converters[e+" "+i[0]]){f=e;break}g||(g=e)}f=f||g}return f?(f!==i[0]&&i.unshift(f),c[f]):void 0}function ub(a,b,c,d){var e,f,g,h,i,j={},k=a.dataTypes.slice();if(k[1])for(g in a.converters)j[g.toLowerCase()]=a.converters[g];f=k.shift();while(f)if(a.responseFields[f]&&(c[a.responseFields[f]]=b),!i&&d&&a.dataFilter&&(b=a.dataFilter(b,a.dataType)),i=f,f=k.shift())if("*"===f)f=i;else if("*"!==i&&i!==f){if(g=j[i+" "+f]||j["* "+f],!g)for(e in j)if(h=e.split(" "),h[1]===f&&(g=j[i+" "+h[0]]||j["* "+h[0]])){g===!0?g=j[e]:j[e]!==!0&&(f=h[0],k.unshift(h[1]));break}if(g!==!0)if(g&&a["throws"])b=g(b);else try{b=g(b)}catch(l){return{state:"parsererror",error:g?l:"No conversion from "+i+" to "+f}}}return{state:"success",data:b}}n.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:ob,type:"GET",isLocal:hb.test(pb[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":nb,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":n.parseJSON,"text xml":n.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(a,b){return b?sb(sb(a,n.ajaxSettings),b):sb(n.ajaxSettings,a)},ajaxPrefilter:qb(lb),ajaxTransport:qb(mb),ajax:function(a,b){"object"==typeof a&&(b=a,a=void 0),b=b||{};var c,d,e,f,g,h,i,j,k=n.ajaxSetup({},b),l=k.context||k,m=k.context&&(l.nodeType||l.jquery)?n(l):n.event,o=n.Deferred(),p=n.Callbacks("once memory"),q=k.statusCode||{},r={},s={},t=0,u="canceled",v={readyState:0,getResponseHeader:function(a){var b;if(2===t){if(!f){f={};while(b=gb.exec(e))f[b[1].toLowerCase()]=b[2]}b=f[a.toLowerCase()]}return null==b?null:b},getAllResponseHeaders:function(){return 2===t?e:null},setRequestHeader:function(a,b){var c=a.toLowerCase();return t||(a=s[c]=s[c]||a,r[a]=b),this},overrideMimeType:function(a){return t||(k.mimeType=a),this},statusCode:function(a){var b;if(a)if(2>t)for(b in a)q[b]=[q[b],a[b]];else v.always(a[v.status]);return this},abort:function(a){var b=a||u;return c&&c.abort(b),x(0,b),this}};if(o.promise(v).complete=p.add,v.success=v.done,v.error=v.fail,k.url=((a||k.url||ob)+"").replace(eb,"").replace(jb,pb[1]+"//"),k.type=b.method||b.type||k.method||k.type,k.dataTypes=n.trim(k.dataType||"*").toLowerCase().match(E)||[""],null==k.crossDomain&&(h=kb.exec(k.url.toLowerCase()),k.crossDomain=!(!h||h[1]===pb[1]&&h[2]===pb[2]&&(h[3]||("http:"===h[1]?"80":"443"))===(pb[3]||("http:"===pb[1]?"80":"443")))),k.data&&k.processData&&"string"!=typeof k.data&&(k.data=n.param(k.data,k.traditional)),rb(lb,k,b,v),2===t)return v;i=n.event&&k.global,i&&0===n.active++&&n.event.trigger("ajaxStart"),k.type=k.type.toUpperCase(),k.hasContent=!ib.test(k.type),d=k.url,k.hasContent||(k.data&&(d=k.url+=(db.test(d)?"&":"?")+k.data,delete k.data),k.cache===!1&&(k.url=fb.test(d)?d.replace(fb,"$1_="+cb++):d+(db.test(d)?"&":"?")+"_="+cb++)),k.ifModified&&(n.lastModified[d]&&v.setRequestHeader("If-Modified-Since",n.lastModified[d]),n.etag[d]&&v.setRequestHeader("If-None-Match",n.etag[d])),(k.data&&k.hasContent&&k.contentType!==!1||b.contentType)&&v.setRequestHeader("Content-Type",k.contentType),v.setRequestHeader("Accept",k.dataTypes[0]&&k.accepts[k.dataTypes[0]]?k.accepts[k.dataTypes[0]]+("*"!==k.dataTypes[0]?", "+nb+"; q=0.01":""):k.accepts["*"]);for(j in k.headers)v.setRequestHeader(j,k.headers[j]);if(k.beforeSend&&(k.beforeSend.call(l,v,k)===!1||2===t))return v.abort();u="abort";for(j in{success:1,error:1,complete:1})v[j](k[j]);if(c=rb(mb,k,b,v)){v.readyState=1,i&&m.trigger("ajaxSend",[v,k]),k.async&&k.timeout>0&&(g=setTimeout(function(){v.abort("timeout")},k.timeout));try{t=1,c.send(r,x)}catch(w){if(!(2>t))throw w;x(-1,w)}}else x(-1,"No Transport");function x(a,b,f,h){var j,r,s,u,w,x=b;2!==t&&(t=2,g&&clearTimeout(g),c=void 0,e=h||"",v.readyState=a>0?4:0,j=a>=200&&300>a||304===a,f&&(u=tb(k,v,f)),u=ub(k,u,v,j),j?(k.ifModified&&(w=v.getResponseHeader("Last-Modified"),w&&(n.lastModified[d]=w),w=v.getResponseHeader("etag"),w&&(n.etag[d]=w)),204===a||"HEAD"===k.type?x="nocontent":304===a?x="notmodified":(x=u.state,r=u.data,s=u.error,j=!s)):(s=x,(a||!x)&&(x="error",0>a&&(a=0))),v.status=a,v.statusText=(b||x)+"",j?o.resolveWith(l,[r,x,v]):o.rejectWith(l,[v,x,s]),v.statusCode(q),q=void 0,i&&m.trigger(j?"ajaxSuccess":"ajaxError",[v,k,j?r:s]),p.fireWith(l,[v,x]),i&&(m.trigger("ajaxComplete",[v,k]),--n.active||n.event.trigger("ajaxStop")))}return v},getJSON:function(a,b,c){return n.get(a,b,c,"json")},getScript:function(a,b){return n.get(a,void 0,b,"script")}}),n.each(["get","post"],function(a,b){n[b]=function(a,c,d,e){return n.isFunction(c)&&(e=e||d,d=c,c=void 0),n.ajax({url:a,type:b,dataType:e,data:c,success:d})}}),n._evalUrl=function(a){return n.ajax({url:a,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},n.fn.extend({wrapAll:function(a){var b;return n.isFunction(a)?this.each(function(b){n(this).wrapAll(a.call(this,b))}):(this[0]&&(b=n(a,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&b.insertBefore(this[0]),b.map(function(){var a=this;while(a.firstElementChild)a=a.firstElementChild;return a}).append(this)),this)},wrapInner:function(a){return this.each(n.isFunction(a)?function(b){n(this).wrapInner(a.call(this,b))}:function(){var b=n(this),c=b.contents();c.length?c.wrapAll(a):b.append(a)})},wrap:function(a){var b=n.isFunction(a);return this.each(function(c){n(this).wrapAll(b?a.call(this,c):a)})},unwrap:function(){return this.parent().each(function(){n.nodeName(this,"body")||n(this).replaceWith(this.childNodes)}).end()}}),n.expr.filters.hidden=function(a){return a.offsetWidth<=0&&a.offsetHeight<=0},n.expr.filters.visible=function(a){return!n.expr.filters.hidden(a)};var vb=/%20/g,wb=/\[\]$/,xb=/\r?\n/g,yb=/^(?:submit|button|image|reset|file)$/i,zb=/^(?:input|select|textarea|keygen)/i;function Ab(a,b,c,d){var e;if(n.isArray(b))n.each(b,function(b,e){c||wb.test(a)?d(a,e):Ab(a+"["+("object"==typeof e?b:"")+"]",e,c,d)});else if(c||"object"!==n.type(b))d(a,b);else for(e in b)Ab(a+"["+e+"]",b[e],c,d)}n.param=function(a,b){var c,d=[],e=function(a,b){b=n.isFunction(b)?b():null==b?"":b,d[d.length]=encodeURIComponent(a)+"="+encodeURIComponent(b)};if(void 0===b&&(b=n.ajaxSettings&&n.ajaxSettings.traditional),n.isArray(a)||a.jquery&&!n.isPlainObject(a))n.each(a,function(){e(this.name,this.value)});else for(c in a)Ab(c,a[c],b,e);return d.join("&").replace(vb,"+")},n.fn.extend({serialize:function(){return n.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var a=n.prop(this,"elements");return a?n.makeArray(a):this}).filter(function(){var a=this.type;return this.name&&!n(this).is(":disabled")&&zb.test(this.nodeName)&&!yb.test(a)&&(this.checked||!T.test(a))}).map(function(a,b){var c=n(this).val();return null==c?null:n.isArray(c)?n.map(c,function(a){return{name:b.name,value:a.replace(xb,"\r\n")}}):{name:b.name,value:c.replace(xb,"\r\n")}}).get()}}),n.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(a){}};var Bb=0,Cb={},Db={0:200,1223:204},Eb=n.ajaxSettings.xhr();a.attachEvent&&a.attachEvent("onunload",function(){for(var a in Cb)Cb[a]()}),k.cors=!!Eb&&"withCredentials"in Eb,k.ajax=Eb=!!Eb,n.ajaxTransport(function(a){var b;return k.cors||Eb&&!a.crossDomain?{send:function(c,d){var e,f=a.xhr(),g=++Bb;if(f.open(a.type,a.url,a.async,a.username,a.password),a.xhrFields)for(e in a.xhrFields)f[e]=a.xhrFields[e];a.mimeType&&f.overrideMimeType&&f.overrideMimeType(a.mimeType),a.crossDomain||c["X-Requested-With"]||(c["X-Requested-With"]="XMLHttpRequest");for(e in c)f.setRequestHeader(e,c[e]);b=function(a){return function(){b&&(delete Cb[g],b=f.onload=f.onerror=null,"abort"===a?f.abort():"error"===a?d(f.status,f.statusText):d(Db[f.status]||f.status,f.statusText,"string"==typeof f.responseText?{text:f.responseText}:void 0,f.getAllResponseHeaders()))}},f.onload=b(),f.onerror=b("error"),b=Cb[g]=b("abort");try{f.send(a.hasContent&&a.data||null)}catch(h){if(b)throw h}},abort:function(){b&&b()}}:void 0}),n.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(a){return n.globalEval(a),a}}}),n.ajaxPrefilter("script",function(a){void 0===a.cache&&(a.cache=!1),a.crossDomain&&(a.type="GET")}),n.ajaxTransport("script",function(a){if(a.crossDomain){var b,c;return{send:function(d,e){b=n("<script>").prop({async:!0,charset:a.scriptCharset,src:a.url}).on("load error",c=function(a){b.remove(),c=null,a&&e("error"===a.type?404:200,a.type)}),l.head.appendChild(b[0])},abort:function(){c&&c()}}}});var Fb=[],Gb=/(=)\?(?=&|$)|\?\?/;n.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var a=Fb.pop()||n.expando+"_"+cb++;return this[a]=!0,a}}),n.ajaxPrefilter("json jsonp",function(b,c,d){var e,f,g,h=b.jsonp!==!1&&(Gb.test(b.url)?"url":"string"==typeof b.data&&!(b.contentType||"").indexOf("application/x-www-form-urlencoded")&&Gb.test(b.data)&&"data");return h||"jsonp"===b.dataTypes[0]?(e=b.jsonpCallback=n.isFunction(b.jsonpCallback)?b.jsonpCallback():b.jsonpCallback,h?b[h]=b[h].replace(Gb,"$1"+e):b.jsonp!==!1&&(b.url+=(db.test(b.url)?"&":"?")+b.jsonp+"="+e),b.converters["script json"]=function(){return g||n.error(e+" was not called"),g[0]},b.dataTypes[0]="json",f=a[e],a[e]=function(){g=arguments},d.always(function(){a[e]=f,b[e]&&(b.jsonpCallback=c.jsonpCallback,Fb.push(e)),g&&n.isFunction(f)&&f(g[0]),g=f=void 0}),"script"):void 0}),n.parseHTML=function(a,b,c){if(!a||"string"!=typeof a)return null;"boolean"==typeof b&&(c=b,b=!1),b=b||l;var d=v.exec(a),e=!c&&[];return d?[b.createElement(d[1])]:(d=n.buildFragment([a],b,e),e&&e.length&&n(e).remove(),n.merge([],d.childNodes))};var Hb=n.fn.load;n.fn.load=function(a,b,c){if("string"!=typeof a&&Hb)return Hb.apply(this,arguments);var d,e,f,g=this,h=a.indexOf(" ");return h>=0&&(d=n.trim(a.slice(h)),a=a.slice(0,h)),n.isFunction(b)?(c=b,b=void 0):b&&"object"==typeof b&&(e="POST"),g.length>0&&n.ajax({url:a,type:e,dataType:"html",data:b}).done(function(a){f=arguments,g.html(d?n("<div>").append(n.parseHTML(a)).find(d):a)}).complete(c&&function(a,b){g.each(c,f||[a.responseText,b,a])}),this},n.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(a,b){n.fn[b]=function(a){return this.on(b,a)}}),n.expr.filters.animated=function(a){return n.grep(n.timers,function(b){return a===b.elem}).length};var Ib=a.document.documentElement;function Jb(a){return n.isWindow(a)?a:9===a.nodeType&&a.defaultView}n.offset={setOffset:function(a,b,c){var d,e,f,g,h,i,j,k=n.css(a,"position"),l=n(a),m={};"static"===k&&(a.style.position="relative"),h=l.offset(),f=n.css(a,"top"),i=n.css(a,"left"),j=("absolute"===k||"fixed"===k)&&(f+i).indexOf("auto")>-1,j?(d=l.position(),g=d.top,e=d.left):(g=parseFloat(f)||0,e=parseFloat(i)||0),n.isFunction(b)&&(b=b.call(a,c,h)),null!=b.top&&(m.top=b.top-h.top+g),null!=b.left&&(m.left=b.left-h.left+e),"using"in b?b.using.call(a,m):l.css(m)}},n.fn.extend({offset:function(a){if(arguments.length)return void 0===a?this:this.each(function(b){n.offset.setOffset(this,a,b)});var b,c,d=this[0],e={top:0,left:0},f=d&&d.ownerDocument;if(f)return b=f.documentElement,n.contains(b,d)?(typeof d.getBoundingClientRect!==U&&(e=d.getBoundingClientRect()),c=Jb(f),{top:e.top+c.pageYOffset-b.clientTop,left:e.left+c.pageXOffset-b.clientLeft}):e},position:function(){if(this[0]){var a,b,c=this[0],d={top:0,left:0};return"fixed"===n.css(c,"position")?b=c.getBoundingClientRect():(a=this.offsetParent(),b=this.offset(),n.nodeName(a[0],"html")||(d=a.offset()),d.top+=n.css(a[0],"borderTopWidth",!0),d.left+=n.css(a[0],"borderLeftWidth",!0)),{top:b.top-d.top-n.css(c,"marginTop",!0),left:b.left-d.left-n.css(c,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var a=this.offsetParent||Ib;while(a&&!n.nodeName(a,"html")&&"static"===n.css(a,"position"))a=a.offsetParent;return a||Ib})}}),n.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(b,c){var d="pageYOffset"===c;n.fn[b]=function(e){return J(this,function(b,e,f){var g=Jb(b);return void 0===f?g?g[c]:b[e]:void(g?g.scrollTo(d?a.pageXOffset:f,d?f:a.pageYOffset):b[e]=f)},b,e,arguments.length,null)}}),n.each(["top","left"],function(a,b){n.cssHooks[b]=ya(k.pixelPosition,function(a,c){return c?(c=xa(a,b),va.test(c)?n(a).position()[b]+"px":c):void 0})}),n.each({Height:"height",Width:"width"},function(a,b){n.each({padding:"inner"+a,content:b,"":"outer"+a},function(c,d){n.fn[d]=function(d,e){var f=arguments.length&&(c||"boolean"!=typeof d),g=c||(d===!0||e===!0?"margin":"border");return J(this,function(b,c,d){var e;return n.isWindow(b)?b.document.documentElement["client"+a]:9===b.nodeType?(e=b.documentElement,Math.max(b.body["scroll"+a],e["scroll"+a],b.body["offset"+a],e["offset"+a],e["client"+a])):void 0===d?n.css(b,c,g):n.style(b,c,d,g)},b,f?d:void 0,f,null)}})}),n.fn.size=function(){return this.length},n.fn.andSelf=n.fn.addBack,"function"==typeof define&&define.amd&&define("jquery",[],function(){return n});var Kb=a.jQuery,Lb=a.$;return n.noConflict=function(b){return a.$===n&&(a.$=Lb),b&&a.jQuery===n&&(a.jQuery=Kb),n},typeof b===U&&(a.jQuery=a.$=n),n});
/*! etpl */
function extend(target,source){for(var key in source){if(source.hasOwnProperty(key)){target[key]=source[key]}}return target}function Stack(){this.raw=[];this.length=0}Stack.prototype={push:function(elem){this.raw[this.length++]=elem},pop:function(){if(this.length>0){var elem=this.raw[--this.length];this.raw.length=this.length;return elem}},top:function(){return this.raw[this.length-1]},bottom:function(){return this.raw[0]},find:function(condition){var index=this.length;while(index--){var item=this.raw[index];if(condition(item)){return item}}}};var guidIndex=0x2B845;function generateGUID(){return'___'+(guidIndex++)}function inherits(subClass,superClass){var F=new Function();F.prototype=superClass.prototype;subClass.prototype=new F();subClass.prototype.constructor=subClass}var HTML_ENTITY={'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'};function htmlFilterReplacer(c){return HTML_ENTITY[c]}var DEFAULT_FILTERS={html:function(source){return source.replace(/[&<>"']/g,htmlFilterReplacer)},url:encodeURIComponent,raw:function(source){return source}};function stringLiteralize(source){return'"'+source.replace(/\x5C/g,'\\\\').replace(/"/g,'\\"').replace(/\x0A/g,'\\n').replace(/\x09/g,'\\t').replace(/\x0D/g,'\\r')+'"'}function regexpLiteral(source){return source.replace(/[\^\[\]\$\(\)\{\}\?\*\.\+]/g,function(c){return'\\'+c})}function stringFormat(source){var args=arguments;return source.replace(/\{([0-9]+)\}/g,function(match,index){return args[index-0+1]})}var RENDER_STRING_DECLATION='var r="";';var RENDER_STRING_ADD_START='r+=';var RENDER_STRING_ADD_END=';';var RENDER_STRING_RETURN='return r;';if(typeof navigator!=='undefined'&&/msie\s*([0-9]+)/i.test(navigator.userAgent)&&RegExp.$1-0<8){RENDER_STRING_DECLATION='var r=[],ri=0;';RENDER_STRING_ADD_START='r[ri++]=';RENDER_STRING_RETURN='return r.join("");'}function toGetVariableLiteral(name){name=name.replace(/^\s*\*/,'');return stringFormat('gv({0},["{1}"])',stringLiteralize(name),name.replace(/\[['"]?([^'"]+)['"]?\]/g,function(match,name){return'.'+name}).split('.').join('","'))}function parseTextBlock(source,open,close,greedy,onInBlock,onOutBlock){var closeLen=close.length;var texts=source.split(open);var level=0;var buf=[];for(var i=0,len=texts.length;i<len;i++){var text=texts[i];if(i){var openBegin=1;level++;while(1){var closeIndex=text.indexOf(close);if(closeIndex<0){buf.push(level>1&&openBegin?open:'',text);break}level=greedy?level-1:0;buf.push(level>0&&openBegin?open:'',text.slice(0,closeIndex),level>0?close:'');text=text.slice(closeIndex+closeLen);openBegin=0;if(level===0){break}}if(level===0){onInBlock(buf.join(''));onOutBlock(text);buf=[]}}else{text&&onOutBlock(text)}}if(level>0&&buf.length>0){onOutBlock(open);onOutBlock(buf.join(''))}}function compileVariable(source,engine,forText){var code=[];var options=engine.options;var toStringHead='';var toStringFoot='';var wrapHead='';var wrapFoot='';var defaultFilter;if(forText){toStringHead='ts(';toStringFoot=')';wrapHead=RENDER_STRING_ADD_START;wrapFoot=RENDER_STRING_ADD_END;defaultFilter=options.defaultFilter}parseTextBlock(source,options.variableOpen,options.variableClose,1,function(text){if(forText&&text.indexOf('|')<0&&defaultFilter){text+='|'+defaultFilter}var filterCharIndex=text.indexOf('|');var variableName=(filterCharIndex>0?text.slice(0,filterCharIndex):text).replace(/^\s+/,'').replace(/\s+$/,'');var filterSource=filterCharIndex>0?text.slice(filterCharIndex+1):'';var variableRawValue=variableName.indexOf('*')===0;var variableCode=[variableRawValue?'':toStringHead,toGetVariableLiteral(variableName),variableRawValue?'':toStringFoot];if(filterSource){filterSource=compileVariable(filterSource,engine);var filterSegs=filterSource.split('|');for(var i=0,len=filterSegs.length;i<len;i++){var seg=filterSegs[i];if(/^\s*([a-z0-9_-]+)(\((.*)\))?\s*$/i.test(seg)){variableCode.unshift('fs["'+RegExp.$1+'"](');if(RegExp.$3){variableCode.push(',',RegExp.$3)}variableCode.push(')')}}}code.push(wrapHead,variableCode.join(''),wrapFoot)},function(text){code.push(wrapHead,forText?stringLiteralize(text):text,wrapFoot)});return code.join('')}function TextNode(value,engine){this.value=value;this.engine=engine}TextNode.prototype={getRendererBody:function(){var value=this.value;var options=this.engine.options;if(!value||(options.strip&&/^\s*$/.test(value))){return''}return compileVariable(value,this.engine,1)},clone:function(){return this}};function Command(value,engine){this.value=value;this.engine=engine;this.children=[];this.cloneProps=[]}Command.prototype={addChild:function(node){this.children.push(node)},open:function(context){var parent=context.stack.top();parent&&parent.addChild(this);context.stack.push(this)},close:function(context){if(context.stack.top()===this){context.stack.pop()}},getRendererBody:function(){var buf=[];var children=this.children;for(var i=0;i<children.length;i++){buf.push(children[i].getRendererBody())}return buf.join('')},clone:function(){var Clazz=this.constructor;var node=new Clazz(this.value,this.engine);for(var i=0,l=this.children.length;i<l;i++){node.addChild(this.children[i].clone())}for(var i=0,l=this.cloneProps.length;i<l;i++){var prop=this.cloneProps[i];node[prop]=this[prop]}return node}};function autoCloseCommand(context,CommandType){var stack=context.stack;var closeEnd=CommandType?stack.find(function(item){return item instanceof CommandType}):stack.bottom();if(closeEnd){var node;while((node=stack.top())!==closeEnd){if(!node.autoClose){throw new Error(node.type+' must be closed manually: '+node.value);}node.autoClose(context)}closeEnd.close(context)}return closeEnd}var RENDERER_BODY_START=''+'data=data||{};'+'var v={},fs=engine.filters,hg=typeof data.get=="function",'+'gv=function(n,ps){'+'var p=ps[0],d=v[p];'+'if(d==null){'+'if(hg){return data.get(n);}'+'d=data[p];'+'}'+'for(var i=1,l=ps.length;i<l;i++)if(d!=null)d = d[ps[i]];'+'return d;'+'},'+'ts=function(s){'+'if(typeof s==="string"){return s;}'+'if(s==null){s="";}'+'return ""+s;'+'};';function TargetCommand(value,engine){if(!/^\s*([a-z0-9\/_-]+)\s*(\(\s*master\s*=\s*([a-z0-9\/_-]+)\s*\))?\s*/i.test(value)){throw new Error('Invalid '+this.type+' syntax: '+value);}this.master=RegExp.$3;this.name=RegExp.$1;Command.call(this,value,engine);this.blocks={}}inherits(TargetCommand,Command);function BlockCommand(value,engine){if(!/^\s*([a-z0-9\/_-]+)\s*$/i.test(value)){throw new Error('Invalid '+this.type+' syntax: '+value);}this.name=RegExp.$1;Command.call(this,value,engine);this.cloneProps=['name']}inherits(BlockCommand,Command);function ImportCommand(value,engine){if(!/^\s*([a-z0-9\/_-]+)\s*$/i.test(value)){throw new Error('Invalid '+this.type+' syntax: '+value);}this.name=RegExp.$1;Command.call(this,value,engine);this.cloneProps=['name','state','blocks'];this.blocks={}}inherits(ImportCommand,Command);function VarCommand(value,engine){if(!/^\s*([a-z0-9_]+)\s*=([\s\S]*)$/i.test(value)){throw new Error('Invalid '+this.type+' syntax: '+value);}this.name=RegExp.$1;this.expr=RegExp.$2;Command.call(this,value,engine);this.cloneProps=['name','expr']}inherits(VarCommand,Command);function FilterCommand(value,engine){if(!/^\s*([a-z0-9_-]+)\s*(\(([\s\S]*)\))?\s*$/i.test(value)){throw new Error('Invalid '+this.type+' syntax: '+value);}this.name=RegExp.$1;this.args=RegExp.$3;Command.call(this,value,engine);this.cloneProps=['name','args']}inherits(FilterCommand,Command);function UseCommand(value,engine){if(!/^\s*([a-z0-9\/_-]+)\s*(\(([\s\S]*)\))?\s*$/i.test(value)){throw new Error('Invalid '+this.type+' syntax: '+value);}this.name=RegExp.$1;this.args=RegExp.$3;Command.call(this,value,engine);this.cloneProps=['name','args']}inherits(UseCommand,Command);function ForCommand(value,engine){var rule=new RegExp(stringFormat('^\\s*({0}[\\s\\S]+{1})\\s+as\\s+{0}([0-9a-z_]+){1}\\s*(,\\s*{0}([0-9a-z_]+){1})?\\s*$',regexpLiteral(engine.options.variableOpen),regexpLiteral(engine.options.variableClose)),'i');if(!rule.test(value)){throw new Error('Invalid '+this.type+' syntax: '+value);}this.list=RegExp.$1;this.item=RegExp.$2;this.index=RegExp.$4;Command.call(this,value,engine);this.cloneProps=['list','item','index']}inherits(ForCommand,Command);function IfCommand(value,engine){Command.call(this,value,engine)}inherits(IfCommand,Command);function ElifCommand(value,engine){IfCommand.call(this,value,engine)}inherits(ElifCommand,IfCommand);function ElseCommand(value,engine){Command.call(this,value,engine)}inherits(ElseCommand,IfCommand);var TargetState={READING:1,READED:2,APPLIED:3,READY:4};ImportCommand.prototype.applyMaster=TargetCommand.prototype.applyMaster=function(masterName){if(this.state>=TargetState.APPLIED){return 1}var blocks=this.blocks;function replaceBlock(node){var children=node.children;if(children instanceof Array){for(var i=0,len=children.length;i<len;i++){var child=children[i];if(child instanceof BlockCommand&&blocks[child.name]){child=children[i]=blocks[child.name]}replaceBlock(child)}}}var master=this.engine.targets[masterName];if(master&&master.applyMaster(master.master)){this.children=master.clone().children;replaceBlock(this);this.state=TargetState.APPLIED;return 1}};TargetCommand.prototype.isReady=function(){if(this.state>=TargetState.READY){return 1}var engine=this.engine;var readyState=1;function checkReadyState(node){for(var i=0,len=node.children.length;i<len;i++){var child=node.children[i];if(child instanceof ImportCommand){var target=engine.targets[child.name];readyState=readyState&&target&&target.isReady(engine)}else if(child instanceof Command){checkReadyState(child)}}}if(this.applyMaster(this.master)){checkReadyState(this);readyState&&(this.state=TargetState.READY);return readyState}};TargetCommand.prototype.getRenderer=function(){if(this.renderer){return this.renderer}if(this.isReady()){var realRenderer=new Function('data','engine',[RENDERER_BODY_START,RENDER_STRING_DECLATION,this.getRendererBody(),RENDER_STRING_RETURN].join('\n'));var engine=this.engine;this.renderer=function(data){return realRenderer(data,engine)};return this.renderer}return null};function addTargetToContext(target,context){context.target=target;var engine=context.engine;var name=target.name;if(engine.targets[name]){switch(engine.options.namingConflict){case'override':engine.targets[name]=target;context.targets.push(name);case'ignore':break;default:throw new Error('Target exists: '+name);}}else{engine.targets[name]=target;context.targets.push(name)}}TargetCommand.prototype.open=function(context){autoCloseCommand(context);Command.prototype.open.call(this,context);this.state=TargetState.READING;addTargetToContext(this,context)};VarCommand.prototype.open=UseCommand.prototype.open=function(context){context.stack.top().addChild(this)};BlockCommand.prototype.open=function(context){Command.prototype.open.call(this,context);context.stack.find(function(node){return node.blocks}).blocks[this.name]=this};ElifCommand.prototype.open=function(context){var elseCommand=new ElseCommand();elseCommand.open(context);var ifCommand=autoCloseCommand(context,IfCommand);ifCommand.addChild(this);context.stack.push(this)};ElseCommand.prototype.open=function(context){var ifCommand=autoCloseCommand(context,IfCommand);ifCommand.addChild(this);context.stack.push(this)};ImportCommand.prototype.open=function(context){this.parent=context.stack.top();this.target=context.target;Command.prototype.open.call(this,context);this.state=TargetState.READING};UseCommand.prototype.close=VarCommand.prototype.close=function(){};ImportCommand.prototype.close=function(context){Command.prototype.close.call(this,context);this.state=TargetState.READED};TargetCommand.prototype.close=function(context){Command.prototype.close.call(this,context);this.state=this.master?TargetState.READED:TargetState.APPLIED;context.target=null};ImportCommand.prototype.autoClose=function(context){var parentChildren=this.parent.children;parentChildren.push.apply(parentChildren,this.children);this.children.length=0;for(var key in this.blocks){this.target.blocks[key]=this.blocks[key]}this.blocks={};this.close(context)};UseCommand.prototype.beforeOpen=ImportCommand.prototype.beforeOpen=VarCommand.prototype.beforeOpen=ForCommand.prototype.beforeOpen=FilterCommand.prototype.beforeOpen=BlockCommand.prototype.beforeOpen=IfCommand.prototype.beforeOpen=TextNode.prototype.beforeAdd=function(context){if(context.stack.bottom()){return}var target=new TargetCommand(generateGUID(),context.engine);target.open(context)};ImportCommand.prototype.getRendererBody=function(){this.applyMaster(this.name);return Command.prototype.getRendererBody.call(this)};UseCommand.prototype.getRendererBody=function(){return stringFormat('{0}engine.render({2},{{3}}){1}',RENDER_STRING_ADD_START,RENDER_STRING_ADD_END,stringLiteralize(this.name),compileVariable(this.args,this.engine).replace(/(^|,)\s*([a-z0-9_]+)\s*=/ig,function(match,start,argName){return(start||'')+stringLiteralize(argName)+':'}))};VarCommand.prototype.getRendererBody=function(){if(this.expr){return stringFormat('v[{0}]={1};',stringLiteralize(this.name),compileVariable(this.expr,this.engine))}return''};IfCommand.prototype.getRendererBody=function(){return stringFormat('if({0}){{1}}',compileVariable(this.value,this.engine),Command.prototype.getRendererBody.call(this))};ElseCommand.prototype.getRendererBody=function(){return stringFormat('}else{{0}',Command.prototype.getRendererBody.call(this))};ForCommand.prototype.getRendererBody=function(){return stringFormat(''+'var {0}={1};'+'if({0} instanceof Array)'+'for (var {4}=0,{5}={0}.length;{4}<{5};{4}++){v[{2}]={4};v[{3}]={0}[{4}];{6}}'+'else if(typeof {0}==="object")'+'for(var {4} in {0}){v[{2}]={4};v[{3}]={0}[{4}];{6}}',generateGUID(),compileVariable(this.list,this.engine),stringLiteralize(this.index||generateGUID()),stringLiteralize(this.item),generateGUID(),generateGUID(),Command.prototype.getRendererBody.call(this))};FilterCommand.prototype.getRendererBody=function(){var args=this.args;return stringFormat('{2}fs[{5}]((function(){{0}{4}{1}})(){6}){3}',RENDER_STRING_DECLATION,RENDER_STRING_RETURN,RENDER_STRING_ADD_START,RENDER_STRING_ADD_END,Command.prototype.getRendererBody.call(this),stringLiteralize(this.name),args?','+compileVariable(args,this.engine):'')};var commandTypes={};function addCommandType(name,Type){commandTypes[name]=Type;Type.prototype.type=name}addCommandType('target',TargetCommand);addCommandType('block',BlockCommand);addCommandType('import',ImportCommand);addCommandType('use',UseCommand);addCommandType('var',VarCommand);addCommandType('for',ForCommand);addCommandType('if',IfCommand);addCommandType('elif',ElifCommand);addCommandType('else',ElseCommand);addCommandType('filter',FilterCommand);function Engine(options){this.options={commandOpen:'<!--',commandClose:'-->',commandSyntax:/^\s*(\/)?([a-z]+)\s*(?::([\s\S]*))?$/,variableOpen:'${',variableClose:'}',defaultFilter:'html'};this.config(options);this.targets={};this.filters=extend({},DEFAULT_FILTERS)}Engine.prototype.config=function(options){extend(this.options,options)};Engine.prototype.compile=Engine.prototype.parse=function(source){if(source){var targetNames=parseSource(source,this);if(targetNames.length){return this.targets[targetNames[0]].getRenderer()}}return new Function('return ""')};Engine.prototype.getRenderer=function(name){var target=this.targets[name];if(target){return target.getRenderer()}};Engine.prototype.render=function(name,data){var renderer=this.getRenderer(name);if(renderer){return renderer(data)}return''};Engine.prototype.addFilter=function(name,filter){if(typeof filter==='function'){this.filters[name]=filter}};function parseSource(source,engine){var commandOpen=engine.options.commandOpen;var commandClose=engine.options.commandClose;var commandSyntax=engine.options.commandSyntax;var stack=new Stack();var analyseContext={engine:engine,targets:[],stack:stack,target:null};var textBuf=[];function flushTextBuf(){var text;if(textBuf.length>0&&(text=textBuf.join(''))){var textNode=new TextNode(text,engine);textNode.beforeAdd(analyseContext);stack.top().addChild(textNode);textBuf=[];if(engine.options.strip&&analyseContext.current instanceof Command){textNode.value=text.replace(/^[\x20\t\r]*\n/,'')}analyseContext.current=textNode}}var NodeType;parseTextBlock(source,commandOpen,commandClose,0,function(text){var match=commandSyntax.exec(text);if(match&&(NodeType=commandTypes[match[2].toLowerCase()])&&typeof NodeType==='function'){flushTextBuf();var currentNode=analyseContext.current;if(engine.options.strip&&currentNode instanceof TextNode){currentNode.value=currentNode.value.replace(/\r?\n[\x20\t]*$/,'\n')}if(match[1]){currentNode=autoCloseCommand(analyseContext,NodeType)}else{currentNode=new NodeType(match[3],engine);if(typeof currentNode.beforeOpen==='function'){currentNode.beforeOpen(analyseContext)}currentNode.open(analyseContext)}analyseContext.current=currentNode}else if(!/^\s*\/\//.test(text)){textBuf.push(commandOpen,text,commandClose)}NodeType=null},function(text){textBuf.push(text)});flushTextBuf();autoCloseCommand(analyseContext);return analyseContext.targets}var etpl=new Engine();etpl.Engine=Engine;
/*! xss */
(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){var FilterCSS=require("cssfilter").FilterCSS;var _=require("./util");var whiteList={a:["target","href","title"],abbr:["title"],address:[],area:["shape","coords","href","alt"],article:[],aside:[],audio:["autoplay","controls","loop","preload","src"],b:[],bdi:["dir"],bdo:["dir"],big:[],blockquote:["cite"],br:[],caption:[],center:[],cite:[],code:[],col:["align","valign","span","width"],colgroup:["align","valign","span","width"],dd:[],del:["datetime"],details:["open"],div:[],dl:[],dt:[],em:[],font:["color","size","face"],footer:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],header:[],hr:[],i:[],img:["src","alt","title","width","height"],ins:["datetime"],li:[],mark:[],nav:[],ol:[],p:[],pre:[],s:[],section:[],small:[],span:[],sub:[],sup:[],strong:[],table:["width","border","align","valign"],tbody:["align","valign"],td:["width","colspan","align","valign"],tfoot:["align","valign"],th:["width","colspan","align","valign"],thead:["align","valign"],tr:["rowspan","align","valign"],tt:[],u:[],ul:[],video:["autoplay","controls","loop","preload","src","height","width"]};var defaultCSSFilter=new FilterCSS;function onTag(tag,html,options){}function onIgnoreTag(tag,html,options){}function onTagAttr(tag,name,value){}function onIgnoreTagAttr(tag,name,value){}function escapeHtml(html){return html.replace(REGEXP_LT,"&lt;").replace(REGEXP_GT,"&gt;")}function safeAttrValue(tag,name,value,cssFilter){cssFilter=cssFilter||defaultCSSFilter;value=friendlyAttrValue(value);if(name==="href"||name==="src"){value=_.trim(value);if(value==="#")return"#";if(!(value.substr(0,7)==="http://"||value.substr(0,8)==="https://"||value.substr(0,7)==="mailto:"||value[0]==="/")){return""}}else if(name==="background"){REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex=0;if(REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)){return""}}else if(name==="style"){REGEXP_DEFAULT_ON_TAG_ATTR_7.lastIndex=0;if(REGEXP_DEFAULT_ON_TAG_ATTR_7.test(value)){return""}REGEXP_DEFAULT_ON_TAG_ATTR_8.lastIndex=0;if(REGEXP_DEFAULT_ON_TAG_ATTR_8.test(value)){REGEXP_DEFAULT_ON_TAG_ATTR_4.lastIndex=0;if(REGEXP_DEFAULT_ON_TAG_ATTR_4.test(value)){return""}}value=cssFilter.process(value)}value=escapeAttrValue(value);return value}var REGEXP_LT=/</g;var REGEXP_GT=/>/g;var REGEXP_QUOTE=/"/g;var REGEXP_QUOTE_2=/&quot;/g;var REGEXP_ATTR_VALUE_1=/&#([a-zA-Z0-9]*);?/gim;var REGEXP_ATTR_VALUE_COLON=/&colon;?/gim;var REGEXP_ATTR_VALUE_NEWLINE=/&newline;?/gim;var REGEXP_DEFAULT_ON_TAG_ATTR_3=/\/\*|\*\//gm;var REGEXP_DEFAULT_ON_TAG_ATTR_4=/((j\s*a\s*v\s*a|v\s*b|l\s*i\s*v\s*e)\s*s\s*c\s*r\s*i\s*p\s*t\s*|m\s*o\s*c\s*h\s*a)\:/gi;var REGEXP_DEFAULT_ON_TAG_ATTR_5=/^[\s"'`]*(d\s*a\s*t\s*a\s*)\:/gi;var REGEXP_DEFAULT_ON_TAG_ATTR_6=/^[\s"'`]*(d\s*a\s*t\s*a\s*)\:\s*image\//gi;var REGEXP_DEFAULT_ON_TAG_ATTR_7=/e\s*x\s*p\s*r\s*e\s*s\s*s\s*i\s*o\s*n\s*\(.*/gi;var REGEXP_DEFAULT_ON_TAG_ATTR_8=/u\s*r\s*l\s*\(.*/gi;function escapeQuote(str){return str.replace(REGEXP_QUOTE,"&quot;")}function unescapeQuote(str){return str.replace(REGEXP_QUOTE_2,'"')}function escapeHtmlEntities(str){return str.replace(REGEXP_ATTR_VALUE_1,function replaceUnicode(str,code){return code[0]==="x"||code[0]==="X"?String.fromCharCode(parseInt(code.substr(1),16)):String.fromCharCode(parseInt(code,10))})}function escapeDangerHtml5Entities(str){return str.replace(REGEXP_ATTR_VALUE_COLON,":").replace(REGEXP_ATTR_VALUE_NEWLINE," ")}function clearNonPrintableCharacter(str){var str2="";for(var i=0,len=str.length;i<len;i++){str2+=str.charCodeAt(i)<32?" ":str.charAt(i)}return _.trim(str2)}function friendlyAttrValue(str){str=unescapeQuote(str);str=escapeHtmlEntities(str);str=escapeDangerHtml5Entities(str);str=clearNonPrintableCharacter(str);return str}function escapeAttrValue(str){str=escapeQuote(str);str=escapeHtml(str);return str}function onIgnoreTagStripAll(){return""}function StripTagBody(tags,next){if(typeof next!=="function"){next=function(){}}var isRemoveAllTag=!Array.isArray(tags);function isRemoveTag(tag){if(isRemoveAllTag)return true;return _.indexOf(tags,tag)!==-1}var removeList=[];var posStart=false;return{onIgnoreTag:function(tag,html,options){if(isRemoveTag(tag)){if(options.isClosing){var ret="[/removed]";var end=options.position+ret.length;removeList.push([posStart!==false?posStart:options.position,end]);posStart=false;return ret}else{if(!posStart){posStart=options.position}return"[removed]"}}else{return next(tag,html,options)}},remove:function(html){var rethtml="";var lastPos=0;_.forEach(removeList,function(pos){rethtml+=html.slice(lastPos,pos[0]);lastPos=pos[1]});rethtml+=html.slice(lastPos);return rethtml}}}function stripCommentTag(html){return html.replace(STRIP_COMMENT_TAG_REGEXP,"")}var STRIP_COMMENT_TAG_REGEXP=/<!--[\s\S]*?-->/g;function stripBlankChar(html){var chars=html.split("");chars=chars.filter(function(char){var c=char.charCodeAt(0);if(c===127)return false;if(c<=31){if(c===10||c===13)return true;return false}return true});return chars.join("")}exports.whiteList=whiteList;exports.onTag=onTag;exports.onIgnoreTag=onIgnoreTag;exports.onTagAttr=onTagAttr;exports.onIgnoreTagAttr=onIgnoreTagAttr;exports.safeAttrValue=safeAttrValue;exports.escapeHtml=escapeHtml;exports.escapeQuote=escapeQuote;exports.unescapeQuote=unescapeQuote;exports.escapeHtmlEntities=escapeHtmlEntities;exports.escapeDangerHtml5Entities=escapeDangerHtml5Entities;exports.clearNonPrintableCharacter=clearNonPrintableCharacter;exports.friendlyAttrValue=friendlyAttrValue;exports.escapeAttrValue=escapeAttrValue;exports.onIgnoreTagStripAll=onIgnoreTagStripAll;exports.StripTagBody=StripTagBody;exports.stripCommentTag=stripCommentTag;exports.stripBlankChar=stripBlankChar;exports.cssFilter=defaultCSSFilter},{"./util":4,cssfilter:8}],2:[function(require,module,exports){var DEFAULT=require("./default");var parser=require("./parser");var FilterXSS=require("./xss");function filterXSS(html,options){var xss=new FilterXSS(options);return xss.process(html)}exports=module.exports=filterXSS;exports.FilterXSS=FilterXSS;for(var i in DEFAULT)exports[i]=DEFAULT[i];for(var i in parser)exports[i]=parser[i];if(typeof define==="function"&&define.amd){define(function(){return module.exports})}if(typeof window!=="undefined"){window.filterXSS=module.exports}},{"./default":1,"./parser":3,"./xss":5}],3:[function(require,module,exports){var _=require("./util");function getTagName(html){var i=html.indexOf(" ");if(i===-1){var tagName=html.slice(1,-1)}else{var tagName=html.slice(1,i+1)}tagName=_.trim(tagName).toLowerCase();if(tagName.slice(0,1)==="/")tagName=tagName.slice(1);if(tagName.slice(-1)==="/")tagName=tagName.slice(0,-1);return tagName}function isClosing(html){return html.slice(0,2)==="</"}function parseTag(html,onTag,escapeHtml){"user strict";var rethtml="";var lastPos=0;var tagStart=false;var quoteStart=false;var currentPos=0;var len=html.length;var currentHtml="";var currentTagName="";for(currentPos=0;currentPos<len;currentPos++){var c=html.charAt(currentPos);if(tagStart===false){if(c==="<"){tagStart=currentPos;continue}}else{if(quoteStart===false){if(c==="<"){rethtml+=escapeHtml(html.slice(lastPos,currentPos));tagStart=currentPos;lastPos=currentPos;continue}if(c===">"){rethtml+=escapeHtml(html.slice(lastPos,tagStart));currentHtml=html.slice(tagStart,currentPos+1);currentTagName=getTagName(currentHtml);rethtml+=onTag(tagStart,rethtml.length,currentTagName,currentHtml,isClosing(currentHtml));lastPos=currentPos+1;tagStart=false;continue}if((c==='"'||c==="'")&&html.charAt(currentPos-1)==="="){quoteStart=c;continue}}else{if(c===quoteStart){quoteStart=false;continue}}}}if(lastPos<html.length){rethtml+=escapeHtml(html.substr(lastPos))}return rethtml}var REGEXP_ATTR_NAME=/[^a-zA-Z0-9_:\.\-]/gim;function parseAttr(html,onAttr){"user strict";var lastPos=0;var retAttrs=[];var tmpName=false;var len=html.length;function addAttr(name,value){name=_.trim(name);name=name.replace(REGEXP_ATTR_NAME,"").toLowerCase();if(name.length<1)return;var ret=onAttr(name,value||"");if(ret)retAttrs.push(ret)}for(var i=0;i<len;i++){var c=html.charAt(i);var v,j;if(tmpName===false&&c==="="){tmpName=html.slice(lastPos,i);lastPos=i+1;continue}if(tmpName!==false){if(i===lastPos&&(c==='"'||c==="'")&&html.charAt(i-1)==="="){j=html.indexOf(c,i+1);if(j===-1){break}else{v=_.trim(html.slice(lastPos+1,j));addAttr(tmpName,v);tmpName=false;i=j;lastPos=i+1;continue}}}if(c===" "){if(tmpName===false){j=findNextEqual(html,i);if(j===-1){v=_.trim(html.slice(lastPos,i));addAttr(v);tmpName=false;lastPos=i+1;continue}else{i=j-1;continue}}else{j=findBeforeEqual(html,i-1);if(j===-1){v=_.trim(html.slice(lastPos,i));v=stripQuoteWrap(v);addAttr(tmpName,v);tmpName=false;lastPos=i+1;continue}else{continue}}}}if(lastPos<html.length){if(tmpName===false){addAttr(html.slice(lastPos))}else{addAttr(tmpName,stripQuoteWrap(_.trim(html.slice(lastPos))))}}return _.trim(retAttrs.join(" "))}function findNextEqual(str,i){for(;i<str.length;i++){var c=str[i];if(c===" ")continue;if(c==="=")return i;return-1}}function findBeforeEqual(str,i){for(;i>0;i--){var c=str[i];if(c===" ")continue;if(c==="=")return i;return-1}}function isQuoteWrapString(text){if(text[0]==='"'&&text[text.length-1]==='"'||text[0]==="'"&&text[text.length-1]==="'"){return true}else{return false}}function stripQuoteWrap(text){if(isQuoteWrapString(text)){return text.substr(1,text.length-2)}else{return text}}exports.parseTag=parseTag;exports.parseAttr=parseAttr},{"./util":4}],4:[function(require,module,exports){module.exports={indexOf:function(arr,item){var i,j;if(Array.prototype.indexOf){return arr.indexOf(item)}for(i=0,j=arr.length;i<j;i++){if(arr[i]===item){return i}}return-1},forEach:function(arr,fn,scope){var i,j;if(Array.prototype.forEach){return arr.forEach(fn,scope)}for(i=0,j=arr.length;i<j;i++){fn.call(scope,arr[i],i,arr)}},trim:function(str){if(String.prototype.trim){return str.trim()}return str.replace(/(^\s*)|(\s*$)/g,"")}}},{}],5:[function(require,module,exports){var FilterCSS=require("cssfilter").FilterCSS;var DEFAULT=require("./default");var parser=require("./parser");var parseTag=parser.parseTag;var parseAttr=parser.parseAttr;var _=require("./util");function isNull(obj){return obj===undefined||obj===null}function getAttrs(html){var i=html.indexOf(" ");if(i===-1){return{html:"",closing:html[html.length-2]==="/"}}html=_.trim(html.slice(i+1,-1));var isClosing=html[html.length-1]==="/";if(isClosing)html=_.trim(html.slice(0,-1));return{html:html,closing:isClosing}}function FilterXSS(options){options=options||{};if(options.stripIgnoreTag){if(options.onIgnoreTag){console.error('Notes: cannot use these two options "stripIgnoreTag" and "onIgnoreTag" at the same time')}options.onIgnoreTag=DEFAULT.onIgnoreTagStripAll}options.whiteList=options.whiteList||DEFAULT.whiteList;options.onTag=options.onTag||DEFAULT.onTag;options.onTagAttr=options.onTagAttr||DEFAULT.onTagAttr;options.onIgnoreTag=options.onIgnoreTag||DEFAULT.onIgnoreTag;options.onIgnoreTagAttr=options.onIgnoreTagAttr||DEFAULT.onIgnoreTagAttr;options.safeAttrValue=options.safeAttrValue||DEFAULT.safeAttrValue;options.escapeHtml=options.escapeHtml||DEFAULT.escapeHtml;options.css=options.css||{};this.options=options;this.cssFilter=new FilterCSS(options.css)}FilterXSS.prototype.process=function(html){html=html||"";html=html.toString();if(!html)return"";var me=this;var options=me.options;var whiteList=options.whiteList;var onTag=options.onTag;var onIgnoreTag=options.onIgnoreTag;var onTagAttr=options.onTagAttr;var onIgnoreTagAttr=options.onIgnoreTagAttr;var safeAttrValue=options.safeAttrValue;var escapeHtml=options.escapeHtml;var cssFilter=me.cssFilter;if(options.stripBlankChar){html=DEFAULT.stripBlankChar(html)}if(!options.allowCommentTag){html=DEFAULT.stripCommentTag(html)}if(options.stripIgnoreTagBody){var stripIgnoreTagBody=DEFAULT.StripTagBody(options.stripIgnoreTagBody,onIgnoreTag);onIgnoreTag=stripIgnoreTagBody.onIgnoreTag}else{stripIgnoreTagBody=false}var retHtml=parseTag(html,function(sourcePosition,position,tag,html,isClosing){var info={sourcePosition:sourcePosition,position:position,isClosing:isClosing,isWhite:tag in whiteList};var ret=onTag(tag,html,info);if(!isNull(ret))return ret;if(info.isWhite){if(info.isClosing){return"</"+tag+">"}var attrs=getAttrs(html);var whiteAttrList=whiteList[tag];var attrsHtml=parseAttr(attrs.html,function(name,value){var isWhiteAttr=_.indexOf(whiteAttrList,name)!==-1;var ret=onTagAttr(tag,name,value,isWhiteAttr);if(!isNull(ret))return ret;if(isWhiteAttr){value=safeAttrValue(tag,name,value,cssFilter);if(value){return name+'="'+value+'"'}else{return name}}else{var ret=onIgnoreTagAttr(tag,name,value,isWhiteAttr);if(!isNull(ret))return ret;return}});var html="<"+tag;if(attrsHtml)html+=" "+attrsHtml;if(attrs.closing)html+=" /";html+=">";return html}else{var ret=onIgnoreTag(tag,html,info);if(!isNull(ret))return ret;return escapeHtml(html)}},escapeHtml);if(stripIgnoreTagBody){retHtml=stripIgnoreTagBody.remove(retHtml)}return retHtml};module.exports=FilterXSS},{"./default":1,"./parser":3,"./util":4,cssfilter:8}],6:[function(require,module,exports){var DEFAULT=require("./default");var parseStyle=require("./parser");var _=require("./util");function isNull(obj){return obj===undefined||obj===null}function FilterCSS(options){options=options||{};options.whiteList=options.whiteList||DEFAULT.whiteList;options.onAttr=options.onAttr||DEFAULT.onAttr;options.onIgnoreAttr=options.onIgnoreAttr||DEFAULT.onIgnoreAttr;this.options=options}FilterCSS.prototype.process=function(css){css=css||"";css=css.toString();if(!css)return"";var me=this;var options=me.options;var whiteList=options.whiteList;var onAttr=options.onAttr;var onIgnoreAttr=options.onIgnoreAttr;var retCSS=parseStyle(css,function(sourcePosition,position,name,value,source){var check=whiteList[name];var isWhite=false;if(check===true)isWhite=check;else if(typeof check==="function")isWhite=check(value);else if(check instanceof RegExp)isWhite=check.test(value);if(isWhite!==true)isWhite=false;var opts={position:position,sourcePosition:sourcePosition,source:source,isWhite:isWhite};if(isWhite){var ret=onAttr(name,value,opts);if(isNull(ret)){return name+":"+value}else{return ret}}else{var ret=onIgnoreAttr(name,value,opts);if(!isNull(ret)){return ret}}});return retCSS};module.exports=FilterCSS},{"./default":7,"./parser":9,"./util":10}],7:[function(require,module,exports){var whiteList={};whiteList["align-content"]=false;whiteList["align-items"]=false;whiteList["align-self"]=false;whiteList["alignment-adjust"]=false;whiteList["alignment-baseline"]=false;whiteList["all"]=false;whiteList["anchor-point"]=false;whiteList["animation"]=false;whiteList["animation-delay"]=false;whiteList["animation-direction"]=false;whiteList["animation-duration"]=false;whiteList["animation-fill-mode"]=false;whiteList["animation-iteration-count"]=false;whiteList["animation-name"]=false;whiteList["animation-play-state"]=false;whiteList["animation-timing-function"]=false;whiteList["azimuth"]=false;whiteList["backface-visibility"]=false;whiteList["background"]=true;whiteList["background-attachment"]=true;whiteList["background-clip"]=true;whiteList["background-color"]=true;whiteList["background-image"]=true;whiteList["background-origin"]=true;whiteList["background-position"]=true;whiteList["background-repeat"]=true;whiteList["background-size"]=true;whiteList["baseline-shift"]=false;whiteList["binding"]=false;whiteList["bleed"]=false;whiteList["bookmark-label"]=false;whiteList["bookmark-level"]=false;whiteList["bookmark-state"]=false;whiteList["border"]=true;whiteList["border-bottom"]=true;whiteList["border-bottom-color"]=true;whiteList["border-bottom-left-radius"]=true;whiteList["border-bottom-right-radius"]=true;whiteList["border-bottom-style"]=true;whiteList["border-bottom-width"]=true;whiteList["border-collapse"]=true;whiteList["border-color"]=true;whiteList["border-image"]=true;whiteList["border-image-outset"]=true;whiteList["border-image-repeat"]=true;whiteList["border-image-slice"]=true;whiteList["border-image-source"]=true;whiteList["border-image-width"]=true;whiteList["border-left"]=true;whiteList["border-left-color"]=true;whiteList["border-left-style"]=true;whiteList["border-left-width"]=true;whiteList["border-radius"]=true;whiteList["border-right"]=true;whiteList["border-right-color"]=true;whiteList["border-right-style"]=true;whiteList["border-right-width"]=true;whiteList["border-spacing"]=true;whiteList["border-style"]=true;whiteList["border-top"]=true;whiteList["border-top-color"]=true;whiteList["border-top-left-radius"]=true;whiteList["border-top-right-radius"]=true;whiteList["border-top-style"]=true;whiteList["border-top-width"]=true;whiteList["border-width"]=true;whiteList["bottom"]=false;whiteList["box-decoration-break"]=true;whiteList["box-shadow"]=true;whiteList["box-sizing"]=true;whiteList["box-snap"]=true;whiteList["box-suppress"]=true;whiteList["break-after"]=true;whiteList["break-before"]=true;whiteList["break-inside"]=true;whiteList["caption-side"]=false;whiteList["chains"]=false;whiteList["clear"]=true;whiteList["clip"]=false;whiteList["clip-path"]=false;whiteList["clip-rule"]=false;whiteList["color"]=true;whiteList["color-interpolation-filters"]=true;whiteList["column-count"]=false;whiteList["column-fill"]=false;whiteList["column-gap"]=false;whiteList["column-rule"]=false;whiteList["column-rule-color"]=false;whiteList["column-rule-style"]=false;whiteList["column-rule-width"]=false;whiteList["column-span"]=false;whiteList["column-width"]=false;whiteList["columns"]=false;whiteList["contain"]=false;whiteList["content"]=false;whiteList["counter-increment"]=false;whiteList["counter-reset"]=false;whiteList["counter-set"]=false;whiteList["crop"]=false;whiteList["cue"]=false;whiteList["cue-after"]=false;whiteList["cue-before"]=false;whiteList["cursor"]=false;whiteList["direction"]=false;whiteList["display"]=true;whiteList["display-inside"]=true;whiteList["display-list"]=true;whiteList["display-outside"]=true;whiteList["dominant-baseline"]=false;whiteList["elevation"]=false;whiteList["empty-cells"]=false;whiteList["filter"]=false;whiteList["flex"]=false;whiteList["flex-basis"]=false;whiteList["flex-direction"]=false;whiteList["flex-flow"]=false;whiteList["flex-grow"]=false;whiteList["flex-shrink"]=false;whiteList["flex-wrap"]=false;whiteList["float"]=false;whiteList["float-offset"]=false;whiteList["flood-color"]=false;whiteList["flood-opacity"]=false;whiteList["flow-from"]=false;whiteList["flow-into"]=false;whiteList["font"]=true;whiteList["font-family"]=true;whiteList["font-feature-settings"]=true;whiteList["font-kerning"]=true;whiteList["font-language-override"]=true;whiteList["font-size"]=true;whiteList["font-size-adjust"]=true;whiteList["font-stretch"]=true;whiteList["font-style"]=true;whiteList["font-synthesis"]=true;whiteList["font-variant"]=true;whiteList["font-variant-alternates"]=true;whiteList["font-variant-caps"]=true;whiteList["font-variant-east-asian"]=true;whiteList["font-variant-ligatures"]=true;whiteList["font-variant-numeric"]=true;whiteList["font-variant-position"]=true;whiteList["font-weight"]=true;whiteList["grid"]=false;whiteList["grid-area"]=false;whiteList["grid-auto-columns"]=false;whiteList["grid-auto-flow"]=false;whiteList["grid-auto-rows"]=false;whiteList["grid-column"]=false;whiteList["grid-column-end"]=false;whiteList["grid-column-start"]=false;whiteList["grid-row"]=false;whiteList["grid-row-end"]=false;whiteList["grid-row-start"]=false;whiteList["grid-template"]=false;whiteList["grid-template-areas"]=false;whiteList["grid-template-columns"]=false;whiteList["grid-template-rows"]=false;whiteList["hanging-punctuation"]=false;whiteList["height"]=true;whiteList["hyphens"]=false;whiteList["icon"]=false;whiteList["image-orientation"]=false;whiteList["image-resolution"]=false;whiteList["ime-mode"]=false;whiteList["initial-letters"]=false;whiteList["inline-box-align"]=false;whiteList["justify-content"]=false;whiteList["justify-items"]=false;whiteList["justify-self"]=false;whiteList["left"]=false;whiteList["letter-spacing"]=true;whiteList["lighting-color"]=true;whiteList["line-box-contain"]=false;whiteList["line-break"]=false;whiteList["line-grid"]=false;whiteList["line-height"]=false;whiteList["line-snap"]=false;whiteList["line-stacking"]=false;whiteList["line-stacking-ruby"]=false;whiteList["line-stacking-shift"]=false;whiteList["line-stacking-strategy"]=false;whiteList["list-style"]=true;whiteList["list-style-image"]=true;whiteList["list-style-position"]=true;whiteList["list-style-type"]=true;whiteList["margin"]=true;whiteList["margin-bottom"]=true;whiteList["margin-left"]=true;whiteList["margin-right"]=true;whiteList["margin-top"]=true;whiteList["marker-offset"]=false;whiteList["marker-side"]=false;whiteList["marks"]=false;whiteList["mask"]=false;whiteList["mask-box"]=false;whiteList["mask-box-outset"]=false;whiteList["mask-box-repeat"]=false;whiteList["mask-box-slice"]=false;whiteList["mask-box-source"]=false;whiteList["mask-box-width"]=false;whiteList["mask-clip"]=false;whiteList["mask-image"]=false;whiteList["mask-origin"]=false;whiteList["mask-position"]=false;whiteList["mask-repeat"]=false;whiteList["mask-size"]=false;whiteList["mask-source-type"]=false;whiteList["mask-type"]=false;whiteList["max-height"]=true;whiteList["max-lines"]=false;whiteList["max-width"]=true;whiteList["min-height"]=true;whiteList["min-width"]=true;whiteList["move-to"]=false;whiteList["nav-down"]=false;whiteList["nav-index"]=false;whiteList["nav-left"]=false;whiteList["nav-right"]=false;whiteList["nav-up"]=false;whiteList["object-fit"]=false;whiteList["object-position"]=false;whiteList["opacity"]=false;whiteList["order"]=false;whiteList["orphans"]=false;whiteList["outline"]=false;whiteList["outline-color"]=false;whiteList["outline-offset"]=false;whiteList["outline-style"]=false;whiteList["outline-width"]=false;whiteList["overflow"]=false;whiteList["overflow-wrap"]=false;whiteList["overflow-x"]=false;whiteList["overflow-y"]=false;whiteList["padding"]=true;whiteList["padding-bottom"]=true;whiteList["padding-left"]=true;whiteList["padding-right"]=true;whiteList["padding-top"]=true;whiteList["page"]=false;whiteList["page-break-after"]=false;whiteList["page-break-before"]=false;whiteList["page-break-inside"]=false;whiteList["page-policy"]=false;whiteList["pause"]=false;whiteList["pause-after"]=false;whiteList["pause-before"]=false;whiteList["perspective"]=false;whiteList["perspective-origin"]=false;whiteList["pitch"]=false;whiteList["pitch-range"]=false;whiteList["play-during"]=false;whiteList["position"]=false;whiteList["presentation-level"]=false;whiteList["quotes"]=false;whiteList["region-fragment"]=false;whiteList["resize"]=false;whiteList["rest"]=false;whiteList["rest-after"]=false;whiteList["rest-before"]=false;whiteList["richness"]=false;whiteList["right"]=false;whiteList["rotation"]=false;whiteList["rotation-point"]=false;whiteList["ruby-align"]=false;whiteList["ruby-merge"]=false;whiteList["ruby-position"]=false;whiteList["shape-image-threshold"]=false;whiteList["shape-outside"]=false;whiteList["shape-margin"]=false;whiteList["size"]=false;whiteList["speak"]=false;whiteList["speak-as"]=false;whiteList["speak-header"]=false;whiteList["speak-numeral"]=false;whiteList["speak-punctuation"]=false;whiteList["speech-rate"]=false;whiteList["stress"]=false;whiteList["string-set"]=false;whiteList["tab-size"]=false;whiteList["table-layout"]=false;whiteList["text-align"]=true;whiteList["text-align-last"]=true;whiteList["text-combine-upright"]=true;whiteList["text-decoration"]=true;whiteList["text-decoration-color"]=true;whiteList["text-decoration-line"]=true;whiteList["text-decoration-skip"]=true;whiteList["text-decoration-style"]=true;whiteList["text-emphasis"]=true;whiteList["text-emphasis-color"]=true;whiteList["text-emphasis-position"]=true;whiteList["text-emphasis-style"]=true;whiteList["text-height"]=true;whiteList["text-indent"]=true;whiteList["text-justify"]=true;whiteList["text-orientation"]=true;whiteList["text-overflow"]=true;whiteList["text-shadow"]=true;whiteList["text-space-collapse"]=true;whiteList["text-transform"]=true;whiteList["text-underline-position"]=true;whiteList["text-wrap"]=true;whiteList["top"]=false;whiteList["transform"]=false;whiteList["transform-origin"]=false;whiteList["transform-style"]=false;whiteList["transition"]=false;whiteList["transition-delay"]=false;whiteList["transition-duration"]=false;whiteList["transition-property"]=false;whiteList["transition-timing-function"]=false;whiteList["unicode-bidi"]=false;whiteList["vertical-align"]=false;whiteList["visibility"]=false;whiteList["voice-balance"]=false;whiteList["voice-duration"]=false;whiteList["voice-family"]=false;whiteList["voice-pitch"]=false;whiteList["voice-range"]=false;whiteList["voice-rate"]=false;whiteList["voice-stress"]=false;whiteList["voice-volume"]=false;whiteList["volume"]=false;whiteList["white-space"]=false;whiteList["widows"]=false;whiteList["width"]=true;whiteList["will-change"]=false;whiteList["word-break"]=true;whiteList["word-spacing"]=true;whiteList["word-wrap"]=true;whiteList["wrap-flow"]=false;whiteList["wrap-through"]=false;whiteList["writing-mode"]=false;whiteList["z-index"]=false;function onAttr(name,value,options){}function onIgnoreAttr(name,value,options){}exports.whiteList=whiteList;exports.onAttr=onAttr;exports.onIgnoreAttr=onIgnoreAttr},{}],8:[function(require,module,exports){var DEFAULT=require("./default");var FilterCSS=require("./css");function filterCSS(html,options){var xss=new FilterCSS(options);return xss.process(html)}exports=module.exports=filterCSS;exports.FilterCSS=FilterCSS;for(var i in DEFAULT)exports[i]=DEFAULT[i];if(typeof define==="function"&&define.amd){define(function(){return module.exports})}if(typeof window!=="undefined"){window.filterCSS=module.exports}},{"./css":6,"./default":7}],9:[function(require,module,exports){var _=require("./util");function parseStyle(css,onAttr){css=_.trimRight(css);if(css[css.length-1]!==";")css+=";";var cssLength=css.length;var isParenthesisOpen=false;var lastPos=0;var i=0;var retCSS="";function addNewAttr(){if(!isParenthesisOpen){var source=_.trim(css.slice(lastPos,i));var j=source.indexOf(":");if(j!==-1){var name=_.trim(source.slice(0,j));var value=_.trim(source.slice(j+1));if(name){var ret=onAttr(lastPos,retCSS.length,name,value,source);if(ret)retCSS+=ret+"; "}}}lastPos=i+1}for(;i<cssLength;i++){var c=css[i];if(c==="/"&&css[i+1]==="*"){var j=css.indexOf("*/",i+2);if(j===-1)break;i=j+1;lastPos=i+1;isParenthesisOpen=false}else if(c==="("){isParenthesisOpen=true}else if(c===")"){isParenthesisOpen=false}else if(c===";"){if(isParenthesisOpen){}else{addNewAttr()}}else if(c==="\n"){addNewAttr()}}return _.trim(retCSS)}module.exports=parseStyle},{"./util":10}],10:[function(require,module,exports){module.exports={indexOf:function(arr,item){var i,j;if(Array.prototype.indexOf){return arr.indexOf(item)}for(i=0,j=arr.length;i<j;i++){if(arr[i]===item){return i}}return-1},forEach:function(arr,fn,scope){var i,j;if(Array.prototype.forEach){return arr.forEach(fn,scope)}for(i=0,j=arr.length;i<j;i++){fn.call(scope,arr[i],i,arr)}},trim:function(str){if(String.prototype.trim){return str.trim()}return str.replace(/(^\s*)|(\s*$)/g,"")},trimRight:function(str){if(String.prototype.trimRight){return str.trimRight()}return str.replace(/(\s*$)/g,"")}}},{}]},{},[2]);

/*! root路径内部依赖 */
seajs.root = seajs.data.base.replace(/\/sdk\/$/,'');
/*! seajs设置 */
seajs.config({
	base: seajs.root + "/sdk/modules",
	paths: {
		"lib": seajs.root + "/res/lib",
		"sdk": seajs.root + "/sdk",
		"view": seajs.root + "/view"
	},
	alias: {
		"audio" : "audio/audio",
		"validform": "validform/validform",
		"raty": "raty/raty"
	}
});
"use strict";
/*! app core */
(function(global) {
    var app = {};
    
    var isString = function(obj) {
        return Object.prototype.toString.call(obj) === "[object String]"
    };
    var define = function(name, factory) {
        if ($.isFunction(name)) {
            name = "";
            factory = name
        }
        if (!name || !isString(name) || !$.isFunction(factory)) {
            return console.warn('app.define参数错误!');
        }
        var mod = {
            exports: {}
        };
        var res = factory.call(this, $, mod.exports, mod);
        var exports = mod.exports || res;
        if (name in app) {
            app[name] = [app.name];
            app[name].push(exports)
        } else {
            app[name] = exports
        }
        return exports
    }; 
    var require = function(name) {
        if (!name) {
            throw new Error(errorInfo.moduleName)
        }
        if (!isString(name)) {
            return name
        }
        var res = app[name];
        if ($.isArray(res) && res.length < 2) {
            return res[0]
        }
        return res || null
    };

    var isApiReady = false;
    var readyQueue = [];
    var execReadyQueue = function() {
    	var i = 0, len = readyQueue.length;
        for (; i < len; i++) {
            readyQueue[i]()
        };
        readyQueue.length = 0;
    };
    var ready = function(callback) {
    	callback = $.isFunction(callback) ? callback: function() {};
        readyQueue.push(callback);
        if (isApiReady) {
            execReadyQueue();
            return null
        };
        if ("api" in window) {
            isApiReady = true;
            execReadyQueue();
            return null
        } else {
            if (readyQueue.length > 1) {
                return null
            };
            if ($.isFunction(window.apiready)) {
                readyQueue.unshift(window.apiready)
            };
            window.apiready = function() {
                isApiReady = true;
                execReadyQueue()
            }
        }
    };
    var pauseCbQueue = [];
    var execPauseQueue = function() {
    	var i = 0, len = pauseCbQueue.length
        for (; i < len; i++) {
            pauseCbQueue[i].call(app)
        };
        pauseCbQueue.length = 0
    };
    var pause = function(cb){
    	if(typeof cb === 'function'){
    		pauseCbQueue.push(cb)
    	};
    	api.addEventListener({
			name: 'pause'
		}, function(ret, err) {
			if(pauseCbQueue.length){
				execPauseQueue()
			}else{
				return null;
			}
		});
    };

    var resumeCbQueue = [];
    var execResumeQueue = function() {
    	var i = 0, len = resumeCbQueue.length
        for (; i < len; i++) {
            resumeCbQueue[i].call(app)
        };
        resumeCbQueue.length = 0
    };
    var resume = function(cb){
    	if(typeof cb === 'function'){
    		resumeCbQueue.push(cb)
    	};
    	api.addEventListener({
		    name:'resume'
		}, function(ret, err){        
		    if(resumeCbQueue.length){
				execResumeQueue()
			}else{
				return null;
			}
		});
    };

    var monitorKey = function(id, callback) {
    	var keyName;
    	if(id==0){
    		keyName = 'keyback';
    	} else if(id==1){
    		keyName = 'keymenu';
    	} else {
    		return console.log('app.monitorKey参数错误')
    	};
    	api.addEventListener({
		    name: keyName
		}, function(ret, err) {
		    callback()
		});
    };

    var exit = function(silent){
    	if(!app.ls.val('remember')){
    		app.ls.remove('user');
    	}
    	api.closeWidget({
    		silent: false,
    		animation: {
		        subType: 'from_bottom',
		        duration: appcfg.set.animateDuration
		    }
    	})
    };

    //app.log
	var logFilePath = appcfg.log.path || "fs://appcloudlog.txt";
    var log = function(msg) {
    	var timestamp = function(){
            var _d = new Date();
            return "\n"+_d.getHours()+':'+_d.getMinutes()+':'+_d.getSeconds()+"\n"+msg;
        };
        var writeLog = function() {
        	if(appcfg.product){
        		api.writeFile({
				    path: logFilePath,
				    data: timestamp(),
				    append: true
				}, function(ret, err) {
				    if (ret.status) {
				        
				    } else {
				    	console.log(err)
				    }
				});
        	}else{
        		console.log(timestamp())
        	}
        };
        writeLog()
    };

    $.extend(app, {
    	require: require,
    	define: define,
        isString: isString,
        ready: ready,
        pause: pause,
        resume: resume,
        monitorKey: monitorKey,
        exit: exit,
        log: log
    });
    global.app = app;
})(this);

app.define("ls", function($, exports, module) {
    var ls = window.localStorage,
    i = 0,
    len = 0;
    function remove(key) {
        if (key && app.isString(key)) {
            ls.removeItem(key)
        }
    };
    function leaveSpace() {
        var space = 1024 * 1024 * 5 - unescape(encodeURIComponent(JSON.stringify(ls))).length;
        return space
    };
    function val(key, value) {
        if (value === void(0)) {
            return ls.getItem(key)
        }
        if($.isPlainObject(value) || $.isArray(value)){
        	value = JSON.stringify(value);
        };
        ls.setItem(key, value);
    };
    module.exports = {
        leaveSpace: leaveSpace,
        remove: remove,
        val: val
    }
});
(function(){
	//loading
    var loading = {
    	hide:function(mark){
    		if(window.api){
    			api.hideProgress();
    		}
    		
    	},
    	show:function(msg,opt){
    		if(window.api){
    			api.showProgress({
				    animationType: 'fade',
				    title: '',
				    text: msg || '努力加载中.'
				});
    		}
    	}
    };
	//getScript
	var _getScript = function(road, callback, option) {
		if (road && road.split || ($.isArray(road) && road.length)) {
			var def = {
					css: false,
					jquery: false,
					rely: false
				},
				opt = $.extend({}, def, option || {}),
				loadScript = function(road, hold){
					/*
					@road:请求url
					@hold:是否阻断默认回调，为function将阻断默认回调并执行自身
					*/
					var file = seajs.resolve(road),
						scriptError = function(xhr, settings, exception){
							app.window.openToast('加载失败，正在重试~'+exception,1000);
							load(function(){
								app.window.openToast('加载失败了!');
							});
						},
						scriptOnload = function(data, status) {
							if(!data){
								data = status = null
							}
							if(hold && typeof(hold)==='function'){
								hold();
							}else if(typeof(callback) === 'function'){
								if(data){
									callback(data, status);
								}else{
									callback();
								}
								
							}
						},
						load = function(errorCallback){
							//$.getScript(file).done(scriptOnload).fail(errorCallback || scriptError);
							var errorCallback = errorCallback || scriptError;
							var script = document.createElement("script");
		                    script.onload = scriptOnload
		                    script.onerror = errorCallback;
		                    script.src = file;
		                    document.head.appendChild(script);
						};
					if(opt.css){
						var headNode = document.getElementsByTagName('head')[0],
							cssfile = '', 
							_css;
						if(opt.css.split){
							cssfile = opt.css;
						}else{
							cssfile = file.replace(/\.js$/,".css");
						};
						_css = document.createElement('link');
						_css.rel = "stylesheet";
						_css.onerror = function(e){
							headNode.removeChild(_css);
							cssfile = null;
							_css = null;
							return null;
						};
						_css.href = cssfile;
						headNode.appendChild(_css);
						headNode = cssfile = _css = null;
					};
					load();
				};
			if (opt.jquery) {
				window.$ = $;
			}
			if(road.split){
				loadScript(road);
			}else if(road.length){
				var scriptsLength = road.length,
					scriptsCount = 0;
				if(opt.rely){
					//线性依赖
					var getNext = function(isLast){
							var hold;
							if(!isLast){
								hold = function(){
									scriptsCount++;
									getNext(scriptsLength>scriptsCount);
								}
							}
							loadScript(road[scriptsCount], hold);
						}
					getNext();
				}else{
					//同时发起
					var scriptRoad;
					while(scriptsCount<scriptsLength){
						scriptRoad = road[scriptsCount];
						scriptsCount++;
						loadScript(scriptRoad, scriptsLength>scriptsCount);
					}
				}
			}
		}
	};
	//openView
	/*
	param:

	duration
	anim
	param
	bar
	closeself
	fullPath
	pop
	[title]
	*/
	
	var _openView = function(param, leval1, leval2) {
		var paramObj = null,
			dura = appcfg.set.animateDuration,
			anim = appcfg.set.windowAnimate,
			viewName,
			url,
			crossParam;

		if($.isPlainObject(param)){

			paramObj = param;
			dura = paramObj.duration || dura;
			anim = paramObj.anim || anim;
			if(paramObj['param']!==void(0)){
				if(paramObj.param.split){
					crossParam = paramObj.param
				}else{
					var _crossParam = paramObj.param;
					if(!!param['pop']){
						_crossParam['shellIsPop'] = 1
					}
					crossParam = JSON.stringify(_crossParam)
				}
			}else{
				app.ls.remove('crossParam');
			}
		}else if(param!==null && param!==void(0)){
			crossParam = param
		}else{
			param = {};
			app.ls.remove('crossParam');
		};
		app.ls.val('crossParam', crossParam);

		//网页
		if(/^https*\:\/\//.test(leval1)){
			url = leval1;
			if(!!param['bar']){
				return _openView({
					param:$.extend({
						url:url,
						title:param['title'] || ''
					},param),
					closeself: !!param['closeself'],
					type:anim
				}, 'common', 'shell');
			}else{
				viewName = 'webpage'+Math.random();
			}
		}else if(param['fullPath']){
			//全路径
			viewName = leval1;
			url = leval1;
		}else {
			//openView路径
			if(leval2 && leval2.split){
				viewName = leval1 + '_' + leval2;
				url = seajs.root + '/view/' + leval1 + '/' + leval2 + '/temp.html';
			}else{
				viewName = leval1;
				url = seajs.root + '/view/' + leval1 + '/temp.html';
			}
		};
		if(!!param['pop']){
			//弹出浮层
			app.openPopover(viewName, url, "", 0, param['top'] || 0, '', param['height'] || '', 0);
		}else if(!!param['bar']){
			_openView({
				param:{
					url:url,
					title:JSON.parse(crossParam)['title'] || '',
					show: 1
				},
				type:anim
			},'common', 'shell');
		} else {
			if(param['closeback']){
				window.isBack = true;
				app.ls.val('winCloseCondition','closeback');
			}
			if(param['closeself']){
				window.closeByNew = true;
				app.ls.val('winCloseCondition','closeByNew');
			}
			app.window.open($.extend($.isPlainObject(param) ? param : {}, {
			    name: viewName,
			    url: url,
			    data: crossParam,
			    anim: anim
			}));
		}
	};
	
	//图片缓存
	$.fn.cacheImg = function(){
		var placeholderPic = seajs.root+'/res/img/placeholder.jpg';
		var remoteEle;
		if($(this).data('remote')){
			remoteEle = $(this);
		}else{
			remoteEle = $(this).find('[data-remote]');
		}
		remoteEle.each(function(i,e){
			var remote = $(e).data('remote') || placeholderPic;
			api.imageCache({
			    url: remote
			}, function(ret, err) {
			    var url = ret.url;
			    if(e.tagName.toLowerCase()==='img'){
					$(e).attr('src',url);
				}else{
					$(e).css("backgroundImage", "url(" + url + ")");
				}
				$(e).removeAttr('data-remote');
			});
		});
		return $(this)
	};

	//加载主题
	window.applyTheme = function(theme){
		var localStyleData = app.ls.val('theme-cfg') ? JSON.parse(app.ls.val('theme-cfg')) : {}, 
			styleData = $.extend({}, appcfg.defaultTheme, localStyleData, theme || localStyleData || {}), 
			themeRender = function(temp){
				var etplEngine = new etpl.Engine(),
					styleRender,
					styleString;
				etplEngine.compile(temp);
				styleRender = etplEngine.getRenderer('themeTemplate');
				styleString = styleRender(styleData);
				if($('#theme-style').length){
					$('#theme-style').html(styleString);
				}else{
					seajs.importStyle(styleString,'theme-style');
				};
				$('body').addClass('app-theme');
			},
			rootSize = app.ls.val('rootSize');
		//根字号
		if(rootSize){
			document.documentElement.style.fontSize = rootSize;
		}else{
			app.ready(function(){
				var phoneScale = api.winWidth / 640;
				var rootSize = parseInt(phoneScale * 100) + 'px';
				app.ls.val('rootSize', rootSize);
				document.documentElement.style.fontSize = rootSize;
			})
		}
		//沉浸式状态栏
		var statusBarAppearance = app.ls.val('statusBar'); 
		if(statusBarAppearance){
			$('body').addClass('statusBarAppearance');
		}else{
			app.ready(function(){
				var statusBarAppearance = api.statusBarAppearance;
				if (statusBarAppearance) {
					app.ls.val('statusBar', statusBarAppearance);
					$('body').addClass('statusBarAppearance');
				}
			})
		}
		if($.isPlainObject(theme)){
			app.ls.val('theme-cfg',theme)
		};
		if(app.ls.val('theme-css')){
			themeRender(app.ls.val('theme-css'));
		}else{
			$.ajax({
				type:'get',
				url:seajs.root+'/res/temp/theme.css',
				dataType:'text'
			}).done(function(temp){
				themeRender(temp);
				app.ls.val('theme-css',temp);
			}).fail(function(o){
				console.warn('加载主题失败：'+o.status);
			});
		}
	};
	applyTheme();
	var rootApplyTheme = function(option){
		option = $.isPlainObject(option) ? option : {};
		app.window.evaluateScript('', 'applyTheme('+JSON.stringify(option)+')');
	};
	var _push = {
		init: function(cb) {
			if(!$.isFunction(cb)){
				return null;
			}
			this.pushtimer = setTimeout(this.stop, appcfg.set.outime);
			api.setRefreshHeaderInfo({
				visible: true,
				bgColor: '#ccc',
				textColor: '#fff',
				textDown: '下拉刷新...',
				textUp: '松开刷新...',
				showTime: true
			}, function(ret, err) {
				cb()
			});
		},
		stop: function() {
			api.refreshHeaderLoadDone();
			this.pushtimer && (this.pushtimer = clearTimeout(this.pushtimer));
		}
	}
	var _render = function(template, data, dom, reload, cb) {
		app.loading.hide();
		if (!template || !template.split || !$.isPlainObject(data) || !$(dom).length) {
			return console.log('render()参数错误');
		};
		var temp = etpl.compile(template);
		var _html = temp(data);
		if(reload){
			$(dom).html(_html);
		}else{
			$(dom).append(_html);
		}
		$(dom).cacheImg().find('img[data-src]').each(function(i, e) {
			$(e).attr('src', $(e).data('src')).removeAttr('data-src');
		});
		if ($.isFunction(cb)) {
			cb(_html);
		}
	}
	
    $.extend(app, {
        loading: loading,
        getScript: _getScript,
        openView: _openView,
        applyTheme: rootApplyTheme,
        push: _push,
        render: _render
    });
})()
app.define("window", function($, exports, module) {
    var subscribeGlobslQueue = [];
    var bounceCallQueue = [];
    var multiPopoverQueue = {};
    var currentOS = "";
    var keyFuncMapper = {};

    function open(name, url, data, anim, dura){
    	var argObj = null;
        if (arguments.length === 1 && $.isPlainObject(name)) {
            argObj = name;
            name = argObj["name"];
            url = argObj["url"];
            data = argObj["data"];
            anim = argObj["anim"];
            dura = argObj["dura"];
        };
        if(!$.isPlainObject(data)){
        	data = {};
        }
        anim = anim || appcfg.set.windowAnimate;
        dura = dura || appcfg.set.animateDuration;
        if(window.api){
        	api.openWin($.extend($.isPlainObject(argObj) ? argObj : {}, {
			    name: name,
			    url: url,
			    pageParam: data,
			    animation: {
			    	type:anim,
					subType:"from_right",
					duration:dura
			    },
			    progress: {
			    	type: 'page'
			    }
			}));
        }else{
        	window.location.href = url
        }
    	
    }

    function close(winName, animId, animDuration) {
        if (animId===void(0)) {
            animId = appcfg.set.windowAnimate;
        };
        if (!animDuration) {
            animDuration = appcfg.set.animateDuration || 300;
        };
        if(!window.api){
        	return window.history.go(-1); 
        };
        if(!!winName){
    		api.closeWin({
			    name: winName
			});
        }else{
        	api.closeWin()
        }
    };

    function openToast(msg, duration, position) {
        var argObj = null;
        if (arguments.length === 1 && $.isPlainObject(msg)) {
            argObj = msg;
            msg = argObj["msg"];
            duration = argObj["duration"];
            position = argObj["position"];
        };
        duration = duration || 2000;
        position = position || 'bottom';
        api.toast({
		    msg: msg,
		    duration: duration,
		    location: position,
		    global: true
		});
    };

    function popoverElement(id, url, name) {
        var argObj = null, top, left, bounce = false;
        if (arguments.length === 1 && $.isPlainObject(id)) {
            argObj = id;
            id = argObj["id"] || 0;
            url = argObj["url"];
            top = argObj["top"];
            left = argObj["left"];
            name = argObj["name"];
            bounce = argObj["bounce"];
            data = argObj["data"];
        };
        var ele = $("#" + id);
        var width = ele.width();
        var height = ele.height();
        if(!ele.length){
        	return console.log('app.window.popoverElement()方法参数有误:'+api.winName)
        }
        top = isNaN(parseInt(top, 10)) ? ele.offset().top : top;
        top = parseInt(top, 10);
        left = isNaN(parseInt(left, 10)) ? ele.offset().left: left;
        left = parseInt(left, 10);
        name = name ? name: id;
        openPopover(name, url, data, left, top, width, height, 0, bounce)
    };

    function openPopover(name, url, data, left, top, width, height, bottomMargin, bounces) {
        var argObj = null;
        if (arguments.length === 1 && $.isPlainObject(name)) {
            argObj = name;
            name = argObj["name"];
            url = argObj["url"];
            data = argObj["data"];
            left = argObj["left"];
            top = argObj["top"];
            width = argObj["width"];
            height = argObj["height"];
            bottomMargin = argObj["bottomMargin"];
            bounces = argObj["bounces"];
        };
        left = left || 0;
        top = top || 0;
        height = height || 'auto';
        width = width || 'auto';
        bottomMargin = bottomMargin || 0;
        if($.isPlainObject(data)){
        	app.ls.val('crossParam', JSON.stringify(data));
        }else if(data && data.split){
        	app.ls.val('crossParam', data);
        }

        app.ls.val('popoverTopHash',top);
        
        api.openFrame({
		    name: name,
		    url: url,
		    rect: {
		        x: left,
		        y: top,
		        w: width,
		        h: height,
		        marginBottom: bottomMargin
		    },
		    hScrollBarEnabled:false,
		    pageParam: $.isPlainObject(data) ? data : {},
		    bounces: !!bounces
		});
    };
    
    function resizePopover(name, left, top, width, height) {
        var argObj, x, y, w, h;
        if (arguments.length === 1 && $.isPlainObject(name)) {
            argObj = name;
            name = argObj["name"];
            x = argObj["left"];
            y = argObj["top"];
            w = argObj["width"];
            h = argObj["height"]
        };
        x = x || 0;
        y = y || 0;
        w = w || 0;
        h = h || 0;
        x = parseInt(x, 10);
        x = isNaN(x) ? 0: x;
        y = parseInt(y, 10);
        y = isNaN(y) ? 0: y;
        w = parseInt(w, 10);
        w = isNaN(w) ? 0: w;
        h = parseInt(h, 10);
        h = isNaN(h) ? 0: h;
        api.setFrameAttr({
		    name: name,
		    rect: {
		        x: x,
		        y: y,
		        w: w,
		        h: h
		    }
		});
    };
    function subscribe(eventName, callback) {
        api.addEventListener({
		    name: eventName
		}, function(ret){
			callback(ret.value)
		});
    };
    function publish(eventName, msg) {
        api.sendEvent({
		    name: eventName,
		    extra: msg
		});
    };
    function evaluateScript(name, scriptContent){
    	api.execScript({
		    name: name,
		    script: scriptContent
		});
    };
    function evaluatePopoverScript(name, popName, scriptContent){
    	api.execScript({
		    name: name,
		    frameName: popName,
		    script: scriptContent
		});
    };
	var touchObj = {
		clear: function() {
			this.timer && clearTimeout(this.timer);
			this.timer = null;
			this.x = null;
			this.y = null;
			this.lastMove = null;
		}
	};
	$('body').on('touchstart', function(e) {
		if (!touchObj.timer) {
			touchObj.timer = setTimeout(function() {
				touchObj.timer = clearTimeout(touchObj.timer);
			}, 150);
			touchObj.x = e.originalEvent.touches[0].clientX;
			touchObj.y = e.originalEvent.touches[0].clientY;
		}
	}).on('touchmove', function(e) {
		if (touchObj.x && touchObj.y) {
			if (!touchObj.timer) {
				touchObj.x = touchObj.x - e.originalEvent.touches[0].clientX;
				touchObj.y = touchObj.y - e.originalEvent.touches[0].clientY;
				if (Math.abs(touchObj.y) > Math.abs(touchObj.x)) {
					touchObj.lastMove = 'y';
					if (touchObj.y > 0) {
						windowEventDequeue('scrolldown');
					} else {
						windowEventDequeue('scrollup');
					}
				} else {
					touchObj.lastMove = 'x';
					if (touchObj.x > 0) {
						windowEventDequeue('swipright');
					} else {
						windowEventDequeue('swipleft');
					}
				}
				return touchObj.clear();
			}
		}
	}).on('touchend', function() {
		touchObj.clear();
	}).on('touchcancel', function() {
		touchObj.clear();
	});

	var windowEventQueue = {};
	var windowEventDequeue = function(type){
		windowEventQueue[type] && windowEventQueue[type].forEach(function(e,i){
		   	if(typeof e === 'function'){
	    		e();
	    	}
	   });
	}

    function events(type, cb){
    	var noSupport;
    	if(!type || !type.split){
    		return null;
    	}
    	if(!windowEventQueue[type]){
    		windowEventQueue[type] = [];
    	}
    	if(typeof cb === 'function'){
    		windowEventQueue[type].push(cb);
    	}
    	switch(type){
    		case "pause":
    			if(!windowEventQueue[type].length){
    				api.addEventListener({
					    name: 'viewdisappear'
					}, function(ret, err){        
					   windowEventDequeue(type);
					});
    			}
    		break;
    		case "resume":
    			if(!windowEventQueue[type].length){
    				api.addEventListener({
					    name: 'viewappear'
					}, function(ret, err){        
					   windowEventDequeue(type);
					});
    			}
    		break;
    		case "scrollup":

    		break;
    		case "scrolldown":

    		break;
    		case "swipleft":

    		break;
    		case "swipright":

    		break;
    		default:
    			noSupport = true;
    			console.warn('不支持的window事件类型：' + type);
    	}
    	
    };

    module.exports = {
    	open: open,
    	close: close,
    	on: events,
        evaluateScript: evaluateScript,
        evaluatePopoverScript: evaluatePopoverScript,
        openToast: openToast,
        popoverElement: popoverElement,
        openPopover: openPopover,
        resizePopover: resizePopover,
        publish: publish,
        subscribe: subscribe
    }
});

(function() {
	//app.ajax

	//ajax错误处理
	window.catchAjaxError = function(code, status) {
		
		switch (code) {
			case 0:
				app.window.openToast('网络错误，请检查网络连接！'+status, 2500);
				break;
			case 1:
				app.window.openToast('请求超时！', 2500);
				break;
			case 2:
				app.window.openToast('授权错误！', 2500);
				break;
			case 3:
				app.window.openToast('服务端数据异常！', 2500);
				break;
			default: 
				app.window.openToast('服务端错误(' + status + ')', 2500);
				break;
		}
	};

	var requestAjax = function(opt){
		//默认post
		opt.method = opt.type || "post";
		//默认json格式
		if (!opt.dataType) {
			opt.dataType = 'json'
		};
		if (!opt.timeout) {
			opt.timeout = appcfg.set.outime / 1000
		};
		//返回结果处理
		var tempSucc = opt.success;
		var ajaxCallback = function(res, err) {
			if(!res){
				if(typeof(opt['error'])==='function'){
					opt['error']();
				}else{
					app.loading.hide();
					$('#scrollLoadSpinning').hide();
					catchAjaxError(err.code, err.statusCode);
				}
				return null;
			};
			if(opt.dataType==='json' && res['status']===void(0)){
				app.loading.hide();
				app.window.openToast('数据格式错误!',1000);
				app.log('数据格式错误:'+opt.url);
			}else{
				if(res['data'] && res.data.split){
					try{
						res.data = JSON.parse(res.data);
					}catch(e){
						return console.log(e.message + 'row:' + res.data)
					}
				};
				tempSucc(res);
			}
		};
		delete opt.success;
		delete opt.type;
		//请求加密
		if(appcfg.ajax.crypto.enable && $.isPlainObject(opt['data'])){
			var CryptoJS = app.crypto.core;
			var cryptocfg = {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			};
			var keyHex = CryptoJS.enc.Utf8.parse(appcfg.ajax.crypto.secret);
			//加密数据
			var paramData = $.extend({},opt.data);
			opt.data = {
				data:paramData,
				url:opt.url
			};
			opt.url = appcfg.ajax.crypto.url;
			var sign = app.crypto.md5(JSON.stringify(opt.data)+appcfg.ajax.crypto.key);
			var secureData = CryptoJS.TripleDES.encrypt(JSON.stringify(opt.data), keyHex, cryptocfg);
			var secureStr = secureData.ciphertext.toString();
			opt.data = {"data":secureStr,"sign":sign};
			//解密数据
			opt.dataType = 'text';
			tempSucc = ajaxCallback;
			ajaxCallback = function(res, err) {
				if(!res){
					if(typeof(opt['error'])==='function'){
						opt['error']();
					}else{
						app.loading.hide();
						$('#scrollLoadSpinning').hide();
						catchAjaxError(err.code, err.statusCode);
					}
					return null;
				};
				if($.isPlainObject(JSON.parse(res))){
					tempSucc(JSON.parse(res));
				}else{
					var mi = $.trim(res);
					var encryptedHexStr = CryptoJS.enc.Hex.parse(mi);
					var encryptedBase64Str = CryptoJS.enc.Base64.stringify(encryptedHexStr); 
					var decrypted = CryptoJS.TripleDES.decrypt({
				        ciphertext: CryptoJS.enc.Base64.parse(encryptedBase64Str)
				    }, keyHex, {
				        mode: CryptoJS.mode.ECB,
				        padding: CryptoJS.pad.Pkcs7
				    });
				    var ming = decrypted.toString(CryptoJS.enc.Utf8);
					tempSucc(JSON.parse(ming));
				}
			};
		};
		opt.data = {
			values: opt.data
		};
		api.ajax(opt, ajaxCallback);
	};

    $.extend(app, {
    	"ajax": requestAjax
    });
})();

//浮动窗口扩展window.selfTop属性
if (app.ls.val('popoverTopHash')) {
	window.selfTop = app.ls.val('popoverTopHash');
	app.ls.remove('popoverTopHash');
} else {
	window.selfTop = 0;
}


app.ready(function() {
	//前后台状态
	app.window.on('pause', function() {
		window.isBack = true;
	});
	app.window.on('resume', function() {
		window.isBack = false;
	});

	window.platform = api.systemType;
	window.version = api.systemVersion;
	//data-img填充
	setTimeout(function() {
		$('img[data-src]').each(function(i, e) {
			$(e).attr('src', $(e).data('src')).removeAttr('data-src');
		});
	}, appcfg.set.animateDuration);
	//响应关闭指令
	app.window.subscribe('closeback', function(msg) {
		if (api.winName === 'root') return null;
		switch (msg) {
			case "closeByNew": //被openView的新页面关闭
				if (window.closeByNew) {
					setTimeout(function(){
						console.log('closeByNew:' + api.winName);
						api.closeWin({
						    name: api.winName
						});
					},appcfg.set.animateDuration+300)
				}
				break;
			case "closeback": //关闭后台页面
				setTimeout(function(){
					if (!!window.isBack && platform === 'android') {
						console.log('closeback:' + api.winName);
						api.closeWin({
						    name: api.winName
						});
					}
				},appcfg.set.animateDuration+300)
				break;
			default:
				console.log(msg)
		}
	});
	//发布关闭指令
	if(app.ls.val('winCloseCondition')){
		app.window.publish('closeback', app.ls.val('winCloseCondition'));
		setTimeout(function(){
			app.ls.remove('winCloseCondition');
		},100)
	}
	
});