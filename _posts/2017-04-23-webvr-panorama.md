---
layout: post
title: 使用 webvr 制作全景图 
tags: [vr, web, a-frame]
---

webvr 是一种在浏览器中体验 vr 的技术，由 w3c 官方制定规范，各浏览器实现。由于目前各浏览器对 webvr 的支持不一，因此现在使用这项技术时需要额外使用一个右谷歌提供的向下兼容库 [webvr-polyfill](https://github.com/googlevr/webvr-polyfill)。

目前有不少框架可以让我们很方便的做 webvr 应用。

## 几个例子

我们先看看 webVR 能做什么：

- [东方明珠空中全景](https://vivaxy.github.io/course/webvr/a-frame-shanghai-oriental-pearl/)
- [我的世界](https://vivaxy.github.io/course/webvr/a-frame-minecraft/)
- [香港海洋公园全景](https://vivaxy.github.io/course/webvr/a-frame-panorama/)

上面几个例子用的都是 [A-Frame](https://github.com/aframevr/aframe)，由 mozilla 提供。

## 全景图片

一般的，我们需要专业摄像设备来获取全景图片。比如[东方明珠空中全景](https://vivaxy.github.io/course/webvr/a-frame-shanghai-oriental-pearl/)一例中，我们用了 96 张图片，组成了一个立方体空间，在这个空间中，我们可以看到上下左右的图像。

我们使用相机在同一地点，多个角度下拍摄多张照片，通过图片拼接处理，再裁剪开。图片拼接可以通过 Photoshop 的 Photomerge 来实现(File > Automate > Photomerge)。

还可以用手机的全景模式拍摄图片，然后用 Photoshop 制作出来。下面就详细介绍下这个全景图片的制作。

## 全景图片制作

用 Google 照一张全景图(panorama)，这是一张泰国帕南海滩的照片。

![source](/image/2017-04-23-webvr-panorama/Phra-Nang-beach.jpg)

在 Photoshop 中新建一个 2048 * 1024 尺寸或者类似比例的图片，作为全景图片的最终尺寸。把素材导入到里面去。

![step 1](/image/2017-04-23-webvr-panorama/step-1.png)

调整图片的宽度铺满整个画布，图片上下两侧留空。素材中的地平线保持在图片的中心位置。

我们使用 Photoshop 的自动填充让上下两块铺满，但是又不改变图片的比例。

先选中素材的所有像素(Command + 左键 点击图层)。然后反选像素(Select > Inverse)，再增加几像素的选中区域(Select > Modify > Expand > Expand by `5` px)。

选择自动填充(Edit > Fill > Contents: `Content-Aware`)。如果空白区域太大的话会导致把天填充到海里去，所以我们可以一段一段来。

对于不满意的位置，可以选中，右键，再自动填充。

![step 2](/image/2017-04-23-webvr-panorama/step-2.png)

上面是效果图。

然后我们要处理在旋转一周后左右不能对应上的问题。复制左侧一部分内容，粘贴到右侧，左右反转一下(选中右侧，Edit > Transform > Flip Horizontal)，然后添加一个渐变色的图层蒙版。

![step 3](/image/2017-04-23-webvr-panorama/step-3.png)

处理后的图片过度自然多了。

最后，我们把图片放到 a-frame 的 `a-sky` 中就可以了。

```html
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
    <title>A-Frame Panorama</title>
    <script src="../aframe.min.js"></script>
</head>
<body>
<a-scene>
    <a-sky src="./phra-nang-beach-1.jpg" rotation="0 0 0"></a-sky>
</a-scene>
</body>
</html>
```

实际效果可以参考[香港海洋公园全景](https://vivaxy.github.io/course/webvr/a-frame-panorama/)，这个全景效果就是这么做出来的。

虽然比不上东方明珠的效果，但是也有一定的效果了。

除了 a-frame 之外，还有[react-vr](https://facebook.github.io/react-vr/)，由 facebook 提供的 vr 解决方案，希望它能带来更好的开发体验。
