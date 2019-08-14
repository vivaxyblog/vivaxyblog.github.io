---
layout: post
title: webpack plugins 简介
tags: [tools]
---

webpack 通过 plugins 实现各种功能。常见的 plugins 如下：

- webpack.DefinePlugin 定义环境变量
- webpack.EnvironmentPlugin 定义环境变量
- webpack.optimize.CommonsChunkPlugin 共用 js 打包
- [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 使用模版生成 html 文件
- [webpack-visualizer-plugin](https://github.com/chrisbateman/webpack-visualizer) 输出依赖文件分析图表
- webpack.HotModuleReplacementPlugin 代码热更新，用于调试模式
- webpack.optimize.OccurrenceOrderPlugin 调整模块的打包顺序，用到次数更多的会出现在文件的前面
- webpack.NoErrorsPlugin 构建过程中有报错，不认为构建完成
- webpack.ProgressPlugin 输出构建进度
- webpack.BannerPlugin 在文件头添加注释
- webpack.optimize.UglifyJsPlugin 压缩 js
- webpack.optimize.DedupePlugin 去除重复依赖
- [extract-text-webpack-plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin) 从 js 中提取出样式文件，单独打包成 css 文件

### webpack.DefinePlugin

这个插件可以把命令行的环境变量带到浏览器端。react 认为 `NODE_ENV=production` 是生产环境，类似的我们可以定义不同环境的 `NODE_ENV`，在浏览器代码中通过 `process.env.NODE_ENV` 变量拿到值。

```js
const webpack = require('webpack');
const NODE_ENV = process.env.NODE_ENV; // 从命令行环境获取 NODE_ENV 参数
module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV)
            } // 定义浏览器中的替换的变量为 `process.env.NODE_ENV`
        })
    ]
}
```

在代码中可以使用 `process.env.NODE_ENV` 获取对应的值。

### webpack.EnvironmentPlugin

webpack.DefinePlugin 上面提到的功能可以被 webpack.EnvironmentPlugin 替代掉。

```js
const webpack = require('webpack');
module.exports = {
    plugins: [
        new webpack.EnvironmentPlugin([
            'NODE_ENV'
        ])
    ]
}
```

效果同上。

### webpack.optimize.CommonsChunkPlugin

可以提取多个 entry 中共用的内容，打包到一个共用 js 文件中去，多个页面可以都引用这个文件，以利用浏览器缓存，减少下载体积。

```js
const webpack = require('webpack');
module.exports = {
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['common'],
            filename: 'js/[name].js',
            minChunks: 2
        })
    ]
}
```

上面的配置会把用到 2 次及以上（在 minChunks 中定义）的内容放到 `js/common.js` 中。配合 `HtmlWebpackPlugin` 可以自动填充到 html 中。

names 可以传多个文件名，wepback 会把共用部分再拆分出来。

### html-webpack-plugin

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/html/index.html', // ${SOURCE_PATH}/${HTML_FOLDER}/${htmlTemplateName}.html
            filename: 'html/index.html', // ${HTML_FOLDER}/${entryName}.html
            hash: true,
            inject: 'body',
            chunksSortMode: 'none',
            chunks: [
                'common',
                'index'
            ]
        })
    ]
}
```

这个插件可以根据 html 模版生成 html 文件。结合上面的 CommonsChunkPlugin 可以动态决定最后编译出来的 html 中引用哪些 js 或者 css 文件。

- `template`: 选用的模版文件
- `filename`: 最终生成的 html 文件名称，其中可以带上路径名
- `hash`: 是否在文件后添加 hash，用于禁用缓存
- `inject`: 文件插入的位置。可以选择在 `body` 还是 `head` 中
- `chunks`: 文件中插入的 entry 名称，注意必须在 entry 中有对应的申明，或者是使用 CommonsChunkPlugin 提取出来的 chunk
- `chunksSortMode`: 默认地，插件会根据规则重新调整 chunks 的顺序。`none` 表示排序依据 webpack 提供的规则

利用这个插件，我们可以实现项目下统一的模版定义，而不再需要每个入口 entry 都写一个 html 去引用，而是动态根据 entry 名称去生成 html。

### webpack-visualizer-plugin

```js
const Visualizer = require('webpack-visualizer-plugin');
module.exports = {
    plugins: [
        new Visualizer()
    ]
}
```

构建输出目录下会有一个 stats.html 文件，其中包含了各个依赖来源和大小。

![webpack visualizer plugin](/assets/2017-01-31-webpack-plugins/webpack-visualizer-plugin.png)

可以看到这里用到了 lodash.merge 占了 56.8k。如果引入整个 lodash 则整个体积会大很多。

代码中

```js
import _ from 'lodash';
_.merge({}, {/* ... */});
```

会导致引入整个 lodash 库。可以修改成

```js
import _merge from 'lodash.merge';
_merge({}, {/* ... */});
```

类似地

```js
import { RaisedButton } from 'material-ui';
```

会引入所有的 [material-ui](http://www.material-ui.com/#/get-started/usage) 组件，应该修改成

```js
import RaisedButton from 'material-ui/RaisedButton';
```

[ant-design](https://ant.design/) 提供了 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 以工具的形式处理了上面的写法。
