---
layout: post
title: How Babel Is Built
tags: [babel]
---

## Introduction
[Babel](https://github.com/babel/babel) is a Node.js tool to use next-generation JavaScript now. This article will explain how Babel is designed to solve this problem, based on the source codes on the master branch in November 2019.

## How is Babel designed?

![Babel Modules](/assets/2020-01-05-how-babel-is-built/babel-modules.svg)

babel-loader belongs to webpack project, which is not in the Babel repository.

## Framework Layer

### Common Compilers

There are acorn, @babel/parser (babylon), flow, traceur, typescript, and uglify-js e.t.c. The ASTs of those compilers are almost the same.

### How @babel/parser Is Designed

#### Important Conceptes

- Literal: Including Boolean, Number, and String.
- Identifier: Including variable names, undefined and null e.t.c.
- Val: Value. There are two kinds of values, left values ​​, and right values. Left values represent nodes that can be assigned to, like: `[a]`. They are mostly Pattern or Identifier type. Right values represent nodes that convey specific values, like `b.c`. They are mostly Expression, Identifier and Literal type. Left values and right values are connected with equal signs to represent assignment expressions, like `[a] = b.c`.
- Expression: often be used as the right value. There are expressions like MemberExpression, BinaryExpression, UnaryExpression, AssignmentExpression, CallExpression e.t.c.
- Statement: often consists of expressions. ExpressionStatements are often seen.
- Program: all codes contained within a program. A program contains some parallel statements.

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

The codes above are converted to AST below by  @babel/parser:

![Example AST](/assets/2020-01-05-how-babel-is-built/example-ast.svg)

#### @babel/parser's 9 Levels of Inheritance

![@babel/parser's 9 Levels of Inheritance](/assets/2020-01-05-how-babel-is-built/9-extends.svg)

- Parser: Initialization
- StatementParser: Parses statements and combine them into a program. 2100+ lines of codes.
- ExpressionParser: 2400+ lines of codes.
- LValParser: Parses left values, converts a node into an assignable node. e.g. convert an ArrayExpression into ArrayPattern.
- NodeUtils: Provides AST operations. e.g. copy node.
- UtilParser: Provides utilities, e.g. to tell if it's the end of a line.
- Tokenizer: 1400+ lines of codes.
- LocationParser: Records line and column locations.
- CommentsParser: Parses comments.
- BaseParser: Provides plugin abilities.

Most modules are written in about 100 lines. Excepts StatementParser, ExpressionParser, and Tokenizer, they have complex logic.

### @babel/traverse

@babel/traverse provides a way of walk through all AST nodes, like:

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

`path` is an object representing the link between two nodes, with some properties and methods listed below:

- Properties
  - node: child node
  - parent: parent node
  - parentPath: parent path
  - scope: current scope
- Methods
  - get: get child node AST properties
  - findParent: find parent paths
  - getSibling: get sibling paths
  - getFunctionParent: get the closest parent path which is a function type
  - getStatementParent: get the closest parent path which is a statement type
  - replaceWith: replace child node with input
  - replaceWithMultiple: replace child node with multiple inputs
  - replaceWithSourceString: replace child node with source code string, Babel will convert source string into AST first
  - insertBefore: insert input before child node as its silbing before
  - insertAfter: insert input after child node as its silbing after
  - remove: remove child node
  - pushContainer: push input into an array like node property

### @babel/generator

@babel/generator converts AST into source string. e.g.:

```js
import { parse } from '@babel/parser';
import generate from '@babel/generator';

const ast = parse('class Example {}');
generate(ast); // => { code: 'class Example {}' }
```

It can generates a source map. e.g.:

```js
import { parse } from '@babel/parser';
import generate from '@babel/generator';

const code = 'class Example {}';
const ast = parse(code);

const output = generate(ast, { sourceMaps: true, sourceFileName: code }); // => { code: 'class Example {}', rawMappings: ... }
// or
const output = generate(ast, { sourceMaps: true, sourceFileName: 'source.js' }, code); // => { code: 'class Example {}', rawMappings: ... }
```

It can merge multiple source files together and generates a source map. e.g.:

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

@babel/core provides APIs of `transform` and `parse`.

The `transform` API consists steps of parse -> traverse -> generate.

The `parse` API is mainly a wrapper of @babel/parser.

## Implementation Layer

### @babel/plugin

#### @babel/plugin-syntax-x

They provide syntax parsing abilities by switching on the syntax switches. In @babel/parser, if a syntax switch is on, then it parses a certain syntax. Otherwise, it raises a syntax error. Let's see @babel/plugin-syntax-jsx for example:

```js
parserOpts.plugins.push("jsx");
```

#### @babel/plugin-transform-x

They provide transformations from latest-generation JavaScript to past-generation JavaScript. Like @babel/plugin-transform-exponentiation-operator:

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

They provide transformations from next-generation JavaScript to past-generation JavaScript. Like: @babel/plugin-proposal-numeric-separator：

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

They provide sets of combined plugins, syntax and helpers.

The most common preset is @babel/preset-env, which takes advantage of browserslist to decide which level of past-generation transformation should be used.

### @babel/polyfill

This is deprecated from Babel 7.4.0. Now core-js and regenerator-runtime are recommended to replace it. core-js provides polyfills of ECMAScript and regenerator-runtime provides runtimes for async functions and generator functions.

### @babel/helpers

It defines helper functions for Babel runtime. e.g. classCallCheck is used for checking a function is called as a class, and it is inserts to a class define.

In a plugin, the helpers are called as:

```js
export default {
  visitor: {
    ClassExpression(path) {
	    this.addHelper("classCallCheck");
      // ...
  }
};
```

The generated code will contain classCallCheck:

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

It provides Babel runtimes, including regenerator-runtime. Runtimes provide some helper codes. e.g.:

When we use @babel/helpers:

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

While we use @babel/plugin-transform-runtime to reduce such codes:

```js
var _classCallCheck = require("@babel/runtime/helpers/classCallCheck");

var Circle = function Circle() {
  _classCallCheck(this, Circle);
};
```

There is no code in @babel/runtime source code repository. The build script copies @babel/helpers into @babel/runtime.

Apart from this runtime, Babel provides @babel/runtime-corejs2 and @babel/runtime-corejs3. They are based on core-js v2 and v3. You can use them by setting corejs option in configs of @babel/plugin-transform-runtime.

## Helpers Layer

### @babel/types

This provides basic AST node types and AST node factories to make @babel/plugin and @babel/parser easy to manipulate AST nodes.

```js
const binaryExpression = t.binaryExpression('+', t.numericLiteral(1), t.numericLiteral(2))
```

### @babel/code-frame

This prints out a code frame to explain the error to the users. e.g.:

```js
import { codeFrameColumns } from '@babel/code-frame';

const rawLines = `class Foo {
  constructor()
}`;
const location = { start: { line: 2, column: 16 } };
codeFrameColumns(rawLines, location);
```

The output is:

```
  1 | class Foo {
> 2 |   constructor()
    |                ^
  3 | }
```

### @babel/highlight

This provides syntax highlight in the terminal.

```js
import highlight from "@babel/highlight";

const code = `class Foo {
  constructor()
}`;
highlight(code);												// => "\u001b[36mclass\u001b[39m \u001b[33mFoo\u001b[39m {\n  constructor()\n}"
```

In the terminal, it prints out:

![@babel/highlight](/assets/2020-01-05-how-babel-is-built/highlight.png)

### @babel/template

Babel template engine.

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

This contains Babel helper functions, including common utilities, helper functions for testing and so on.

## Application Layer

### @babel/cli

This transforms codes in the terminal.

```sh
babel script.js # prints out the transformed codes
```

### @babel/standalone

This transforms codes in the browser. e.g. the Babel website uses this module.

```html
<div id="input"></div>
<div id="output"></div>
<button id="transform">Transform</button>
<!-- Load @babel/standalone -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script>
document.getElementById('transform').addEventListener('click', function() {
	const input = document.getElementById('input').value;
	const output = Babel.transform(input, { presets: ['es2015'] }).code;
	document.getElementById('output').value = output;
});
</script>
```

@babel/standalone can also automatically transform and execute codes in `<script type="text/babel"></script>` and `<script type="text/jsx"></script>` tag.

```html
<div id="output"></div>
<!-- Load @babel/standalone -->
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<!-- ES2015 will be transformed and executed -->
<script type="text/babel">
const getMessage = () => "Hello World";
document.getElementById('output').innerHTML = getMessage();
</script>
```

### @babel/node

This provides you to execute next-generation JavaScript in the command line. @babel/cli is the command line interface to transform codes, but not execute them. While @babel/node transforms and executes codes. This module is not suitable for production.

```sh
babel-node -e script.js # You can use next-generation JavaScript in script.js 
```

### @babel/register

This provides you to require a next-generation JavaScript file in Node.js environment. This is much similar to @babel/node. This is not suitable for production too.

```js
require("@babel/register")();
require("./script.js"); 					// You can use next-generation JavaScript in script.js 
```

## Example Syntax Transform Outputs

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

## Reference

- [剖析 Babel——Babel 总览](http://www.alloyteam.com/2017/04/analysis-of-babel-babel-overview/)
- [从AST编译解析谈到写babel插件](https://juejin.im/post/5b56e5636fb9a04fd26098bd)
- [Babel是如何读懂JS代码的](https://zhuanlan.zhihu.com/p/27289600)
