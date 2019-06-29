---
layout: post
title: H5 Flappy Bird 游戏制作 (2)
tags: [game, javascript, web]
---

## 前言

[上期](https://vivaxyblog.github.io/2017/03/30/h5-flappy-bird-1.html)，我们介绍了 `canvas`, `GameManager` 模块，这期我们实现一下上次拆分的 `canvas` 和 `Background` 模块。

## `canvas`

由于画布在全局是单一的，所以在实现 `canvas` 模块时，我们采用单例模式。

新建 `src/FlappyBird/canvas.js`：

```js
// 定义 Canvas 类
class Canvas {
    constructor() {
        // 使用选择器选择 canvas DOM 节点
        const canvas = document.querySelector('canvas');
        // 根据设备分辨率设置宽高
        canvas.height = window.innerHeight * window.devicePixelRatio;
        canvas.width = window.innerWidth * window.devicePixelRatio;
        this.canvas = canvas;
    }

    // 提供获取 context 的方法
    getCtx() {
        return this.canvas.getContext('2d');
    }

    // 提供清空屏幕展示内容的方法
    clear() {
        const ctx = this.getCtx();
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    // 提供获取 canvas 实际宽高的方法
    getSize() {
        return { width: this.canvas.width, height: this.canvas.height };
    }
}

// 实例化 Canvas 类
const canvas = new Canvas();

// 暴露单例
export default canvas;
// 将 ctx 暴露出去，为了方便使用
export const ctx = canvas.getCtx();
```

为了让 `canvas` 占满整个屏幕，我们需要设置一些 css 样式。在 `src/FlappyBird/index.pcss` 中添加：

```css
/* 让 html 占满整个页面的高度，默认 html 占了页面的全宽，因此不需要额外设置 */
html {
    height: 100%;
}
/* 去掉 body 上默认的 margin，让 body 的高度也占满整个页面 */
body {
    margin: 0;
    height: 100%;
}
/* 让 canvas 元素变成块级，占满整个页面 */
canvas {
    display: block;
    width: 100%;
    height: 100%;
}
```

## `Movable`

在上次提到的模块拆分时，我们设想了 `StickManager`，`Input`，`canvas`，`Bird`，`Background` 这几个模块。其中 `StickManager`，`Bird`，`Background` 三个模块都需要移动，因此我们提取了公用的移动类 `Movable`，这三个模块继承后可以共享移动的属性和方法。

```js
// 定义基础类
export default class Movable {

    constructor() {
        // 构造函数中保存这个元素的横向坐标和纵向坐标 x 和 y，和横向移动速度和纵向移动速度 vx 和 vy。
        // 这里都设置成 `0`，也就是默认不移动
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
    }

    move() {
        const diff = 10;
        this.x += this.vx * diff / 1000;
        this.y += this.vy * diff / 1000;
        return { diff };
    }

}
```

其中横向坐标和纵向坐标都是 canvas 坐标系下的坐标，也就是从左到右 x 增加，从上到下 y 增加。

移动函数会在每次被调用的时候得到一个时间差。一种做法是时间差是真实时间的函数，也就需要每次移动时需要记录下当前的时间，然后和上次的时间相减，得到的差值做一次比例运算：`const diff = (currentTime - prevTime) * ratio;`。第二种做法是固定差值，也就是认为每次 `move` 函数被调用和上次被调用之间的时间差固定：`const diff = fixedValue`。这里我们简单地采用第二种方式，并且让 `fixedValue` 等于 `10`。

拿到时间差后，计算下一个位置的坐标，并且更新到自身的属性上，这样在具体实例调用 `paint` 函数绘制图像的时候，直接读取坐标画到 `canvas` 上。这里的物体运动有两种方式，匀速运动和加速度运动。运动的微分公式是 `(delta s) = v * (delta t)`。在加速度运动情况下，只要每次修改速度就可以了 `(delta v) = a * (delta t)`。因此这里只要把位置的变化累加到原先的位置上 `x += vx * diff`。这里的速度的单位是像素每秒，`diff` 的单位是毫秒，所以需要除以 `1000`。最后把 `diff` 值返回出去，以便在外部计算速度差。

## `Background`

有了 `Movable` 后，就可以实现背景了。

```js
// 引入 canvas 和 ctx
import canvas, { ctx } from './canvas';
// 背景图
import image from './background.png';
// 引入 `Movable
import Movable from './Movable';
// 声明 `Background` 类继承 `Movable` 类
export default class Background extends Movable {

    constructor() {
        // 调用父类的构造函数
        super();
        // 加载背景图资源
        this.image = new Image();
        this.image.src = image;
        const { width, height } = canvas.getSize();
        // 背景图的宽高是按照整个屏幕的宽高设计的
        this.width = width;
        this.height = height;
        // 覆盖掉默认的横向移动速度，这里的背景图需要向左移动，所以 `vx` 是负值
        this.vx = -100;
    }

    move() {
        // 调用父类的移动函数
        super.move();
        if (this.x < -this.width) {
            this.x += this.width;
        }
    }

    paint() {
        ctx.drawImage(this.image, this.x, 0, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, 0, this.width, this.height);
    }
}
```

画背景图时，我们用两个图片首位相连的方式。当一张背景图移出了屏幕，就让它变成下一个背景图：`x = width`。

在 `src/FlappyBird/GameManager.js` 中引入 `Background`，看下效果：

```js
import canvas from './canvas';
import Background from './Background';

export default class GameManager {

    constructor() {
        // 初始化背景
        this.background = new Background();
    }

    paint() {
        // 每次重绘整个画布。先清空画布的所有东西，再移动背景，最后画背景
        canvas.clear();
        this.background.move();
        this.background.paint();
    }

    loop() {
        this.paint();
        requestAnimationFrame(() => {
            this.loop();
        });
    }

    start() {
        this.loop();
    }

}
```

最后在 `src/FlappyBird/index.js` 中，调用 `GameManager` 初始化一个游戏：

```js
// 基础样式
import './index.pcss';
import GameManager from './GameManager';

let gm = new GameManager();

// 开始游戏
gm.start();
```

可以看到背景一直向左移动。

TBC
