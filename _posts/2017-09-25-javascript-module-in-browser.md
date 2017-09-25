---
layout: post
title: 在浏览器中使用 JavaScript 模块
tag: config
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

查看[例子](https://vivaxy.github.io/course/native-api/script-type-module/)。

## 参考资料

- [ES6 Modules: Micro Tip #15 - Supercharged](https://www.youtube.com/watch?v=GWmO88hBbKY)
