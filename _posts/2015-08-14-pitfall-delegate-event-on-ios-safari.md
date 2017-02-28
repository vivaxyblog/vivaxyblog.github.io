---
layout: post
title: Pitfall Delegate Event on ios safari not working
tag: bug
---

## Event delegation not available on body

see [example](http://vivaxy.github.io/course/pitfall/event-delegation-on-ios-safari/)

```js
$('body').on('click', '.J_button', function(e){
    alert('clicked');
});
```

First `click here` will not alert, while the second `click here` alerts.

`fix` class was added to the second one, appending `cursor: pointer` style.

This fixed event delegation problem and added a visible click style to the clickable element.

## [reference](http://www.quirksmode.org/blog/archives/2010/10/click_event_del_1.html)
