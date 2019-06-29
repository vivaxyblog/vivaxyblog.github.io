---
layout: post
title: 单页应用
tags: [pattern]
---

## 单页应用是什么？

单页应用又称 SPA（Single Page Application）指的是使用单个 HTML 完成多个页面切换和功能的应用。这些应用只有一个 html 文件作为入口，使用 js 完成页面的布局和渲染。页面展示和功能室根据路由完成的。

## 单页的几种路由管理方式

- hash。路径会记录在 URL 的 hash 部分中。参见 http://event.dianping.com/vivaxy/test-page/hash-history/html/index.html#/pageA 。
- 内存管理。路径会记录在一个变量上，不体现在 URL 上。对于分享和直接打开到特定页面有一定的限制。
- history API。路由体现在 url 的 path 部分，需要服务端支持。用户刷新页面后需要从服务端取到和之前一样的 html 和 js。

一般来说，我们采用第一种 hash 的管理方式。

## 单页应用的优势

- 页面导航体验流畅。页面切换过程中可以添加自定义动画。页面切换时不需要重新请求文件，所以加载快。
- 多页面之间交换数据方便。这些页面公用一个内存空间，直接用变量保存数据即可。不再需要 localStorage，cookie 等。

## 单页应用开发中可能存在的问题

- 客户端支持。目前测试中发现部分 APP 尚未支持 hash 方式的返回。APP 测在 webview 的返回按钮上需要实现逻辑：如果不能后退，则关闭 webview；如果能后退，则后退。
- 页面状态保留。使用 react-router 时，切换页面不能保留页面的滚动高度。页面关闭后，上个页面被销毁（执行了 componentWillUnmount ），用户如果在上个页面操作到了底部再做跳转，则返回后会重新回到顶部。体验还是比不上 native，但是依然甩页面跳转几条街。
- 页面带参数。原生的 query 参数应该在 # 之前，index.html?from=onlineSign#pageA。但是 # 后还是可以有参数，index.html#pageA?from=onlineSign ，这里的参数在 location.query 或者 location.search 中拿不到，但是可以在 router 中拿到。

## 单页应用的适用场景

由于以上的优势和问题，单页适用于经常切换页面的场景和数据传递较多，多表单的场景。
