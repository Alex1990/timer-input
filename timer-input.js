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

  var interval = 1000/60;
  var slice = Array.prototype.slice;

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

  function TimerInput(elem, listener) {
    if (!(this instanceof TimerInput)) {
      return new TimerInput(elem, listener);
    }

    var that = this;

    that.elem = elem;
    that.lastValue = elem.value;
    that.listeners = [];

    that.onFocusChange = function(e) {
      e = e || window.event;
      if (e.type === 'focus') {
        that.timerId = setInterval(function() {
          if (that.lastValue !== elem.value) {
            that.trigger({
              oldValue: that.lastValue,
              newValue: elem.value
            });
            that.lastValue = elem.value;
          }
        }, interval);
      } else {
        setTimeout(function() {
          clearInterval(that.timerId);
        }, 0);
      }
    };

    addEvent(elem, 'focus', that.onFocusChange);
    addEvent(elem, 'blur', that.onFocusChange);

    that.on(listener);
  }

  var proto = TimerInput.prototype;

  proto.get = function() {
    return this.elem.value;
  };

  proto.set = function(newValue) {
    var oldValue = this.elem.value;

    newValue = newValue + '';
    this.elem.value = newValue;

    this.trigger({
      oldValue: oldValue,
      newValue: newValue
    });
  };

  proto.on = function(listener) {
    if (typeof listener === 'function') {
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
    var args = slice.call(arguments);

    for (var i = 0, len = this.listeners.length; i < len; i++) {
      this.listeners[i].apply(this.elem, args);
    }
  };

  proto.destroy = function() {
    clearInterval(this.timerId);
    removeEvent(this.elem, 'focus', this.onFocusChange);
    removeEvent(this.elem, 'blur', this.onFocusChange);
  };

  return TimerInput;

}));
