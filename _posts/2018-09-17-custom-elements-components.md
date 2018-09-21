---
layout: post
title: 基于 Custom Elements 的组件化开发
tag: customElements components
---

[customElements](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements) 是 Web Components 规范下的新 API，可以用来实现组件化开发。

如果你的应用只用兼容最新的 Chrome 浏览器，那么用它来替代 React 或者 Vue 是一个不错的选择。

## 基本用法

组件声明在一个 HTML 文件中。组件包括样式（Style），节点（DOM）和交互逻辑（Script）。一个组件文件的基本结构如下：

```html
<template>
  <style></style>
  <div>DOM 节点</div>
</template>
<script>
  const componentDocument = document.currentScript.ownerDocument;

  class Component extends HTMLElement {

    static get TAG_NAME() {
      return 'component-tag-name';
    };

    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'closed' });
      const content = componentDocument.querySelector('template').content.cloneNode(true);
      shadow.appendChild(content);
    }
  }

  customElements.define(Component.TAG_NAME, Component);
</script>
```

其中 `template` 节点下包含样式（Style）和节点（DOM）。交互逻辑在 `script` 标签中。

组件文件通过 `<link rel="import" href="./component.html">` 的方式引入 HTML 文件中。在 HTML 文件中使用组件的方式就是直接写组件标签。比如：

```html
<!DOCTYPE HTML>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
  <title>HTML</title>
  <link rel="import" href="./component.html">
</head>
<body>
<component-tag-name></component-tag-name>
</body>
</html>
```

## 组件注册

`customElements.define` API 用来组册组件，API 接受三个参数：组件标签名称、组件的类和组件继承的标签类型。如：

```js
customElements.define('expanding-list', ExpandingList, { extends: "ul" });
```

上面声明了一个标签为 `expanding-list` 的组件，组件的构造类是 `ExpandingList` 需要声明，组件继承 `ul` 标签的特性。

## 组件构造类

组件的构造类需要继承 `HTMLElement` 类，或者可以继承 `HTMLParagraphElement` 等 `HTMLElement` 的子类，如果继承了 `HTMLParagraphElement` 这个类，那么组件将拥有 `p` 标签的特性。

```js
class Component extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'closed' });
    const content = componentDocument.querySelector('template').content.cloneNode(true);
    shadow.appendChild(content);
  }
}
```

组件内的构造函数是必须的，在构造函数内，我们先需要调用父类的构造函数，然后创建一个 [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM) 节点，再将组件模版内容添加到节点内。

使用 Shadow DOM 可以做到组件内的样式和组件外的样式不互相干扰，可以让组件封装更彻底。

我们可以通过 `document.currentScript.ownerDocument;` 来拿到模版自身的跟节点。

## 组件属性

组件可以像 HTML 标签一样使用属性。在组件中可以获取属性。

```html
<component-tag-name attr-name="attr-value"></component-tag-name>
```

```js
class Component extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'closed' });
    const content = componentDocument.querySelector('template').content.cloneNode(true);
    shadow.appendChild(content);
    const attrValue = this.getAttribute('attr-name');
  }
}
```

## 组件生命周期

- `connectedCallback` 组件挂载，组件初始化后和移动时会触发
- `disconnectedCallback` 组件卸载
- `adoptedCallback` 组件被移动到一个新的文档树
- `attributeChangedCallback` 组件属性变化

## 组件事件

可以触发自定义事件。

```html
<template>
  <style></style>
  <button>组件事件</button>
</template>
<script>
  const componentDocument = document.currentScript.ownerDocument;

  class Component extends HTMLElement {

    static get TAG_NAME() {
      return 'component-tag-name';
    };

    static get BUTTON_CLICK() {
      return 'button-click';
    }

    constructor() {
      super();
      const shadow = this.attachShadow({ mode: 'closed' });
      const content = componentDocument.querySelector('template').content.cloneNode(true);
      shadow.appendChild(content);
      const button = shadow.querySelector('button');
      button.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent(Component.BUTTON_CLICK, { button }));
      });
    }
  }

  customElements.define(Component.TAG_NAME, Component);
</script>
```


## 例子

- [customElements 的基本例子](https://github.com/vivaxy/course/tree/master/native-api/custom-elements)
- [用 customElements 实现的 indexedDB 示例](https://github.com/vivaxy/course/tree/master/native-api/custom-elements)
