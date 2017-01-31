---
layout: post
title: webpack dev server 简介
tag: tools
---

## 基本用法

webpack dev server 是 webpack 提供的用于本地开发的工具，它支持代码热更新，能迅速将更改后的代码更新到浏览器中。在这个模式下，构建后的代码在内存中，不会写入硬盘，所以读写速度快了很多。

要使用 dev server，首先需要安装：`yarn add webpack-dev-server -D`，然后在 `package.json` 中配置运行命令：

```json
{
  "scripts": {
    "start": "NODE_ENV=development webpack-dev-server --progress"
  }
}
```

或者在命令行执行 `NODE_ENV=development ./node_modules/.bin/webpack-dev-server --progress`。

`--progress` 只能在命令行中生效，表示展示构建过程的进度。前面当然还需要指定 NODE_ENV 用来处理环境相关的逻辑。

除了使用命令行启动 dev server 之外，还有一种更可控的方式，用 node 启动：

```js
const open = require('open');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const webpackConfig = require('../webpack.config');

const compiler = webpack(webpackConfig);

const server = new WebpackDevServer(compiler, {
    contentBase: [
        'release', // webpackConfig.RELEASE_PATH
        'mock-server' // webpackConfig.MOCK_SERVER_BASE
    ],
    hot: true,
    historyApiFallback: true,
    stats: {
        colors: true
    }
});

server.listen('8080'/* webpackConfig.DEVELOPMENT_PORT */, '0.0.0.0'/* webpackConfig.DEVELOPMENT_IP */, function(err) {
    if (err) {
        console.log(err);
    } else {
        const address = server.listeningApp.address();
        const url = 'http://' + address.address + ':' + address.port;
        console.log('server started: ' + url);
        open(url + '/html/index.html');
    }
});
```

listen 中传入 ip 和 port，为了能够同时开发多个项目，我试用了 `Math.floor(Math.random() * 65536)`，但是 webpack-dev-server@2.x 可以指定端口号为 0 来使用一个可用端口。

在启动服务器后，我们使用 `open` 模块打开了一个页面，这是用命令行方式启动的时候做不到的。

## 开启代码热更新

热更新需要每个模块都支持。

常见的 js 模块的更新策略是重新执行，并且寻找依赖自己的那些模块，每个模块都重新执行一遍，直到所有相关模块都重新执行为止。webpack dev server 中有现成的插件能实现这个逻辑。因为不需要我们为每个 js 文件编写更新逻辑。

使用下面的配置可以支持默认的热更新：

- 在 dev server 配置中添加 `hot: true` 和 `inline: true`

- 在 plugins 中添加 HotModuleReplacementPlugin

```js
const webpack = require('webpack');
module.exports = {
    // ...
    plugins: [
        // ...
        new webpack.HotModuleReplacementPlugin()
    ]
    // ...
}
```

- 在每个 entry 的顶部添加文件 `webpack/hot/dev-server` 和 `webpack-dev-server/client?http://${DEVELOPMENT_IP}:${DEVELOPMENT_PORT}`

```js
module.exports = {
    entry: {
        page1: [
            'webpack/hot/dev-server', // 或者 webpack/hot/only-dev-server
            'webpack-dev-server/client?http://' + DEVELOPMENT_IP + ':' + DEVELOPMENT_PORT
            // ... 其他 entry
        ]
        // ...
    }
    // ...
}
```

`webpack/hot/dev-server` 和 `webpack/hot/only-dev-server` 的区别是在某些模块不支持热更新的情况下，前者会自动刷新页面，后者不会刷新页面，而是在控制台输出热更新失败。

## 针对 react 模块的热更新

使用 [react-hot-loader](https://github.com/gaearon/react-hot-loader) 模块能够更新 react 组件，并且保留 state。比如可以做到在 react 弹窗组件出现的情况下，调整弹窗内的元素，弹窗不关闭而看到最新的结果，当然弹窗是否出现需要维护在 state 或者 store 中。

这需要额外进行一些配置。react-hot-loader 目前最新版本是 1.3.1，支持上述特性的是 3.x 版本，作者已经完成了 3.x 的开发，但是由于文档不完善等原因迟迟没有发布正式版本。

为了使用 react-hot-loader@3.x 你需要这样修改配置：

- 安装 react-hot-loader@next。`yarn add react-hot-loader@next -D`

- 在 react 主入口的顶部添加 `<AppContainer>{/*  */}</AppContainer>`。从原先的 `render(<App/>)` 修改为

```js
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from '../entry/App';
render(
    <AppContainer>
      <App/>
    </AppContainer>,
    document.getElementById('root')
);
```

- 添加 `react-hot-loader/webpack` loader

```js
module.exports = {
    loaders: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loaders: [
                'babel-loader',
                'react-hot-loader/webpack'
            ]
        }
    ]
}
```

- 在每个 entry 的最前面添加 `react-hot-loader/patch`

```js
module.exports = {
    entry: {
        page1: [
            'react-hot-loader/patch',
            'webpack/hot/dev-server', // 或者 webpack/hot/only-dev-server
            'webpack-dev-server/client?http://' + DEVELOPMENT_IP + ':' + DEVELOPMENT_PORT
            // ... 其他 entry
        ]
        // ...
    }
    // ...
}
```

- 在 react 主入口 js 文件中实现 `module.hot.accept`

```js
// page/index.js
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from '../entry/App';
render(
    <AppContainer>
        <App/>
    </AppContainer>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./page/index', () => {
        const RootContainer = require('../entry/App').default;
        render(
            <AppContainer>
                <App/>
            </AppContainer>,
            document.getElementById('root')
        );
  });
}
```

注意 react-hot-loader 不支持 decorate 过的组件，比如不能使用 `@connect`。
