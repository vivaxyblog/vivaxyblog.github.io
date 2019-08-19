---
layout: post
title: 使用 excanvas 实现 canvas 在 IE7~8 的兼容
tags: [canvas, ie]
---

IE8 及以下的浏览器上不兼容 canvas，可以使用 [ExplorerCanvas](https://code.google.com/p/explorercanvas/) 做兼容性的替代。

## 兼容性检测

```js
var canvasSupported = !!document.createElement('canvas').getContext;
```

## excanvas 的使用要求

excanvas 的例子中是这样使用的：

- 在 HTML 的 `<head></head>` 内引入所有的 JavaScript。

- 在 HTML 中的 `<body>` 的 `onload` 上绑定 canvas 绘图的初始方法。

- 禁用动画 `new Chart(ctx).Line(dataLine, {animation: false});`。

经过测试，发现：

- `canvas` 标签必须写在 excanvas 初始方法之后，即：canvas 必须在 excanvas 初始完成后生成。

## 动态添加 Canvas

JavaScript 写在页面最下方的情况下，只能采用动态添加 Canvas 的方法。

尝试在页面原先的 Canvas 的地方移除并且再添加一个长的一模一样的 Canvas。

然后调用 `G_vmlCanvasManager.initElement(canvasNew);` 初始化 Canvas。

之后就可以正常使用 Canvas 了，包括 Canvas 中的 RGBA 颜色！

如果发现报错：`对象不支持“measureText”属性或方法`，那么请使用最新的 [excanvas](http://explorercanvas.googlecode.com/svn/trunk/excanvas.js)。

## canvas-polyfill

See on [Github](https://vivaxy.github.io/course/javascript/canvas-polyfill/).

## 参考资料

[Excanvas for dynamically created canvas elements](http://stackoverflow.com/questions/1635419/excanvas-for-dynamically-created-canvas-elements)

[Error on IE7 and IE8, Object doesn't support property or method 'measureText'](https://github.com/nnnick/Chart.js/issues/477)
