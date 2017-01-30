---
layout: post
title: webpack loaders 简介
tag: tools
---

webpack 通过 loader 解析 require 语句引入的文件。常用的 loader 有：

- [babel-loader](https://github.com/babel/babel-loader) js 文件编译
- [style-loader](https://github.com/webpack-contrib/style-loader) style 标签加载样式文件
- [css-loader](https://github.com/webpack-contrib/css-loader) 处理 css 文件
- [postcss-loader](https://github.com/postcss/postcss-loader) 处理样式
- [json-loader](https://github.com/webpack-contrib/json-loader) 处理 json 文件 _2.x 版本不再需要_
- [url-loader](https://github.com/webpack-contrib/url-loader) 处理图片字体等，合适的文件会被编译成 base64 URL，否则则使用 file-loader
- [file-loader](https://github.com/webpack-contrib/file-loader) 处理图片字体等，拿到文件的相对路径
- [raw-loader](https://github.com/webpack-contrib/raw-loader) 读取文件，可以获得字符串内容

loader 的使用方法是在 `webpack.config.js` 根据一定规则配置，或者针对特定文件使用。

```js
module.exports = {
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, './src')
                ],
                loaders: [
                    'babel-loader'
                ]
            }
        ]
    }
}
```

配置中几个字段的说明如下：

- `test`: 用来判断文件是否使用本 loader 的正则，通常根据文件后缀区分
- `include`: 包含的文件路径，数组形式的，wepback 只会在这些目录下找需要处理的文件
- `loaders`: 数组的形式来表示符合条件的文件需要使用哪些 loader 进行处理

loader 可以串联使用，比如 less 文件需要先使用 `less-loader`，再使用 `css-loader`，最后使用 `style-loader`。

在配置中 loaders 的书写顺序是：

```js
module.exports = {
    module: {
        loaders: [
            {
                test: /\.less$/,
                include: [
                    path.resolve(__dirname, './src')
                ],
                loaders: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    }
}
```

loader 中的参数可以通过在 loader 名称后追加，比如在 css-loader 中开启 css module 的写法是 `css-loader?modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]!`。

针对特定文件使用 loader 需要修改代码中的 require 语句。比如对特定的 css 文件不使用 css module。

```js
import '!!style-loader!css-loader!../css/index.css';
require('!!style-loader!css-loader!../css/index.css');
```

在 require 前添加 `!!` 用来禁用所有在 config 中配置的 loader。

在 1.x 的 wepback 中可以省略 loader 名称中后面的 `-loader`，但是 2.x 中不能省略。
