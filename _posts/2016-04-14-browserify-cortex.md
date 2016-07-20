---
layout: post
title: 打包 cortex 项目为 standalone 的工具
tag: tools
---

为了更加方便地使用 cortex 组件。我实现了一个工具： browserify-cortex 。

browserify-cortex 可以把一个 cortex 项目打包成单独的 js ，使用 script 标签插入 html 后，即可调用。不再依赖后端的 ftl ，不再依赖 neuron 加载器。

项目地址：[https://github.com/vivaxy/browserify-cortex](https://github.com/vivaxy/browserify-cortex)

## 使用方式

1. 安装全局的 browserify-cortex

    `> sudo npm i -g browserify-cortex`

2. git clone 下来想使用的 cortex 项目

3. 进入到 cortex 项目的根目录

4. 执行 `> bcortex`

项目下会打包出来一个 js 文件，直接使用即可。

如果你想了解更多高级用法，或者是发现了问题，或者有意见和建议，请移步 [github](https://github.com/vivaxy/browserify-cortex) 。

## FUN FACTS

1. 下载依赖没找到的问题已经解决，不再使用 git clone ，而采用 cortex 自己的下载方式下载依赖

2. 打包出来的入口函数指向不对的问题已经解决，不再使用 browserify ，而采用 webpack 。然而这个项目的名字已经叫 browserify 了
