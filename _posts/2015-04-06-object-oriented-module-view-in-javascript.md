---
layout: post
title: JavaScript 模块化探索
tag: javascript
---

前端模块化的实现意味着要将一个模块中的数据，逻辑和渲染合并在一个单元中，往往这个单元是一个js文件。本文采用的方法也是如此。

## [reactjs](https://github.com/facebook/react)的实现

reactjs采用单向的数据流：通过mudule层上的数据更新，触发view层的更新。使用`state`保存数据状态。reactjs会算出那些view需要重新渲染，然后再做DOM上的重绘。

## [crystal](https://github.com/youngjay/crystal-template)的实现

采用knockoutjs作为MVVM，使用browserify作为模块管理器。页面状态由hash记录。html方式书写view，`<script></script>`中书写module，然后编译成js文件，模块化加载到应用中。

## 原生js的实现

基于事件机制的`on`和`fire`方法传递数据，js的渲染方式实现view，原型链方式继承。

### 基础类：`Base`

```js
/*
 * @author: vivaxy
 * @date:   2015-04-06 15:52:47
 * @last modified by:   vivaxy
 * @last modified time: 2015-04-06 17:35:10
 */

'use strict';

var Base = function () {

    },
    p = {};
Base.prototype = p;

p.on = function (event, callback) {
    if (!this.hasOwnProperty('events')) throw new Error('`events` not defined in object');
    if (!this.events[event]) {
        this.events[event] = [];
    }
    this.events[event].push(callback);
    return this;
};

p.off = function (event, callback) {
    if (!this.hasOwnProperty('events')) throw new Error('`events` not defined in object');
    var callbacks = this.events[event];
    if (callbacks && callback) {
        callbacks = callbacks.filter(function (cb) {
            return cb !== callback;
        });
    } else {
        callbacks = [];
    }
    return this;
};

p.fire = function (event) {
    if (!this.hasOwnProperty('events')) throw new Error('`events` not defined in object');
    var callbacks = this.events[event],
        _this = this,
        _arguments = arguments;
    if (callbacks) {
        callbacks.forEach(function (callback) {
            callback.apply(_this, Array.prototype.slice.call(_arguments, 1));
        });
    }
    return this;
};

p.render = function () {
    if (!this.hasOwnProperty('container')) throw new Error('`container` not defined in object');
    if (!this.hasOwnProperty('data')) throw new Error('`data` not defined in object');
    this.container.appendChild(this.template(this.data));
    return this;
};

p.template = function () {
    if (!this.hasOwnProperty('data')) throw new Error('`data` not defined in object');
    var fragment = document.createDocumentFragment();
    return fragment;
};

p.update = function (data) {
    if (!this.hasOwnProperty('data')) throw new Error('`data` not defined in object');
    this.data = data;
    var _this = this;
    Array.prototype.slice.call(this.container.children).forEach(function (child) {
        _this.container.removeChild(child);
    });
    this.render();
    return this;
};
```

包含`on`, `off`, `fire`的事件方法，和`render`, `template`, `update`的渲染方法。

其中事件方法需要用到module中的`events`对象，而渲染方法需要用到module中的`container`, `data`对象。

### 组件类`Module`

```js
var Module = function(options){
        this.events = {};

        this.data = options.data;
        this.container = options.container;

        this.render();
    },
    p = new Base();

Module.prototype = p;

// @Override
p.template = function(){
    // ...
};
```

继承了基础类的中的事件方法和渲染方法，同时可以在原型上重写两类方法中的具体方法。

组件需要定义`this.events = {}`, `this.data`, `this.container`以使用基础类中的方法。

组件需要调用`this.render()`实现渲染。

组件中可以包含其他自定义方法，只需要在原型`p`上添加对象即可。

### 继承

`var module = new Module({});`

`module.render`将寻找`module`构造函数上的`render`方法；如果没有找到，会寻找`module`原型链上的`render`方法，由于`module`原型链是基础类的实体`base`，所以相当于在`base`中找字面量`render`；如果没有找到，会寻找`base`原型链上的`render`方法。这样继承能最大化js原型链的使用，复用相同的函数，以减少内存开销；同时，还保证了方法重写的可能性，提高了方便性，可以在继承的对象中的任意一个构造函数上重写。

### 渲染

可以根据不同试用场景修改`render`方法的具体实现方式，如：`innerHTML`, `appendChild`, jquery的`html`等。

可以根据更改内容的影响范围修改`update`方法，实现局部渲染，以减少浏览器重绘，提高性能。

### 事件

父级对象中使用`new`方式构造子对象，并且可以在子对象上使用`on`方法添加事件监听。

子对象内采用底层的事件监听方式，如`addEventListener`, jquery的`on`等方法监听用户输入等触发事件后，执行`fire`方法，就可以把响应数据传递到父级对象中。

子对象在任何过程中都可以执行`fire`方法，并传递数据。

`off`可以去掉采用函数名绑定的事件。

### 数据流

父级对象将拿到的数据用`options`的方式在`new`子对象的时候传入。

子对象将完整数据，或者变化的数据用`fire`的形式传递到父级对象中。

如果修改的是用一个对象，则在任何时候拿到的数据都是完整的，并且实时的。子对象内的修改数据操作会反馈到父级对象中！

## [例子](http://vivaxy.github.io/fragment/module-view/#)
