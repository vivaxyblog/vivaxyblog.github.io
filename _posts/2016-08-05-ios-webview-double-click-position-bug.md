---
layout: post
title: iOS UIWebkit 中双击文本触发页面自动滚动后，弹窗错位
tag: problem
---

## 问题描述

iOS webview 中会有双击居中功能，自动将不在屏幕中心的文本拉到屏幕中心。但是这个时候弹出的元素会错位。

我们使用 `position: fixed;` 对弹出元素进行定位，并且给予屏幕大小一样对宽高。

![正常情况](/image/2016-08-05-ios-webview-double-click-position-bug/1.png)

上图是正常情况。

然后我们滚动到某个位置，再次弹窗也不会有问题。

此时双击下面的某个元素，然后再点击按钮出弹窗。这是我们看到的背景色已经错位了。

![异常情况](/image/2016-08-05-ios-webview-double-click-position-bug/2.png)

贴上这部分的代码

```js
var show = document.querySelector('.js-show');
show.addEventListener('click', function() {
    var modal = document.createElement('div');
    modal.classList.add('modal');
    document.body.appendChild(modal);
    modal.addEventListener('click', function() {
        document.body.removeChild(modal);
    });
});

```

```css
.modal {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
}
```

## 解决方案

在弹窗前先对浏览器进行一次滚动。

在 js 中添加下面的代码

```js
window.scrollTo(window.scrollX, window.scrollY);
```
