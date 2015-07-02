/*!
 * timer-input.js - Monitor if the value of an input or textarea element is changed.
 * https://github.com/Alex1990/timer-input
 * Under the MIT License | (c) 2015 Alex Chao
 */

!(function(global, factory) {

  // Uses CommonJS, AMD or browser global to create a jQuery plugin.
  // See: https://github.com/umdjs/umd
  if (typeof define === 'function' && define.amd) {
    // Expose this plugin as an AMD module. Register an anonymous module.
    define(factory);
  } else if (typeof exports === 'object') {
    // Node/CommonJS module
    module.exports = factory();
  } else {
    // Browser globals
    global.TimerInput = factory();
  }

}(this, function() {

  'use strict';

  var addEvent = function(elem, type, listener) {
    if (elem.addEventListener) {
      elem.addEventListener(type, listener, false);
    } else if (elem.attachEvent) {
      elem[type + listener] = listener;
      elem.attachEvent('on' + type, elem[type + listener]);
    }
  };

  var removeEvent = function(elem, type, listener) {
    if (elem.removeEventListener) {
      elem.removeEventListener(type, listener, false);
    } else if (elem.detachEvent) {
      elem.detachEvent('on' + type, elem[type + listener]);
    }
  };

  var interval = 1000/60;
  var stopDelay = 100; // For drap-and-drop interaction

  var defaults = {
    bindEvent: true
  };

  var extend = function(dest) {
    var args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < args.length; i++) {
      for (var p in args[i]) {
        if (args[i].hasOwnProperty(p)) {
          dest[p] = args[i][p];
        }
      }
    }
    return dest;
  };

  function TimerInputEvent(props) {
    this.type = 'timerinput';
    this.oldValue = props.oldValue;
    this.newValue = props.newValue;
  }

  function TimerInput(elem, opts, listener) {
    if (!(this instanceof TimerInput)) {
      return new TimerInput(elem, opts, listener);
    }

    if (typeof opts === 'function') {
      listener = opts;
      opts = {};
    }

    this.opts = opts = extend({}, defaults, opts);

    this.elem = elem;
    this.lastValue = elem.value;
    this.listeners = [];

    opts.bindEvent && this._bindEvent();
    if (listener != null) {
      this.on(listener);
    }
  }

  var proto = TimerInput.prototype;

  proto._bindEvent = function() {
    var elem = this.elem;
    var that = this;

    this._start = function() {
      that.start();
    };

    this._stop = function() {
      that.stop();
    };

    addEvent(elem, 'focus', this._start);
    addEvent(elem, 'blur', this._stop);
  };

  proto.start = function() {
    var elem = this.elem;
    var that = this;

    this.timerId = setInterval(function() {
      if (that.lastValue !== elem.value) {
        that.trigger(new TimerInputEvent({
          oldValue: that.lastValue,
          newValue: elem.value
        }));
        that.lastValue = elem.value;
      }
    }, interval);
  };

  proto.stop = function() {
    var that = this;
    setTimeout(function() {
      clearInterval(that.timerId);
    }, stopDelay);
  };

  proto.get = function() {
    return this.elem.value;
  };

  proto.set = function(newValue) {
    var oldValue = this.elem.value;

    newValue = newValue + '';
    this.elem.value = newValue;

    this.trigger(new TimerInputEvent({
      oldValue: oldValue,
      newValue: newValue
    }));

    this.lastValue = newValue;
  };

  proto.on = function(listener) {
    if (typeof listener === 'function') {
      if (this.listeners == null) this.listeners = [];
      this.listeners.push(listener);
    }
  };

  proto.off = function(listener) {
    if (listener == null) {
      this.listeners = [];
    }

    for (var i = 0, len = this.listeners.length; i < len; i++) {
      if (this.listeners[i] === listener) {
        this.listeners.splice(i, 1);
      }
    }
  };

  proto.trigger = function() {
    var args = Array.prototype.slice.call(arguments);

    for (var i = 0, len = this.listeners.length; i < len; i++) {
      this.listeners[i].apply(this.elem, args);
    }
  };

  proto.destroy = function() {
    clearInterval(this.timerId);
    if (this.opts.bindEvent) {
      removeEvent(this.elem, 'focus', this._start);
      removeEvent(this.elem, 'blur', this._stop);
    }
    this.elem =
    this.timerId =
    this.lastValue =
    this._start =
    this._stop =
    this.listeners = null;
  };

  return TimerInput;

}));
