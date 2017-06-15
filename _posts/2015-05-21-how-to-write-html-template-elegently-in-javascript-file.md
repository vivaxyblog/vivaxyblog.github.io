---
layout: post
title: 如何在 js 中优雅地写 html 模板
tag: javascript
---

注释形式写在js中，然后用Function.prototype.toString方法拿到。

```js
var compile = function (functionObject) {
    return functionObject.toString().match(/\/\*([\s\S]*?)\*\//)[1];
};

var html = compile(function () {/*
 <div>
     <h2>title</h2>
     <div class="content">content</div>
 </div>
 */
});
```

作为模板，当然还需要关键词的替换功能。接下来实现它！

参考ES6中的template string：

```js
`
 <div>
     <h2>${title}</h2>
     <div class="content">${content}</div>
 </div>
`
```

只需要替换符合`/\$\{\w.+\}/g`这个正则的文本即可。

用replace方法：

```js
.replace(/\$\{\w.+\}/g, function (variable) {
    return otherValue;
});
```

去掉`${`和`}`，然后返回实际值即可。

```js
var compile = function (functionObject) {
    return function (it) {
        return functionObject.toString().match(/\/\*([\s\S]*?)\*\//)[1].replace(/\$\{\w.+\}/g, function (variable) {
            return it[variable];
        });
    }
};
```

测试下：

```js
var toHtml1 = compile(function () {/*
 <div>
     <h2>${title}</h2>
     <div class="content">${content}</div>
 </div>
 */
});
var test2 = {
    title: 'title string 2',
    content: 'content string 2'
};
document.body.innerHTML += toHtml1(test2);
```

那么如果变量是这样的呢`<h2>${data.title}</h2>`？

只需要用`.`分割字符串，然后逐步拿到值就行了：

```js
var value = it;
variable = variable.replace('${', '').replace('}', '');
variable.split('.').forEach(function (section) {
    value = value[section];
});
return value;
```

测试下：

```js
var test3 = {
    data: {
        title: 'title string 3',
        content: 'content string 3'
    }
};
var toHtml3 = compile(function () {/*
 <div>
 <h2>${data.title}</h2>
 <div class="content">${data.content}</div>
 </div>
 */
});
toHtml3(test3);
```

```
"
<div>
<h2>title string 3</h2>
<div class="content">content string 3</div>
</div>
"
```

See example [here](http://vivaxy.github.io/course/javascript/template-engine/).

另：已经有人造了轮子：[multiline](https://github.com/sindresorhus/multiline)
