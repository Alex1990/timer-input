# timer-input
Monitor if the value of an input or textarea element is changed, like `input` event.

## Usage

```js
var keyword = document.getElementById('keyword');
var kwInput = new TimerInput(keyword);

kwInput.on(function(e) {
  console.log('The value of the keyword is changed!');
  console.log(e); // e: { type: 'timerinput', oldValue: '', newValue: 'foo' }
});
```

This module supports as a CommonJS/AMD module.

## Packages

**NPM:**

```bash
npm install timer-input
```

## API

**The `TimerInput` constructor**

### TimerInput(element, [opts], [listener])

Create a `TimerInput` instance to attach/detach one or more listeners. When the value of the `element` is changed, the listener will be called with a `TimerInputEvent` object passed as the first parameter. 

`TimerInputEvent`

- `type`: `"timerinput"`.
- `oldValue`: A string represents the value before changing.
- `newValue`: A string represents the value after changing.

In the listener, `this` refers the `input` or `textarea` element.

The `opts` object can be passed as the second parameter:

- `bindEvent`

  Type: `Boolean` Default: `true`

  It represents if the `focus` and `blur` event of the `element` will be listened when an `TimerInput` instance is created.

**The `TimerInput` instance methods:**

### start()

Set the timer. By default, when the `focus` event is fired, the timer will be set.

### stop()

Clear the timer. By default, when the `blur` event is fired, the timer will be cleared.

### get()

Return the value of the element.

### set(value)

Use the `value` to update the value of the element and the listener(s) will be called, if any. If you modify the `element.value` directly, none of the listener(s) will be called.

### on(listener)

Attach a listener.

### off(listener)

Detach a listener. If no argument is passed, all exist listeners will be detached.

### trigger([arg1], [arg2], ...)

Execute all exist listeners with some optional parameters passed.

### destroy()

The `input` or `textarea` element is no longer monitored.

## Compatibility

IE6+ and other modern browsers.

## License

MIT
