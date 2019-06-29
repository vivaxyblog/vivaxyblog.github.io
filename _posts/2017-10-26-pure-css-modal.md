---
layout: post
title: 用纯 CSS 实现弹窗
tags: [css]
---

## 知识点

- a 标签点击改变页面链接中的 hash 部分。
- `:target` 选择器可以选中和页面 hash 相同的标签（标签的 id 和页面 hash 相同）。

## 代码实现

先在页面中定义弹窗 `id="modal"` 以关联 hash。

添加打开弹窗的按钮，a 标签，链接地址是弹窗的 id。

```html
<a href="#modal">open modal</a>
<div id="modal">
    <h1>modal</h1>
</div>
```

在弹窗上添加样式 `class="modal"`，在弹窗里面添加关闭按钮 `<a href="#">close</a>`。

```html
<div class="modal" id="modal">
    <h1>modal</h1>
    <a href="#">close</a>
</div>
```

在 css 中默认隐藏弹窗，同时设置弹窗的基础样式。

```css
.modal {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: white;
}
```

在 css 中添加 `:target` 选择器，让 hash 值和弹窗的 id 相同时，弹窗可以展示出来。

```css
.modal:target {
    display: block;
}
```

## 参考链接

- [在线例子](https://vivaxy.github.io/course/cascading-style-sheets/target/index.html)
- [Light-Modal](https://hunzaboy.github.io/Light-Modal/)
