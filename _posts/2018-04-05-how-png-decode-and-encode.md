---
layout: post
title: JavaScript PNG 图片编码和解码
tag: png javascript
---

[PNG](https://en.wikipedia.org/wiki/Portable_Network_Graphics) 解码是指将一张 PNG 图片的二进制数据转换成像素点数据 [ImageData](https://developer.mozilla.org/en-US/docs/Web/API/ImageData)。

PNG 的二进制数据有很多方式获取。

在浏览器中可以得到 ArrayBuffer 类型的二进制数据：

```js
fetch(url).then(res => res.arrayBuffer()).then(res => { console.log(arrayBuffer) });
```

在 Node.js 中，可以得到 Buffer 类型的二进制数据：

```js
console.log(fs.readFileSync(filename))
```

在微信小程序中可以得到 ArrayBuffer 类型的二进制数据：

```js
wx.request({
  url,
  responseType: 'arraybuffer',
  success: (res) => { console.log(res.data); },
});
```

ImageData.data 是一个 [Uint8ClampedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray)，其中以 R、G、B、A 的顺序保存了像素点的数据，每四项表示一个像素点。

Uint8ClampedArray 是一种 [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)，存储了 0-255 的数据。其中 U 表示 unsigned，也就是无符号（都是正值）。8 表示 8 位，也就是其中的数据值不能超过 2 ^ 8 = 256。Clamped 表示如果数据值小于 0，则变成 0，如果大于 255，则变成 255。与之类似的 TypedArray 还有 [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)，初始化的值如果不在 0-255 之间，则加或减 256，直到符合要求。还有 [Int8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int8Array)，里面的值可以带符号，也就是说可以是负数。

TypedArray 是 JavaScript 中用来存储二进制数据的一种数据格式，类似于数组。但是 TypedArray 中存放的数据类型已经确定，执行引擎很容易分配内存，所以 TypedArray 更快。在 Node.js 中，在 Int8Array 的基础上实现了 [Buffer](https://nodejs.org/api/buffer.html)，提供了二进制数据流的存储和操作。

## 解码

PNG 的二进制数据可以分为 2 大部分：文件签名（Signature）和数据块（Chunks）。

Chunks 分为 IHDR、PLTE、TRNS、GAMA、IDAT 和 IEND。

### Signature

PNG 的文件签名是 `[0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]`，文件头部需要是这样的数据。

### Chunks

在处理了 Signature 后，每次读取 8 个字节的数据作为 Chunk 标示，8 个字节中的前 4 个字节表示这个 Chunk 占用的长度，单位是字节；后 4 个字节表示 Chunk 的类型。使用 Buffer 的 `readUInt32BE` 方法可以轻松地拿到这些数据。

Chunk 之间可能有冗余的内容，当 Chunk 没有开始，遇到冗余内容的时候，我们需要跳过长度 + 4 个字节。

Chunks 一共分成 6 个类型（括号中的是 Chunk 标示）：IHDR（0x49484452）、PLTE（0x504c5445）、TRNS（0x74524e53）、GAMA（0x67414d41）、IDAT（0x49444154） 和 IEND（0x49454e44）。IHDR 必须是第一个 Chunk；IEND 必须是最后一个；IDAT 存放着压缩过的图像数据。

IHDR 中存放了图片的宽度（width）、高度（height）、像素位数（depth）、颜色类型（colorType）、压缩方式（compression）（只有 0）、过滤器类型（filter）（只有 0）、是否是渐进式（interlace）。

### 解码 IDAT

通过对 Chunks 的分段，我们可以拿到 IDAT 部分的数据。使用 zlib 的 inflate 方法可以把压缩过的数据解码出来。解码后的数据里，每 5 个字节表示一个像素，其中第一个字节表示过滤器的类型。通过过滤器（filter）把数据还原，最后数据转换成像素数据，就可以得到 ImageData 了。

### 渐进式加载（interlace）

保存 PNG 图片的时候可以选择是否保存为渐进式。渐进式的 PNG 图片可以在加载过程中从模糊到清晰。

![Interlace](https://i.stack.imgur.com/97gN6.png)

![w/ interlace](https://i.stack.imgur.com/vqvqf.gif)![w/o interlace](https://i.stack.imgur.com/JTSz2.gif)

PNG 的渐进式加载采用了 [Adam7](https://en.wikipedia.org/wiki/Adam7_algorithm) 算法。将像素点重新排序，可以做到先展示较不清晰的图片，再展示较清晰的图片。Adam7 算法一共有 7 步。

![Adam7](https://upload.wikimedia.org/wikipedia/commons/2/27/Adam7_passes.gif)

到第 7 步时可以拿到全部像素信息，因此在解码过程中需要判断渐进式的开关，并重排像素数据。

## 编码

编码过程是一个逆向的解码。先写入文件签名，写入 IHDR 数据（文件宽高等），写入 GAMA 信息，将 ImageData 进行过滤（通过过滤可以提升压缩率），将过滤后的数据用 zlib 压缩，作为 IDAT 写入，最后写入 IEND。

源码可以参考 [png](https://github.com/vivaxy/course/tree/master/png)，基于 [pngjs](https://github.com/lukeapage/pngjs) 的同步源码将 Node.js 的 zlib 替换成了浏览器端可以运行的 [pako](https://github.com/nodeca/pako)。再添加 [buffer](https://github.com/feross/buffer) 以来就可以在浏览器上运行了。

## 参考资料

- [Portable Network Graphics - Wikipedia](https://en.wikipedia.org/wiki/Portable_Network_Graphics)
- [ImageData - Web APIs](https://developer.mozilla.org/en-US/docs/Web/API/ImageData)
- [Uint8ClampedArray - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray)
- [TypedArray - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)
- [Uint8Array - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
- [Int8Array - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int8Array)
- [Buffer](https://nodejs.org/api/buffer.html)
- [Portable Network Graphics (PNG) Specification (Second Edition)](https://www.w3.org/TR/PNG/)
- [png - What does the interlaced option in Photoshop do?](https://graphicdesign.stackexchange.com/questions/6677/what-does-the-interlaced-option-in-photoshop-do)
- [Adam7 algorithm - Wikipedia](https://en.wikipedia.org/wiki/Adam7_algorithm)
- [pngjs3](https://github.com/gforge/pngjs3)
- [pngjs](https://github.com/lukeapage/pngjs)
- [node-png](https://github.com/liangzeng/node-png)
- [node-pngjs](https://github.com/jin-sandbox/node-pngjs)
- [png-async](https://github.com/kanreisa/node-png-async)
- [pngparse](https://github.com/darkskyapp/pngparse)
- [png-demo](https://github.com/vivaxy/course/tree/master/png)
- [pako](https://github.com/nodeca/pako)
- [buffer](https://github.com/feross/buffer)
