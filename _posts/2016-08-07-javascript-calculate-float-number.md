---
layout: post
title: javascript 中浮点运算的误差
tag: problem
---

## 问题描述

```js
0.1 + 0.2 === 0.3; // false
0.1 + 0.2 === 0.30000000000000004; // true
```

由于10进制的小数（部分浮点数）无法用二进制表示，因此在存储和计算上就会产生误差。

## 解决方案

将浮点数变成整数可以解决这个问题。

也就是在计算中，我们先去掉浮点，然后再计算，再转成浮点数，就能减少一次误差运算了。

```js
((0.1 * 10) + (0.2 * 10)) / 10 === 0.3; // true
```

可以直接使用 [bignumber.js](http://mikemcl.github.io/bignumber.js/)。

## 参考

- [在一些编程语言（如Javascript）中，为什么浮点型数值运算时会产生误差？](https://www.zhihu.com/question/20679634)
- [bignumber.js](http://mikemcl.github.io/bignumber.js/)
