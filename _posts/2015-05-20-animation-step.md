---
layout: post
title: 用 Animation 的 Step 属性实现帧动画
tags: [CSS, Animation]
---

准备一张长图，包含动画内的所有帧。如下图：

![sprite](https://vivaxy.github.io/samples/cascading-style-sheets/animation-steps/sprite.png)

其中共有 13 帧。

通过背景图的方式显示，改变背景图的 `background-position` 实现动画。代码如下：

```css
.figure {
    width: 160px;
    height: 170px;
    margin: 100px auto;
    background: url(sprite.png) no-repeat 0 0;
}
.figure:hover {
    animation: fly 1s steps(12) both;
    -webkit-animation: fly 1s steps(12) both;
}
@keyframes fly {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: -1920px 0;
    }
}
```

为了保持初始和结束时的元素有背景，实际动画的帧数为 12。

手机端点击人物可以看到动画，电脑端鼠标悬浮在人物上会看到动画，点击空白处可以重置。

See example [here](https://vivaxy.github.io/samples/cascading-style-sheets/animation-steps/).
