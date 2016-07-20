---
layout: post
title: 前端 MVC 开发模式
tag: pattern
---

## 开发模式

### 原始

```html
<div onclick="test(this);" style="color: #000;">change color</div>
<script>
    function test (ele) {
        ele.style.color = '#f00';
    }
</script>
```

当页面内容增多的时候，网页长度会变的特别长，寻找特定方法的时候因此变久，页面的维护成本变高了。

### 渐进

于是，我们把页面上的内容按照 html， js 和 css 这三块拆分了出来。

```html
<link rel="stylesheet" href="index.css">
<div class="test">change color</div>
<script src="index.js"></script>
```

```js
document.querySelector('.test').addEventListener('click', function (e) {
    e.target.style.color = '#f00';
});
```

```css
.test {
    color: #000;
}
```

js 和 css 中会增加选择元素的操作，html 中的结构变得清晰了。

但是，当网页逻辑变多的时候，js 和 css 中的许多选择元素的行为让人难受了。

### 现代

于是我们选用了 MVC 框架，他们提供了元素和数据的绑定，使我们可以用原始的方式来写页面结构，并且将页面结构拆分到不同的 js 文件中。

```html
<body id="app">
<div v-on:click="changeColor" v-bind:style="{ color: color}">change color</div>
<script src="vue.js"></script>
<script src="index.js"></script>
</body>
```

```js
new Vue({
    el: '#app',
    data: {
        color: '#000'
    },
    methods: {
        changeColor: function () {
            this.color = '#f00';
        }
    }
});
```

但是 MVC 框架都存在一个致命的问题：兼容性，大部分都不兼容 IE8 及以下的浏览器。对于在一个这样 low 的公司，还需要做 IE8 兼容的情况下，只能和 MVC 框架说再见了。

可是 MVC 框架在手机上兼容性非常好，为什么还是用不了呢？因为太大了。对于一个普通页面来说，使用 zepto 作为基础的情况下，所有 js 请求的大小在 100KB 左右。

一个小巧一些的 MVC 框架比如 vue.js 大小在 20KB 左右，已经有点难以忍受了。To say nothing of react, which has the size of 110KB.

为此我们必须找到一种使用 zepto 作为框架的 MVC 开发方式。

## 场景

常见的页面开发中，会遇到如下的场景。

### 简单的展示页面

这些页面往往是纯静态的。我们拿到数据后，直接塞进 dom 树中。

有两种填充数据的方式。第一种是选择到元素，使用 innerHTML 的方式填充内容。第二种是使用模版，将数据模型写入模版后，一次性填充到 html 中。

这种模式下开发的内容可以归为两类：视图（view）和模型（model）。数据流如下：

model -> view

这条线路我们记为1。

### 动态交互页面

这些页面上会有按钮，用户点击后，会重新渲染一部分的视图。

我们在上面简单的展示页面的基础上，只要再加上时间绑定，然后将事件处理后的结构反馈到模型中，然后再次渲染页面，就可以实现交互了。

绑定事件时，我们需要选择 dom 元素，然后写上 addEventListener ，回调中修改 model 中的数据，并且执行部分渲染的方法。

这种模式下的数据流如下：

model ->(1) view ->(2) model

从 view 返回到 model 中的线路我们记为2。

### 有联动的交互页面

这些页面上，用户在操作一部分内容的时候，会同时修改其他的模型，并且更新别处的视图。

这里需要在对应的 model 的改变后，增加额外的逻辑去修改别处的 model，并且更新别处的 view。

这种模式下的数据流如下：

model ->(1) view ->(2) model ->(3) model

从一处 model 的变化影响到另一处 model 的变化的线路我们标记为3。

## 模式

以上三种场景能涵盖绝大多数页面开发中遇到的实际问题了。

相对于我们之前提到的三种开发模式中，他们都是怎么处理这三条线路的呢？

### 原始和渐进

对于原始的开发，所有的数据和内容都在 html 中，我们只要一次性把数据写到 html 上，就可以完全去掉 model 这个概念了。

线路1：把数据填充到 html 中。

线路2：绑定 onclick，然后修改 html。

线路3：绑定的 onclick 直接在全局中找到 html，然后修改掉。

### knockout

knockout 使用了 MVVM 的数据流形式，主要维护 view 和 model 。

线路1：html 中使用 data-bind 数据。

线路2：html 中使用 data-bind 方法，方法中修改 model 的值，由于双向绑定带来的便利，在 model 修改后，view 会自动更新。

线路3：在 model 的数据中使用 computed 或者 computed，修改了 model 中其他的值，并且由于双向绑定，直接体现在了 view 上。

### react

react 中的 state 相当与 model，state 与 view 之间存在联动，所以 model 的变更会直接体现在 view 中。

线路1：render 方法中定义 view 是如何根据 model 渲染的。

线路2：onclick 中定义方法修改 model，model 的改变会导致 view 的重新渲染。

线路3：onclick 后可以修改其他的 model，model 的改变会导致所有的 view 重新渲染。

之所以 react 不怕重新渲染所有内容会卡，是因为它有性能极高的虚拟 dom。所以为这种开发方式提供了可能（借口）。

### zepto

回到 zepto 为框架的开发模式中来看，我们只要在 js 中多维护一个 model，就可以模仿 knockout 和 react 把 MVC 层级分离出来了。

为什么多维护一个 model 会更好呢？

因为这个 model 是纯粹的数据，结构清晰，与 view 一一对应。在与服务端交互的过程中，避免不了将提取这个 model 的过程，ajax 返回的结果就是一个大致的 model 了。在提交数据的时候，我们会整理出来需要提交的 model，如果页面上直接就有这个 model，那就方便多了。

拿最原始的开发模式来看，在表单提交的时候，我们需要选择 dom ，取到上面的值，处理好，整理成 json，发送。维护了 model 就去掉了这个过程，让用户的任何操作都能第一时间反应到 model 中，使我们的目标。

那么怎么维护 model 呢？

- 首先我们会在页面上面声明 model 对象，其中包含 model 中的所有字段。

- 然后根据 model 中的数据使用模版将 view 拼出来。

- 在 view 中选择所有用户能够操作的元素，绑上操作的事件，在事件的回调中修改 model 。

- 每次事件的触发都导致整个页面重新拼出来。

这个做法比较类似 react。但是我们没有 react 的虚拟 dom。所以可以在第四步中进行一次性能优化。在事件回调中不再重新渲染整个页面，而是判断需要渲染哪一部分的页面，并且进行渲染。

于是我们建立起来了基于 zepto 的 MVC 方式。

在这种方式下的三条线路是这样的：

线路1：根据 model 渲染 view。

线路2：绑定事件，修改 model，然后根据 model 的修改情况修改需要更新的 view。

线路3：绑定事件的回调中，修改其他的 model，然后根据 model 的修改情况修改需要更新的 view。

## 未来的模式

redux 的设计思路增加了 reducer 这个概念。将事件的回调要处理的东西分发到 reducer 上，在 reducer 中处理逻辑，修改 model。

在 redux 中，model 是 store。

用户的操作不再能直接作用到 model 上，增加了一层 reducer，有点隔靴搔痒，但是增加了的这一层带给了开发工具去拦截页面状态的可能。带来了回溯页面状态，保存页面状态的热更新，和根据状态的测试用例编写等等。
