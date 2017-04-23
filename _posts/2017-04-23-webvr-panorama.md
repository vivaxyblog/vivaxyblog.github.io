---
layout: post
title: 使用 webvr 制作全景图 
tag: vr
---

webvr 是一种在浏览器中体验 vr 的技术，由 w3c 官方制定规范，各浏览器实现。由于目前各浏览器对 webvr 的支持不一，因此现在使用这项技术时需要额外使用一个右谷歌提供的向下兼容库 [webvr-polyfill](https://github.com/googlevr/webvr-polyfill)。

目前有不少框架可以让我们很方便的做 webvr 应用。

- [A-Frame](https://github.com/aframevr/aframe) 由 mozilla 提供。
- [react-vr](https://facebook.github.io/react-vr/) 由 facebook 提供。

## 全景图片制作

一般的，我们需要专业摄像设备来获取全景图片。如果没有的话，可以通过
