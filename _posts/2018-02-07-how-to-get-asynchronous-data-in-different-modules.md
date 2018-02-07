---
layout: post
title: 如何在多个模块中获取异步数据
tag: javascript promise async
---

## 背景

```html
<html>
    <head>
        <title>HTML</title>
    </head>
    <body>
        <script src="./script1.js"></script>
        <script src="./script2.js"></script>
    </body>
</html>
```

`script1` 中有一个异步请求，`script2` 也想使用请求得到的数据。

## 方案

### 方案1：两个脚本中分别请求数据

`script1.js`：

```js
const fetchRemoteData = () => {
    return new Promise((resolve) => {
        console.log('send request');
        setTimeout(() => {
            resolve({ message: 'OK' });
        }, 3000);
    });
};

fetchRemoteData().then((data) => {
    console.log('Use data in script1', data);
});
```

`scripts.js`：

```js
fetchRemoteData().then((data) => {
    console.log('Use data in script2', data);
});
```

这里用 `fetchRemoteData` 表示接口请求。

上述写法会导致请求发送两次。

### 方案2：`script2` 检查数据是否准备好

`script1`：

```js
const fetchRemoteData = () => {
    return new Promise((resolve, reject) => {
        console.log('send request');
        setTimeout(() => {
            resolve({ message: 'OK' });
        }, 3000);
    });
};

let savedData = null;

fetchRemoteData().then((data) => {
    savedData = data;
    console.log('Use data in script1', data);
});
```

`script2`：

```js
const checkInterval = setInterval(() => {
    if (savedData) {
        console.log('Use data in script2', savedData);
        clearInterval(checkInterval);
    }
}, 100);
```

只发送一次请求，有多余的代码实现，`script2` 中的数据获取性能较差。

### 方案3：数据检测和回调方式

`script1`：

```js
const fetchRemoteData = () => {
    return new Promise((resolve, reject) => {
        console.log('send request');
        setTimeout(() => {
            resolve({ message: 'OK' });
        }, 3000);
    });
};

const whenDataReady = (() => {
    let savedData = null;
    let callbacks = [];
    fetchRemoteData().then((data) => {
        savedData = data;
        while (callbacks.length) {
            const callback = callbacks.pop();
            callback(savedData);
        }
    });
    return (callback) => {
        if (savedData) {
            callback(savedData);
        } else {
            callbacks.push(callback);
        }
    };
})();

whenDataReady((data) => {
    console.log('Use data in script1', data);
});
```

`script2`：

```js
whenDataReady((savedData) => {
    console.log('Use data in script2', savedData);
});
```

### 方案4：共享 promise 对象

`script1`：

```js
const fetchRemoteData = () => {
    return new Promise((resolve, reject) => {
        console.log('send request');
        setTimeout(() => {
            resolve({ message: 'OK' });
        }, 3000);
    });
};

const fetchRemoteDataPromise = fetchRemoteData();

fetchRemoteDataPromise.then((data) => {
    console.log('Use data in script1', data);
});
```

`script2`：

```js
fetchRemoteDataPromise.then((data) => {
    console.log('Use data in script2', data);
});
```

## 总结

### 实际应用场景

- 模块化开发时，异步数据在模块之间共享。
- 两个脚本依赖同一个异步数据。
- 提供组件，组件中需要先请求到数据，再进行后面的操作。（建议使用方案3）

### 不适用的场景

- 数据实时性要求高，需要每次请求到新数据。
