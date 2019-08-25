---
layout: post
title: 在 WebView 中禁用默认滚动和侧滑返回
tags: [problem, webview]
---

## 问题描述

WebView 中出现弹窗后，用户依然可以在弹窗中上下滑动触发 WebView 的默认网页滚动。甚至在弹窗内有滚动条的时候，滚动弹窗的内容，当弹窗内的内容被拉到底之后，便开始滚动网页的内容了。这不是我们想要的结果。

WebView 中使用轮播图时，向右滑动轮播图会触发页面的侧滑返回功能。在部分 WebView 中，侧滑返回的响应区域非常大，更加容易触发这个 WebView 的事件。这也不是我们想要的结果。

## 解决方案

在不想被触发这两种事件的位置添加下面的事件绑定。

```js
element.addEventListener('touchmove', function(e) {
    e.preventDefault();
});
```

例如，在弹窗（或者弹窗的背景）上绑定这个方法可以让 WebView 不响应用户上下滚动。

在轮播图最外层容器上绑定这个方法可以让 WebView 不响 WebView 的侧滑返回。
