---
layout: post
title: 一个 reveal.js 的 Node 命令行工具
tags: [tools, nodejs]
---

最近经常做分享，怎么用更科学的方式维护演讲稿呢？

基本来说有下面几个需求：

- 版本管理
- 版本管理的基础上还能对比改动
- 便于写作，不希望做讲稿的时候像用 Keynote 一样经常修改样式
- 支持代码高亮
- 支持演讲者注释
- 离线保存，出于内容隐私安全考虑

Keynote 和 PPT 这种文件方式不适合版本管理，也不支持代码高亮。而 markdown 就是很好的一个选择。

[Slides.com](http://slides.com/) 比较完美，但是是在线的，内容安全性有隐患。

于是考虑使用 markdown 结合本地服务器方式。

找到了一个 star 3800+ 的 [nodePPT](https://github.com/ksky521/nodePPT)，支持读取 markdown 文件，并且本地启动服务。

但是使用下来发现了不少问题：

- 页面分隔符是 `[slide]`，不符合 markdown 规则，最好可以使用 `---` 这样直观的分隔
- 双端控制无效
- 页面样式和转场样式比较老旧，最好能使用 `reveal.js`
- 图片无法使用相对路径

最后决定选择了 `reveal.js`。然而在使用中发现 `reveal.js` 是通过拉去项目修改项目内的文件来写作的，这样做一个讲稿的成本很高。

于是决定做个命令行工具可以通过写一个 markdown 文件的方式使用 `reveal.js`。

在创建 npm 项目的时候发现已经有人写了一个 `node-reveal`，可是它解决的是模版创建的问题，并不纯粹。于是我写了一个命令行工具 [@vivaxy/reveal](https://github.com/vivaxy/node-reveal) 仅仅接受一个 markdown 文件作为讲稿。

主要功能如下：

- 非常简单的设置。不需要拉取代码，不需要文件模版
- 使用 markdown 作为讲稿
- 支持文件改动的后自动刷新
- 定制主题
- 支持行内 html，可以写自定义的内容和样式
- 支持所有 `reveal.js` 的功能

去 [GitHub](https://github.com/vivaxy/node-reveal) 看看。
