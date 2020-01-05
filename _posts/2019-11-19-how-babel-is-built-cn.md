---
layout: post
title: Babel 的工程化实现
tags: [babel]
---

## 介绍

[Babel](https://github.com/babel/babel) 是一款将未来的 JavaScript 语法编译成过去语法的 Node.js 工具。本文从 2019 年 11 月的 master 分支源码入手，介绍 Babel 在解决这类问题时是如何划分模块。

## Babel 的模块划分

![Babel 的模块划分](/assets/2019-11-19-how-babel-is-built-cn/babel-modules.svg)

其中 babel-loader 隶属于 webpack，不在 Babel 主仓库。

## 框架层

### 常见的编译器

常见的解析器有 acorn、@babel/parser (babylon)、flow、traceur、typescript、uglify-js 等，各自的 AST 语法树大致相同。

### @babel/parser 的实现

#### 关键词说明

- Literal：字面量。包括：Boolean、Number、String。
- Identifier：识别量。包括变量名、undefined、null 等。
- Val：值。常分为左值和右值。左值表示一个可以被赋值的节点，如：[a] 等，左值往往是 Pattern、Identifier 等类型。右值表示一个代表具体值的节点，如：b.c 等，右值往往是 Expression、Identifier、Literal 等类型。左值与右值之间通过等号联结，代表赋值表达式，如：[a] = b.c。
- Declaration：赋值。
- Expression：表达式。常用来表示右值。常见的 Expression 有：MemberExpression、BinaryExpression、UnaryExpression、AssignmentExpression、CallExpression 等。
- Statement：语句。往往由 Expression 组合而成。常见的 Statement 有：ExpressionStatement。
- Program：程序。所有代码在一个 Program 下，一个 Program 包含多个并列的 Statement。

```js
let c = 0;
while (a < 10) {
  const b = a % 2;
  if (b == 0) {
    c++;
  }
}
console.log(c);
```

上面的这段代码通过 @babel/parser 解析后得到的 AST 语法树如下：

![示例 AST 语法树](/assets/2019-11-19-how-babel-is-built-cn/example-ast.svg)

#### @babel/parser 的 9 层继承

![@babel/parser 的 9 层继承](/assets/2019-11-19-how-babel-is-built-cn/9-extends.svg)

- Parser：初始化
- StatementParser：解析语句，拼装成 program，代码大约有 2100+ 行
- ExpressionParser：解析表达式，代码大约有 2400+ 行
- LValParser：左值处理，将节点变为可以被赋值的节点。如：ArrayExpression 转为 ArrayPattern
- NodeUtils：AST 节点操作，如复制等
- UtilParser：工具函数，如判断行末等
- Tokenizer：词法分析，大约有 1400+ 行
- LocationParser：文件位置信息
- CommentsParser：解析注释
- BaseParser：插件能力

大部分模块代码量在百行左右，其中 StatementParser、ExpressionParser 和 Tokenizer 有较多复杂逻辑。

### @babel/traverse

提供遍历 AST 语法树的能力，如：

```js
traverse(ast, {
  FunctionDeclaration: function(path) {
    path.node.id.name = "x";
  }
});

traverse(ast, {
  enter(path) {
    if (path.isIdentifier({ name: "n" })) {
      path.node.name = "x";
    }
  }
});
```

`path` 对象上有下面的属性和方法：

- 属性
  - node：节点
  - parent：父节点
  - parentPath：父节点的 path
  - scope：作用域
- 方法
  - get：获取子节点属性
  - findParent：向父节点搜寻节点
  - getSibling：获取兄弟路径
  - getFunctionParent：获取包含该节点最近的父路径，并且是 function
  - getStatementParent：获取最近的 Statement 类型的父节点
  - replaceWith：用 AST 节点替换该节点
  - replaceWithMultiple：用多个 AST 节点替换该节点
  - replaceWithSourceString：用源码解析后的 AST 节点替换该节点
  - insertBefore：在该节点前插入兄弟节点
  - insertAfter：在该节点后插入兄弟节点
  - remove：删除节点
  - pushContainer：将 AST 节点 push 到节点的属性里面，类似数组操作

### @babel/generator

将 AST 转为代码文本。示例用法：

```js
import { parse } from '@babel/parser';
import generate from '@babel/generator';

const ast = parse('class Example {}');
generate(ast); // => { code: 'class Example {}' }
```

可以生成 source map。

```js
import { parse } from '@babel/parser';
import generate from '@babel/generator';

const code = 'class Example {}';
const ast = parse(code);

const output = generate(ast, { sourceMaps: true, sourceFileName: code }); // => { code: 'class Example {}', rawMappings: ... }
// or
const output = generate(ast, { sourceMaps: true, sourceFileName: 'source.js' }, code); // => { code: 'class Example {}', rawMappings: ... }
```

还可以合并多个文件，同时生成 source map。

```js
import { parse } from '@babel/parser';
import generate from '@babel/generator';

const a = 'var a = 1;';
const b = 'var b = 2;';
const astA = parse(a, { sourceFilename: 'a.js' });
const astB = parse(b, { sourceFilename: 'b.js' });
const ast = {
  type: 'Program',
  body: [...astA.program.body, ...astB.program.body]
};

const { code, map } = generate(ast, { sourceMaps: true }, {
  'a.js': a,
  'b.js': b
});
```

### @babel/core

主要提供  transform 和 parse 相关的 API。

transform 的流程主要是 parse -> traverse -> generate。

parse 主要提供对 @babel/parser 的封装。

## 实现层

### @babel/plugin

#### @babel/plugin-syntax-x

通过插件开关打卡语法解析能力。@babel/parser 中判断了 plugin 开关，实现了这些语法解析能力。如 @babel/plugin-syntax-jsx：

```js
parserOpts.plugins.push("jsx");
```

#### @babel/plugin-transform-x

实现语法的转换。如 @babel/plugin-transform-exponentiation-operator：

```js
export default {
  name: "transform-exponentiation-operator",
  visitor: build({
    operator: "**",
    build(left, right) {
      return t.callExpression(
        t.memberExpression(t.identifier("Math"), t.identifier("pow")),
        [left, right],
      );
    },
  }),
}
```

#### @babel/plugin-proposal-x

支持草案级别的语法转换。如 @babel/plugin-proposal-numeric-separator：

```js
export default {
  name: "proposal-numeric-separator",
  inherits: syntaxNumericSeparator,

  visitor: {
    CallExpression: replaceNumberArg,
    NewExpression: replaceNumberArg,
    NumericLiteral({ node }) {
      const { extra } = node;
      if (extra && /_/.test(extra.raw)) {
        extra.raw = extra.raw.replace(/_/g, "");
      }
    },
  },
}
```

### @babel/preset-x

提供各类组合好的 plugins、syntax 和 helpers。

常用的是 @babel/preset-env，结合 browserslist 设置代码的兼容性。

### @babel/polyfill

从 Babel 7.4.0 起废弃，推荐使用 core-js 和 regenerator-runtime。其中 core-js 提供了 ECMAScript 的所有兼容代码，regenerator-runtime 提供了 async、generator 等函数的执行环境。

### @babel/helpers

定义了 Babel 运行环境的辅助函数。如在 class 模块前插入 classCallCheck 的 helper。

plugin 内的函数调用方式：

```js
export default {
  visitor: {
    ClassExpression(path) {
	    this.addHelper("classCallCheck");
      // ...
  }
};
```

生成的代码中将包含 classCallCheck：

```js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Circle = function Circle() {
  _classCallCheck(this, Circle);
};
```

### @babel/runtime

提供 Babel 的运行环境，包括 regenerator-runtime。运行环境会提供一些辅助代码，如：

使用 @babel/helpers 的情况：

```js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

var Circle = function Circle() {
  _classCallCheck(this, Circle);
};
```

使用 @babel/plugin-transform-runtime 可以把这些代码复用起来：

```js
var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var Circle = function Circle() {
  _classCallCheck(this, Circle);
};
```

@babel/runtime 源码中没有内容，依赖构建脚本将 @babel/helpers 中的代码复制过去。

除了这个运行环境之外，Babel 还提供了 @babel/runtime-corejs2 和 @babel/runtime-corejs3，分别是基于 core-js v2 和 v3 提供的运行环境。可以在 @babel/plugin-transform-runtime 的 corejs 参数中设置使用的运行环境。

## 辅助层

### @babel/types

提供基础的类型值，创建类型的函数，便于 @babel/plugin、@babel/parser 等使用。

```js
const binaryExpression = t.binaryExpression('+', t.numericLiteral(1), t.numericLiteral(2))
```

### @babel/code-frame

打印出错位置。示例代码：

```js
import { codeFrameColumns } from '@babel/code-frame';

const rawLines = `class Foo {
  constructor()
}`;
const location = { start: { line: 2, column: 16 } };
codeFrameColumns(rawLines, location);
```

输出的结果是：

```
  1 | class Foo {
> 2 |   constructor()
    |                ^
  3 | }
```

### @babel/highlight

面向控制台输出有颜色的代码片段。

```js
import highlight from "@babel/highlight";

const code = `class Foo {
  constructor()
}`;
highlight(code);												// => "\u001b[36mclass\u001b[39m \u001b[33mFoo\u001b[39m {\n  constructor()\n}"
```

展示在控制台上：

![@babel/highlight](/assets/2019-11-19-how-babel-is-built-cn/highlight.png)

### @babel/template

模板引擎。

```js
import template from "@babel/template";
import generate from "@babel/generator";
import * as t from "@babel/types";

const buildRequire = template(`
  var %%importName%% = require(%%source%%);
`);

const ast = buildRequire({
  importName: t.identifier("myModule"),
  source: t.stringLiteral("my-module"),
});

generate(ast).code											// => var myModule = require('my-module');
```

### @babel/helper-x

Babel 的辅助函数，包含常用操作、测试函数等，内容比较庞杂。

## 应用层

### @babel/cli

在命令行编译。

```sh
babel script.js # 输出编译的结果
```

### @babel/standalone

在浏览器编译。如：Babel 官网等会用到。

```html
<div id="input"></div>
<div id="output"></div>
<button id="transform">转换</button>
<!-- 加载 @babel/standalone -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script>
document.getElementById('transform').addEventListener('click', function() {
	const input = document.getElementById('input').value;
	const output = Babel.transform(input, { presets: ['es2015'] }).code;
	document.getElementById('output').value = output;
});
</script>
```

@babel/standalone 也会自动编译和执行 `<script type="text/babel"></script>` 和 `<script type="text/jsx"></script>` 中的代码。

```html
<div id="output"></div>
<!-- 加载 @babel/standalone -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<!-- ES2015 代码会被编译执行 -->
<script type="text/babel">
const getMessage = () => "Hello World";
document.getElementById('output').innerHTML = getMessage();
</script>
```

### @babel/node

提供在命令行执行高级语法的环境。@babel/cli 只转换，不执行，@babel/node 会执行。不适合生产环境使用。

```sh
babel-node -e script.js # script.js 里面可以使用高级语法
```

### @babel/register

提供在 Node.js 运行环境内编译和执行高级语法。不适合生产环境使用。

```js
require("@babel/register")();
require("./script.js"); 					// script.js 里面可以使用高级语法
```

## 常见的语法转换结果

### `Array.from`

```js
// input
Array.from([1, 2, 3])

// output
var _array_from_ = require('@babel/runtime-corejs3/core-js-stable/array/from');
_array_from_([1, 2, 3]);
```

### JSX

```js
// input
<div className="text">{content}</div>

// output
React.createElement('div', { className: 'text' }, content);
```

### `class`

```js
// input
class Example extends Component { constructor(props) { super(props) } }

// output
var _inherits_ = require('@babel/runtime-corejs3/helpers/interits');
var _class_call_check_ = require('@babel/runtime-corejs3/helpers/classCallCheck');
var _possible_constructor_return_ = require('@babel/runtime-corejs3/helpers/possibleConstructorReturn');
var _get_prototype_of_ = require('@babel/runtime-corejs3/helpers/getPrototypeOf');
var _create_class_ = require('@babel/runtime-corejs3/helpers/createClass');

var Example = function (_Component) {
  _inherits_(Example, _Component);

  function Example(props) {
    _class_call_check_(this, Example);

    return _possible_constructor_return_(this, _get_prototype_of_(Example).call(this, props));
  }

  _create_class_(Example, []);

  return Example;
}(Component);
```

## 参考资料

- [剖析 Babel——Babel 总览](http://www.alloyteam.com/2017/04/analysis-of-babel-babel-overview/)
- [从AST编译解析谈到写babel插件](https://juejin.im/post/5b56e5636fb9a04fd26098bd)
- [Babel是如何读懂JS代码的](https://zhuanlan.zhihu.com/p/27289600)
