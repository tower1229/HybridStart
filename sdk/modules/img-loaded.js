/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */
(function() {
	function EventEmitter() {}
	var proto = EventEmitter.prototype;
	var exports = this;
	var originalGlobalValue = exports.EventEmitter;

	function indexOfListener(listeners, listener) {
		var i = listeners.length;
		while (i--) {
			if (listeners[i].listener === listener) {
				return i
			}
		}
		return -1
	}
	function alias(name) {
		return function aliasClosure() {
			return this[name].apply(this, arguments)
		}
	}
	proto.getListeners = function getListeners(evt) {
		var events = this._getEvents();
		var response;
		var key;
		if (typeof evt === 'object') {
			response = {};
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					response[key] = events[key]
				}
			}
		} else {
			response = events[evt] || (events[evt] = [])
		}
		return response
	};
	proto.flattenListeners = function flattenListeners(listeners) {
		var flatListeners = [];
		var i;
		for (i = 0; i < listeners.length; i += 1) {
			flatListeners.push(listeners[i].listener)
		}
		return flatListeners
	};
	proto.getListenersAsObject = function getListenersAsObject(evt) {
		var listeners = this.getListeners(evt);
		var response;
		if (listeners instanceof Array) {
			response = {};
			response[evt] = listeners
		}
		return response || listeners
	};
	proto.addListener = function addListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var listenerIsWrapped = typeof listener === 'object';
		var key;
		for (key in listeners) {
			if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
				listeners[key].push(listenerIsWrapped ? listener : {
					listener: listener,
					once: false
				})
			}
		}
		return this
	};
	proto.on = alias('addListener');
	proto.addOnceListener = function addOnceListener(evt, listener) {
		return this.addListener(evt, {
			listener: listener,
			once: true
		})
	};
	proto.once = alias('addOnceListener');
	proto.defineEvent = function defineEvent(evt) {
		this.getListeners(evt);
		return this
	};
	proto.defineEvents = function defineEvents(evts) {
		for (var i = 0; i < evts.length; i += 1) {
			this.defineEvent(evts[i])
		}
		return this
	};
	proto.removeListener = function removeListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var index;
		var key;
		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				index = indexOfListener(listeners[key], listener);
				if (index !== -1) {
					listeners[key].splice(index, 1)
				}
			}
		}
		return this
	};
	proto.off = alias('removeListener');
	proto.addListeners = function addListeners(evt, listeners) {
		return this.manipulateListeners(false, evt, listeners)
	};
	proto.removeListeners = function removeListeners(evt, listeners) {
		return this.manipulateListeners(true, evt, listeners)
	};
	proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
		var i;
		var value;
		var single = remove ? this.removeListener : this.addListener;
		var multiple = remove ? this.removeListeners : this.addListeners;
		if (typeof evt === 'object' && !(evt instanceof RegExp)) {
			for (i in evt) {
				if (evt.hasOwnProperty(i) && (value = evt[i])) {
					if (typeof value === 'function') {
						single.call(this, i, value)
					} else {
						multiple.call(this, i, value)
					}
				}
			}
		} else {
			i = listeners.length;
			while (i--) {
				single.call(this, evt, listeners[i])
			}
		}
		return this
	};
	proto.removeEvent = function removeEvent(evt) {
		var type = typeof evt;
		var events = this._getEvents();
		var key;
		if (type === 'string') {
			delete events[evt]
		} else if (type === 'object') {
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					delete events[key]
				}
			}
		} else {
			delete this._events
		}
		return this
	};
	proto.removeAllListeners = alias('removeEvent');
	proto.emitEvent = function emitEvent(evt, args) {
		var listeners = this.getListenersAsObject(evt);
		var listener;
		var i;
		var key;
		var response;
		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				i = listeners[key].length;
				while (i--) {
					listener = listeners[key][i];
					if (listener.once === true) {
						this.removeListener(evt, listener.listener)
					}
					response = listener.listener.apply(this, args || []);
					if (response === this._getOnceReturnValue()) {
						this.removeListener(evt, listener.listener)
					}
				}
			}
		}
		return this
	};
	proto.trigger = alias('emitEvent');
	proto.emit = function emit(evt) {
		var args = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(evt, args)
	};
	proto.setOnceReturnValue = function setOnceReturnValue(value) {
		this._onceReturnValue = value;
		return this
	};
	proto._getOnceReturnValue = function _getOnceReturnValue() {
		if (this.hasOwnProperty('_onceReturnValue')) {
			return this._onceReturnValue
		} else {
			return true
		}
	};
	proto._getEvents = function _getEvents() {
		return this._events || (this._events = {})
	};
	EventEmitter.noConflict = function noConflict() {
		exports.EventEmitter = originalGlobalValue;
		return EventEmitter
	};
	if (typeof define === 'function' && define.amd) {
		define('eventEmitter/EventEmitter', [], function() {
			return EventEmitter
		})
	} else if (typeof module === 'object' && module.exports) {
		module.exports = EventEmitter
	} else {
		this.EventEmitter = EventEmitter
	}
}.call(this));
(function(window) {
	var docElem = document.documentElement;
	var bind = function() {};

	function getIEEvent(obj) {
		var event = window.event;
		event.target = event.target || event.srcElement || obj;
		return event
	}
	if (docElem.addEventListener) {
		bind = function(obj, type, fn) {
			obj.addEventListener(type, fn, false)
		}
	} else if (docElem.attachEvent) {
		bind = function(obj, type, fn) {
			obj[type + fn] = fn.handleEvent ?
			function() {
				var event = getIEEvent(obj);
				fn.handleEvent.call(fn, event)
			} : function() {
				var event = getIEEvent(obj);
				fn.call(obj, event)
			};
			obj.attachEvent("on" + type, obj[type + fn])
		}
	}
	var unbind = function() {};
	if (docElem.removeEventListener) {
		unbind = function(obj, type, fn) {
			obj.removeEventListener(type, fn, false)
		}
	} else if (docElem.detachEvent) {
		unbind = function(obj, type, fn) {
			obj.detachEvent("on" + type, obj[type + fn]);
			try {
				delete obj[type + fn]
			} catch (err) {
				obj[type + fn] = undefined
			}
		}
	}
	var eventie = {
		bind: bind,
		unbind: unbind
	};
	if (typeof define === 'function' && define.amd) {
		define('eventie/eventie', eventie)
	} else {
		window.eventie = eventie
	}
})(this);
define('img-loaded',function(require, exports, module) {
	var $ = require('jquery');
	var console = window.console;
	var hasConsole = typeof console !== 'undefined';

	function extend(a, b) {
		for (var prop in b) {
			a[prop] = b[prop]
		}
		return a
	}
	var objToString = Object.prototype.toString;

	function isArray(obj) {
		return objToString.call(obj) === '[object Array]'
	}
	function makeArray(obj) {
		var ary = [];
		if (isArray(obj)) {
			ary = obj
		} else if (typeof obj.length === 'number') {
			for (var i = 0, len = obj.length; i < len; i++) {
				ary.push(obj[i])
			}
		} else {
			ary.push(obj)
		}
		return ary
	}
	function ImagesLoaded(elem, options, onAlways) {
		if (!(this instanceof ImagesLoaded)) {
			return new ImagesLoaded(elem, options)
		}
		if (typeof elem === 'string') {
			elem = $(elem)
		}
		this.elements = makeArray(elem);
		this.options = extend({}, this.options);
		if (typeof options === 'function') {
			onAlways = options
		} else {
			extend(this.options, options)
		}
		if (onAlways) {
			this.on('always', onAlways)
		}
		this.getImages();
		if ($) {
			this.jqDeferred = new $.Deferred()
		}
		var _this = this;
		setTimeout(function() {
			_this.check()
		})
	}
	ImagesLoaded.prototype = new EventEmitter();
	ImagesLoaded.prototype.options = {};
	ImagesLoaded.prototype.getImages = function() {
		this.images = [];
		for (var i = 0, len = this.elements.length; i < len; i++) {
			var elem = this.elements[i];
			if (elem.nodeName === 'IMG') {
				this.addImage(elem)
			}
			var nodeType = elem.nodeType;
			if (!nodeType || !(nodeType === 1 || nodeType === 9 || nodeType === 11)) {
				continue
			}
			var childElems = $(elem).find('img');
			for (var j = 0, jLen = childElems.length; j < jLen; j++) {
				var img = childElems[j];
				this.addImage(img)
			}
		}
	};
	ImagesLoaded.prototype.addImage = function(img) {
		var loadingImage = new LoadingImage(img);
		this.images.push(loadingImage)
	};
	ImagesLoaded.prototype.check = function() {
		var _this = this;
		var checkedCount = 0;
		var length = this.images.length;
		this.hasAnyBroken = false;
		if (!length) {
			this.complete();
			return
		}
		function onConfirm(image, message) {
			if (_this.options.debug && hasConsole) {
				console.log('confirm', image, message)
			}
			_this.progress(image);
			checkedCount++;
			if (checkedCount === length) {
				_this.complete()
			}
			return true
		}
		for (var i = 0; i < length; i++) {
			var loadingImage = this.images[i];
			loadingImage.on('confirm', onConfirm);
			loadingImage.check()
		}
	};
	ImagesLoaded.prototype.progress = function(image) {
		this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
		var _this = this;
		setTimeout(function() {
			_this.emit('progress', _this, image);
			if (_this.jqDeferred && _this.jqDeferred.notify) {
				_this.jqDeferred.notify(_this, image)
			}
		})
	};
	ImagesLoaded.prototype.complete = function() {
		var eventName = this.hasAnyBroken ? 'fail' : 'done';
		this.isComplete = true;
		var _this = this;
		setTimeout(function() {
			_this.emit(eventName, _this);
			_this.emit('always', _this);
			if (_this.jqDeferred) {
				var jqMethod = _this.hasAnyBroken ? 'reject' : 'resolve';
				_this.jqDeferred[jqMethod](_this)
			}
		})
	};
	if ($) {
		$.fn.imagesLoaded = function(options, callback) {
			var instance = new ImagesLoaded(this, options, callback);
			return instance.jqDeferred.promise($(this))
		}
	}
	function LoadingImage(img) {
		this.img = img
	}
	LoadingImage.prototype = new EventEmitter();
	LoadingImage.prototype.check = function() {
		var resource = cache[this.img.src] || new Resource(this.img.src);
		if (resource.isConfirmed) {
			this.confirm(resource.isLoaded, 'cached was confirmed');
			return
		}
		if (this.img.complete && this.img.naturalWidth !== undefined) {
			this.confirm(this.img.naturalWidth !== 0, 'naturalWidth');
			return
		}
		var _this = this;
		resource.on('confirm', function(resrc, message) {
			_this.confirm(resrc.isLoaded, message);
			return true
		});
		resource.check()
	};
	LoadingImage.prototype.confirm = function(isLoaded, message) {
		this.isLoaded = isLoaded;
		this.emit('confirm', this, message)
	};
	var cache = {};

	function Resource(src) {
		this.src = src;
		cache[src] = this
	}
	Resource.prototype = new EventEmitter();
	Resource.prototype.check = function() {
		if (this.isChecked) {
			return
		}
		var proxyImage = new Image();
		eventie.bind(proxyImage, 'load', this);
		eventie.bind(proxyImage, 'error', this);
		proxyImage.src = this.src;
		this.isChecked = true
	};
	Resource.prototype.handleEvent = function(event) {
		var method = 'on' + event.type;
		if (this[method]) {
			this[method](event)
		}
	};
	Resource.prototype.onload = function(event) {
		this.confirm(true, 'onload');
		this.unbindProxyEvents(event)
	};
	Resource.prototype.onerror = function(event) {
		this.confirm(false, 'onerror');
		this.unbindProxyEvents(event)
	};
	Resource.prototype.confirm = function(isLoaded, message) {
		this.isConfirmed = true;
		this.isLoaded = isLoaded;
		this.emit('confirm', this, message)
	};
	Resource.prototype.unbindProxyEvents = function(event) {
		eventie.unbind(event.target, 'load', this);
		eventie.unbind(event.target, 'error', this)
	};
	return ImagesLoaded
});