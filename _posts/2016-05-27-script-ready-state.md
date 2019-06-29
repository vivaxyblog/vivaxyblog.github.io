---
layout: post
title: script 标签的 load 事件在不同浏览器中的表现
tags: [compatibility]
---

## 起因

在阅读 neuron.js 源码时发现了下面一段代码：

```js
var DOC = document;

// never use `document.body` which might be NULL during downloading of the document.
var HEAD = DOC.getElementsByTagName('head')[0];

function load_js(src) {
  var node = DOC.createElement('script');

  node.src = src;
  node.async = true;

  js_onload(node, function() {
    HEAD.removeChild(node);
  });

  HEAD.insertBefore(node, HEAD.firstChild);
}

var js_onload = DOC.createElement('script').readyState
  // @param {DOMElement} node
  // @param {!function()} callback asset.js makes sure callback is not NULL
  ? function(node, callback) {
    node.onreadystatechange = function() {
      var rs = node.readyState;
      if (rs === 'loaded' || rs === 'complete') {
        node.onreadystatechange = NULL;
        callback.call(this);
      }
    };
  }

  : function(node, callback) {
    node.addEventListener('load', callback, false);
  };
```

上面这段代码在 cortex@6.2.4 中，然而 cortex@6.2.3 中的 neuron.js 中的一段确稍有不同。

```js
function load_js(src) {
  var node = DOC.createElement('script');

  node.src = src;
  node.async = true;

  js_onload(node, function() {
    HEAD.removeChild(node);
  });

  // blabla
  setTimeout(function () {
    HEAD.insertBefore(node, HEAD.firstChild);
  }, 0);
}
```

这里比最新版本多了个 setTimeout 方法。

可是却在 IE10 及以下的版本中报错了。报错的原因是 removeChild 在 insertBefore 方法之前执行了。

那么为什么会报错呢？script 标签是在被添加到 dom 树后再开始加载还是设置了 src 后开始加载呢？

## 经过

来测试下：

```html
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
    <link type="text/css" rel="stylesheet" href="index.css">
    <title>vivaxy</title>
</head>
<body>
<script>
    var HEAD = document.getElementsByTagName('head')[0];
    var node = document.createElement('script');

    node.onreadystatechange = function () {
        if (node.readyState === 'loaded' || node.readyState === 'complete') {
            console.log('loaded');
        }
    };

    node.src = 'async.js';

    HEAD.insertBefore(node, HEAD.firstChild);
</script>
</body>
</html>
```

async.js 中

```js
console.log('executed');
```

这段代码会异步加载 async.js ，并且在 script 标签的加载后打印 loaded ，同时在 async.js 执行时打印 executed 。

首先注释掉 `HEAD.insertBefore(node, HEAD.firstChild);` ，在 IE10 及以下的浏览器中执行的结果是会显示 load 。在 IE11 和 chrome 中则不显示任何内容。

## 结果

说明 IE10 及以下的版本会在 script 设置了 src 后开始加载脚本。在所有浏览器中，script 被添加在 dom 树中后才会执行。
