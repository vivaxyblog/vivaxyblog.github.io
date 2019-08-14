---
layout: post
title: webpack 简介
tags: [tools]
---

webpack 是 2016 年兴起的一个前端打包工具。看了 [github](https://github.com/webpack/webpack) 上最早的一次 [commit](https://github.com/webpack/webpack/commit/2e1460036c5349951da86c582006c7787c56c543) 是 2012 年 3 月 10 日提交的。作者 [sokra(Tobias Koppers)](https://github.com/sokra) fork 了 [medikoo](https://github.com/medikoo) 的 [modules-webmake](https://github.com/medikoo/modules-webmake)，modules-webmake 解决了 web 打包中的模块化的问题，把 nodejs 中的 cmd 带到了浏览器中。但是 webpack 在 modules-webmake 的基础上添加了代码切分，也就是可以把打包出来的 js 拆分成多个 js。

在 webpack 之前，前端的打包工具是 gulp/grunt，两者的思想是把打包的大问题拆分成一个个步骤的配置，让开发用插件的形式进行单步处理。gulp 和 grunt 主要针对文件，gulp 通过 src 找到相应的文件，通过 dest 把处理好的文件输出出去。但是从本质上它们不支持 cmd 形式的模块化，所以处理起依赖来比较麻烦。往往我们需要借用 browserify 等工具完成 js 的依赖打包。cmd 格式的模块化思想在 nodejs 中已经广泛应用了，但是迟迟不能在浏览器中使用，这是一个痛点，webpack 正是解决了这个问题。

不同于 gulp/grunt 的思想，webpack 将所有资源编译成 js，然后合并成一个 js，当然因为它具有代码拆分功能，我们还可以把这一个大 js 拆分成多个文件。

![what is webpack](/assets/2017-01-30-a-brief-introduction-to-webpack/what-is-webpack.png)

webpack 通过加载器和插件的形式可以支持多种语法和打包方式。除了此之外，webpack 还有 devServer 支持调式，可以热更新，大大提升了开发效率。

webpack 的配置是通过项目根目录下的 `webpack.config.js` 来完成的。

```js
module.exports = {
    entry: './src/app.js',
    output: {
        path: './dist',
        filename: 'app.bundle.js'
    }
};
```

上面的写法把 `./src/app.js` 文件作为整个 js 的入口，如果其中依赖其他文件的话，webpack 可以将它一起打包进去。这里的依赖可以是任何的静态资源，不单单可以是 js 文件。

定义的 `output` 是如何输出文件，打包好的 js 会放在 `./dist/` 目录下，名字是 `app.bundle.js`。

`entry` 有多种写法：

```js
module.exports = {
    entry: './src/app.js'
};
// or
module.exports = {
    entry: [
        './src/entry1.js',
        './src/entry2.js'
    ]
}
// or
module.exports = {
    entry: {
        page1: './src/entry1.js',
        page2: [
            './src/entry2.js',
            './src/entry3.js'
        ]
    }
}
```

如果 `entry` 是对象，那么对象的 key 会被传入 `output` 的 `name` 变量，因此多 entry 的场景下，我们需要修改下 `output` 的写法：

```js
module.exports = {
    entry: {
        page1: [
            './src/entry1-1.js',
            './src/entry1-2.js'
        ],
        page2: [
            './src/entry2-1.js',
            './src/entry2-2.js'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    }
};
```

有了上面这些基础的配置，就可以完成 cmd 模块的解析和打包。

在项目下安装 webpack，`yarn add webpack -D`，修改 `package.json` 添加下面一段编译指令：

```json
{
  "scripts": {
    "build": "webpack --progress"
  }
}
```

然后在命令行执行 `yarn run build` 就可以完成编译了。配置中的 `--progress` 是用来展示打包进度的，当项目比较大的时候选择展示出来。
