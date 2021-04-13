---
layout: post
title: Pitfall in Label Input Click Events
tags: [bug, html]
---

Labels and inputs are associated with `for`, `id` attribute.

```html
<label for="input-1" class="label-1">label 1 for input 1</label>
<input id="input-1" type="text" value="this is input-1" class="input-1">
```

Bind click event listeners to both label and input.

```js
var label1 = document.querySelector('.label-1'),
    input1 = document.querySelector('.input-1'),
    listenClickEvent = function (dom, callback) {
        dom.addEventListener('click', callback, false);
    };

listenClickEvent(label1, function (e) {
    console.log('label-1 clicked');
});

listenClickEvent(input1, function (e) {
    console.log('input-1 clicked');
});

```

A click on label will trigger events on both label and input!

Try it [here](https://vivaxy.github.io/samples/pitfall/click-event-on-label-with-input/).
