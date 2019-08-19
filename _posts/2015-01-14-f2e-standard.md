---
layout: post
title: 前端规范
tags: [javascript, css, html, f2e, frontend, standard]
---

### 说明

前端规范是前端开发团队遵循和约定的代码书写规范

遵循本规范可以提高代码的可读性和可维护性

此规范适用于大众点评广告平台前端

*斜体表示推荐做法，不做强制规定*

### 目录

1. [代码风格](#1)

    1.1 [缩进](#1.1)

    1.2 [引号](#1.2)

    1.3 [语句结尾 `;`](#1.3)

    1.4 [`{` 前空格](#1.4)

    1.5 [`:` 前空格](#1.5)

    1.6 [`,` 前空格](#1.6)

    1.7 [`(` 前空格](#1.7)

    1.8 [`{` 在行末](#1.8)

2. [HTML](#2)

    2.1 [文件头](#2.1)

    2.2 [JavaScript 和 CSS 文件的引用](#2.2)

    2.3 [JavaScript 和 CSS 句柄的使用](#2.3)

    2.4 [标签关闭](#2.4)

    2.5 [特殊符号](#2.5)

3. [JavaScript](#3)

    3.1 [全局变量](#3.1)

    3.2 [函数的声明方式](#3.2)

    3.3 [变量的声明方式](#3.3)

    3.4 [变量的命名](#3.4)

    3.5 [作用域](#3.5)

    3.6 [其他](#3.6)

4. [CSS](#4)

    4.1 [浏览器前缀](#4.1)

    4.2 [单位](#4.2)

    4.3 [颜色](#4.3)

    4.4 [URL](#4.4)

    4.5 [*缩写*](#4.5)

    4.6 [*属性书写顺序*](#4.6)

5. [文件及目录](#5)

    5.1 [结构](#5.1)

    5.2 [文件格式](#5.2)

    5.3 [*压缩和合并*](#5.3)

6. [命名](#6)

7. [注释](#7)

    7.1 [行注释](#7.1)

    7.2 [*文档注释*](#7.2)

8. [Git 版本管理](#8)

9. [版本号](#9)

10. [接口](#10)

11. [图片](#11)

12. [*性能*](#12)


### <a name="1"></a> 1 代码风格

#### <a name="1.1"></a> 1.1 缩进

html, js, css等一律采用4个空格缩进

#### <a name="1.2"></a> 1.2 引号

html, json中的引号采用双引号 `"` ，同时，js中的引号采用单引号 `'`

#### <a name="1.3"></a> 1.3 语句结尾 `;`

js，css语句结尾添加 `;` ，如：

```css
.example {
    margin: 0;
}
```

```js
var example = {
    foo: 0
};
```

#### <a name="1.4"></a> 1.4 `{` 前空格

css, js中，`{` 之间必须包含空格，如：

```css
.example {
}
```

```js
var example = function(arg1, arg2) {
};
```

```js
if (true) {
}
```

#### <a name="1.5"></a> 1.5 `:` 前空格

css, js中，`属性名`，`对象` 与之后的 `:` 之间不包含空格， `:` 与之后的值之间包含空格，如：

```css
.example {
    margin: 0;
}
```

```js
var example = {
    foo: 0
};
```

#### <a name="1.6"></a> 1.6 `,` 前空格

多个值 `,` 前没有空格，后面有空格，如：

```css
.example {
    font-family: Arial, sans-serif;
}
```

```js
var example = [0, 1, 2, 3];
```

`[]` ， `()` 中的值，开头没有空格， `,` 前没有空格， `,` 后一个空格，最后没有空格，如：

```js
var example = function(arg1, arg2) {
    return 'example';
};
```

#### <a name="1.7"></a> 1.7 `(` 前空格

`控制语句`与 `(` 之间有空格，如：

```js
if (true) {
}
```

方法声明的 function 关键字和后面的括号之间有空格

```js
var example = function () {
    return 'example';
};
```

#### <a name="1.8"></a> 1.8 `{` 在行末

`代码块` ， `{}` 中的 `{` 要在行末，而不是行首，如：

```js
// good
var foo = function () {
    return {
        bar : 0
    };
}
```

js会自动插入分号，当如下情况时，`return` 值是 `undefined`

```js
// bad
var foo = function () {
    return
    {
        bar : 0
    };
}
```


### <a name="2"></a> 2 HTML

#### <a name="2.1"></a> 2.1 文件头

文件头采用html5标准 `<!DOCTYPE html>`

这样能够确保在每个浏览器中拥有一致的展现

`head`中包含样式表，不包含脚本，包含`meta`，包含`title`

`head`中包含的meta，规定页面编码，禁用用户缩放

```
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
```

#### <a name="2.2"></a> 2.2 JavaScript 和 CSS 文件的引用

css文件引用 `<link type="text/css" rel="stylesheet" href="...">` 放置于 `</head>` 前，不使用 `<style>` ，便于使用缓存

js文件引用 `<script type="text/javascript" src="..."></script>` 放置于 `</body>` 前，不使用 `<script>` ，便于使用缓存

#### <a name="2.3"></a> 2.3 JavaScript 和 CSS 句柄的使用

css样式附着于 `class="..."` ，不使用 `style="..."`

js操作句柄附着于 `class="js-xxx"`，遵循`github`代码规范

绑定的数据使用 `data-xxx="..."`，横线链接，不使用大写字母，因为`html`大小写不敏感，最终生成的会是小写的属性值

#### <a name="2.4"></a> 2.4 标签关闭

不用关闭的标签一律不加 `/`，如：`<br>`，`<hr>`，`<input>`

#### <a name="2.5"></a> 2.5 特殊符号

特殊符号采用[HTML符号实体](http://www.w3school.com.cn/tags/html_ref_entities.html)


### <a name="3"></a> 3 JavaScript

#### <a name="3.1"></a> 3.1 全局变量

避免使用全局变量

#### <a name="3.2"></a> 3.2 函数的声明方式

用变量形式申明函数，而不是 `function`

#### <a name="3.3"></a> 3.3 变量的声明方式

- 变量在使用前必须通过 `var` 定义

- 使用字面量`{}`、`[]`替代`new Object()`、`new Array()`

- 不要使用`string`、`bool`、`number`对象类型，即不要调用`new String`、`new Boolean`、`new Number`

#### <a name="3.4"></a> 3.4 变量的命名

- 小写开头表示变量，如：`topBox`，`topBoxList`，`footerCopyright`

- 大写开头表示构造器函数，如：`SuperMBox`

- 常量全部大写，如：`PIE`

- 方法内的私有变量加前缀 `_`

- 构造函数内部的 `this` 别名采用 `_this`

- jQuery选择器选择的变量使用 `$` 开头

#### <a name="3.5"></a> 3.5 作用域

- 慎用`with`，`with`会引起作用域混乱，作用域查询减缓执行速度

- 慎用`eval`

#### <a name="3.6"></a> 3.6 其他

- js改变样式时：尽量改变 class 而不是 style ，手机端使用 classList 代替 className

- 缓存DOM选择，每次选择都要计算

- 缓存列表 `.length`，每次选择都要计算

- 两次及以上用到的字符串常量，赋值给一个变量，以便在压缩时减少代码体积

```js
// good
var startEvent = 'touchstart';
var elementA = document.querySelector('.example-1');
var elementB = document.querySelector('.example-2');
elementA.on(startEvent, function () {
    //...
});
elementB.on(startEvent, function () {
    //...
});
// uglified
var a = 'touchstart', b = document.querySelector('.example-1'), c = document.querySelector('.example-2');
b.on(a, function () {
    //...
});
c.on(a, function () {
    //...
});

// bad
elementA.on('touchstart', function () {
    //...
});
elementB.on('touchstart', function () {
    //...
});
// uglified
a.on('touchstart', function () {
    //...
});
b.on('touchstart', function () {
    //...
});
```

- 字符串转换成数字的时候用 `parseInt('08', 10)` ，ie8 和三星 webview 下的 bug 会让0开头的字符串变成0

- *文件开始处添加 `'use strict'`，启用严格模式*

- *使用canvas动画时，5个元素以内使用css动画，5个以上使用canvas动画*

- *动画选择时，优先使用css3动画*

- *使用requestAnimationFrame动画代替setTimeout*

### <a name="4"></a> 4 CSS

#### <a name="4.1"></a> 4.1 浏览器前缀

浏览器前缀列表按照下面的顺序

```css
.example {
    -ms-transform: translate(-4px, -4px);
    -moz-transform: translate(-4px, -4px);
    -webkit-transform: translate(-4px, -4px);
    transform: translate(-4px, -4px);
}
```

#### <a name="4.2"></a> 4.2 单位

长度为 0 时须省略单位

```css
/* good */
.example {
    padding: 0 5px;
}

/* bad */
.example {
    padding: 0px 5px;
}
```

#### <a name="4.3"></a> 4.3 颜色

- 颜色值可以缩写时，必须使用缩写形式，如：

```css
/* good */
.example {
    background-color: #aca;
}

/* bad */
.example {
    background-color: #aaccaa;
}
```

- 颜色值使用小写字母，如：

```css
/* good */
.success {
    background-color: #aca;
}

/* bad */
.success {
    background-color: #aaccaa;
}
```

- 颜色值不允许使用命名色值，如：`black`，`green`

#### <a name="4.4"></a> 4.4 URL

url() 函数中的路径不加引号，如：

```css
body {
    background: url(bg.png);
}
```

特殊情况下可以添加双引号，如：

```css
body {
    background: url("center(240*360).png");
}
```

#### <a name="4.5"></a> 4.5 *缩写*

推荐，不要求

在可以使用缩写的情况下，尽量使用属性缩写，减少代码量，如：

```css
/* good */
.example {
    font: 12px/1.5 arial, sans-serif;
}

/* bad */
.example {
    font-family: arial, sans-serif;
    font-size: 12px;
    line-height: 1.5;
}
```

#### <a name="4.6"></a> 4.6 *属性书写顺序*

推荐，不要求

属性书写顺序：同一 rule set 下的属性在书写时，应按功能进行分组，并以 Formatting Model（布局方式、位置） > Box Model（尺寸） > Typographic（文本相关） > Visual（视觉效果） 的顺序书写，以提高代码的可读性。

> Formatting Model 相关属性包括：position / top / right / bottom / left / float / display / overflow 等
>
> Box Model 相关属性包括：border / margin / padding / width / height 等
>
> Typographic 相关属性包括：font / line-height / text-align / word-wrap 等
>
> Visual 相关属性包括：background / color / transition / list-style 等
>
> 另外，如果包含 content 属性，应放在最前面。


### <a name="5"></a> 5 文件及目录

#### <a name="5.1"></a> 5.1 结构

单个html

```
.
├── index.html        入口页
├── js/               js
│   ├── lib/          js库
│   └── main.js       js入口
└── css/              css
    ├── lib/          css库
    ├── image/        图片
    └── main.css      主css
```

多个html

```
.
├── html/
│   ├── welcome.html  页面1
│   └── main.html     页面2
├── js/               js
│   ├── lib/          js库
│   └── main.js       js入口
└── css/              css
    ├── lib/          css库
    ├── image/        图片
    └── main.css      主css
```

#### <a name="5.2"></a> 5.2 文件格式

- 文本文件： UTF-8\(无BOM\)编码

#### <a name="5.3"></a> 5.3 *压缩和合并*

根据项目架构，js, css, html, png需要合并和压缩


### <a name="6"></a> 6 命名

- 文件名，文件夹名，项目名，html，css样式名中连接单词使用 `-` 不使用大写字母，不使用数字开头，如：

`dp-share.0.0.1.js`，`box-list-item-1`，`mengniu-m-20131230`，`.top-box`

- js中连接单词使用驼峰式的变量命名方法，不使用数字开头，数字之间采用 `_` ，如：

`dpShare`，`boxListItem1`，`boxListItem1_2`

- 本规范中只有以上两种命名规范，两者不可混用，不可混淆

- 相对于驼峰式，下划线连接变量名有更好的可读性，因为下划线很容易就可以当作空格忽略掉，变量名看起来非常像句子，其中可以包含大小写数字等字符。但是js中很多原声方法都是驼峰式，为了统一，还是使用了驼峰式变量名。

### <a name="7"></a> 7 注释

#### <a name="7.1"></a> 7.1 行注释

- `/* css 注释 */`

- `<!-- html 注释 -->`

- `// js 单行注释`，可以使用多行注释，但是不要在单行中使用多行注释的方式去注释（可能和正则混淆）

#### <a name="7.2"></a> 7.2 *文档注释*

推荐，不要求

js 文档

```js
/**
 * bla
 * foo
 * bar
 * @file 文件说明
 * @author 开发者姓名(开发者邮箱)
 * @since 新建时间
 * @modified 修改时间
 * @namespace 命名空间
 * @class //标记类
 * @extends 描述继承关系
 * @param {string} p1 参数1的说明
 * @return 返回值描述
 * @inner //标记内部函数，外部无法访问
 * @override //重写父类中的方法
 * @event 事件描述
 * @fires Select#change 广播事件
 * @const //标记常量
 * @type {string} //变量类型
 */
```

参见[JSDoc](http://usejsdoc.org/index.html)

### <a name="8"></a> 8 Git 版本管理

- 分支命名

1. 主分支：`master`，用于发布到 ppe 和线上

2. 开发分支：`feature`，可交付的代码，用于持续集成 ci 的构建

- 分支合并

1. 采用 `git rebase` 合并同一分支上不同人的改动记录，避免产生多余的 commit 记录

2. 提交 merge request 来将开发分支合并到主分支上。目的是为了增加代码审核流程，以减少上线后的问题

- 删除分支

code 上提 merge request 时，勾选删除源分支。

### <a name="9"></a> 9 版本号

- 版本格式：主版本号.次版本号.修订号

1. 主版本号：当你做了不兼容的API 修改，

2. 次版本号：当你做了向下兼容的功能性新增，

3. 修订号：当你做了向下兼容的问题修正。

先行版本号及版本编译信息可以加到“主版本号.次版本号.修订号”的后面，作为延伸

### <a name="10"></a> 10 接口

- 取数据的接口用 `GET` ，提交数据的接口使用 `POST`

- 需要及时更新的数据，使用 `GET` 方法，在参数后添加时间戳 `&_={timestamp}`

### <a name="11"></a> 11 图片

- 移动端图片宽度不大于640

- 避免重设图片大小，重设图片大小是指在html、css、js，多次重设图片大小会引发图片的多次重绘，影响性能，默认在css中设置图片大小，当css中无法设置大小时，使用js

- *图片尽量避免使用DataURL，DataURL图片没有使用图片的压缩算法文件会变大，并且要解码后再渲染，加载慢耗时长*

- *纯颜色，三角形，logo，使用css, svg, iconfont代替图片*

### <a name="12"></a> 12 *性能*

推荐，不要求

- 移动端三秒种渲染完成首屏，首屏加载3秒完成或使用Loading。基于联通3G网络平均338KB/s(2.71Mbps），所以首屏资源不应超过1014KB，多余的资源采用loading。

- 移动端减少HTTP请求，首次加载同时请求数不能超过4个。手机浏览器同时响应请求为4个请求（Android支持4个，iOS 5后可支持6个）

- 异步加载第三方资源：第三方资源不可控会影响页面的加载和显示，因此要异步加载第三方资源

## 参考

- [匈牙利命名法](http://zh.wikipedia.org/wiki/%E5%8C%88%E7%89%99%E5%88%A9%E5%91%BD%E5%90%8D%E6%B3%95)

- [前端规范](http://front-end-standards.com/)

- [css编码规范](http://segmentfault.com/blog/jslite/1190000002460968)

- [JavaScript编码规范 1](http://segmentfault.com/blog/jslite/1190000002460897)

- [JavaScript编码规范 2](http://segmentfault.com/blog/jslite/1190000002460944)

- [最流行的JavaScript代码规范](http://segmentfault.com/blog/news/1190000000410316)

- [语义化版本2.0.0](http://semver.org/lang/zh-CN/)

- [移动H5前端性能优化指南](http://isux.tencent.com/h5-performance.html)

- [Popular Coding Convention on Github](http://sideeffect.kr/popularconvention#javascript)

- [驼峰式](http://zh.wikipedia.org/wiki/%E9%A7%9D%E5%B3%B0%E5%BC%8F%E5%A4%A7%E5%B0%8F%E5%AF%AB)

- [猎豹移动前端编码规范](https://github.com/CMCM-F2E/fe-standards)

- [编码规范 by @mdo](http://codeguide.bootcss.com/)

- [Github Style Guide](https://github.com/styleguide)

- [Baidu EFE team](https://github.com/ecomfe/spec)

- [Tencent Alloyteam](http://alloyteam.github.io/code-guide/)

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/JavaScript)

- [点评前端团队知识库 JavaScript-编码风格](http://f2e.dp/wiki/JavaScript-%E7%BC%96%E7%A0%81%E9%A3%8E%E6%A0%BC)

- [点评前端团队知识库 JavaScript-语言规范](http://f2e.dp/wiki/JavaScript-%E8%AF%AD%E8%A8%80%E8%A7%84%E8%8C%83)

- [Javascript 规范](https://github.com/dianping-f2e/javascript-spec)

- [Css 规范](https://github.com/dianping-f2e/css-spec)

- [Node编码规范](http://book.douban.com/subject/25768396/)

- [ECMAScript6 编码规范--广发证券前端团队](https://github.com/gf-web/es6-coding-style)

- [Principles of Writing Consistent, Idiomatic JavaScript](https://github.com/rwaldron/idiomatic.js)

- [Google JavaScript Style Guide](http://google-styleguide.googlecode.com/svn/trunk/javascriptguide.xml)

- [点评前端编码规范](https://www.zybuluo.com/TyrionYu/note/198953)

- [http-api-design](https://github.com/interagent/http-api-design)
