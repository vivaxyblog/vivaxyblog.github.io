---
layout: post
title: 用 Promise 实现 eachSeries
tag: tools
---

[async](https://caolan.github.io/async/docs.html) 的 [eachSeries](https://caolan.github.io/async/docs.html#eachSeries) 方法实现了多个异步方法的顺序调用，一次只执行一个异步方法。

```js
const coll = [1, 2, 3, 4];
const iteratee = (item, cb) => {
    setTimeout(() => {
        console.log(item);
        cb();
    }, 200);
};
async.eachSeries(coll, ftpMakeRemoteDirectoryIfNeeded, function (err) {
    // done
});
```

I don't need async.

如果不用 async，用 Promise，应该怎么实现呢？

```js
const coll = [1, 2, 3, 4];
const iteratee = (item) => {
    return 
};
const series = Promise.resolve();
coll.forEach((item) => {
    series.then(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log(item);
                resolve();
            }, 200);
        });
    });
});
series.then(() => {
    // done when ok
}).catch((err) => {
    // done when error
})
```

## 参考资料

- [ES6标准入门](http://es6.ruanyifeng.com/#docs/async#与其他异步处理方法的比较)
