# Transitionable

Transitionable is a way of encapsulating an animated spring.

It's value can be mapped to anything. For example, in `example/mouse.html`

```js
const x = Transitionable(0)                                  // X Default
const y = Transitionable(0, { stiffness: 120, damping: 2 })  // Y Wombly

document.addEventListener('mousemove', e => {
    x.value = e.clientX
    y.value = e.clientY
})

x.map(v => squareId.style.left = v)
y.map(v => squareId.style.top = v)
```

We are mapping mouse position to `x` and `y` transitionables, and they are mapped to the square position axis.

We are using different parameters for having different physics on each of the axis.

[Live demo](https://aitoroses.github.io/transitionable-js/mouse.html)

# Install

Just type `npm install transitionable`

# License

Copyright 2017 Aitor Oses

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
