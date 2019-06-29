---
layout: post
title: H5 Flappy Bird 游戏制作 (3)
tags: [game, javascript, web]
---

## 前言

[上期](https://vivaxyblog.github.io/2017/07/22/h5-flappy-bird-2.html)，我们实现了 `canvas`, `Background` 模块，这期我们将实现 `Bird` 和 `StickManager` 模块。

## `Bird`

`Bird` 也是一个可移动的模块，但是和之前的 `Background` 的移动模式不同，`Bird` 的移动是有加速度的。

另外的不同的一点是，`Bird` 是一个需要考虑碰撞的模型：

- 边界碰撞。碰到顶部和底部，游戏结束。
- 柱子碰撞。碰到柱子，游戏结束。

我们把 `Bird` 简化成一个椭圆模型，这样计算碰撞会简单很多。

```js
// 依然引入画布
import canvas, { ctx } from './canvas';
// 向前飞的图片，在速度为 0 的时候用
import forwardImage from './bird-forward.png';
// 向上飞的图片，在速度小于 0 的时候用
import upImage from './bird-up.png';
// 向下飞的图片，在速度大于 0 的时候用
import downImage from './bird-down.png';
// 移动模型的基础类
import Movable from './Movable';

export default class Bird extends Movable {
    constructor() {
        // 调用父类的构造函数，初始化基础的位置和速度属性
        super();
        const { width, height } = canvas.getSize();
        // 圆心，我们把 `Bird` 固定在这个位置，移动背景来让玩家觉得鸟在向前飞行
        this.x = 200;
        // 初始的高度位置在屏幕中心
        this.y = height / 2;
        // 图片素材和真实展示的像素的比例
        const ratio = 5;
        // 鸟的模型
        // 椭圆的横轴长度
        this.rx = 17 * ratio; // 17 * 12
        // 椭圆的纵轴长度
        this.ry = 12 * ratio;
        // 初始的纵向速度，会在每次 `move` 时叠加差值
        this.vy = 100;
        // 重力加速度，不变
        this.g = 2000;

        // 加载图像素材
        const forward = new Image();
        forward.src = forwardImage;
        const up = new Image();
        up.src = upImage;
        const down = new Image();
        down.src = downImage;
        this.image = { forward, up, down };
    }

    move() {
        // 调用父类的移动函数，并且拿到时间差，用来计算新的纵向速度
        const { diff } = super.move();
        this.vy = this.vy + (this.g * diff / 1000);
    }

    moveUp() {
        // 当用户点击屏幕时，将鸟的纵向速度设置成向上飞的一个速度
        this.vy = -500;
    }

    getYState() {
        // 根据纵向速度，判断这时需要使用什么图片
        if (this.vy > 0) {
            return 'up';
        }
        if (this.vy < 0) {
            return 'down';
        }
        return 'forward';
    }

    getImage() {
        // 获取展示的图片
        const state = this.getYState();
        return this.image[state];
    }

    paint() {
        // 画个鸟，鸟的坐标 x 和 y 表示的是中心点
        ctx.drawImage(this.getImage(), this.x - (this.rx / 2), this.y - (this.ry / 2), this.rx, this.ry);
    }

}
```

修改 `GameManager` 的 `paint` 函数，添加 `Bird` 的应用：

```js
paint() {
    canvas.clear();
    this.background.move();
    this.background.paint();
    this.bird.move();
    this.bird.paint();
}
```

这里需要注意绘制的顺序，先画 `Background`，再画 `Bird`，否则 `Bird` 会被 `Background` 覆盖掉。

可以看到这个 `Bird` 直接掉了下去。之后我们会添加用户的交互，来让它重新飞起来。

## `StickManager`

这个类会管理所有的柱子，所以我们还需要添加一个类：`Stick` 来表示一组柱子，包括一上一下的两个柱子：

```js
import canvas, { ctx } from './canvas';
// 上部分的那根柱子的图片素材
import stickUpImageSrc from './stick-up.png';
// 下部分的那根柱子的图片素材
import stickDownImageSrc from './stick-down.png';

import Movable from './Movable';

export default class Stick extends Movable {

    constructor(x) {
        // 在使用柱子的时候，我们会从外面传入柱子的横坐标
        super();
        // 加载图片素材
        const stickUpImage = new Image();
        stickUpImage.src = stickUpImageSrc;
        const stickDownImage = new Image();
        stickDownImage.src = stickDownImageSrc;
        this.image = { up: stickUpImage, down: stickDownImage };

        // 简单地设置上下两根柱子之间的空隙的高度
        this.gap = 400;
        // 设置柱子的横向速度
        this.vx = -500;
        const { width, height } = canvas.getSize();

        // 图片素材和实际展示的像素大小的比例关系
        const ratio = 5;
        this.width = {
            up: 26 * ratio, // 26 * 135
            down: 26 * ratio, // 26 * 121
        };
        this.height = {
            up: 135 * ratio,
            down: 121 * ratio,
        };
        // 初始的柱子的位置。横坐标和纵坐标表示上下两根柱子之间的空隙的中心位置
        this.x = x;
        this.y = height / 2 + (Math.random() * 400 - 200);
    }

    paint() {
        // 画出上下两根柱子
        ctx.drawImage(this.image.up, this.x - this.width.up / 2, this.y - this.gap / 2 - this.height.up, this.width.up, this.height.up);
        ctx.drawImage(this.image.down, this.x - this.width.down / 2, this.y + this.gap / 2, this.width.down, this.height.down);
    }

    isOutOfScreen() {
        // 提供方法来判断柱子是否已经移出了屏幕
        return this.x + this.width.up / 2 < 0 && this.x + this.width.down / 2 < 0;
    }

}
```

然后在 `StickManager` 中使用：

```js
import canvas from './canvas';
import Stick from './Stick';

export default class StickManager {

    constructor() {
        // 当前屏幕内的 `Stick` 列表
        this.sticks = [];
        const { width } = canvas.getSize();
        // 初始时添加三根柱子，分别在屏幕最右侧，最右侧的 1.5 倍位置和最右侧的 2 倍位置
        this.create(width);
        this.create(width + width / 2);
        this.create(width * 2);
    }

    getSticks() {
        // 对外提供获取 sticks 的方法
        return this.sticks;
    }

    create(x) {
        // 创建 `Stick`，并记录到列表中
        this.sticks.push(new Stick(x));
    }

    move() {
        // 移动每根柱子，并且判断是否柱子已经移动到屏幕外面了，如果移出了屏幕，则从列表中去除。这里是用了在 `Stick` 中定义的 `isOutOfScreen` 方法
        this.sticks = this.sticks.filter((stick) => {
            stick.move();
            return !stick.isOutOfScreen();
        });
        // 保持游戏中有三根柱子，如果列表长度小于 3，则新增一根柱子
        if (this.sticks.length < 3) {
            const { width } = canvas.getSize();
            this.create(width * 3 / 2);
        }
    }

    paint() {
        // 画出列表中的每根柱子
        return this.sticks.map((stick) => {
            return stick.paint();
        });
    }

}
```

修改 `GameManager` 的 `paint` 函数，添加 `StickManager` 的应用：

```js
paint() {
    canvas.clear();
    this.background.move();
    this.background.paint();
    this.sticks.move();
    this.sticks.paint();
    this.bird.move();
    this.bird.paint();
}
```

可以看到柱子能正确地移动和生成。

TBC
