---
layout: post
title: webpack require.context 的一些说明
tags: [tools]
---

使用 `require.context` 可以动态引入文件。参考[官方文档](https://webpack.js.org/guides/dependency-management/#require-context)，但是文档中的表述不甚清晰，因此我整理了几种用法和结果。

先新建一个测试目录，安装 webpack。目录结构如下：

![folder-preview](/image/2017-07-12-webpack-require-context/folder-preview.png)

## 使用 `require`

### 完全使用变量 `require(variable)`

代码如下：

```js
const filename = './dir/first-level.js';
const func = require(filename); // => Uncaught Error: Cannot find module "."
```

```
WARNING in ./index.js
2:13-30 Critical dependency: the request of a dependency is an expression
```

结果：无法正确拿到文件中的内容。

### 部分使用变量 `require(prefix + variable + suffix)`

第一种：

```js
const filename = './dir/first-level.js';
const func = require('' + filename); // => Error
```

结果：编译超时或内存溢出导致 webpack 进程退出。

这时 webpack 尝试引入 `.` 目录下的所有文件，由于 `node_modules` 存在，因此会引入非常多的文件导致问题。

第二种：

```js
const filename = '/first-level.js';
const func = require('./dir' + filename); // => Success
```

结果：成功获取文件中的内容。

这时 webpack 自动创建了一个 context，引入了所有路径符合 `^\.\/dir.*$` 的文件。生成的 `bundle.js` 中打包了所有的文件的内容。如果目录下存在非 js 文件，则需要通过配置正确的 loader 来引入。

第三种：

```js
const filename = 'r/first-level.js';
const func = require('./di' + filename); // => Success
```

结果：成功获取文件中的内容。

这时 webpack 自动创建了一个 context，引入了所有路径符合 `^\.\/di.*$` 的文件。生成的 `bundle.js` 中打包了所有的文件的内容。

第四种：

```js
const filename = 'first-level';
const func = require('./dir/' + filename + '.js'); // => Success
```

结构：成功获取文件中的内容。

这时 webpack 自动创建了一个 context，引入了所有路径符合 `./dir ^\.\/.*\.js$` 的文件。生成的 `bundle.js` 中打包了所有的文件的内容。

## 使用 `require.context`

在刚才的过程中，webpack 会创建一个 `require.context`，通过正则匹配到可能的文件，全部引入。如果我们想自定义这个正则规则的话，可以自己写一个 `require.context`。

第一种：

```js
const context = require.context('./dir', true, /\.js$/);
const keys = context.keys(); // => ["./another-first-level.js", "./first-level.js", "./sub-dir/second-level.js"]
const filename = './first-level.js';
const func = context(); // => Success
```

结果：成功获取文件中的内容。

其中第一个参数表示相对的文件目录，第二个参数表示是否包括子目录中的文件，第三个参数表示引入的文件匹配的正则表达式。

第二种：

```js
const context = require.context('./dir', false, /\.js$/);
const keys = context.keys(); // => ["./another-first-level.js", "./first-level.js"]
const filename = './first-level.js';
const func = context(filename); // => Success
```

结果：成功获取第一层目录中的文件内容，但是不能拿到子目录中的文件。

通过这个方式就可以解决引入不必要的 `node_modules` 中的文件的问题。相关的代码如下：

```js
var context = require.context('.', true, /^\.\/dir\/.*\.js$/);
console.log(context.keys());
const filename = './dir/first-level.js';
console.log(context(filename));
```

希望对大家理解动态 `require` 和 `require.context` 有帮助。
