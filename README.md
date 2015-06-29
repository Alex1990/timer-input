# timer-input
Monitor if the value of an input or textarea element is changed, like `input` event.

## Usage

```js
var keyword = document.getElementById('keyword');
var kwInput = new TimerInput(keyword);

kwInput.on(function(e) {
  console.log('The value of the keyword is changed!');
  console.log(e); // e: { oldValue: '', newValue: 'foo' }
});
```

This module supports as a CommonJS/AMD module.

## Packages

**NPM:**

```bash
npm install timer-input
```

## API

### TimerInput(element, [listener])

Create a `TimerInput` instance to attach/detach one or more listeners. When the value of the `element` is changed, the listener will be called with an object passed as the first parameter. The object contains two properties: 

- `oldValue`: A string represents the value before changing.
- `newValue`: A string represents the value after changing.

In the listener, `this` refers the `input` or `textarea` element.

**The `TimerInput` instance methods:**

### get()

Return the value of the element.

### set(value)

Use the `value` to update the value of the element and the listener(s) will be called, if any.

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
