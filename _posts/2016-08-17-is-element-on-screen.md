---
layout: post
title: 判断元素是否在屏幕中出现
tags: [snippet]
---

## 场景

统计用户是否看到元素。计费广告中的曝光点判断逻辑。

能够判断元素在屏幕中出现 100px 以上，或者完全出现。要兼容所有浏览器（电脑端 IE6 及以上的浏览器和手机端安卓2.3）。

## 分析

1. 出现在屏幕中 npx 的场景下，如果元素本身的尺寸就小于 npx，那么条件就变成了元素是否完整展现。
2. 提供设置出现的像素大小，如果需要实现元素完整展现才能算曝光那么这里设置的像素大小设置为大于元素尺寸的即可(`Infinity`)。
3. 我们需要根据元素在屏幕中的位置，元素大小和屏幕大小进行计算。
4. 获得元素在屏幕中的位置和大小可以使用 `getBoundingClientRect`，支持所有浏览器。但是在IE9以下存在缺陷，返回值中没有 `width` 和 `height`，所以无法使用这个函数获得元素的大小。
5. 获得元素大小可以使用 `offsetHeight` 和 `offsetWidth`。
6. 获得屏幕大小需要考虑浏览器兼容性，这里使用 `window.innerHeight || document.documentElement.clientHeight` 和 `window.innerWidth || document.documentElement.clientWidth` 。
7. 考虑出现在屏幕中的几种情况：位置在屏幕之外；位置在屏幕中，但是样式上隐藏(`opacity: 0;`, `display: none;`, `z-index: 0`)。目前函数只能判断元素位置，没有考虑元素的隐藏样式。

![getBoundingClientRect 兼容性](/assets/2016-08-17-is-element-on-screen/caniuse.png)
[getBoundingClientRect 兼容性](http://caniuse.com/#search=getBoundingClientRect)

## 代码

```js
// var ON_SCREEN_HEIGHT = 0;
var ON_SCREEN_HEIGHT = 50;
// var ON_SCREEN_HEIGHT = Infinity;
// var ON_SCREEN_WIDTH = 0;
var ON_SCREEN_WIDTH = 50;
// var ON_SCREEN_WIDTH = Infinity;

var isOnScreen = function (element) {

    var rect = element.getBoundingClientRect();
    var windowHeight = window.innerHeight || document.documentElement.clientHeight;
    var windowWidth = window.innerWidth || document.documentElement.clientWidth;

    var elementHeight = element.offsetHeight;
    var elementWidth = element.offsetWidth;

    var onScreenHeight = ON_SCREEN_HEIGHT > elementHeight ? elementHeight : ON_SCREEN_HEIGHT;
    var onScreenWidth = ON_SCREEN_WIDTH > elementWidth ? elementWidth : ON_SCREEN_WIDTH;

    // 元素在屏幕上方
    var elementBottomToWindowTop = rect.top + elementHeight;
    var bottomBoundingOnScreen = elementBottomToWindowTop >= onScreenHeight;

    // 元素在屏幕下方
    var elementTopToWindowBottom = windowHeight - (rect.bottom - elementHeight);
    var topBoundingOnScreen = elementTopToWindowBottom >= onScreenHeight;

    // 元素在屏幕左侧
    var elementRightToWindowLeft = rect.left + elementWidth;
    var rightBoundingOnScreen = elementRightToWindowLeft >= onScreenWidth;

    // 元素在屏幕右侧
    var elementLeftToWindowRight = windowWidth - (rect.right - elementWidth);
    var leftBoundingOnScreen = elementLeftToWindowRight >= onScreenWidth;

    return bottomBoundingOnScreen && topBoundingOnScreen && rightBoundingOnScreen && leftBoundingOnScreen;
};
```

`ON_SCREEN_HEIGHT` 和 `ON_SCREEN_WIDTH` 用来设置元素出现在屏幕中 npx 的条件，也就是这里的 n。
只要保证元素的上下左右四个边界都在屏幕内显示超过 npx，我们就可以认为元素出现在页面中了。

## 测试页面

在浏览器打开[demo 页面](http://vivaxy.github.io/samples/web-api/is-element-on-screen/)，滚动页面测试。页面变黄表示元素出现在页面中。元素宽高是 100px，出现在页面中的条件是至少出现 50px。

## 相似模块

- [onscreen](https://www.npmjs.com/package/onscreen)
