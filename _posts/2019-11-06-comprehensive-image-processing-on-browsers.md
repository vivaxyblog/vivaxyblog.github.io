---
layout: post
title: Comprehensive Image Processing on Browsers
tags: [image, browser, file, blob, data urls, http urls, object urls, typedarray, buffer, dataview, arraybuffer]
---

Images can be represented in different types. They can be summarized as 5 types: DOM, URL, `File`, `ImageData` and Buffer.

## Image Data Types

### DOM

#### `<img>`

[`<img>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img) elements load images from URL(e.g. Data URLs, HTTP URLs or Object URLs).

#### `<canvas>`

[`<canvas>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) elements draw images by canvas API [`drawImage`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage) from `<img>` elements.

### URL

#### Data URLs

[Data URLs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs) carries base64 encoded image data. Image binary can be decoded from Data URLs. Data URL image file size is a little larger than the original binary data.

#### HTTP URLs

[HTTP URLs](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL) represent images stored on servers. HTTP URLs are used to fetch image data from servers.

#### Object URLs

[Object URLs](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL) represent the `File` or `Blob` object. Object URLs can be created by `createObjectURL` API, and released by `revokeObjectURL` API. The object is stored in browser memory and can be accessed by a short Object URL.

### File

#### `Blob`

A [`Blob`](https://developer.mozilla.org/en-US/docs/Web/API/Blob) object represents a file-like object of binary data. It contains a readyonly `size` property and a readyonly `type` property. You can retrieve the binary data by `slice`, `stream`, `text` and `arrayBuffer` methods.

#### `File`

A [`File`](https://developer.mozilla.org/en-US/docs/Web/API/File) object is a special `Blob` object. In addtion to the `Blob` properties and methods, the `File` object contains `lastModified`, `name` properties.

### `ImageData`

A [`ImageData`](https://developer.mozilla.org/en-US/docs/Web/API/ImageData) object is a JavaScript object containing `width`, `height` and `data` properties, represents the image width, height and pixel data. `data` property is an one-dimensional array, containing data like `[R, G, B, A, R, G, B, A]`. Each `[R, G, B, A]` represents a pixel. You can create a `ImageData` by `<canvas>` API [`createImageData`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/createImageData) or the `ImageData` constructor.

### Buffer

#### `ArrayBuffer`

There is only one way of accessing the binary data on browsers [`ArrayBuffer`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer). An `ArrayBuffer` represents a raw binary data buffer of the image. `ArrayBuffer` cannot be read and written. You can only convert an `ArrayBuffer` to [`DataView`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView) or [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray) to read and write binary data.

#### `Buffer`

In Node.js, [`Buffer`](https://nodejs.org/api/buffer.html) is a special `Uint8Array` with some optimizations.

## Convert within `ArrayBuffer`, `DataView`, TypedArray and `Buffer`

![How to convert within `ArrayBuffer`, `DataView`, TypedArray and `Buffer`](/assets/2019-11-06-comprehensive-image-processing-on-browsers/ArrayBuffer-TypedArray-Buffer-DataView.svg)

## Conver within DOM, URL, File, `ImageData` and Buffer

![How to conver within DOM, URL, File, `ImageData` and Buffer](/assets/2019-11-06-comprehensive-image-processing-on-browsers/DOM-URL-File-Data.svg)

## Reference

- [WangYuLue/image-conversion](https://github.com/WangYuLue/image-conversion)
