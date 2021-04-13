---
layout: post
title: 在浏览器中使用 JavaScript 模块
tags: [javascript]
---

## 背景

Chrome 61 支持了在浏览器中使用 ES6 模块。[Safari 10.1 上半年也已经支持了](http://caniuse.com/#search=module)。

## 用法

```html
<script type="module" src="module-entry.js"></script>
<script nomodule type="text/javascript" src="nomodule.js"></script>
```

支持 ES6 模块的浏览器会根据 `<script>` 标签上的 `type="module"` 来加载 ES6 模块；而忽略带有 `nomodule` 的 `<script>` 标签。不支持的浏览器则会忽略 `type="module"` 的 `<script>` 标签，忽略 `<script>` 标签上的 `nomodule` 的属性。

使用浏览器原生对 ES6 模块的支持特性，可以享受模块级别的缓存这一优势。

在模块中引入其他模块时，需要添加 `.js` 后缀。模块中可以使用 `export` 和 `import` 关键字。

```js
// module-entry.js
// `.js` is required.
import name from './base.js';
console.log(name);
```

```js
// base.js
export default 'base';
export const count = 1;
```

查看[例子](https://vivaxy.github.io/samples/native-api/script-type-module/)。

可见规范的落实对前端发展有这举足轻重的作用。在前端现有能力范畴内，我们做了再多的优化，能做到的比起在浏览器和操作系统的改动带来的优化也要小很多。因此，作为前端开发只关注现有 API 和框架的话，能做的就很少了。

前端主要关注两点：用户体验和研发效率。其他所有问题都可以被归到以上两个问题的范畴内。兼容性是由不同的客户端导致的，客户端的升级是为了提升用户体验。真正能够提升用户体验和研发效率的是增加新的特性。

## 参考资料

- [ES6 Modules: Micro Tip #15 - Supercharged](https://www.youtube.com/watch?v=GWmO88hBbKY)
- [Deploying ES2015+ Code in Production Today](https://philipwalton.com/articles/deploying-es2015-code-in-production-today/)
