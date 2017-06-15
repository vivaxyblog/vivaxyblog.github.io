---
layout: post
title: Writing Modular JavaScript with ECMAScript 6
tag: javascript
---

We need [babel](https://www.npmjs.com/package/babel) and [browserify](https://www.npmjs.com/package/browserify).

## Initialize the project

`npm init`...

Install babel and browserify.

`npm i --save-dev babel browserify`

Create `src` folder, es6 codes goes in there.

### Create `makefile` to build the project.

```
./dest/index.js: ./dest ./build/event-emitter.js ./build/module.js ./build/index.js
	./node_modules/.bin/browserify ./build/index.js > ./dest/index.js

./build/event-emitter.js: ./build ./event-emitter/src/event-emitter.js
	./node_modules/.bin/babel ./event-emitter/src/event-emitter.js -o ./build/event-emitter.js --module-id EventEmitter # specify the module name to EventEmitter, otherwise babel will generate the module name from file name

./build/module.js: ./build ./src/module.js
	./node_modules/.bin/babel ./src/module.js -o ./build/module.js

./build/index.js: ./build ./src/index.js
	./node_modules/.bin/babel ./src/index.js -o ./build/index.js

./dest:
	mkdir ./dest

./build:
	mkdir ./build
```

### Update `makefile` using `babel -d` option to build directories

```
./dest/index.js: ./dest build-js ./build/event-emitter.js
	./node_modules/.bin/browserify ./build/index.js > ./dest/index.js

build-js: ./build
	./node_modules/.bin/babel ./src -d ./build

./build/event-emitter.js: ./build ./event-emitter/src/event-emitter.js
	./node_modules/.bin/babel ./event-emitter/src/event-emitter.js -o ./build/event-emitter.js --module-id EventEmitter # specify the module name to EventEmitter, otherwise babel will generate the module name from file name

./dest:
	mkdir ./dest

./build:
	mkdir ./build

.PHONY: build-js
```

### Update `makefile` using `babelify`

`npm i --save-dev browserify babelify`

```
./dest/index.js: ./event-emitter/src/event-emitter.js ./src/index.jsx
	./node_modules/.bin/browserify ./src/index.jsx -t babelify --outfile ./dest/index.js
```

## Write the code

```js
// ./src/index.js
'use strict';
import module from './module.js';

module();
```

```js
// ./src/module.js
'use strict';
import EventEmitter from './event-emitter.js';

class Test extends EventEmitter { // extend class
    constructor() {
        super(); // call super constructor
        this._initialize();
    }

    _initialize() {
        // initialize
    }
}

export default (() => {
    new Test();
});
// exports.default = function () {
//     new Test();
// }
```

## Build the project

`make` will generate `./dest/index.js` with runnable JavaScript.

## Using git submodule

`git submodule add [-b gh-pages] https://github.com/vivaxy/event-emitter.git`

Repository here must start with `https://`, or we cannot publish this project to github pages.

```
Page build failure

The page build failed with the following error:

The submodule registered for `./event-emitter` could not be cloned. Make sure it's using https:// and that it's a public repo. For more information, see https://help.github.com/articles/page-build-failed-invalid-submodule.

If you have any questions you can contact us by replying to this email.
```

## Other Recommendation

Use git to keep your code traced.

Write `README.md` to explain your project.

Create `.gitignore` to keep `node_module`, `.DS_Store` and your git submodules out of git repository.

## Example projects

[ink](https://github.com/vivaxy/design/tree/gh-pages/ink)
