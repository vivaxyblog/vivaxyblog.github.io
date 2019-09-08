---
layout: post
title: H5 Flappy Bird 游戏制作 (4)
tags: [game, javascript, web]
---

## 前言

[上期](https://vivaxyblog.github.io/2017/07/23/h5-flappy-bird-3.html)，我们实现了 `Bird`, `StickManager` 模块，这期我们将实现 `Input`，碰撞检测和完成整个游戏。

## `Input`

安装事件中心模块：

```sh
npm install eventemitter3
```

在 `Input.js` 中添加代码：

```js
// 引入事件中心
import EventEmitter from 'eventemitter3';
// 继承事件中心
export default class Input extends EventEmitter {

    constructor() {
        super();
        // 点击或者按空格时触发 `touch` 事件，交由外部处理
        window.addEventListener('click', () => {
            this.emit('touch');
        });
        window.addEventListener('touchstart', () => {
            this.emit('touch');
        });
        window.addEventListener('keydown', (e) => {
            if (e.which === 32) {
                this.emit('touch');
            }
        });
    }
}
```

在 `GameManager` 中引入 `Input`：

```js
// ...
import Input from './Input';
// ...
export default class GameManager {
    constructor() {
        super();
        this.background = new Background();
        this.bird = new Bird();
        this.input = new Input();
        this.sticks = new StickManager();
        // 接收到用户操作时，跳用 `Bird` 的 `moveUp` 方法
        this.input.on('touch', () => {
            this.bird.moveUp();
        });
    }
    // ...
}
```

运行下可以看到点击后，`Bird` 向上飞了。

## 碰撞检测

分两部分：鸟和边界的碰撞，鸟和柱子的碰撞。

### 边界

在 `Bird` 类内实现方法 `isOutOfScreen`：

```js
// ...
export default class Bird extends Movable {
    // ...
    isOutOfScreen() {
        if (this.y - this.ry / 2 < 0) {
            return true;
        }
        const { width, height } = canvas.getSize();
        return this.y + this.ry / 2 >= height;
    }
}
```

### `Bird` + `Stick`

我们把 `Bird` 抽象成椭圆，把 `Stick` 抽象成矩形。

![collide](/assets/2017-07-24-h5-flappy-bird-4/collide.png)

上图黑色表示碰撞检测的图形，我们可以简单地认为椭圆的中心在红框内，则碰撞上了黑色的矩形。

在 `Bird` 类内部实现方法 `isCollidedWithRect`：

```js
// ...
export default class Bird extends Movable {
    // ...
    isCollidedWithRect(x, y, width, position) {
        /**
         *    rx
         *   │  │  │  │
         *   │  │  │  │
         *   │  │  │  │
         *   │  └──┘  │
         *   └────────┘  ry
         * if ellipse center is in outer box, then collide
         */
        // 跟上部分的柱子进行判断
        if (position === 'up') {
            const minX = x - width / 2 - this.rx / 2;
            const maxX = x + width / 2 + this.rx / 2;
            const maxY = y + this.ry / 2;
            if (this.x > minX && this.x < maxX && this.y < maxY) {
                return true;
            }
        }
        // 跟下部分的柱子进行判断
        if (position === 'down') {
            const minX = x - width / 2 - this.rx / 2;
            const maxX = x + width / 2 + this.rx / 2;
            const minY = y - this.ry / 2;
            if (this.x > minX && this.x < maxX && this.y > minY) {
                return true;
            }
        }
        return false;
    }
}
```

在 `Stick` 中定义 `isCollidedWidthBird`：

```js
// ...
export default class Stick extends Movable {
    // ...
    isCollidedWidthBird(check) {
        return check(this.x, this.y - this.gap / 2, this.width.up, 'up') || check(this.x, this.y + this.gap / 2, this.width.down, 'down');
    }
}
```

这里的参数 `ckeck` 就是在 `Bird` 中定义的 `isCollidedWithRect`，所以我们在调用 `check` 时需要传入约定的 `x`，`y`，`width` 和 `position`。

如果和上边的柱子碰到了算是碰到了，如果和下面的柱子碰到了，也算是碰到了。所以中间使用或运算符连接两个检测。

最后我们在 `GameManager` 里面添加 `checkGameOver` 游戏结束的判断：

```js
// 引入事件中心，将游戏结束的事件交由外部处理
import EventEmitter from 'eventemitter3';
// ...
export default class GameManager extends EventEmitter {
    // ...
    checkGameOver() {
        // 循环所有的柱子，判断是否碰撞
        const isCollided = this.sticks.getSticks().some((stick) => {
            return stick.isCollidedWidthBird(this.bird.isCollidedWithRect.bind(this.bird));
        });
        // 判断是否出界
        const isOutOfScreen = this.bird.isOutOfScreen();
        // 两者只要满足其一，则游戏结束
        return isCollided || isOutOfScreen;
    }
}
```

修改 `loop` 函数：

```js
// ...
export default class GameManager extends EventEmitter {
    // ...
    loop() {
        this.paint();
        if (this.checkGameOver()) {
            this.emit('game-over');
            return this;
        }
        requestAnimationFrame(() => {
            this.loop();
        });
        return this;
    }
}
```

修改 `index.js` 添加游戏结束的判断：

```js
import './index.pcss';
import GameManager from './GameManager';

let gm = new GameManager();

const processError = () => {
    const button = document.createElement('button');
    button.innerHTML = 'Restart';
    document.body.appendChild(button);
    button.addEventListener('click', () => {
        document.body.removeChild(button);
        gm = new GameManager();
        gm.on('game-over', processError);
        gm.start();
    });
};

gm.on('game-over', processError);
gm.start();
```

游戏结束后会在页面上添加一个按钮，点击按钮重新开始游戏。

为按钮添加样式，修改 `index.pcss`：

```css
/* ... */
button {
    position: absolute;
    display: block;
    width: 200px;
    height: 50px;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    background: #80d230;
    border: 4px solid #54434b;
    font-size: 24px;
    color: #54434b;
    border-radius: 4px;
}
```

到这里，我们完成了 Flappy Bird 游戏的制作。

线上体验的地址：[https://vivaxy.github.io/game/flappy-bird/](https://vivaxy.github.io/game/flappy-bird/)
