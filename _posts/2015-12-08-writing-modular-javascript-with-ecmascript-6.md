---
layout: post
title: 用 ECMAScript 6 编写模块化的 js
tag: javascript
---

## 阶段一

用 babel 5.0 的 [cli](https://babeljs.io/docs/setup/#babel_cli) 将单个 es6 文件编译成 umd 形式的 es5

将文件拼接在一起 `> cat ./build/a.js ./build/b.js > ./dest/index.js`

## [阶段二](/2015/09/03/writing-modular-javascript-with-ecmascript-6.html)

使用到了 [babel](https://www.npmjs.com/package/babel) 和 [browserify](https://www.npmjs.com/package/browserify)

用 babel 5.0 的 [cli](https://babeljs.io/docs/setup/#babel_cli) 将单个 es6 文件编译成 cmd 形式的 es5

用 browserify 输出为同一个文件

## [阶段三](/2015/09/03/writing-modular-javascript-with-ecmascript-6.html)

使用 browserify 插件 babelify

`> browserify ./src/index.js -t babelify -o ./dest/index.js`

## 阶段四

babel 升级到了 6.0 ，对所有功能进行了细化拆分，如果用到 es6 的规范，则需要安装 `babel-preset-es2015`

此处需要对上个阶段的项目进行升级

首先安装依赖

`npm i --save-dev babelify babel-preset-es2015`

修改 `package.json` 添加 browserify 的配置

```js
// ...
"browserify": {
    "transform": [
        [
            "babelify",
            {
                "presets": [
                    "es2015"
                ]
            }
        ]
    ]
} // ,
// ...
```

编译的指令变成了 `browserify ./src/index.js -o ./dest/index.js`

这里可以把原本的 makefile 去除了，改由 `npm run make` 命令来执行编译，在 `package.json` 中添加

```js
// ...
"scripts": {
    "build": "browserify ./src/index.js -o ./dest/index.js"
} // ,
// ...
```

## 阶段五

使用 [webpack](https://webpack.github.io/) 和 babel

上个阶段中每次编译的时间都是漫长的，不便于调试，使用 [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) 可以解决调试慢的问题

安装依赖 `npm i --save-dev webpack webpack-dev-server babel-loader babel-core babel-preset-es2015`

项目下新建 webpack 配置文件 `webpack.config.js`

```js
/**
 * @since 2015-12-07 16:43
 * @author vivaxy
 */
'use strict';
module.exports = {
    entry: {
        index: './src/index.js' // 项目主入口文件
    },
    output: {
        filename: './[name].js' // 输出的文件
    },
    module: {
        loaders: [
            {
                test: /src\/.+\.js?$/,
                loader: 'babel?presets[]=es2015' // 定义了 loader
            }
        ]
    }
};
```

loader 中的配置可以参考[这里](https://webpack.github.io/docs/configuration.html#module-loaders)

配置完成后，在命令行中执行 `> webpack` 就能得到输出的文件，执行 `> webpack-dev-server` 就能在 8080 端口启动本地服务，调试 es6 代码

如果想在文件变动后自动刷新页面，可以在 html 中加入 `<script src="http://localhost:8080/webpack-dev-server.js"></script>`

[参考项目](https://github.com/vivaxy/course/tree/gh-pages/hammer)
