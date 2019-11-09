---
layout: post
title: 浏览器图像转换手册
tags: [image, browser, file, blob, data urls, http urls, object urls, typedarray, buffer, dataview, arraybuffer]
---

## 介绍

图像可以用多种不同的类型数据表示，本文将它们归纳为 5 种类型：DOM，URL，`File`，`ImageData` 和 Buffer。

## 图像的数据类型

### DOM

#### `<img>`

[`<img>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img "`<img>`") 元素从 URL（Data URL，HTTP URL 或 Object URL）加载图像。

#### `<canvas>`

[`<canvas>`](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/canvas "`<canvas>`") 元素通过 canvas API [`drawImage`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage "`drawImage`") 来获取 `<img>` 元素上的图像数据。

### URL

#### Data URL

[Data URL](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/Data_URIs "Data URL") 带有 base64 编码的图像数据。可以从 Data URL 数据中解码出图像的二进制数据。Data URL 数据的大小比原始的二进制数据大一些。

#### HTTP URL

[HTTP URL](https://developer.mozilla.org/zh-CN/docs/Learn/Common_questions/What_is_a_URL "HTTP URL") 代表存储在服务器上的图像。HTTP URL 用于从服务器获取图像数据。

#### Object URL

[Object URL](https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL "Object URL") 用来代表存储在浏览器内存中的 `File` 或 `Blob` 对象。Object URL 可以由`createObjectURL` API 来创建，并由 `revokeObjectURL` API 释放。

### 文件

#### `Blob`

[`Blob`](https://developer.mozilla.org/zh-CN/docs/Web/API/Blob "`Blob`") 是带有二进制数据的类文件对象。它包含一个只读的 `size` 属性和一个只读的 `type` 属性。你可以通过 `slice`，`stream`，`text` 等方法来读取二进制数据。

#### `File`

一个 [`File`](https://developer.mozilla.org/zh-CN/docs/Web/API/File "`File`") 对象是一个特殊的 `Blob` 对象。除了 `Blob` 的属性和方法外，`File` 对象还包含 `lastModified`，`name` 等属性。

### `ImageData`

一个 [`ImageData`](https://developer.mozilla.org/zh-CN/docs/Web/API/ImageData "`ImageData`") 对象是一个 JavaScript 对象，包含 `width`，`height` 和 `data` 属性，分别表示图像宽度，高度和像素数据。 `data` 属性是一个一维数组，包含 `R，G，B，A，R，G，B，A` 这样格式的数据。每个 `R，G，B，A` 代表一个像素。可以通过 `<canvas>` API [`createImageData`](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/createImageData "`createImageData`") 或 `ImageData` 构造函数来创建 `ImageData`。

### Buffer

#### `ArrayBuffer`

[`ArrayBuffer`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer "`ArrayBuffer`") 是在浏览器中唯一一种访问二进制数据的方法。`ArrayBuffer` 代表图像的原始二进制数据缓冲区。我们无法读取和写入 `ArrayBuffer` ，只能将 `ArrayBuffer` 转换为 [`DataView`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/DataView "`DataView`") 或 [TypedArray](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/TypedArray "TypedArray") 来读取和写入二进制数据。

#### `Buffer`

[`Buffer`](https://nodejs.org/api/buffer.html "`Buffer`") 是 Node.js 中特殊的一种 `Uint8Array`，Node.js 对其进行了一些优化。

## 在 `ArrayBuffer`，`DataView`，TypedArray 和 `Buffer` 之间转换

![如何在 `ArrayBuffer`，`DataView`，TypedArray 和 `Buffer` 之间转换](https://vivaxyblog.github.io/assets/2019-11-06-comprehensive-image-processing-on-browsers/ArrayBuffer-TypedArray-Buffer-DataView.svg)

## 在 DOM，URL，Blob(File)，`ImageData` 和 Buffer 之间转换

![如何在 DOM，URL，Blob(File)，`ImageData` 和 Buffer 之间转换](https://vivaxyblog.github.io/assets/2019-11-06-comprehensive-image-processing-on-browsers/DOM-URL-File-Data.svg)

## 参考资料

- [WangYuLue/image-conversion](https://github.com/WangYuLue/image-conversion "WangYuLue/image-conversion")
