---
layout: post
title: H5 Flappy Bird 游戏制作 (1)
tag: game
---

## 前言

我打算用几期的时间做一个 [Flappy Bird](https://flappybird.me/static/games/flappy-bird_1/) 游戏。

H5 游戏有不少现成的引擎，可以让开发这很方便的完成游戏开发。比如：

- [createjs](http://www.createjs.com/)
- [pixiJS](http://www.pixijs.com/)
- [playcanvas](https://playcanvas.com/) 上面这个游戏就是用这个库实现的
- [egret](https://www.egret.com/)

然而今天我不用这些引擎。使用原生 js 实现这个游戏。

## 新建项目

通过 [gt](https://github.com/vivaxy/granturismo) 脚手架工具，使用 [gt-front-end-scaffold](https://github.com/vivaxy/gt-front-end-scaffold) 脚手架新建了项目：[flappy-bird](https://github.com/vivaxy/flappy-bird)

新项目中默认包含了 es6, webpack 等特性帮助我们开发。

修改 `src/entries/demo.js` 的名称为 `flappy-bird.js`。内容修改为：

```js
import '../FlappyBird';

if (module.hot) {
    module.hot.accept('../FlappyBird', () => {
        location.reload();
    });
}
```

我们接受了 webpack hot reload，当受影响的文件为 `../FlappyBird/index.js` 时，进行页面的刷新。这样我们可以在改动了源码后

在 `src` 目录下新建 `FlappyBird` 目录。目录下新建 `index.js` 。新建 `index.pcss`，进行样式编写。

## canvas

我们先放一个 canvas，让项目跑起来。

修改 `templates/index.html`，添加一个 canvas 元素。

```html
<canvas></canvas>
```

我们通过 canvas 的方式进行游戏的元素绘制。

canvas 默认是 inline 元素，因此需要在 canvas 上设置 `display: block;`，清除元素的默认边距。

目前大家的设备都是高清屏幕了，对于 retina 来说，一个像素点展示了4个实际像素的内容，对于更高清的屏幕来说，比例更大。可以通过 `window.devicePixelRatio` 获取到比例。

我们把 canvas 的实际宽高放大到屏幕宽高的相应倍数，再使用 css 的缩放展示在页面上即可。

## 模块拆分

仔细看下游戏，我们尝试拆分下游戏的元素。游戏包括：背景，柱子，鸟。背景不动。柱子每次都是上下两根对应，中间留空让鸟飞过，柱子可以抽象成方形。鸟左右位置固定，上下根据用户操作来。

我们还需要单独的游戏管理的类管理其中所有类。画布类进行 canvas 设置。用户输入类来获取用户输入，控制元素的变化。柱子管理类来管理所有的柱子。

## GameManager

需要控制 `StickManager`，`Input`，`Canvas`，`Bird`，`Background`，提供 `start` 方法进行初始化。

游戏中的绘制是实时进行的，通过 `requestAnmiationFrame` 回调来获取浏览器渲染的下一帧，在下一帧进行绘图。

绘图时考虑不同设备的差异，通过时间差来计算变动，获取新的一帧的状态，避免不同设备上游戏难度不一致。

```js
class GameManager {
    loop() {
        // get time
        // calculate position
        this.paint();
        requestAnimationFrame(() => {
            // next frame
            this.loop();
        });
    }
}
```

TBC
